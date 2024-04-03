import { Hero } from "./components/Hero_section";
import { Projects } from "./components/Projects_section"

import Router from "./js/router.js";
import { close_menu, open_menu } from "./js/sidenav_controls.js";

globalThis.window.app = {}  
app.router = Router

const toggleData = (elm, dataset, theme1, theme2) => {
    if (elm.dataset[dataset] === theme1) {
        elm.dataset[dataset] = theme2
    } else {
        elm.dataset[dataset] = theme1
    }
}

const iconToggle = (elm, dataset, option, icon1, icon2) => {
    if (elm.dataset[dataset] === option) {
        return icon1
    } else {
        return icon2
    }
}

document.addEventListener("DOMContentLoaded", () => {   
    app.router.init()
    const body = document.querySelector("body");
    const theme_btn = document.querySelector(".theme_btn");

    const menu_btn = document.querySelector(".menu_btn");
    const close_btn = document.querySelector(".close_btn");
    const sidenav = document.querySelector(".sidenav");

    document.addEventListener("keydown", ({ key }) => {
        if (key === "Escape") {
            if (!sidenav.hidden) {
                close_menu()
            } else {
                open_menu()
            }
        }
    })

    menu_btn.addEventListener("click", open_menu)
    close_btn.addEventListener("click", close_menu)

    theme_btn.addEventListener("click", async () => {
        const theme_icon = document.querySelector(".theme_icon");
        await new Promise((res) => {
            setTimeout(() => {
                theme_icon.classList.add("fadein")
                theme_icon.addEventListener("animationend", () => {
                    theme_btn.innerHTML = iconToggle(
                        body, 
                        "theme",
                        "dark", 
                        `<i class="theme_icon fa-solid fa-lightbulb"></i>`,
                        `<i class="theme_icon fa-solid fa-moon"></i>`,
                    )
                    const theme_icon = document.querySelector(".theme_icon");
                    theme_icon.classList.add("fadeout")
                })
            })
            res()
        })
        theme_icon.classList.remove("fadeout", "fadein")
        toggleData(body, "theme", "light", "dark")
    })
})
