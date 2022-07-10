
let resultsContainer = document.querySelector('.products-container');


async function searchResults(event) {
	event.preventDefault();
	let value = event.target.value;
	const searchURL = 'https://62bb213b7bdbe01d52983148.mockapi.io/Front';
	const result = await fetch(searchURL);
	const productsResult = await result.json();


	if (value && value.trim().length > 0){
		value = value.trim().toUpperCase()
	}
		
	let filterProducts = productsResult.filter((product) =>
	product.name.includes(value)
	)
	  const cardsSearch = filterProducts.map (
		(product) => 
			`<div class="col-lg-3 col-md-4 col-sm-6 col-12">
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
		</div>`
	
	)
	.join('');

    resultsContainer.innerHTML = cardsSearch;
}

export default searchResults;
