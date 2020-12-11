"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Banner = /*#__PURE__*/function () {
  function Banner(ele) {
    _classCallCheck(this, Banner);

    //获取banner
    this.ele = document.querySelector(ele);
    console.log(this.ele); //获取ul信息

    this.ulBox = this.ele.querySelector('ul');
    console.log(this.ulBox); //获取切换盒子

    this.cutBox = this.ele.querySelector('.cut');
    console.log(this.cutBox); // 执行函数

    this.index = 0; //定时器开关

    this.timer = 0; //开关
    // this.flag = true

    this.exe();
  }

  _createClass(Banner, [{
    key: "exe",
    value: function exe() {
      this.handover(true);
      this.autoplay();
      this.mouseover();
      this.cut();
      this.window_cut();
    } // 切换图片

  }, {
    key: "handover",
    value: function handover(type) {
      // 删除当前的
      this.ulBox.children[this.index].classList.remove('active');

      if (type === true) {
        this.index++;
      } else if (type === false) {
        this.index--;
      } else {
        this.index = type;
      }

      if (this.index >= this.ulBox.children.length) this.index = 0;
      if (this.index < 0) this.index = this.ulBox.children.length - 1; //添加active

      this.ulBox.children[this.index].classList.add('active'); // this.flag = true
    } // 自动轮播

  }, {
    key: "autoplay",
    value: function autoplay() {
      var _this = this;

      this.timer = setInterval(function () {
        _this.handover(true);
      }, 6000);
    } // 鼠标移入移出 

  }, {
    key: "mouseover",
    value: function mouseover() {
      var _this2 = this;

      this.ele.addEventListener('mouseover', function () {
        return clearInterval(_this2.timer);
      });
      this.ele.addEventListener('mouseout', function () {
        return _this2.autoplay();
      });
    } //切换

  }, {
    key: "cut",
    value: function cut() {
      var _this3 = this;

      this.cutBox.addEventListener('click', function (e) {
        e = e || window.event;
        var target = e.target || e.srcElement;

        if (target.className === 'left') {
          // if(this.flag === false) return
          _this3.handover(false);

          console.log('我点击了 '); // this.flag = false
        }

        if (target.className === 'right') {
          // if(this.flag === false)return
          _this3.handover(true);

          console.log('我点击了 '); // this.flag = false
        }
      });
    } //切换页面

  }, {
    key: "window_cut",
    value: function window_cut() {
      var _this4 = this;

      document.addEventListener('visibilitychange', function () {
        var state = document.visibilityState;

        if (state === 'hidden') {
          clearInterval(_this4.timer);
        }

        if (state === 'visible') {
          _this4.autoplay();
        }
      });
    } //浏览器滚动到

  }]);

  return Banner;
}();