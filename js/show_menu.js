// const menuToggle = document.getElementById("menu-toggle");
// const menu = document.querySelector(".menu-nav");

// menuToggle.addEventListener("click", function () {
//     menu.classList.toggle("show-menu");
// });

const nav = document.querySelector(".menu");
const abrir = document.querySelector("#abrir-menu");
const cerrar = document.querySelector("#cerrar-menu");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})