function clickHandler(e) {
        if (!e.target.hasAttribute('data-dialog')) {
          return;
        }

        var id = e.target.getAttribute('data-dialog');
        var dialog = document.getElementById(id);
        if (dialog) {
          dialog.open();
        }
      };