const productTableBody = document.querySelector('.admin-products-table');
const btnAddNewProduct = document.querySelector('.add-new-product');
const btnUpdateProduct = document.querySelector('.update-product');

const productsURL = 'https://61e546dc595afe00176e5480.mockapi.io/Products';

//GET
window.addEventListener('load', getAllProducts);

async function getAllProducts() {
	const result = await fetch(productsURL);
	const products = await result.json();

	const tableRows = products
		.map(
			(product) =>
				`<tr class="table-products">
            <th scope="row">${product.id}</th>
			<td><img class="card-img img-fluid" style="width:100px;" src="${product.image}" alt="Product Image"/></td>
            <td >${product.name}</td>
			<td>${product.price}€</td>
			<td>${product.description}</td>
            <td><button class="btn btn-danger delete" data-product-id=${product.id}>X</button></td>
            <td><button class="btn btn-info edit" data-product-id=${product.id}>✎</button></td>
          </tr>`
		)
		.join('');

	productTableBody.innerHTML = tableRows;
}

productTableBody.addEventListener('click', handleAdminPanel);

//DELETE
async function handleAdminPanel(event) {
	const productId = event.target.getAttribute('data-product-id');
	if (event.target.classList.contains('delete')) {
		let response = await fetch(`${productsURL}/${productId}`, {
			method: 'DELETE',
		});
		console.log(response);
		getAllProducts();
	} else if (event.target.classList.contains('edit')) {
		editproductById(productId);
	}
}

btnAddNewProduct.addEventListener('click', addNewProduct);

//POST
async function addNewProduct(event) {
	event.preventDefault();
	const newproductImage = document.getElementById('image').value;
	const newproductName = document.getElementById('name').value;
	const newproductPrice = document.getElementById('price').value;
	const newproductDescription = document.getElementById('description').value;

	let response = await fetch(productsURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			image:newproductImage,
			name: newproductName,
			price: newproductPrice,
			description: newproductDescription,
		}),
	});

	let product = await response.json();
	console.log('newProduct', product);

	let newProductTableRow = `<tr>
	<th scope="row">${product.id}</th>
	<td><img class="card-img-top img-fluid" style="width:250px;" src="${product.image}" alt="Product Image"/></td>
	<td>${product.name}</td>
	<td>${product.price}€</td>
	<td>${product.description}</td>
	<td><button class="btn btn-danger" data-product-id=${product.id}>X</button></td>
	<td><button class="btn btn-info" data-product-id=${product.id}>✎</button></td>
  </tr>`;

	productTableBody.innerHTML += newProductTableRow;
}



btnUpdateProduct.addEventListener('click', updateProduct);

//POST
async function updateProduct(event) {
	event.preventDefault();
	const productImage = document.getElementById('image').value;
	const productName = document.getElementById('name').value;
	const productPrice = document.getElementById('price').value;
	const productDescription = document.getElementById('description').value;
	//value from hidden input
	const productId= document.getElementById('productId').value;
	
	console.log(productId);

	let response = await fetch(`${productsURL}/${productId}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			id:productId,
			image:productImage,
			name: productName,
			price: productPrice,
			description: productDescription,
		}),
	});
	let data = await response.json();
	console.log(data);
	getAllProducts();
}

//EDIT
async function editproductById(productId) {
	const productImageEdit = document.getElementById('image');
	const productNameEdit = document.getElementById('name');
	const productPriceEdit = document.getElementById('price');
	const productDescriptionEdit = document.getElementById('description');
	const productIdHiddenElement = document.getElementById('productId');

	let response = await fetch(`${productsURL}/${productId}`);
	let product = await response.json();

	productImageEdit.value = product.image; 
	productNameEdit.value = product.name;
	productPriceEdit.value = product.price;
    productDescriptionEdit.value = product.description;
	productIdHiddenElement.value = product.id;
}
