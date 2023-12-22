

  Polymer({

    is: 'x-repeat',
    extends: 'template',

    properties: {

      /**
       * An array containing items determining how many instances of the template
       * to stamp and that that each template instance should bind to.
       */
      items: {
        type: Array
      },

      /**
       * A function that should determine the sort order of the items.  This
       * property should either be provided as a string, indicating a method
       * name on the element's host, or else be an actual function.  The
       * function should match the sort function passed to `Array.sort`.
       * Using a sort function has no effect on the underlying `items` array.
       */
      sort: {
        type: Function,
        observer: '_sortChanged'
      },

      /**
       * A function that can be used to filter items out of the view.  This
       * property should either be provided as a string, indicating a method
       * name on the element's host, or else be an actual function.  The
       * function should match the sort function passed to `Array.filter`.
       * Using a filter function has no effect on the underlying `items` array.
       */
      filter: {
        type: Function,
        observer: '_filterChanged'
      },

      /**
       * When using a `filter` or `sort` function, the `observe` property
       * should be set to a space-separated list of the names of item
       * sub-fields that should trigger a re-sort or re-filter when changed.
       * These should generally be fields of `item` that the sort or filter
       * function depends on.
       */
      observe: {
        type: String,
        observer: '_observeChanged'
      },

      /**
       * When using a `filter` or `sort` function, the `delay` property
       * determines a debounce time after a change to observed item
       * properties that must pass before the filter or sort is re-run.
       * This is useful in rate-limiting shuffing of the view when
       * item changes may be frequent.
       */
      delay: Number
    },

    behaviors: [
      Polymer.Templatizer
    ],

    observers: [
      '_itemsChanged(items.*)'
    ],

    created: function() {
      this.boundCollectionObserver = this.render.bind(this);
    },

    ready: function() {
      // Templatizing (generating the instance constructor) needs to wait
      // until attached, since it may not have its template content handed
      // back to it until then, following its host template stamping
      if (!this.ctor) {
        this.templatize(this);
      }
    },

    _sortChanged: function() {
      var dataHost = this._getRootDataHost();
      this._sortFn = this.sort && (typeof this.sort == 'function' ?
        this.sort : dataHost[this.sort].bind(this.host));
      if (this.items) {
        this.debounce('render', this.render);
      }
    },

    _filterChanged: function() {
      var dataHost = this._getRootDataHost();
      this._filterFn = this.filter && (typeof this.filter == 'function' ?
        this.filter : dataHost[this.filter].bind(this.host));
      if (this.items) {
        this.debounce('render', this.render);
      }
    },

    _observeChanged: function() {
      this._observePaths = this.observe &&
        this.observe.replace('.*', '.').split(' ');
    },

    _itemsChanged: function(change) {
      if (change.path == 'items') {
        this._unobserveCollection();
        if (change.value) {
          this._observeCollection(change.value);
          this.debounce('render', this.render);
        }
      } else {
        this._forwardItemPath(change.path, change.value);
        this._checkObservedPaths(change.path);
      }
    },

    _checkObservedPaths: function(path) {
      if (this._observePaths && path.indexOf('items.') === 0) {
        path = path.substring(path.indexOf('.', 6) + 1);
        var paths = this._observePaths;
        for (var i=0; i<paths.length; i++) {
          if (path.indexOf(paths[i]) === 0) {
            this.debounce('render', this.render, this.delay);
            return;
          }
        }
      }
    },

    _observeCollection: function(items) {
      this.collection = Array.isArray(items) ? Polymer.Collection.get(items) : items;
      this.collection.observe(this.boundCollectionObserver);
    },

    _unobserveCollection: function() {
      if (this.collection) {
        this.collection.unobserve(this.boundCollectionObserver);
      }
    },

    render: function(splices) {
      this.flushDebouncer('render');
      var c = this.collection;
      if (splices) {
        if (this._sortFn || splices[0].index == null) {
          this._applySplicesViewSort(splices);
        } else {
          this._applySplicesArraySort(splices);
        }
      } else {
        this._sortAndFilter();
      }
      var rowForKey = this._rowForKey = {};
      var keys = this._orderedKeys;
      // Assign items and keys
      this.rows = this.rows || [];
      for (var i=0; i<keys.length; i++) {
        var key = keys[i];
        var item = c.getItem(key);
        var row = this.rows[i];
        rowForKey[key] = i;
        if (!row) {
          this.rows.push(row = this._insertRow(i, null, item));
        }
        row.item = item;
        row.key = key;
        row.index = i;
      }
      // Remove extra
      for (; i<this.rows.length; i++) {
        this._detachRow(i);
      }
      this.rows.splice(keys.length, this.rows.length-keys.length);
    },

    _sortAndFilter: function() {
      var c = this.collection;
      this._orderedKeys = c.getKeys();
      // Filter
      if (this._filterFn) {
        this._orderedKeys = this._orderedKeys.filter(function(a) {
          return this._filterFn(c.getItem(a));
        }, this);
      }
      // Sort
      if (this._sortFn) {
        this._orderedKeys.sort(function(a, b) {
          return this._sortFn(c.getItem(a), c.getItem(b));
        }.bind(this));
      }
    },

    _keySort: function(a, b) {
      return this.collection.getKey(a) - this.collection.getKey(b);
    },

    _applySplicesViewSort: function(splices) {
      var c = this.collection;
      var keys = this._orderedKeys;
      var rows = this.rows;
      var removedRows = [];
      var addedKeys = [];
      var pool = [];
      var sortFn = this._sortFn || this._keySort.bind(this);
      splices.forEach(function(s) {
        // Collect all removed row idx's
        for (var i=0; i<s.removed.length; i++) {
          var idx = this._rowForKey[s.removed[i]];
          if (idx != null) {
            removedRows.push(idx);
          }
        }
        // Collect all added keys
        for (i=0; i<s.added.length; i++) {
          addedKeys.push(s.added[i]);
        }
      }, this);
      if (removedRows.length) {
        // Sort removed rows idx's
        removedRows.sort();
        // Remove keys and pool rows (backwards, so we don't invalidate rowForKey)
        for (i=removedRows.length-1; i>=0 ; i--) {
          var idx = removedRows[i];
          pool.push(this._detachRow(idx));
          rows.splice(idx, 1);
          keys.splice(idx, 1);
        }
      }
      if (addedKeys.length) {
        // Filter added keys
        if (this._filterFn) {
          addedKeys = addedKeys.filter(function(a) {
            return this._filterFn(c.getItem(a));
          }, this);
        }
        // Sort added keys
        addedKeys.sort(function(a, b) {
          return this.sortFn(c.getItem(a), c.getItem(b));
        }, this);
        // Insert new rows using sort (from pool or newly created)
        var start = 0;
        for (i=0; i<addedKeys.length; i++) {
          start = this._insertRowIntoViewSort(start, addedKeys[i], pool);
        }
      }
    },

    _insertRowIntoViewSort: function(start, key, pool) {
      var c = this.collection;
      var item = c.getItem(key);
      var end = this.rows.length - 1;
      var idx = -1;
      var sortFn = this._sortFn || this._keySort.bind(this);
      // Binary search for insertion point
      while (start <= end) {
        var mid = (start + end) >> 1;
        var midKey = this._orderedKeys[mid];
        var cmp = sortFn(c.getItem(midKey), item);
        if (cmp < 0) {
          start = mid + 1;
        } else if (cmp > 0) {
          end = mid - 1;
        } else {
          idx = mid;
          break;
        }
      }
      if (idx < 0) {
        idx = end + 1;
      }
      // Insert key & row at insertion point
      this._orderedKeys.splice(idx, 0, key);
      this.rows.splice(idx, 0, this._insertRow(idx, pool));
      return idx;
    },

    _applySplicesArraySort: function(splices) {
      var keys = this._orderedKeys;
      var pool = [];
      splices.forEach(function(s) {
        // Remove & pool rows first, to ensure we can fully reuse removed rows
        for (var i=0; i<s.removed.length; i++) {
          pool.push(this._detachRow(s.index + i));
        }
        this.rows.splice(s.index, s.removed.length);
      }, this);
      var c = this.collection;
      var filterDelta = 0;
      splices.forEach(function(s) {
        // Filter added keys
        var addedKeys = s.added;
        if (this._filterFn) {
          addedKeys = addedKeys.filter(function(a) {
            return this._filterFn(c.getItem(a));
          }, this);
          filterDelta += (s.added.length - addedKeys.length);
        }
        var idx = s.index - filterDelta;
        // Apply splices to keys
        var args = [idx, s.removed.length].concat(addedKeys);
        keys.splice.apply(keys, args);
        // Insert new rows (from pool or newly created)
        var addedRows = [];
        for (i=0; i<s.added.length; i++) {
          addedRows.push(this._insertRow(idx + i, pool));
        }
        args = [s.index, 0].concat(addedRows);
        this.rows.splice.apply(this.rows, args);
      }, this);
    },

    _detachRow: function(idx) {
      var row = this.rows[idx];
      var parentNode = Polymer.dom(this).parentNode;
      for (var i=0; i<row._children.length; i++) {
        var el = row._children[i];
        Polymer.dom(row.root).appendChild(el);
      }
      return row;
    },

    _insertRow: function(idx, pool, item) {
      var row = (pool && pool.pop()) || this._generateRow(idx, item);
      var beforeRow = this.rows[idx];
      var beforeNode = beforeRow ? beforeRow._children[0] : this;
      var parentNode = Polymer.dom(this).parentNode;
      Polymer.dom(parentNode).insertBefore(row.root, beforeNode);
      return row;
    },

    _generateRow: function(idx, item) {
      var row = this.stamp({
        index: idx,
        key: this.collection.getKey(item),
        item: item
      });
      // each row is a document fragment which is lost when we appendChild,
      // so we have to track each child individually
      var children = [];
      for (var n = row.root.firstChild; n; n=n.nextSibling) {
        children.push(n);
        n._templateInstance = row;
      }
      // Since archetype overrides Base/HTMLElement, Safari complains
      // when accessing `children`
      row._children = children;
      return row;
    },

    // Implements extension point from Templatizer mixin
    _getStampedChildren: function() {
      var children = [];
      if (this.rows) {
        for (var i=0; i<this.rows.length; i++) {
          var c = this.rows[i]._children;
          for (var j=0; j<c.length; j++)
          children.push(c[j]);
        }
      }
      return children;
    },

    // Implements extension point from Templatizer
    // Called as a side effect of a template instance path change, responsible
    // for notifying items.<key-for-row>.<path> change up to host
    _forwardInstancePath: function(row, root, subPath, value) {
      if (root == 'item') {
        this.notifyPath('items.' + row.key + '.' + subPath, value);
      }
    },

    // Implements extension point from Templatizer mixin
    // Called as side-effect of a host property change, responsible for
    // notifying parent.<prop> path change on each row
    _forwardParentProp: function(prop, value) {
      if (this.rows) {
        this.rows.forEach(function(row) {
          row.parent[prop] = value;
          row.notifyPath('parent.' + prop, value, true);
        }, this);
      }
    },

    // Implements extension point from Templatizer
    // Called as side-effect of a host path change, responsible for
    // notifying parent.<path> path change on each row
    _forwardParentPath: function(path, value) {
      if (this.rows) {
        this.rows.forEach(function(row) {
          row.notifyPath('parent.' + path, value, true);
        }, this);
      }
    },

    // Called as a side effect of a host items.<key>.<path> path change,
    // responsible for notifying item.<path> changes to row for key
    _forwardItemPath: function(path, value) {
      if (this._rowForKey) {
        // 'items.'.length == 6
        var dot = path.indexOf('.', 6);
        var key = path.substring(6, dot < 0 ? path.length : dot);
        var idx = this._rowForKey[key];
        var row = this.rows[idx];
        if (row) {
          if (dot >= 0) {
            path = 'item.' + path.substring(dot+1);
            row.notifyPath(path, value, true);
          } else {
            row.item = value;
          }
        }
      }
    },

    _instanceForElement: function(el) {
      while (el && !el._templateInstance) {
        el = el.parentNode;
      }
      return el && el._templateInstance;
    },

    /**
     * Returns the item associated with a given element stamped by
     * this `x-repeat`.
     */
    itemForElement: function(el) {
      var instance = this._instanceForElement(el);
      return instance && instance.item;
    },

    /**
     * Returns the `Polymer.Collection` key associated with a given
     * element stamped by this `x-repeat`.
     */
    keyForElement: function(el) {
      var instance = this._instanceForElement(el);
      return instance && instance.key;
    },

    /**
     * Returns the index in `items` associated with a given element
     * stamped by this `x-repeat`.
     */
    indexForElement: function(el) {
      var instance = this._instanceForElement(el);
      return this.rows.indexOf(instance);
    }

  });


