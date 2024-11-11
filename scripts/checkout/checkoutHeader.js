import {cart, getCartQuantity} from '../../data/cart.js';


export function renderChekoutHeader() {
    const cartQuantity = getCartQuantity();
    let returnToHomeLinkElement = document.querySelector('.js-return-to-home-link');
    if (returnToHomeLinkElement){
        returnToHomeLinkElement.textContent = cartQuantity > 0 ? String(cartQuantity) + (cartQuantity > 1 ? ' Items' : ' Item' ) : 'No Item(s)';
    }
};

