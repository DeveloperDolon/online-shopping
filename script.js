
// set purchase button and coupon apply button disable by default
document.querySelector("#purchase-btn").setAttribute("disabled", "true");
document.querySelector("#coupon-apply-btn").setAttribute("disabled", "true");


// click function for all cards
function addToCartFunc(element) {
    const item = element.querySelector("#item-name");

    itemAddToCart(item);

}

const noDiscountTotal = document.querySelector("#without-discount-price");
const discountTotal = document.querySelector("#with-discount-price");
let count = 1;

// function to add all item in the cart and add price to cart
function itemAddToCart(item) {
    const cartItemListContainer = document.querySelector("#items-list");
    const purchaseBtn = document.querySelector("#purchase-btn");
    
    const newItem = document.createElement("div");

    newItem.innerHTML = `
        <p class="font-semibold">${count++}. ${item.textContent}</p>
    `;

    cartItemListContainer.appendChild(newItem);


    let itemPrice = item.nextElementSibling.querySelector("span").textContent;
    
    // storing value from previous price history
    const previousNoDiscountPrice = takeValue(noDiscountTotal);
    const previousDiscountPrice = takeValue(discountTotal);
    itemPrice = parseFloat(parseFloat(itemPrice).toFixed(2));

    // setting the prices to cart
    noDiscountTotal.textContent = (previousNoDiscountPrice + itemPrice).toFixed(2);
    discountTotal.textContent = (previousDiscountPrice + itemPrice).toFixed(2); 

    // all conditions for enable purchese button and apply button
    if((previousNoDiscountPrice + itemPrice) > 0) {

        purchaseBtn.removeAttribute("disabled");
    } else {
        purchaseBtn.setAttribute("disabled", "true");
    }

    if((previousNoDiscountPrice + itemPrice) > 200) {
        document.querySelector("#coupon-apply-btn").removeAttribute("disabled");
    } else {
        document.querySelector("#coupon-apply-btn").setAttribute("disabled", "true");
    }

}

function takeValue(element) {
    const value = parseFloat(parseFloat(element.textContent).toFixed(2));
    return value;
}


// click event for applying coupon 
document.querySelector("#coupon-apply-btn").addEventListener("click", function() {
    const coupon = document.querySelector("#input-coupon").value;
    const discountAmountContainer = document.querySelector("#discount-amount");

    if(coupon === "SELL200") {
        const totalPrice =  takeValue(noDiscountTotal);
        const discountPrice = totalPrice - (totalPrice * 0.20);

        discountAmountContainer.textContent = (totalPrice * 0.20).toFixed(2);
        discountTotal.textContent = discountPrice.toFixed(2);
        document.querySelector("#input-coupon").value = "";
    } else {
        alert("Sorry your coupon is invalid.");
    }
});

// reset all thing 
function resetAll() {
    document.querySelector("#input-coupon").value = "";
    location.reload();
}