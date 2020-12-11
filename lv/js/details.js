/*
  请求单一一条商品的所有信息, 按照 html 格式渲染

  问题: 请求哪一条商品的信息 ?
    + 在列表页点击哪一个 商品, 就是哪一个商品的信息
    + 点击事件发生在 list.html 页面, 请求商品详情信息发生在 detail.html 页面
    + 点击商品的时候, 把商品 id 存储在 cookie 里面
    + 在详情页拿到商品 id, 根据 id 去请求这一条商品

  问题: 如何跨页面进行通讯 ?
    + 登录的时候, 在 login.html 得到的用户昵称信息
    + 使用的时候, 在 index.html 使用的用户昵称信息
*/

/*
  加入购物车的事件
    + 只要我组装出一个数组来
    + 存储到 lcoalStorage 里面
    + 将来在 cart.html 页面把这个数组拿出来

  4. 当你点击 加入购物车的时候
    + 向数组里面组装的过程
    4-1. 事件绑定给谁 ?
      => 因为 addCart 是渲染的, 所以绑定给 goodsInfo 进行事件委托
    4-2. 拿到 localStorage 里面有没有购物车数组
    4-3. 确定数组中有没有这个数据
      => 当我两次加入同一个数据的时候, 要判断一下原先有没有这个数据
    4-4. 将数据再次存储到 localStorage 中

  5. 操作 加 减 按钮, 让 input 里面的数字 ++ 或者 --
    5-1. 事件委托, 委托给 goodsInfo
*/

//点击进入购物车操作
const buy = document.querySelector('.buy > img')
const login = document.querySelector('.loginImg > img')
console.log(login)
console.log(buy)
buy.addEventListener('click', () => {
  window.location.href = "./cart.html"
})
login.addEventListener('click', () => {
  window.location.href = "./login.html"
})
// jQuery 的入口函数
$(function () {

  // 0. 提前准备一个变量拿出来商品信息
  let info = null

  // 1. 拿到 cookie 中的 goods_id 属性
  const id = getCookie('goods_id')
  console.log(id)

  // 2. 根据 id 信息去请求商品数据
  getGoodsInfo()
  async function getGoodsInfo() {
    const goodsInfo = await $.get('../server/getGoodsInfo.php', { goods_id: id }, null, 'json')
    console.log(goodsInfo)

    // 3. 进行页面的渲染
    bindHtml(goodsInfo.info)

    // 给提前准备好的变量进行赋值
    info = goodsInfo.info
  }


  function bindHtml(info) {
    console.log(info)

    // 1. 渲染左边放大镜位置
    // $('.thumbnail').html(`
    //   <img src="${ info.goods_small_logo }" alt="">
    // `)
    // $('.showImg').html(`
    //   <img src="${ info.goods_big_logo }" alt="">
    // `)

    // // 2. 商品详细信息渲染
    // $('.goods_xin').html(`
    // <p class="sport"> 表现</p>
    // <p class="kuzi">${ info.goods_name }</p>
    // <p class="evaluate">★★★★★ &nbsp;共2条评价</p>
    // <p class="money">¥ ${ info.goods_price }</p>
    // <p class="model">黑色(GI6672)</p>
    // <div class="addcart">添加到购物袋</div>
    // <div class="gobuy">立即购买</div>
    // `)

    // // 3. 商品参数渲染
    // $('.goodsDesc').html(info.goods_introduce)

    $('.details').html(`
    <div class="thumbnail">
    <img src="${ info.goods_small_logo }" alt="">
  </div>
  <div class="showImg">
    <img src="${ info.goods_big_logo }"  alt="">
    <!-- 遮罩 -->
    <div class="mask"></div>
  </div>
  <div class="bigBox" style="background-image: url(${ info.goods_big_logo });">
    
  </div>
  <div class="goods_xin">
    <p class="sport"> 表现</p>
    <p class="kuzi">${ info.goods_name }</p>
    <p class="evaluate">★★★★★ &nbsp;共1296753条评价</p>
    <p class="money">¥ ${ info.goods_price }</p>
    <p class="model">黑色(GI6672)</p>
    <div class="addCart">添加到购物袋</div>
    <div class="gobuy">立即购买</div>
  </div>
    
    </div>
    `)
    new Fang('.details')
    const gobuy = document.querySelector('.gobuy')
    console.log(gobuy)
    gobuy.addEventListener('click', function () {
    console.log('我被点击了')
   window.location.href = "./wx.html"
})

  }

  // 4. 加入购物车的操作
  $('.details').on('click', '.addCart', function () {
    // 4-2. 拿到 localStorage 里面有没有数组
    // 如果你没有这个数组, 那么我就定义一个空数组
    // 如果你有, 我就用你的
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []

    // 4-3. 判断一下 cart 数组里面有没有这个数据
    // 问题: 当前是哪一条数据 ? id
    // 如果 cart 里面有某一条数据和我的 id 一样
    // 表示我不需要添加内容了, 而是 ++
    // 如果 cart 里面没有某一条数据, 那么我要把当前这条数据 push 进去
    // 当前这一条数据是哪一条 ? info 存储进去
    // 如何判断 cart 中有没有 id 一样的数据
    // some 方法
    const flag = cart.some(item => item.goods_id === id)
    // 如果没有, 那么我就 push 进去
    if (flag) {
      // cart 里, 面 id 一样的这一条里面的 cart_number ++
      // 4-4. 如果有这个数据拿到这个信息
      // filter 方法返回的是一个数组
      const cart_goods = cart.filter(item => item.goods_id === id)[0]
      cart_goods.cart_number = cart_goods.cart_number - 0 + ($('.cartNum').val() - 0)
    } else {
      info.cart_number = 1
      // 表示没有
      cart.push(info)
    }

    // 4-5. 添加完毕还要存储到 localStorage 里面
    window.localStorage.setItem('cart', JSON.stringify(cart))
  })

  // 5. ++ -- 的事件
  // $('.goodsInfo')
  //   .on('click', '.subNum', function () {
  //     // 拿到 input 的 value 值
  //     let num = $('.cartNum').val() - 0
  //     // 进行判断, 如果当前是 1, 那么什么都不做
  //     if (num === 1) return
  //     // 否则就进行 -- 操作, 然后在设置回去
  //     $('.cartNum').val(num - 1)
  //   })
  //   .on('click', '.addNum', function () {
  //     // 拿到 input 的 value 值
  //     let num = $('.cartNum').val() - 0
  //     // 否则就进行 -- 操作, 然后在设置回去
  //     $('.cartNum').val(num + 1)
  //   })
})


