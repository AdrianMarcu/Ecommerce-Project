window.addEventListener('load', async () => {
	let searchParamString = window.location.search;

	const searchParam = new URLSearchParams(searchParamString);
	const productId = searchParam.get('product-id');

	const productsURL = 'https://61e546dc595afe00176e5480.mockapi.io/Products/${productId}';
	const result = await fetch(productsURL);
	const product = await result.json();

	const productCard = `
				<div class="card mt-4 card-details">
				<div class="card-body">
                <img class="rounded mx-auto d-block img-details p-4" src="${product.image}" alt="Product Image"/>
	  			<h5 class="card-title text-center">${product.name}</h5>
                <p class="card-text text-center">${product.price} €</p>
	  			<p class="card-text text-center">${product.description}</p>
				<p class="card-text text-center"><i class="far fa-credit-card"></i> Secure payment</p>
			    <p class="card-text text-center me-4"><i class="fas fa-shuttle-van"></i> Fast delivery</p>
			    <p class="card-text text-center"><i class="fas fa-exchange-alt"></i> Return possible</p>
	  			<button data-product-id=${product.id} class="main-btn">Add to cart</button>
			</div>
 		</div>`;

	document.querySelector('.product-details').innerHTML = productCard;
});

document.querySelector('.product-details').addEventListener('click', addToCart);
async function addToCart(event) {
	const addToCartBtn = event.target;
	let productId = addToCartBtn.getAttribute('data-product-id');

	const productsURL = `https://61e546dc595afe00176e5480.mockapi.io/Products/${productId}`;
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
	if (cart.length > 0)localStorage.setItem('cart', JSON.stringify(cart));

	function updateCartInfo(cart) {
		let cartInfo = 0;
		cart.forEach((product) => {
			cartInfo = cartInfo + product.noOfProducts;
		});
		document.querySelector('.cart-info').innerHTML = cartInfo;
	}

}
