import {cart, addToCart} from '../data/cart.js';  // import * as cartModule from '../data/cart.js';  // this enables us to use as cartModule.cart
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';


updateCartQuantity();
// 12:42

let productsHTML = '';
products.forEach(product => {
    const html = `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">
                ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${formatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
                <select class="js-product-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="js-add-to-chart add-to-cart-button button-primary" data-product-name="${product.name}" data-product-id ="${product.id}">
                Add to Cart
            </button>
            </div>
    </div>
    `;
    productsHTML += html;
})
document.querySelector('.js-products-grid').innerHTML = productsHTML;


function updateCartQuantity() {
    // calculate total quantity of products in the cart
    let cartQuantity = 0;
    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
    })
    // show cart quantity on the website
    document.querySelector('.js-cart-quantity').textContent = cartQuantity;
};

// make the add to chart button interactive.
let timeoutID;
document.querySelectorAll('.js-add-to-chart').forEach(button => {
    button.addEventListener('click', () => {
        clearAddToCartPupUps();
        // get product id and quantity-selected of which button is clicked
        // const productName = button.getAttribute('data-product-name');  // using .dataset returns list of all dataset of an element but getAttribute returns just a specific value of which classname is selected.
        
        const productId = button.dataset.productId;
        const productQuantity = Number(document.querySelector(`.js-product-quantity-selector-${productId}`).value);
        // console.log(productQuantity);
        
        addToCart(productId,  productQuantity)
        updateCartQuantity()

        // show added-to-cart popup
        let addedToCartElem = document.querySelector(`.js-added-to-cart-${productId}`);
        if (timeoutID){
            clearTimeout(timeoutID);
        }
        addedToCartElem.classList.add('show-added-to-cart-popup');
        
        timeoutID = setTimeout(() => {
            addedToCartElem.classList.remove('show-added-to-cart-popup')
        }, 800);
        // console.log(cartQuantity);
    });
});

function clearAddToCartPupUps() {
    document.querySelectorAll('.js-added-to-cart').forEach(pupUp => {
        pupUp.classList.remove('show-added-to-cart-popup');
    })
}
    

