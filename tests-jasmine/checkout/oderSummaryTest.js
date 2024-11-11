import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import {loadFromstorage, updateQuantity} from '../../data/cart.js';

describe('Integration Test: renderOrderSummary', () => {
    it('Should render the order summary', () => {
        spyOn(localStorage, 'setItem');

        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });
        loadFromstorage();

        document.querySelector('.js-test-container').innerHTML = '<div class="js-order-summary"></div>'
        renderOrderSummary(); 
        expect(document.querySelectorAll('.cart-item-container-test').length).toEqual(2)
        expect(document.querySelector(`.js-quantity-label-test-${productId1}`).textContent).toEqual('2');
        // or use toContain to check for string
        expect(document.querySelectorAll('.product-quantity')[0].innerText).toContain('Quantity: 2')
    });

    it('Should delete an item correctly and remain 1', () => {
        spyOn(localStorage, 'setItem');

        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });
        loadFromstorage();

        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div> 
        <div class="js-payment-summary"></div>
        `;
        renderOrderSummary(); 
        document.querySelectorAll('.js-delete-quantity-link')[0].click();
        expect(document.querySelectorAll('.cart-item-container-test').length).toEqual(1)

        // console.log(document.querySelector(`.js-cart-item-container-${productId1}`));
        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);
        console.log(expect(document.querySelector(`.js-cart-item-container-${productId2}`).id))

        console.log(document.querySelector(`.js-cart-item-container-${productId2}`));
    });

    it('updates the cart quantity correctly', () => {
        spyOn(localStorage, 'setItem');

        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([
                {
                    productId: productId1,
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                }
            ]);
        });
        loadFromstorage();

        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-order-summary"></div> 
        <div class="js-payment-summary"></div>
        `;
        renderOrderSummary(); 
        document.querySelector(`.js-update-quantity-link-${productId1}`).click();
        document.querySelector(`.js-quantity-input-${productId1}`).value = '9';
        document.querySelector(`.js-save-quantity-link-${productId1}`).click();
        updateQuantity(productId1, '9');
       
        expect(document.querySelector(`.js-quantity-label-test-${productId1}`).innerText).toEqual('9');
    });
})

