//DOM NUDES
const mainPageProductsContainer = document.getElementById("main-page-products");
const root = document.querySelector("main");

//FUNCTIONS
async function getLimitedProducts(limitCount = 4) {
  return await fetch(`https://fakestoreapi.com/products?limit=${limitCount}`)
    .then((res) => res.json())
    .then((json) => json);
}
async function getAllProducts() {
  const result = await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => json);
  return result;
}

async function renderMainPageProducts() {
  const products = await getLimitedProducts(4);
  const template = products
    .map((product) => {
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
    })
    .join("");
  mainPageProductsContainer.innerHTML = template;
}
renderMainPageProducts();

async function renderAllProductsPage() {
  const skeleton = `
    <div
            class="w-full flex flex-col items-center rounded-lg shadow-xl pb-4 overflow-hidden"
          >
            <div class="w-full aspect-square bg-slate-300 animate-pulse"></div>
            <div class="w-1/2 h-5 mt-4 bg-slate-300 animate-pulse"></div>
            <div class="w-1/2 h-5 mt-4 bg-slate-300 animate-pulse"></div>
          </div>
          <div
            class="w-full flex flex-col items-center rounded-lg shadow-xl pb-4 overflow-hidden"
          >
            <div class="w-full aspect-square bg-slate-300 animate-pulse"></div>
            <div class="w-1/2 h-5 mt-4 bg-slate-300 animate-pulse"></div>
            <div class="w-1/2 h-5 mt-4 bg-slate-300 animate-pulse"></div>
          </div>
          <div
            class="w-full flex flex-col items-center rounded-lg shadow-xl pb-4 overflow-hidden"
          >
            <div class="w-full aspect-square bg-slate-300 animate-pulse"></div>
            <div class="w-1/2 h-5 mt-4 bg-slate-300 animate-pulse"></div>
            <div class="w-1/2 h-5 mt-4 bg-slate-300 animate-pulse"></div>
          </div>
          <div
            class="w-full flex flex-col items-center rounded-lg shadow-xl pb-4 overflow-hidden"
          >
            <div class="w-full aspect-square bg-slate-300 animate-pulse"></div>
            <div class="w-1/2 h-5 mt-4 bg-slate-300 animate-pulse"></div>
            <div class="w-1/2 h-5 mt-4 bg-slate-300 animate-pulse"></div>
          </div>
  
    `;
  let container = `
  <div id="all-products-page-products" class="container-primary mt-8 md:flex md:gap-6 md:justify-center">
      ${skeleton}
  </div>
  `;
  root.innerHTML = container;

  const allProducts = await getAllProducts();
  const template = allProducts.map((product)=>{
    const { title, image, price, id } = product;
    return`
          <a href="/products/${id}"> 
      <div
      class="flex flex-col items-center rounded-lg shadow-xl pb-4 overflow-hidden w-full">
      <img
        class="w-full aspect-square object-cover"
        src="${image}"
        width="400px"
        alt=""
      />
  
      <h2 class="font-bold text-xl mt-4 text-center line-clamp-1">${title}</h2>
      <div class="flex gap-1 mt-4">
        <span>${price}</span>
        <span>تومان</span>
      </div>
    </div>
    </a>
    `;
  }).join("");

   container = `
  <div id="all-products-page-products" class="container-primary mt-8 md:flex md:gap-6 md:justify-center">
      ${template}
  </div>
  `;
  root.innerHTML = container;
  }

  function handleAClick(event,element){
    event.preventDefault();
    const href = element.getAttribute("href");
    history.pushState("" ,"" ,href);
    checkState();
  }

  function checkState(){
    const pathName = location.pathname;
    switch (true) {
        case pathName === "/products":
            renderAllProductsPage();
            break;
        default:
            break;
    }
  }

  //EVENTS
  window.addEventListener("popstate", checkState);
