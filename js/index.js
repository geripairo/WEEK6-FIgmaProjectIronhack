// HAMBURGER MENU

const hamburger = document.querySelector(".hamburger");

const navMenu = document.querySelector(".nav-list");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))


const subscribe = document.getElementById('btn-newsletter')

subscribe.addEventListener('click', (event) => {
    event.preventDefault();
})

