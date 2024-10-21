// export let cart = JSON.parse(localStorage.getItem('cart')) || [
export let cart = JSON.parse(localStorage.getItem('cart')) || [
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
    },
    {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
    }
]

function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, productQuantity){
    /* add product to chart */

    // check if product in chart already so as to increase it quantity
    let isExistProduct;
    cart.forEach(cartItem => {
        if (productId === cartItem.productId){
            isExistProduct = cartItem;
        };
    });
    
    if (isExistProduct){
        isExistProduct.quantity += productQuantity;
    }else{
        cart.push({
            productId,
            quantity: productQuantity,
            deliveryOptionId: '1'
        });
    }; 
    
    saveToStorage();
};

export function removeFromCart(productId) {
    let newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem)
        };
    });

    cart = newCart;

    saveToStorage();
};

export function updateQuantity(productId, newQuantity){
    cart.forEach(cartItem => {
        // if cartProductId is = to productID (param) and the newquantity is grater than 0 and as well less than 100
        if (cartItem.productId === productId && newQuantity > 0 && newQuantity < 1000){
            cartItem.quantity = Number(newQuantity);
            document.querySelector(`.js-quantity-label-${productId}`).textContent = newQuantity;
            saveToStorage();
        };
    });
};

export function updateDeliveryOption(productId, newDeliveryOptionID) {
    let isExistProduct;

    cart.forEach(cartItem => {
        if (productId === cartItem.productId){
            isExistProduct = cartItem;
        };
    });

    isExistProduct.deliveryOptionId = newDeliveryOptionID;

    saveToStorage();
}

