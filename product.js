let currentPage = 0;
let productsPerPage = 15;
let products = [];
let filteredProducts = [];

// Mengambil produk dari dummyJSON
const fetchProducts = async () => {
const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    products = data.products;
  allProducts();
};

// Menampilkan produk sesuai dengan halaman saat ini
const displayProducts = (filteredProducts = products) => {
    const container = document.getElementById('deret');
    container.innerHTML = ''; // Kosongkan kontainer produk

    // Hitung batas produk yang akan ditampilkan
    const start = currentPage * productsPerPage;
    const end = start + productsPerPage;

    // Menampilkan produk yang sesuai
    filteredProducts.slice(start, end).forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'pos';
        productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <img src="${product.thumbnail}" alt="${product.title}" style="width:100%">
            <p>Harga: $${product.price}</p>
        `;
        container.appendChild(productDiv);
    });

    // Tampilkan tombol "Selanjutnya" jika ada lebih banyak produk dan sebaliknya
    const nextButton = document.getElementById('next-button');
    nextButton.style.display = end < filteredProducts.length ? 'block' : 'none';
    const prevButton = document.getElementById('prev-button');
    prevButton.style.display = currentPage === 0 ? 'none' : 'block';
};

// Menangani klik tombol "Selanjutnya" dan "Sebelumnya"
document.getElementById('next-button').addEventListener('click', () => {
    currentPage++;
    displayProducts(filteredProducts);
});

document.getElementById('prev-button').addEventListener('click', () => {
    if (currentPage > 0) {
        currentPage--;
        displayProducts(filteredProducts);
    }
});

// Fungsi untuk memfilter produk berdasarkan kategori
const filterProducts = (category) => {
    currentPage = 0; // Reset halaman saat melakukan filter
    filteredProducts = category ? products.filter(product => product.category.toLowerCase() === category.toLowerCase()) : products;
    displayProducts(filteredProducts);
};

const allProducts = () => {
  currentPage = 0;
  filteredProducts = products;
  displayProducts(filteredProducts);
}

const productperPage = (counts) => {
  productsPerPage = counts;
  displayProducts(filteredProducts);
}

// Mulai pengambilan produk saat halaman dimuat
fetchProducts();
