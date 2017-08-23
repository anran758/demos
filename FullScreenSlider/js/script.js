(function($) {
  var PageSwitch = (function() {
    function PageSwitch(element, options) {
      // 从这里传入 default 默认值.
      this.settings = $.extend(true, $.fn.PageSwitch.default, options || {});
      this.element = element;
      this.init();
    }

    PageSwitch.prototype = {
      // 初始化插件
      // 初始化dom结构, 布局, 分页及绑定事件
      init : function() {
        var me = this;

        // 获取字符串
        console.log(me);
        me.selectors = me.settings.selectors;
        me.sections = me.selectors.sections;
        me.section = me.selectors.section;

        me.direction = me.sections.direction ==
                       'vertical' ? true : false;
        me.pagesCount = me.pagesCount();
        me.index = (me.settings.index >= 0 &&
                    me.settings.index < pagesCount) ?
                    me.settings.index : 0;

        // 如果是横屏, 就调用针对横屏的布局
         if(!me.direction) {
          me._initLayout();
         }

         if (me.settings.pagination) {
          me._initPaging();
         }

         me._initEvent();
      },
      /* 获取页面数量 */
      pagesCount : function() {
        return this.section.length;
      },
      /* 获取页面的宽或高度(横 / 竖屏滑动) */
      switchLength : function() {
        return this.direction ? this.element.height() :
                                this.element.width();
      },

      /* 针对横屏情况进行布局 */
      _initLayout : function() {
        var me = this;
        var width = (me.pagesCount * 100) + "%",
            cellWidth = (100 / me.pagesCount).toFixed(2) + "%";

        // 给容器及每个页面设置宽度
        me.sections.width(width);
        me.section.width(cellWidth).css('float', 'left');
      },
      /* 实现分页结构及css样式 */
      _initPaging : function() {
        var me = this,
            pagesClass  = me.selectors.page.substring(1),
            activeClass = me.selectors.active.substring(1);

        var pageHTML = '<ul class=' + pagesClass + '>';
        for (var i = 0; i < me.pagesCount; i++) {
          pageHTML += "<li></li>";
        }
        me.element.append(pageHTML);

        var pages = me.element.find(me.selectors.page);
        me.pageItem = pages.find('li');
        me.pageItem.eq(me.index).addClass(me.activeClass);

        // 判断横竖屏
        if (me.direction) {
           page.addClass('vertical');
        } else {
          page.addClass('horizontal');
        }
      },
      _initEvent : function() {}
    };

    return PageSwitch;
  });

  $.fn.PageSwitch = function(options) {
    return this.each(function() {
      var me = $(this),
          instance = me.data("PageSwitch");

      // 非空
      if (!instance) {
        instance = new PageSwitch(me, options);
        me.data('PageSwitch', instance);
      }

      if ($.type(options) === "string") {
        return instance[options]();
      }

      $('div').PageSwitch('init');
    });
  };

  $.fn.PageSwitch.defaults = {
    selectors : {
      sections : ".sections",
      section : ".section",
      page : ".pages",
      active : ".active"
    },
    index : 0,
    loop : false,
    easing: "ease",
    duration : 500,
    keyboard : true,
    pagination : true,
    direction : "vertical",
    callback : ""
  };

  $(function() {
    $('[data-PageSwitch').PageSwitch();
  });
})(jQuery);