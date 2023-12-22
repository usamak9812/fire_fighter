

  (function() {
    /**

      Implements a pared down version of ShadowDOM's scoping, which is easy to
      polyfill across browsers.

    */
    Polymer.Base._addFeature({

      _prepShady: function() {
        // Use this system iff localDom is needed.
        this._useContent = this._useContent || Boolean(this._template);
        if (this._useContent) {
          this._template._hasInsertionPoint =
            this._template.content.querySelector('content');
        }
      },

      // called as part of content initialization, prior to template stamping
      _poolContent: function() {
        if (this._useContent) {
          // capture lightChildren to help reify dom scoping
          saveLightChildrenIfNeeded(this);
        }
      },

      // called as part of content initialization, after template stamping
      _setupRoot: function() {
        if (this._useContent) {
          this._createLocalRoot();
        }
      },

      _createLocalRoot: function() {
        this.shadyRoot = this.root;
        this.shadyRoot._distributionClean = false;
        this.shadyRoot._isShadyRoot = true;
        this.shadyRoot._dirtyRoots = [];
        // capture insertion point list
        // TODO(sorvell): it's faster to do this via native qSA than annotator.
        this.shadyRoot._insertionPoints = this._template._hasInsertionPoint ?
          this.shadyRoot.querySelectorAll('content') : [];
        // save logical tree info for shadyRoot.
        saveLightChildrenIfNeeded(this.shadyRoot);
        this.shadyRoot.host = this;
      },

      /**
       * Return the element whose local dom within which this element 
       * is contained. This is a shorthand for 
       * `Polymer.dom(this).getOwnerRoot().host`.
       */
      get domHost() {
        var root = Polymer.dom(this).getOwnerRoot();
        return root && root.host;
      },

      /**
       * Force this element to distribute its children to its local dom.
       * A user should call `distributeContent` if distribution has been
       * invalidated due to changes to selectors on child elements that
       * effect distribution. For example, if an element contains an
       * insertion point with <content select=".foo"> and a `foo` class is
       * added to a child, then `distributeContent` must be called to update
       * local dom distribution.
       */
      distributeContent: function() {
        if (this._useContent) {
          this.shadyRoot._distributionClean = false;
          this._distributeContent();
        }
      },

      _distributeContent: function() {
        if (this._useContent && !this.shadyRoot._distributionClean) {
          // logically distribute self
          this._beginDistribute();
          this._distributeDirtyRoots();
          this._finishDistribute();
        }
      },

      _beginDistribute: function() {
        if (this._useContent && hasInsertionPoint(this.shadyRoot)) {
          // reset distributions
          this._resetDistribution();
          // compute which nodes should be distributed where
          // TODO(jmesserly): this is simplified because we assume a single
          // ShadowRoot per host and no `<shadow>`.
          this._distributePool(this.shadyRoot, this._collectPool());
        }
      },

      _distributeDirtyRoots: function() {
        var c$ = this.shadyRoot._dirtyRoots;
        for (var i=0, l= c$.length, c; (i<l) && (c=c$[i]); i++) {
          c._distributeContent();
        }
        this.shadyRoot._dirtyRoots = [];
      },

      _finishDistribute: function() {
        // compose self
        if (this._useContent) {
          if (hasInsertionPoint(this.shadyRoot)) {
            this._composeTree();
          } else {
            if (!this.shadyRoot._hasDistributed) {
              this.textContent = '';
              this.appendChild(this.shadyRoot);
            } else {
              // simplified non-tree walk composition
              var children = this._composeNode(this);
              this._updateChildNodes(this, children);
            }
          }
          this.shadyRoot._hasDistributed = true;
          this.shadyRoot._distributionClean = true;
        }
      },

      // This is a polyfill for Element.prototype.matches, which is sometimes
      // still prefixed. Alternatively we could just polyfill it somewhere.
      // Note that the arguments are reversed from what you might expect.
      elementMatches: function(selector, node) {
        if (node === undefined) {
          node = this;
        }
        return matchesSelector.call(node, selector);
      },

      // Many of the following methods are all conceptually static, but they are
      // included here as "protected" methods to allow overriding.

      _resetDistribution: function() {
        // light children
        var children = getLightChildren(this);
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (child._destinationInsertionPoints) {
            child._destinationInsertionPoints = undefined;
          }
        }
        // insertion points
        var root = this.shadyRoot;
        var p$ = root._insertionPoints;
        for (var j = 0; j < p$.length; j++) {
          p$[j]._distributedNodes = [];
        }
      },

      // Gather the pool of nodes that should be distributed. We will combine
      // these with the "content root" to arrive at the composed tree.
      _collectPool: function() {
        var pool = [];
        var children = getLightChildren(this);
        for (var i = 0; i < children.length; i++) {
          var child = children[i];
          if (isInsertionPoint(child)) {
            pool.push.apply(pool, child._distributedNodes);
          } else {
            pool.push(child);
          }
        }
        return pool;
      },

      // perform "logical" distribution; note, no actual dom is moved here,
      // instead elements are distributed into a `content._distributedNodes`
      // array where applicable.
      _distributePool: function(node, pool) {
        var p$ = node._insertionPoints;
        for (var i=0, l=p$.length, p; (i<l) && (p=p$[i]); i++) {
          this._distributeInsertionPoint(p, pool);
        }
      },

      _distributeInsertionPoint: function(content, pool) {
        // distribute nodes from the pool that this selector matches
        var anyDistributed = false;
        for (var i=0, l=pool.length, node; i < l; i++) {
          node=pool[i];
          // skip nodes that were already used
          if (!node) {
            continue;
          }
          // distribute this node if it matches
          if (this._matchesContentSelect(node, content)) {
            distributeNodeInto(node, content);
            // remove this node from the pool
            pool[i] = undefined;
            // since at least one node matched, we won't need fallback content
            anyDistributed = true;
            var parent = content.lightParent;
            // dirty a shadyRoot if a change may trigger reprojection!
            if (parent && parent.shadyRoot &&
              hasInsertionPoint(parent.shadyRoot)) {
              parent.shadyRoot._distributionClean = false;
              this.shadyRoot._dirtyRoots.push(parent);
            }
          }
        }
        // Fallback content if nothing was distributed here
        if (!anyDistributed) {
          var children = getLightChildren(content);
          for (var j = 0; j < children.length; j++) {
            distributeNodeInto(children[j], content);
          }
        }
      },

      // Reify dom such that it is at its correct rendering position
      // based on logical distribution.
      _composeTree: function() {
        this._updateChildNodes(this, this._composeNode(this));
        var p$ = this.shadyRoot._insertionPoints;
        for (var i=0, l=p$.length, p, parent; (i<l) && (p=p$[i]); i++) {
          parent = p.lightParent || p.parentNode;
          if (!parent._useContent && (parent !== this) &&
            (parent !== this.shadyRoot)) {
            this._updateChildNodes(parent, this._composeNode(parent));
          }
        }
      },

      // Returns the list of nodes which should be rendered inside `node`.
      _composeNode: function(node) {
        var children = [];
        var c$ = getLightChildren(node.shadyRoot || node);
        for (var i = 0; i < c$.length; i++) {
          var child = c$[i];
          if (isInsertionPoint(child)) {
            var distributedNodes = child._distributedNodes;
            for (var j = 0; j < distributedNodes.length; j++) {
              var distributedNode = distributedNodes[j];
              if (isFinalDestination(child, distributedNode)) {
                children.push(distributedNode);
              }
            }
          } else {
            children.push(child);
          }
        }
        return children;
      },

      // Ensures that the rendered node list inside `node` is `children`.
      _updateChildNodes: function(node, children) {
        var splices =
          Polymer.ArraySplice.calculateSplices(children, node.childNodes);
        for (var i=0; i<splices.length; i++) {
          var s = splices[i];
          // remove
          for (var j=0, c; j < s.removed.length; j++) {
            c = s.removed[j];
            if (c.previousSibling == children[s.index-1]) {
              remove(c);
            }
          }
          // insert
          for (var idx=s.index, ch, o; idx < s.index + s.addedCount; idx++) {
            ch = children[idx];
            o = node.childNodes[idx];
            while (o && o === ch) {
              o = o.nextSibling;
            }
            insertBefore(node, ch, o);
          }
        }
      },

      _matchesContentSelect: function(node, contentElement) {
        var select = contentElement.getAttribute('select');
        // no selector matches all nodes (including text)
        if (!select) {
          return true;
        }
        select = select.trim();
        // same thing if it had only whitespace
        if (!select) {
          return true;
        }
        // selectors can only match Elements
        if (!(node instanceof Element)) {
          return false;
        }
        // only valid selectors can match:
        //   TypeSelector
        //   *
        //   ClassSelector
        //   IDSelector
        //   AttributeSelector
        //   negation
        var validSelectors = /^(:not\()?[*.#[a-zA-Z_|]/;
        if (!validSelectors.test(select)) {
          return false;
        }
        return this.elementMatches(select, node);
      },

      // system override point
      _elementAdd: function() {},

      // system override point
      _elementRemove: function() {}

    });

    var saveLightChildrenIfNeeded = Polymer.DomApi.saveLightChildrenIfNeeded;
    var getLightChildren = Polymer.DomApi.getLightChildren;
    var matchesSelector = Polymer.DomApi.matchesSelector;
    var hasInsertionPoint = Polymer.DomApi.hasInsertionPoint;

    function distributeNodeInto(child, insertionPoint) {
      insertionPoint._distributedNodes.push(child);
      var points = child._destinationInsertionPoints;
      if (!points) {
        child._destinationInsertionPoints = [insertionPoint];
      // TODO(sorvell): _destinationInsertionPoints may not be cleared when
      // nodes are dynamically added/removed, therefore test before adding
      // insertion points.
      } else if (points.indexOf(insertionPoint) < 0) {
        points.push(insertionPoint);
      }
    }

    function isFinalDestination(insertionPoint, node) {
      var points = node._destinationInsertionPoints;
      return points && points[points.length - 1] === insertionPoint;
    }

    function isInsertionPoint(node) {
      // TODO(jmesserly): we could add back 'shadow' support here.
      return node.localName == 'content';
    }

    var nativeInsertBefore = Element.prototype.insertBefore;
    var nativeRemoveChild = Element.prototype.removeChild;

    function insertBefore(parentNode, newChild, refChild) {
      // remove child from its old parent first
      remove(newChild);
      // make sure we never lose logical DOM information:
      // if the parentNode doesn't have lightChildren, save that information now.
      saveLightChildrenIfNeeded(parentNode);
      // insert it into the real DOM
      nativeInsertBefore.call(parentNode, newChild, refChild || null);
    }

    function remove(node) {
      var parentNode = node.parentNode;
      if (parentNode) {
        // make sure we never lose logical DOM information:
        // if the parentNode doesn't have lightChildren, save that information now.
        saveLightChildrenIfNeeded(parentNode);
        // remove it from the real DOM
        nativeRemoveChild.call(parentNode, node);
      }
    }

  })();

