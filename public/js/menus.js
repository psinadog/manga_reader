const login_btn = document.querySelector(".login_btn");
const login_menu = document.querySelector(".login_menu");
const registration_btn = document.querySelector(".registration_btn");
const registration_menu = document.querySelector(".registration_menu");
const invisible_menu = document.querySelector(".invisible_menu");
const body = document.querySelector("body");

window.addEventListener("click", e => {
    if (e.target === login_btn) {
        login_menu.style.opacity = "1";
        login_menu.style.zIndex = "1000";
        invisible_menu.style.opacity = "1";
        invisible_menu.style.zIndex = "1000";
        body.style.overflowY = "hidden";
    } else if (e.target === registration_btn) {
        registration_menu.style.opacity = "1";
        registration_menu.style.zIndex = "1000";
        invisible_menu.style.opacity = "1";
        invisible_menu.style.zIndex = "1000";
        body.style.overflowY = "hidden";
    } else if (e.target === invisible_menu) {
        login_menu.style.opacity = "0";
        login_menu.style.zIndex = "-1000";
        registration_menu.style.opacity = "0";
        registration_menu.style.zIndex = "-1000";
        invisible_menu.style.opacity = "0";
        invisible_menu.style.zIndex = "-1000";
        body.style.overflowY = "auto";
    }
});
