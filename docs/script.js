//DOM NUDES
let mainPageProductsContainer = document.getElementById("main-page-products");
const root = document.querySelector("main");
const menu = document.getElementById("categories-container");

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
async function getSingleProduct(id) {
  const result = await fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((json) => json);
  return result;
}
async function getInCategory(catTitle = "jwelery") {
  const result = await fetch(`https://fakestoreapi.com/products/category/${catTitle}`)
  .then(res=>res.json())
  .then(json=>json)
  return result;
}
async function getAllCategories() {
  const result = await fetch('https://fakestoreapi.com/products/categories')
  .then(res=>res.json())
  .then(json=>json)
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
  const template = allProducts
    .map((product) => {
      const { title, image, price, id } = product;
      return `
      <a
      onclick="handleAClick(event , this)" 
      href="/products/${id}"> 
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
        <span class="text-red-600 font-bold">${price}</span>
        <span>ریال</span>
      </div>
    </div>
    </a>
    `;
    })
    .join("");

  container = `
  <div id="all-products-page-products" class="container-primary mt-8 md:grid md:gap-6 md:grid-cols-4">
      ${template}
  </div>
  `;
  root.innerHTML = container;
}

async function renderSingleProduct(id) {
  const data = await getSingleProduct(id);

  const template = `
  <div class="container-primary flex flex-col md:flex-row gap-4 shadow-lg pb-4 overflow-hidden w-full">
    <img class="w-full aspect-square object-cover md:w-[400px]" src="${data.image}" alt="" width="400px">
    <div class="gap-4">
        <div class="shadow-lg my-3">
            <a href="/categories/${data.category}" onclick="handleAClick(event,this)" class="p-2">${data.category}</a>
        </div>
        <h1 class="font-bold text-xl mt-4 line-clamp-1">${data.title}</h1>
        <span class="text-red-600 font-bold">${data.price}</span>
        <span>ریال</span>
        <div>
            <a href="#"
                class="border-solid border-2 rounded-lg bg-green-600 text-white py-1 px-5 text-sm text-center w-fit mt-2 flex justify-center">افزودن
                به
                سبد خرید</a>
        </div>
    </div>
</div>
<div class="flex flex-col justify-center items-center">
    <div class="bg-slate-200 w-full h-0.5 mt-6"></div>
    <h2 class="mt-2">توضیحات</h2>
    <div class="bg-slate-200 w-full h-0.5 mt-2"></div>
    <p class="mt-2">${data.description}</p>
</div>
  `;

  root.innerHTML = template;
}

async function renderProductsInCategory(catTitle) {
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

const products = await getInCategory(catTitle);
const template = products.map((product) => {
  const { title, image, price, id } = product;
  return `
  <a
  onclick="handleAClick(event , this)" 
  href="/products/${id}"> 
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
    <span class="text-red-600 font-bold">${price}</span>
    <span>ریال</span>
  </div>
</div>
</a>
`;
}).join("");

container = `
<div id="all-products-page-products" class="container-primary mt-8 md:grid md:gap-6 md:grid-cols-4">
    ${template}
</div>
`;
root.innerHTML = container;
}

async function renderCategoriesInMenu() {
  const allCategories = await getAllCategories();
  const template = allCategories.map((cat) => {
    return`
    <li>
    <a href="/categories/${cat}" class="text-red-600" onclick="handleAClick(event , this)">${cat}</a>
    </li>
    `;
  }).join("");

  const ui = `
  <ul>
  ${template}
  </ul>
  `;
  menu.innerHTML = ui;
}


