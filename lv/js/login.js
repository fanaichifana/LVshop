// "use strict";

// // 获取元素
dianji();

function dianji() {
  var sign = document.querySelector('.sign');
 
  var signBox = document.querySelector('.signBox');
  var wx = document.querySelector('.wx > img');
  sign.addEventListener('click', function () {
    console.log('点击我了')
    signBox.style.display = "block";
  });
  sign.addEventListener('contextmenu', function () {
    signBox.style.display = "none";
  });
  wx.addEventListener('click', function () {
    window.location.href = "./wx.html";
  });
}
// } //设置jQuery的入口函数 

// 第二个作用: 保护变量私有化
$(function () {
  
  // 1. 使用 validate 插件进行表单验证操作
  $('#login').validate({
    // 规则配置
    rules: {
      username: {
        required: true,
        minlength: 5,
        maxlength: 10
      },
      password: {
        required: true,
        minlength: 6,
        maxlength: 12
      }
    },
    
    messages: {
      username: {
        required: '请输入合法字符',
        minlength: ' 最少输入5个字符',
        maxlenth: '最多输入12个字符'
      }
    },
    // 提示信息配置
    
    // 表单提交事件
    submitHandler (form) {
      // 2. 进行表单提交
      // 2-1. 拿到用户填写的内容
      const info = $(form).serialize()
      
      // 2-2. 发送请求到后端, 准备接受结果
      $.post('../server/login.php', info, null, 'json').then(res => {
        // res 就是后端给我的结果
        console.log(res.code)
        console.log(res.nickname)
        
        // 3. 登录成功以后的操作
        if (res.code === 0) {
          // 登录失败
          $('.login_cuo').removeClass('hide')
        } else if (res.code === 1) {
          // 3-2. 登录成功, 跳转页面, 存储 cookie
          // 为了在首页还需要使用
          setCookie('nickname', res.nickname)
          // 跳转页面
          window.location.href = './index.html'
        }
      })
    }
  })
})
//判断有没有nickname
const nickname = getCookie('nickname')
//获取元素
const have = document.querySelector('.have')
// 获取元素
const greet = document.querySelector('.greet')
const go = document.querySelector('.go')
const lv_tail = document.querySelector('.lv_tail')
console.log(have)
console.log(greet)
//如果有
if(nickname){
  have.style.display = "none"
  greet.style.display = "flex"
  $(greet).html(`欢迎您${nickname} 先生`)
  go.style.display = "block"
  go.addEventListener('click', () => {
    window.location.href = "./list.html"
  })
  lv_tail.style.display = "none"
}else {
  have.style.display = "block"
  greet.style.display = "none"
  go.style.display = "none"
}