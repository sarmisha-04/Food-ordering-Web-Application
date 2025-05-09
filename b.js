console.log("JavaScript file loaded!");

const btncart = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const btnclose = document.querySelector('#cart-close');

btncart.addEventListener('click', () => {
    cart.classList.add("cart-active");
});

btnclose.addEventListener('click', () => {
    cart.classList.remove("cart-active");
});

document.addEventListener('DOMContentLoaded', loadFood);

function loadFood() {
    loadContent();
}

function loadContent() {
    // Remove food item from cart
    let btnremove = document.querySelectorAll('.cart-remove');
    btnremove.forEach((btn) => {
        btn.addEventListener('click', removeItem);
    });

    // Product item change event (change quantity)
    let qtyelements = document.querySelectorAll('.cart-quantity');
    qtyelements.forEach((input) => {
        input.addEventListener('change', changeQuantity);
    });

    // Product cart (add to cart)
    let btnaddcart = document.querySelectorAll('.add-cart');
    btnaddcart.forEach((btn) => {
        btn.addEventListener('click', addToCart);
    });

    updateTotal();
}

// Remove element from cart
function removeItem() {
    if (confirm('Are you sure you want to remove this item?')) {
        let title = this.parentElement.querySelector('.cart-food-title').innerText;
        // Remove item from itemlist array
        itemList = itemList.filter((elem) => elem.title !== title);
        this.parentElement.remove();
        updateTotal();
    }
}

// Change quantity
function changeQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    updateTotal();
}

let itemList = [];

// Add to cart
function addToCart() {
    let food = this.parentElement;
    let title = food.querySelector('.food-title').innerText;
    let price = food.querySelector('.food-price').innerText;
    let imgsrc = food.querySelector('.food-img').src;

    let newProduct = { title, price, imgsrc };

    // Check if product already exists in the cart
    if (itemList.find((elem) => elem.title === newProduct.title)) {
        alert("Product already added to the cart");
        return;
    } else {
        itemList.push(newProduct);
    }

    let newProductElement = createCartProduct(title, price, imgsrc);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;
    let cartBasket = document.querySelector('.cart-content');
    cartBasket.append(element);
    updateTotal();
}

function createCartProduct(title, price, imgsrc) {
    return `
    <div class="cart-box">
        <img src="${imgsrc}" class="cart-img">
        <div class="detail-box">
            <div class="cart-food-title">${title}</div>
            <div class="price-box">
                <div class="cart-price">${price}</div>
                <div class="cart-amt">${price}</div>
            </div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <ion-icon name="trash" class="cart-remove"></ion-icon>
    </div>
    `;
}

function updateTotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');

    let total = 0;
    cartItems.forEach(product => {
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("Rs.", "").trim());
        let quantity = product.querySelector('.cart-quantity').value;
        total += (price * quantity);
        product.querySelector('.cart-amt').innerText = "Rs. " + (price * quantity);
    });

    totalValue.innerHTML = 'Rs. ' + total;

    // Product count
    const cartCount = document.querySelector('.cart-count');
    let count = cartItems.length;
    cartCount.innerHTML = count;
    if (count === 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'block';
    }
}
