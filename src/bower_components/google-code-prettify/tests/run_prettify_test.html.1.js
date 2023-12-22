
      (function () {
        var srcDir = '../src';
        if (/[&?]distrib\b/.test(location.search)) {
          srcDir = '../distrib/google-code-prettify';
        }
        document.write(
            '<script src="' + srcDir + '/run_prettify.js'
            + '?lang=css'
            + '&callback=print_done'
            + '&skin=sunburst'
            + '&callback=bogus'
            + '&callback=dump_globals"><\/script>');
      })();
    