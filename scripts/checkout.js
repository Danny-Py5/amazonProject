import {removeFromCart, updateQuantity, cart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formartCurrency } from './utils/money.js';
import {deliveryOptions} from '../data/delivery-options.js';




 updateCheckoutText();


let cartSummaryHTML = '';

cart.forEach((cartItem) => {
    const { productId } = cartItem;

    let matchingProduct;
    products.forEach((product) =>{
        if (product.id === productId){
            matchingProduct = product;
        };
    });
    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src="${ matchingProduct.image}">

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingProduct.name}
            </div>
            <div class="product-price">
                $${formartCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
                <span>
                Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link  link-primary" data-product-id="${matchingProduct.id}">
                Update
                </span> 
                <input class="quantity-input js-quantity-input-${matchingProduct.id}"> 
                <span class="save-quantity-link js-save js-save-quantity-link-${matchingProduct.id} link-primary" data-product-id="${matchingProduct.id}">Save</span>
                <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${matchingProduct.id}">
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    `;
});


// function deliveryOptionsHTML(){
//     deliveryOptions.forEach(deliveryOption, () => {
//         const today = dayjs();
//         const deliveryDate = today;
//     });
//     `
//     <div class="delivery-option">
//         <input type="radio"
//         class="delivery-option-input"
//         name="delivery-option-${matchingProduct.id}">
//         <div>
//         <div class="delivery-option-date">
//             Monday, June 13
//         </div>
//         <div class="delivery-option-price">
//             $9.99 - Shipping
//         </div>
//         </div>
//     </div>
//     `
// }

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
// console.log(cartSummaryHTML)


document.querySelectorAll('.js-delete-quantity-link').forEach(link => {
    link.addEventListener('click', () => {
        // console.log('delete')

        const productId = link.dataset.productId;
        removeFromCart(productId);
        const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        cartContainer.remove();
        updateCheckoutText();
    });
});
// for all the update links
document.querySelectorAll('.update-quantity-link').forEach(link => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        document.querySelector(`.js-quantity-input-${productId}`).classList.add('is-edditing-quantity');
        document.querySelector(`.js-save-quantity-link-${productId}`).classList.add('is-edditing-quantity');
    });
});

// for all the save link
document.querySelectorAll('.js-save').forEach(link => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        const newQuantity = document.querySelector(`.js-quantity-input-${productId}`).value;
        // update the quantity in the cart
        updateQuantity(productId, newQuantity);
        // update the quantity on the page
        updateCheckoutText();
        // empty the input element
        document.querySelector(`.js-quantity-input-${productId}`).value = '';
        // hide the input element and save button
        document.querySelector(`.js-quantity-input-${productId}`).classList.remove('is-edditing-quantity');
        document.querySelector(`.js-save-quantity-link-${productId}`).classList.remove('is-edditing-quantity');
    });
});

// hoisting helps. 
function updateCheckoutText () {
    let cartQuantity = 0;
    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
    });
    let returnToHomeLinkElement = document.querySelector('.js-return-to-home-link');
    returnToHomeLinkElement.textContent = cartQuantity > 0 ? String(cartQuantity) + (cartQuantity > 1 ? ' Items' : ' Item' ) : 'No Item(s)';
};



