Polymer({
  currentTab: 0,
  colors: [
    "#000",
    "#a00",
    "#0a0",
    "#00a",
    "#aa0",
    "#0aa",
    "#a0a"
  ],
  currentColor: 0,
  ready: function(){
    this.job("dhdf", function(){
      this.$["tab-content-block"].children[1].style.webkitTransform = "translateY(0)";
    }, 0);
  },
  toggleOpen: function(){
    this.view.annotationClearWait = true;
    this.job("shift wait", function(){
      this.view.offset.x += 0.01;
      this.job("shift wait", function(){
        this.view.offset.x -= 0.01;
        this.job("shift wait", function(){
          this.view.annotationClearWait = false;
        }, 10);
      }, 10);
    }, 1000);
    this.panels.lib.open = !this.panels.lib.open;
  },
  currentTabChanged: function(old_category, new_category){
    var dir;
    this.view.time.pause = true;
    this.job("dfhdr", function(){
      if(this.interactMode){
        this.view.time.pause = false;
      }
    }, 750);
    var to_tab = this.$["tab-content-block"].children[new_category + 1];
    var from_tab = this.$["tab-content-block"].children[old_category + 1];
    if(old_category - new_category > 0){
      dir = -100;
    }
    else{
      dir = 100;
    }
    to_tab.style.webkitTransition = "0";
    to_tab.style.webkitTransform = "translateY(" + dir + "%)";
    this.job("do_shift", function(){
      to_tab.style.webkitTransition = "0.25s";
      to_tab.style.webkitTransform = "translateY(0)";
      from_tab.style.webkitTransition = "0.25s";
      from_tab.style.webkitTransform = "translateY(" + (dir * -1) + "%)";
    }, 0);
  }
});