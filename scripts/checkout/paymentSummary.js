import { cart, getCartQuantity} from "../../data/cart.js"
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/delivery-options.js";
import { formatCurrency } from "../utils/money.js";

export default function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCent = 0;

    cart.forEach(cartItem => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        const deliveryOption =  getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCent += deliveryOption.priceCents;
        
    });

    const totalBeforeTaxtCents = productPriceCents + shippingPriceCent;
    const taxCents = totalBeforeTaxtCents * 0.1;
    const totalCents = totalBeforeTaxtCents + taxCents;

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>${getCartQuantity() > 1 ? 'Items' : 'Item'} (${getCartQuantity()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCent)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxtCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>`
        ;

    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
};