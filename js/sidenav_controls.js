import { clip_path, pixelAnimate } from "./pixelAnimation.js";
const menu_links = document.querySelectorAll(".menu_links")
const menu_title = document.querySelector(".menu_title")
const layer = document.querySelector(".layer")

export const close_menu = () => {
    document.body.style.overflow = ""
    const sidenav = document.querySelector(".sidenav");
    sidenav.classList.add("slideout")
    sidenav.classList.remove("slidein")
    sidenav.addEventListener("animationend", () => {
        sidenav.hidden = true
        menu_title.hidden = true
    }, { once: true })
    layer.hidden = true
    menu_links.forEach(elm => {
        pixelAnimate(elm.dataset.value, elm)
    })
}

export const open_menu = () => {
    document.body.style.overflow = "hidden"

    menu_links.forEach(elm => {
        pixelAnimate(elm.dataset.value, elm)
    })

    const sidenav = document.querySelector(".sidenav");
    clip_path(sidenav, 1)
    sidenav.hidden = false
    menu_title.hidden = false
    layer.hidden = false
    sidenav.classList.add("slidein")
    sidenav.classList.remove("slideout")
}
