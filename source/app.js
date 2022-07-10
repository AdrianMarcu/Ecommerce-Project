import searchResults from '/source/search.js';
let searchInput = document.getElementById('search-bar');
searchInput.addEventListener('change', searchResults);

//get all products
window.addEventListener('load', async () => {
	const productsURL = 'https://62bb213b7bdbe01d52983148.mockapi.io/Front';
	const result = await fetch(productsURL);
	const products = await result.json();

	const productsContainer = document.querySelector('.products-container');

	const cards = products
		.map(
			(product) =>
				`
			<div class="col-lg-3 col-md-4 col-sm-6 col-12">
				<div class="card">
                 	<div class="card-body">
						<div class="card-img"><img class="img-fluid" src="${product.image}" alt="Product Image"/></div>
						<h1 class="card-title text-center">${product.name}</h5>
						<h3 class="card-text price text-center">${product.price} €</p>
						<div class="buttons">
							<a href="details.html?product-id=${product.id}" class="btn btn-secondary"  role="button">Details</a>
							<button data-product-id=${product.id} class="btn btn-primary">Add to cart</button>
						</div>
			   		</div>
            	</div>
			</div>
			`
		)
		.join('');
	if (cards.length > 0 && productsContainer) {
		productsContainer.innerHTML = cards;
	}
});

//add to cart
if (document.querySelector('.products-container')) {
	document.querySelector('.products-container').addEventListener('click', addToCart);
	async function addToCart(event) {
		const addToCartBtn = event.target;
		let productId = addToCartBtn.getAttribute('data-product-id');

		const productsURL = `https://62bb213b7bdbe01d52983148.mockapi.io/Front/${productId}`;
		const result = await fetch(productsURL);
		const product = await result.json();

		let cart = [];
		if (localStorage.getItem('cart') == null) {
			cart = [{ ...product, noOfProducts: 1 }];
			updateCartInfo(cart);
		} else {
			cart = JSON.parse(localStorage.getItem('cart'));
			const productInCart = cart.find(
				(productFromCart) => productFromCart.id == product.id
			);
			if (productInCart != undefined) {
				productInCart.noOfProducts++;
				updateCartInfo(cart);
			} else {
				const productToBeAddedInCart = { ...product, noOfProducts: 1 };
				cart.push(productToBeAddedInCart);
				updateCartInfo(cart);
			}
		}
		if (cart.length > 0) localStorage.setItem('cart', JSON.stringify(cart));

		//update nav-cart
		function updateCartInfo(cart) {
			let cartInfo = 0;
			cart.forEach((product) => {
				cartInfo = cartInfo + product.noOfProducts;
			});
			document.querySelector('.cart-info').innerHTML = cartInfo;
		}
	}
}

//Update the number of products in the cart on page load
document.addEventListener('DOMContentLoaded', () => {
	console.log('DOMContentLoaded fired')
	if (localStorage.getItem('cart')) {
		const cart = JSON.parse(localStorage.getItem('cart'));
		let noOfProducts = 0;
		console.log(cart)
		for (let i = 0; i < cart.length; i++) {
			noOfProducts += cart[i].noOfProducts;
		}
		if (noOfProducts > 0) document.querySelector('.cart-info').innerHTML = noOfProducts;
	}
});

