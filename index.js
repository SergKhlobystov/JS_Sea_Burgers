import { menuArray } from './data.js';

// 1. Знаходимо контейнер
const menuContainer = document.getElementById('menu-container');

// 2. Генеруємо HTML з картинками
const menuHtml = menuArray.map(item => {
    return `
    <div class="card">
        <div class="card_wrapper">
            <img src="images/${item.image}" alt="${item.name}" class="card_img">
            
            <div class="product_text">
                <h3 class="product_name">${item.name}</h3>
                <p class="product_ingredients">${item.ingredients.join(', ')}</p>
                <h4 class="product_price">$${item.price}</h4>
            </div>
            
            <button data-id="${item.id}" class="add_button">
                <img src="images/plus.png" alt="add to cart">
            </button>
        </div>
    </div>
    <hr>
    `
}).join('');


menuContainer.innerHTML = menuHtml;


document.addEventListener('click', function (e) {

    const addBtn = e.target.closest('.add_button')
    if (addBtn) {
        const id = Number(addBtn.dataset.id)
        const item = menuArray.find(item => item.id === id)

        const existingItem = order.find(orderItem => orderItem.id === item.id)

        if (existingItem) {
            existingItem.qty += 1
        } else {
            order.push({ ...item, qty: 1 })
        }

        renderOrder()
    }

    const removeBtn = e.target.closest('.remove-btn')
        if (removeBtn) {
            const id = Number(removeBtn.dataset.id)
            const item = order.find(orderItem => orderItem.id === id)

            if (item) {
                item.qty -= 1
            }

            if (item.qty === 0) {
                order = order.filter(orderItem => orderItem.id !== id)
            }

            renderOrder()
}


})



let order = []

const completeOrderBtn = document.getElementById('complete_order')
const checkoutWindow = document.getElementById('checkout-window')
const payBtn = document.getElementById('pay_button')
const nameInput = document.getElementById('name_input')

completeOrderBtn.addEventListener('click', function () {
    checkoutWindow.classList.remove('hidden')
})

document.addEventListener('click', function (e) {
  // якщо форма ВІДКРИТА
  if (!checkoutWindow.classList.contains('hidden')) {
    // і якщо клік НЕ всередині форми
    if (!checkoutWindow.contains(e.target) &&
        !e.target.closest('#complete_order')) {
      checkoutWindow.classList.add('hidden')
    }
  }
})


  
function renderOrder() {
    console.log('renderOrder called', order.length)
    const orderContainer = document.getElementById('order-container')
    const orderItems = document.getElementById('order-items')

    console.log(order)

    console.log(orderContainer)

    const total_price = document.getElementById('total_price_pay')
    total_price.innerHTML = `$${order.reduce((sum, item) => sum + item.price * item.qty, 0)}`
    total_price.classList.add('product_price')
    total_price.classList.add('strong_bold')


    if (order.length > 0) {
        orderContainer.classList.remove('hidden')
    } else {
        orderContainer.classList.add('hidden')
        return
    }

    orderItems.innerHTML = order.map(item => {
        return `
            <div class="order_element">
                <p class="product_name" >${item.name} <span class="product_ingredients" >x${item.qty}</span><button class="remove-btn" data-id="${item.id}">remove</button></p>
                <p class="product_price" >$${item.price * item.qty}</p>
            </div>
        `
    }).join('')

    console.log(order)
}

const thanksMessage = document.getElementById('thanks_message')

payBtn.addEventListener('click', function (e) {
  e.preventDefault()

  const customerName = nameInput.value
  if (!customerName) return

  // 1. Ховаємо форму
  checkoutWindow.classList.add('hidden')

  // 2. Ховаємо order
  order = []
  renderOrder()

  // 3. Робимо іменну подяку
  thanksMessage.innerHTML = `<div class="thanks-window" ><p>Thanks, ${customerName}! Your order is on its way!</p></div>`

  })


