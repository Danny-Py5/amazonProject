import {removeFromCart, updateQuantity, cart, updateDeliveryOption} from '../../data/cart.js';
import { products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import {deliveryOptions, getDeliveryOption} from '../../data/delivery-options.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import renderPaymentSummary from './paymentSummary.js';
import {renderChekoutHeader} from './checkoutHeader.js'



 export function renderOrderSummary() {

    renderChekoutHeader();

    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const { productId } = cartItem;

        const matchingProduct = getProduct(productId);
        
        const {deliveryOptionId} = cartItem;

        const deliveryOption = getDeliveryOption(deliveryOptionId);
        

        // console.log(deliveryOption)
        const dateString = calculateDeliveryDate(deliveryOption);
        

        cartSummaryHTML += `
        <div class="cart-item-container cart-item-container-test js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${ matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                        <span>
                        Quantity: <span class="quantity-label js-quantity-label-test-${matchingProduct.id} js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link js-update-quantity-link-${matchingProduct.id} link-primary" data-product-id="${matchingProduct.id}">
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
                    ${deliveryOptionHTML(matchingProduct.id, cartItem.deliveryOptionId)}
                </div>
            </div>
        </div>
        `;
    });

    function calculateDeliveryDate(deliveryOption){
        const today = dayjs();
        const deliveryDate = today.add(
            deliveryOption.deliveryDays, 'days'
        );
        const dateString = deliveryDate.format(
            'dddd, MMMM D'
        );
        return dateString;
    };


    function deliveryOptionHTML(matchingProductID, cartItem) {
        let html = '';

        deliveryOptions.forEach(deliveryOption => {
            const dateString = calculateDeliveryDate(deliveryOption);
            const princeString = deliveryOption.priceCents === 0 
            ? 'FREE' 
            : `$${formatCurrency(deliveryOption.priceCents)} -`
            
            const isChecked = deliveryOption.id === cartItem;
            html += `
                <div class="delivery-option js-delivery-option" 
                    data-product-id="${matchingProductID}"      
                    data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProductID}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${princeString} Shopping
                    </div>
                    </div>
                </div>
            `;
        });
        return html;
    };


    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    // console.log(cartSummaryHTML)


    document.querySelectorAll('.js-delete-quantity-link').forEach(link => {
        link.addEventListener('click', () => {
            // console.log('delete')

            const productId = link.dataset.productId;
            removeFromCart(productId);
            const cartContainer = document.querySelector(`.js-cart-item-container-${productId}`);
            cartContainer.remove();
            renderChekoutHeader();
            reRenderPage();
        });
    });
    // for all the update links
    let updateLink;
    let quantityLable;
    document.querySelectorAll('.update-quantity-link').forEach(link => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            document.querySelector(`.js-quantity-input-${productId}`).classList.add('is-edditing-quantity');
            document.querySelector(`.js-save-quantity-link-${productId}`).classList.add('is-edditing-quantity');
            updateLink = link;
            quantityLable = document.querySelector(`.js-quantity-label-${productId}`);
            // hide the quantity label and the update link
            link.style.display = 'none';
            document.querySelector(`.js-quantity-label-${productId}`).style.display = 'none'
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
            renderChekoutHeader();
            // empty the input element
            document.querySelector(`.js-quantity-input-${productId}`).value = '';
            // hide the input element and save button
            document.querySelector(`.js-quantity-input-${productId}`).classList.remove('is-edditing-quantity');
            document.querySelector(`.js-save-quantity-link-${productId}`).classList.remove('is-edditing-quantity');
            updateLink ? updateLink.style.display = 'inline' : ''
            quantityLable ? quantityLable.style.display = 'inline' : ''
            // console.log(updateLink)
            reRenderPage();
        });
    });

    // console.log(document.querySelectorAll('.js-delivery-option'));
    document.querySelectorAll('.js-delivery-option')
        .forEach(element => {
            element.addEventListener('click', () => {
                const {productId, deliveryOptionId} = element.dataset;
                // console.log(productId, deliveryOptionId)
                updateDeliveryOption(productId, deliveryOptionId);
                reRenderPage();
            });
    });

    function reRenderPage(){
        renderOrderSummary();
        renderPaymentSummary();
    }
};
