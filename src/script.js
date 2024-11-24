//DOM NUDES
const mainPageProductsContainer = document.getElementById("main-page-products");

//FUNCTIONS
async function getLimitedProducts(limitCount = 4) {
  return await fetch(`https://fakestoreapi.com/products?limit=${limitCount}`)
    .then((res) => res.json())
    .then((json) => json);
}

async function renderMainPageProducts() {
  const products = await getLimitedProducts(4);
  const template = products.map((product) => {
    const { id, title, image, price } = product;
    return `
        <a href="/products/${id}"
    onclick="handleAClick(event , this)"
    class="flex flex-col items-center rounded-lg shadow-xl pb-4 overflow-hidden w-full">
    <img
      class="w-full aspect-square object-cover"
      src="${image}"
      width="400px"
      alt=""
    />

    <h2 class="font-bold text-xl mt-4 text-center line-clamp-1">${title}</h2>
    <div class="flex gap-1 mt-4">
      <span class="text-red-600">${price}</span>
      <span>ریال</span>
    </div>
  </a>
    `;
  }).join("");
  mainPageProductsContainer.innerHTML = template;
}
renderMainPageProducts();
