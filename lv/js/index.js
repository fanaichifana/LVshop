"use strict";

//获取元素
var loginImg = document.querySelector('.loginImg > img');
var buy = document.querySelector('.buy > img');
// 获取元素
const uls = document.querySelector('.uls')
const inp = document.querySelector('input')
const option = document.querySelector('.option')
const p = document.querySelectorAll('.option > p')
const uuu = document.querySelectorAll('.uuu > li')
console.log(option)
console.log(uuu)
console.log(inp)
console.log(uls)
console.log(buy); // console.log(loginImg)

loginImg.addEventListener('click', function () {
  window.location.href = "./login.html";
});
buy.addEventListener('click', function () {
  window.location.href = "./cart.html";
  console.log('我被点击了 ');
});
inp.addEventListener('input', function () {
  const value = this.value.trim()
  if(!value) {
    uls.classList.remove('active')
    return
  }
    


  const script = document.createElement('script')
  const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
  script.src = url
  document.body.appendChild(script)
  script.remove()
})

function bindHtml(res) {
  if (!res.g) {
    uls.classList.remove('active')
    return
  }

  // 代码来到这里, 表示有 g 这个数据, 渲染页面
  let str = ''

  for (let i = 0; i < res.g.length; i++) {
    str += `
      <li>${ res.g[i].q }</li>
    `
  }

  uls.innerHTML = str
  // 让 ul 显示出来
  uls.classList.add('active')
  if (!res.g) {
    uls.classList.remove('active')
    return
  }
}
document.addEventListener('contextmenu', () => {
  uls.style.display = "none"
})

for(let i = 0; i < p.length; i++){
  p[i].addEventListener('click', () => {
    window.location.href = "./list.html"
  })
}
for(let i = 0; i < uuu.length; i++) {
  uuu[i].addEventListener('mouseover', () => {
    option.style.display = "flex"
  })
  uuu[i].addEventListener('mouseout', () => {
    option.style.display = "none"
  })
}
option.addEventListener('mouseover', () => {
  option.style.display = "flex"
})
option.addEventListener('mouseout', () => {
  option.style.display = "none"
})