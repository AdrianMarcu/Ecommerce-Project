//update nav-cart
function updateCartInfo(cart) {
	let cartInfo = 0;
	cart.forEach((product) => {
		cartInfo = cartInfo + product.noOfProducts;
	});
	document.querySelector('.cart-info').innerHTML = cartInfo;
}
//get cart
window.addEventListener('load', () => {
	const cart = JSON.parse(localStorage.getItem('cart'));
	//total price
	let total = 0;
	if (cart) {
		cart.forEach((product) => {
			total = total + Number(product.price) * product.noOfProducts;
		});

		//cards
		const productsCards = cart
			.map(
				(product) =>
				`<div class="card w-75 mt-4 mx-auto">
              <div class="card-body mx-auto">
			  <img class="card-img img-fluid" style="width:400px;" src="${product.image}" alt="Product Image"/>
               <h6 class="card-title text-center mt-2">${product.name}</h6>
              <p class="card-text text-center fs-5">${product.price} €</p>
              <p class="card-text text-center">Quantity:
			  <button data-product-id=${product.id} class="remove-products cart-btn"> - </button>
		    <span class="cart-products"> ${product.noOfProducts}</span>
			<button data-product-id=${product.id} class="add-products cart-btn"> + </button>
			</p>
        </div>
		<button type=button data-product-id=${product.id} class="empty-cart"> EMPTY CART </button>
        </div>`
			)
			.join('');

		let totalPriceCard = `<div class="total-price">TOTAL: ${total} €</div>`;
		document.querySelector('.cart-container').innerHTML = productsCards;
		document.querySelector('.total-price-container').innerHTML = totalPriceCard;
		updateCartInfo(cart);
	
	}
	
});

// increment and decrement buttons
const cartContainer = document.querySelector('.cart-container');
cartContainer.addEventListener('click', handleCartEvents);

function handleCartEvents(event) {
	const targetButton = event.target;
	let cart = JSON.parse(localStorage.getItem('cart'));

	const productInCart = cart.find(
		(productFromCart) =>
			productFromCart.id == targetButton.getAttribute('data-product-id')
	);

	let quantityParagraph = targetButton.parentNode;

	if (targetButton.classList.contains('remove-products')) {
		if (productInCart.noOfProducts > 0) productInCart.noOfProducts--;
		updateCartInfo(cart);
	} else if (targetButton.classList.contains('add-products')) {
		productInCart.noOfProducts++;
		updateCartInfo(cart);
	} else if (targetButton.classList.contains('empty-cart')) {
		productInCart.noOfProducts = 0;
		cart = cart.filter((product) => product.id != productInCart.id);
		targetButton.parentNode.remove();
		updateCartInfo(cart);
	}

	localStorage.setItem('cart', JSON.stringify(cart));
	if (productInCart) {
		quantityParagraph.querySelector('.cart-products').innerHTML =
			productInCart.noOfProducts;
		let total = 0;
		cart.forEach((product) => {
			total = total + Number(product.price) * product.noOfProducts;
		});
		let totalPriceCard = `<div class="total-price">TOTAL: ${total} €</div>`;
		document.querySelector('.total-price-container').innerHTML = totalPriceCard;
	}
	//hide price, display empty banner
	if (cart.length <= 0) {
		localStorage.removeItem('cart', JSON.stringify(cart));
		let removeBanner = document.querySelector('.hide-containers');
		let removeTotalPrice = document.querySelector('.total-price-container');
		removeTotalPrice.classList.add('hide-containers');
		removeBanner.classList.remove('hide-containers');
	}
	
}

