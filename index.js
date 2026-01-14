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
            
            <button class="add_button">
                <img src="images/plus.png" alt="add to cart">
            </button>
        </div>
    </div>
    <hr>
    `
}).join('');

// 3. Вставляємо на сторінку
menuContainer.innerHTML = menuHtml;