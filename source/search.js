let searchInput = document.getElementsByClassName('.form-control me-sm-2');
let resultsContainer = document.querySelector('.products-container');
searchInput.addEventListener('input', searchResults);

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
			`<div class="card">
			 <div class="card-body">
			 <img class="card-img-top img-fluid" src="${product.image}" alt="Product Image"/>
			  <h5 class="card-title d-flex justify-content-center" style= "font-size: 1rem;">${product.name}</h5>
			  <p class="card-text price">${product.price} €</p>
			  <div class="buttons">
			  <a href="details.html?product-id=${product.id}" class="main-btn btn-responsive"  role="button">Details</a>
			  <button data-product-id=${product.id} class="main-btn btn-responsive">Add to cart</button>
		   </div>
		    </div>
		    </div>`
	
	)
	.join('');

    resultsContainer.innerHTML = cardsSearch;
}

export default searchResults;
