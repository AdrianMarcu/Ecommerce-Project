//product description
window.addEventListener('load', async () => {
	let searchParamString = window.location.search;

	const searchParam = new URLSearchParams(searchParamString);
	const productId = searchParam.get('product-id');

	const productsURL = `https://62bb213b7bdbe01d52983148.mockapi.io/Front/${productId}`;
	const result = await fetch(productsURL);
	const product = await result.json();

	const productCard = `
				<div class="card-body">
					<div class="row">
						<div class="col-md-4">
							<img class="card-img img-fluid" src="${product.image}" alt="Product Image">                                    
						</div>
						<div class="col-md-8 d-inline-flex justify-content-center flex-column">
							<h1 class="card-title">${product.name}</h5>
							<h3 class="card-text price">${product.price} €</h3>
							<p>${product.description}</p>
							<div class="buttons">
								<button data-product-id="${product.id}" class="btn btn-primary">Add to cart</button>
							</div>
						</div>
					</div>
				</div>`;

	document.querySelector('.product-details').innerHTML = productCard;
});

//add to cart
document.querySelector('.product-details').addEventListener('click', addToCart);
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
	if (cart.length > 0)localStorage.setItem('cart', JSON.stringify(cart));

	//update cart
	function updateCartInfo(cart) {
		let cartInfo = 0;
		cart.forEach((product) => {
			cartInfo = cartInfo + product.noOfProducts;
		});
		document.querySelector('.cart-info').innerHTML = cartInfo;
	}

}
