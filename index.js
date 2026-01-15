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
    const button = e.target.closest('.add_button')

    if (button) {
        const id = Number(button.dataset.id)
        const item = menuArray.find(item => item.id === id)
        order.push(item)
        renderOrder()
    }
})

let order = []

  
function renderOrder() {
    console.log('renderOrder called', order.length)
    const orderContainer = document.getElementById('order-container')
    const orderItems = document.getElementById('order-items')

    console.log(order)

    console.log(orderContainer)


    if (order.length > 0) {
        orderContainer.classList.remove('hidden')
    } else {
        orderContainer.classList.add('hidden')
        return
    }

    orderItems.innerHTML = order.map(item => {
        return `
            <div class="order_element">
                <p>${item.name}</p>
                <p>$${item.price}</p>
            </div>
        `
    }).join('')
}