function renderMainPage() {
  root.innerHTML = `
  <img class="containe-primary" src="./assets/imgs/banner.2.jpg" alt="">
        <div class="bg-red-600 w-full h-0.5 mt-2"></div>
        <div class="container-primary">
            <div class="flex justify-between">
                <div class="flex">
                    <div class="flex p-3 w-full content-start flex-wrap">
                        <a class="inline-block " href="#">
                            <img class="inline-block h-auto max-w-full" src="./assets/imgs/delivery1.png" alt="">
                        </a>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex p-3 w-full content-center flex-wrap">
                        <a class="inline-block " href="#">
                            <img class="inline-block h-auto max-w-full" src="./assets/imgs/delivery2.png" alt="">
                        </a>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex p-3 w-full content-end flex-wrap">
                        <a class="inline-block " href="#">
                            <img class="inline-block h-auto max-w-full" src="./assets/imgs/delivery3.png" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-red-600 w-full h-0.5 mt-2"></div>
        <div class="container-primary flex justify-center items-center mt-10 mb-10">
            <img src="./assets/imgs/off.jpg" alt="">
        </div>
        <div class="bg-red-600 w-full h-0.5 mt-2"></div>
        <div class="container-primary">
            <div class="md:flex md:justify-between">
                <div class="flex">
                    <div class="flex p-3 w-full content-start flex-wrap">
                        <a class="inline-block " onclick="handleAClick(event, this)" href="/categories/men's clothing">
                            <img class="inline-block h-auto max-w-full" src="./assets/imgs/mens-cloths.webp" alt="">
                        </a>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex p-3 w-full content-center flex-wrap">
                        <a class="inline-block " onclick="handleAClick(event, this)" href="/categories/women's clothing">
                            <img class="inline-block h-auto max-w-full" src="./assets/imgs/womens-cloths.webp" alt="">
                        </a>
                    </div>
                </div>
                <div class="flex">
                    <div class="flex p-3 w-full content-end flex-wrap">
                        <a class="inline-block " onclick="handleAClick(event, this)" href="/categories/jewelery">
                            <img class="inline-block h-auto max-w-full" src="./assets/imgs/accesory.webp" alt="">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center items-center mt-6">
            <div class="w-full h-0.5 bg-red-600"></div>
            <a href="/products" onclick="handleAClick(event)">
                <h1 class="my-4 ml-10 mr-10">محصولات</h1>
            </a>
            <div class="w-full h-0.5 bg-red-600"></div>
        </div>
        <!--limit products-->
        <div id="main-page-products" class="container-primary mt-8 md:flex md:gap-6 md:justify-center">
            <!--skeleton-->
            <div class="w-full flex items-center flex-col rounded-lg shadow-xl pb-4 overflow-hidden">
                <div class="w-full aspect-square animate-pulse bg-slate-300"></div>
                <div class="w-1/2 h-5 mt-4 animate-pulse bg-slate-300"></div>
                <div class="w-1/2 h-5 mt-4 animate-pulse bg-slate-300"></div>
            </div>
            <div class="w-full flex items-center flex-col rounded-lg shadow-xl pb-4 overflow-hidden">
                <div class="w-full aspect-square animate-pulse bg-slate-300"></div>
                <div class="w-1/2 h-5 mt-4 animate-pulse bg-slate-300"></div>
                <div class="w-1/2 h-5 mt-4 animate-pulse bg-slate-300"></div>
            </div>
            <div class="w-full flex items-center flex-col rounded-lg shadow-xl pb-4 overflow-hidden">
                <div class="w-full aspect-square animate-pulse bg-slate-300"></div>
                <div class="w-1/2 h-5 mt-4 animate-pulse bg-slate-300"></div>
                <div class="w-1/2 h-5 mt-4 animate-pulse bg-slate-300"></div>
            </div>
            <div class="w-full flex items-center flex-col rounded-lg shadow-xl pb-4 overflow-hidden">
                <div class="w-full aspect-square animate-pulse bg-slate-300"></div>
                <div class="w-1/2 h-5 mt-4 animate-pulse bg-slate-300"></div>
                <div class="w-1/2 h-5 mt-4 animate-pulse bg-slate-300"></div>
            </div>
        </div>
        <a href="/products" onclick="handleAClick(event,this)"
            class="bg-red-600 text-white px-8 py-2 block mx-auto w-max mt-6 rounded-xl hover:bg-gray-400 hover:text-black">همه
            محصولات</a>
  `;
  mainPageProductsContainer = document.getElementById("main-page-products");
  renderMainPageProducts();
}

function handleAClick(event, element) {
  event.preventDefault();
  const href = element.getAttribute("href");
  history.pushState("", "", href);
  checkState();
}

function checkState() {
  const pathName = location.pathname;
  switch (true) {
    case pathName === "/products":
      renderAllProductsPage();
      break;
    case pathName === "/src/index.html":
      renderMainPage();
      break;
    case pathName.startsWith("/products/"):
      let path = pathName.split("/");
      const pId = path.at(-1);
      renderSingleProduct(pId);
      break;
      case pathName.startsWith("/categories/"):
        let path2 = pathName.split("/");
        const catTitle = path2.at(-1);
        renderProductsInCategory(catTitle);
        break;
    default:
      break;
  }
}

//EVENTS
window.addEventListener("popstate", checkState);
