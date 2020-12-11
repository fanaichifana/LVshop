// skip()
function skip() {
  const clearing = document.querySelector('.clearing')
const gobuy = document.querySelector('.gobuy')
clearing.addEventListener('click', () => {
  window.location.href = "./wx.html"
})
gobuy.addEventListener('click', () => {
  window.location.href = "./list.html"
})
}

//设置一个入口函数
$(function () {

  //判断有没有登录
  const nickname = getCookie('nickname')
  if (!nickname) return window.location.href = './login.html'

  //拿到数据
  const cart = JSON.parse(window.localStorage.getItem('cart')) || []
  console.log(cart.length)
  if(!cart.length) { 
    $('.nobuy').removeClass('hide')
    $('.buycart').addClass('hide')
    // console.log($('.nobuy'))
    $('.subtotal').addClass('hide')
    // $('.bao').addClass('hide')
    return
  } 
  //来到说明有
    $('.nobuy').addClass('hide')
    $('.buycart').removeClass('hide')
    $('.subtotal').removeClass('hide')
  
  //   //渲染页面
    bindHtml()
    function bindHtml() {
      let total = 0
      let totalMoney = 0
      cart.forEach(item => {
        console.log(item)
        if (item) {
          total += item.cart_number - 0
          totalMoney += item.cart_number * item.goods_price
        }
      })


      let stt = ''
      let str = ''
      
      
      cart.forEach(item => {
        str += `
        <div class="bao">
        <div class="imgBox">
      <img src="${  item.goods_small_logo }" width="150px" alt="">
    </div>
    <div class="goodsText">
      <p class="goods_Name">${ item.goods_name } <span>商品数量 ：${ total }</span></p>
      
      <p class="good_color">产品颜色： Tourterelle</p>
      <p class="goods_money">￥ ${ item.goods_price }</p>
      <div class="dustbin" data-id="${ item.goods_id }">
        <img src="../imgs/垃圾桶.png" alt="" data-id="${ item.goods_id }">
      </div>
      <div class="clearing" style="cursor: pointer;">前往结算</div>
      <div class="gobuy" style="cursor: pointer;">继续购物</div>
    </div>
    </div>
        `
        
      })
      skip()
      
      stt += `
      <div class="subtotal">
      小计 ${ totalMoney.toFixed(2) }
    </div>
      `
      $('.buycart').html(str)
      $('.subtotal').html(stt)
      // $('.nobuy').html(sss)
    }

    $('.buycart').on('click', '.dustbin', function () {
      // 拿到商品 id
      const id = $(this).data('id')
      console.log(cart.length)
      // 删除指定数据
      console.log(cart.goods_id)
      for(let i = 0; i < cart.length; i++) {
        // console.log(cart[i].goods_id)
        console.log(i)
        if (cart[i].goods_id == id) {
          cart.splice(i, 1)
          // break
        }
      }
  
      // 重新渲染页面
      bindHtml()
      // 从新保存起来
      window.localStorage.setItem('cart', JSON.stringify(cart))
  
      if (!cart.length) window.location.reload()
    })
  })