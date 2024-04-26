import { getUser } from "./login.js";

const API__URL = "https://dummyjson.com";
const prodactWrapper = document.querySelector(".prodact__wrapper");
const loading = document.querySelector(".loading")
const loginExitBtn = document.querySelector(".login__exit-btn")
const modalBox = document.querySelector(".modal-box")
const login = document.querySelector(".login")
const headerLoginLink = document.querySelector("#header__login-admin")
const form = document.querySelector(".form")
const username = document.querySelector("#username")
const password = document.querySelector("#password")
const headerSearchInput = document.querySelector(".header__search__input")
const catalogList = document.querySelector(".catalog__list")



async function getProdacts(URL,mapList,sorchAll) {
    let resUrl = "";
    if (mapList === "all") {
        if (sorchAll) {
            resUrl = `${URL}/products/search/?q=${sorchAll}`
        }else{
            resUrl = `${URL}/products`
        }
    }else{
        resUrl = `${URL}/products/category/${mapList}`
    }
    `${URL}/products`
  let data = await fetch(resUrl, {
    method: "GET",
  });
  data
    .json()
    .then((res) => mapProdact(res))
    .catch((error) => console.log(error))
    .finally(()=>{
        loading.style.display = "none"
    })
}

getProdacts(API__URL,"all");

function mapProdact(cardData) {
  let card = "";
  cardData.products.forEach((prodact) => {
    card += `
        <div class="prodact__cards">
            <div class="prodact__img-card">
            <img  data-id="${prodact.id}"  class="prodact-img" src=${prodact.thumbnail} alt="${prodact.title} img">
            </div>
            <div class="prodact__info-card">
            <div class="prodact__info__rating-card">
                  <img src="./assets/image/yuldiz.svg" alt="yulduz img">
                  <span class="prodact__info__rating-text">${prodact.rating}</span>
            </div>
            <h3 class="prodact__info__title">${prodact.title}</h3>
            <p class="prodact__info__text">${prodact.description}</</p>
            <div class="prodact__info-card__part">
                <span class="prodact__info__price">${prodact.price}$</</span>
                <span class="prodact__info__price prodact__info__price__acsiya">875.54$</span>
            </div>
            </div>
        </div>
        `;
  });
  prodactWrapper.innerHTML = card;
}

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    let user = {
        username:username.value,
        password:password.value
    }
    getUser(user)
})


loginExitBtn.addEventListener("click", ()=>{
    modalBox.style.display="none"
    login.style.display="none"
})
modalBox.addEventListener("click", ()=>{
    modalBox.style.display="none"
    login.style.display="none"
})


function checkAdmin() {
    let isLogin = localStorage.getItem("x-auth-token")
    if (isLogin) {
        headerLoginLink.innerHTML = `<img src="./assets/image/Logout.svg" alt="login btn" /> Admin`
        headerLoginLink.setAttribute("href", "./pages/admin.html")
    }else{
        headerLoginLink.innerHTML = `<img src="./assets/image/Logout.svg" alt="login btn" /> Login`
    }
}
checkAdmin()

headerLoginLink.addEventListener("click", ()=>{
    modalBox.style.display="block"
    login.style.display="block"
})



prodactWrapper.addEventListener("click",(e)=>{
    if (e.target.className === "prodact-img") {
        let id = e.target.dataset.id
        window.open(`./pages/card.html?id=${id}`,"_self")
    }

})

async function getCategory(url) {
    let data = await fetch(`${url}/products/categories`,{
        method:"GET"
    })
    data
        .json()
        .then(res => mapCategory(res))
        .catch(err => console.log(err))
}
getCategory(API__URL)

function mapCategory(categoryData) {
    let creatLi = "<li class=\"catalog__item\">all</li>"
    categoryData.forEach((category)=>{
        creatLi +=`
            <li class="catalog__item">${category}</li>
        `
    })
    catalogList.innerHTML = creatLi
}

catalogList.addEventListener("click",(e)=>{
    let setList = e.target.innerHTML
    getProdacts(API__URL,setList)
})




headerSearchInput.addEventListener("input", (e)=>{
    let value = e.target.value.trim()
    if (value) {
        getProdacts(API__URL,"all",value)
    }
})