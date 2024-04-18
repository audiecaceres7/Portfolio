import { clip_path, pixelAnimate } from "./pixelAnimation.js";

export const close_menu = () => {
    document.body.style.overflow = ""
    const sidenav = document.querySelector(".sidenav");
    sidenav.classList.add("slideout")
    sidenav.classList.remove("slidein")
    sidenav.addEventListener("animationend", () => {
        sidenav.hidden = true
    }, { once: true })
}

export const open_menu = () => {
    const menu_links = document.querySelectorAll(".menu_links")
    document.body.style.overflow = "hidden"

    menu_links.forEach(elm => {
        pixelAnimate(elm.innerText, elm)
    })
    const sidenav = document.querySelector(".sidenav");
    clip_path(sidenav, 1)
    sidenav.hidden = false
    sidenav.classList.add("slidein")
    sidenav.classList.remove("slideout")
}

