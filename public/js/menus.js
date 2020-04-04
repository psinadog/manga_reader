const login_btn = document.querySelector(".login_btn");
const login_menu = document.querySelector(".login_menu");
const registration_btn = document.querySelector(".registration_btn");
const registration_menu = document.querySelector(".registration_menu");
const invisible_menu = document.querySelector(".invisible_menu");
const body = document.querySelector("body");
const menu = document.querySelector(".sign_menu");
const show_menu_btn = document.querySelector(".slide_btn");
const hidden_menu = document.querySelector(".hidden_menu ");

window.addEventListener("click", (e) => {
    if (e.target === show_menu_btn) {
        if (menu.style.opacity === "1") {
            to_close(menu);
            close_all();
            close_invis();
        } else {
            login_menu.style.zIndex = "1000";
            registration_menu.style.zIndex = "1000";
            show_menu(menu);
        }
    } else if (e.target === login_btn) {
        to_close(registration_menu);
        show_menu(login_menu);
    } else if (e.target === registration_btn) {
        to_close(login_menu);
        show_menu(registration_menu);
    } else if (e.target === menu) {
        close_all();
    }
});

const to_close = (menu) => {
    menu.style.opacity = "0";
    menu.style.zIndex = "999";
};

const show_menu = (menu) => {
    invis_on();
    menu.style.opacity = "1";
    menu.style.zIndex = "1000";
    menu.style.transform = "translateY(-2%)";
};

const invis_on = () => {
    invisible_menu.style.opacity = "1";
    invisible_menu.style.zIndex = "1000";
};

const close_invis = () => {
    invisible_menu.style.opacity = "0";
    invisible_menu.style.zIndex = "-1000";
};

const close_all = () => {
    registration_menu.style.opacity = "0";
    registration_menu.style.transform = "translateY(10%)";
    registration_menu.style.zIndex = "-1000";
    login_menu.style.opacity = "0";
    login_menu.style.transform = "translateY(10%)";
    login_menu.style.zIndex = "-1000";
};