class Fang {
  constructor (ele) {
      // 获取元素
      this.ele = document.querySelector(ele)
      console.log(this.ele)
      // 获取img盒子
      this.imgBox = this.ele.querySelector('.showImg')
      console.log(this.imgBox)
      // 获取mask
      this.mask = this.ele.querySelector('.mask')
      console.log(this.mask)
      // 获取min盒子
      // this.minBox = this.ele.querySelector('.min')
      // console.log(this.minBox)
      // 获取daBox
      this.big= this.ele.querySelector('.bigBox')
      console.log(this.big)
      // 获取图片盒子大小
      this.imgBox_width = this.imgBox.clientWidth
      this.imgBox_height = this.imgBox.clientHeight
      // console.log(this.imgBox_width)
      // console.log(this.imgBox_height)
      // 获取背景图大小
      this.big_width = parseInt(window.getComputedStyle(this.big).width)
      // console.log(this.big_width)
      this.big_height = parseInt(window.getComputedStyle(this.big).height)
      // console.log(this.big_height)
      // 获取背景图大小
      this.bg_sizeX = parseInt(window.getComputedStyle(this.big).backgroundSize.split(' ')[0])
      // console.log(this.bg_sizeX)
      this.bg_sizeY = parseInt(window.getComputedStyle(this.big).backgroundSize.split(' ')[1])
      // console.log(this.bg_sizeY)

      this.mask_width = this.imgBox_width * this.big_width / this.bg_sizeX
      // console.log(this.mask_width)
      this.mask_height = this.imgBox_height * this.big_height / this.bg_sizeY
      // console.log(this.mask_height)
      // 执行
      this.init()
      this.overOut()
      this.move()
      // this.qie()
  }
  // 入口
  init(){
      this.maskDA()
  }
  // 调整mask的大小
  maskDA(){
      this.mask_width = this.imgBox_width * this.big_width / this.bg_sizeX
      // console.log(this.mask_width)
      this.mask_height = this.imgBox_height * this.big_height / this.bg_sizeY
      // console.log(this.mask_height)
      // 进行复制
      this.mask.style.width = this.mask_width + 'px'
      this.mask.style.height = this.mask_height + 'px'
      // console.log(this.mask.style.height)
  }

  // 移入移出
  overOut() {
      this.imgBox.addEventListener('mouseover',() => {
          this.mask.style.display = 'block'
          this.big.style.display = 'block'
      })
      this.imgBox.addEventListener('mouseout',() => {
          this.mask.style.display = 'none'
          this.big.style.display = 'none'
      })
  }

  // 移动
  move(){
      this.imgBox.addEventListener('mousemove' , e => {
          e = e || window.event 
          // 获取坐标
          let x = e.offsetX - this.mask_width / 2
          let y = e.offsetY - this.mask_height / 2
          // 判断条件 不让出街
          if(x <= 0)x = 0
          if(y <= 0)y = 0
          if(x >= this.imgBox_width - this.mask_width) x = this.imgBox_width - this.mask_width
          if(y >= this.imgBox_width - this.mask_width) y = this.imgBox_width - this.mask_width
          // 进行复制
          this.mask.style.left = x + 'px'
          this.mask.style.top =  y + 'px'
          // 背景图盒子的尺寸 * 移动距离 / 遮罩盒子的尺寸 = 背景图移动的尺寸
          let bg_width = this.imgBox_width * x / this.mask_width
          let bg_height = this.imgBox_height * y / this.mask_height
          // 赋值
          this.big.style.backgroundPosition = `-${bg_width}px   -${bg_height}px`
      })
  }

  // 点击切换
  // qie(){
  //     this.minBox.addEventListener('click', e => {
  //         e = e || window.event
  //         const target = e.target || e.srcElement
  //         if(target.nodeName === 'IMG'){
  //             // console.log('img')
  //             const u = target.getAttribute('u')
  //             const i = target.getAttribute('i')
  //             // 赋值
  //             this.imgBox.firstElementChild.src = u
  //             this.big.style.backgroundImage =   `url( ${i})`
  //             // console.log
  //         } 
  //         for(let i = 0; i < this.minBox.children.length; i++){
  //             this.minBox.children[i].classList.remove('aaa')
  //         }
  //         target.parentElement.classList.add('aaa')
  //     })
  // }
}