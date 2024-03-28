import { hackerAnimate, pixelAnimate } from "./js/pixelAnimation"

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

document.addEventListener("DOMContentLoaded", async () => {   
    const body = document.querySelector("body");
    const theme_btn = document.querySelector(".theme_btn");
    const menu_btn = document.querySelector(".menu_btn");
    const close_btn = document.querySelector(".close_btn");
    //const menu_bottom = document.querySelector(".bottom_menu_section")

    const menu_links = document.querySelectorAll(".menu_links")
    const hero_title = document.querySelector(".hero_title")
    const hero_des = document.querySelector(".hero_des")

    const sidenav = document.querySelector(".sidenav");

    menu_btn.addEventListener("click", () => {
        sidenav.classList.add("slidein")
        sidenav.classList.remove("slideout")
        sidenav.hidden = false
    })

    close_btn.addEventListener("click", () => {
        sidenav.classList.add("slideout")
        sidenav.classList.remove("slidein")
        sidenav.addEventListener("animationend", () => {
            sidenav.hidden = true
        }, { once: true })
    })


    theme_btn.addEventListener("click", async () => {
        await new Promise((res) => {
            setTimeout(() => {
                theme_btn.classList.add("fadein")
                theme_btn.addEventListener("animationend", () => {
                    theme_btn.classList.add("fadeout")
                    theme_btn.innerHTML = iconToggle(
                        body, 
                        "theme",
                        "light", 
                        `<i class="fa-solid fa-moon"></i>`,
                        `<i class="fa-solid fa-lightbulb"></i>`,
                    )
                })
            })
            res()
        })
        theme_btn.classList.remove("fadeout", "fadein")
        toggleData(body, "theme", "light", "dark")
    })

    pixelAnimate("HELLO, WORLD".length, hero_title)
    hackerAnimate(menu_links)
})
