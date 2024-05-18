document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    getAll(query);
  });
  getAll();
});

function getAll(query = '') {
  const url = query 
    ? `https://localhost:7021/api/ProductControler?name=${encodeURIComponent(query)}&limit=0&offset=0`
    : 'https://localhost:7021/api/ProductControler?limit=0&offset=0';

  fetch(url)
    .then(r => r.json())
    .then(data => {
      const productContainer = document.getElementById('product-container');
      productContainer.innerHTML = ''; // Limpiar contenedor
      data.forEach(product => {
        const productCard = `
          <div class="col-md-3 product-card">
            <div class="card bg-dark text-light">
              <img src="${product.imageUrl}" class="card-img-top rounded" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Category: ${product.categoryName}</p>
                <p class="card-text">$${product.price.toFixed(2)}</p>
                <p class="card-text">This is a brief description of ${product.name}.</p>
                <a href="#" class="btn btn-primary btn-lg btn-block">Add to Cart</a>
              </div>
            </div>
          </div>`;
        productContainer.insertAdjacentHTML('beforeend', productCard);
      });
    })
    .catch(error => console.error('Error fetching products:', error));
}

// Llamar la función para cargar los productos cuando la página cargue
document.addEventListener('DOMContentLoaded', getAll);