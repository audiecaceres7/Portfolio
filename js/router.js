import { hackerAnimate } from "./pixelAnimation.js"
import { close_menu } from "./sidenav_controls.js"

const Router = {       
    init: () => {
        document.querySelectorAll(".menu_links").forEach(link => {
            link.addEventListener("click", event => {
                event.preventDefault()  
                const url = link.getAttribute("href")
                Router.go(url)
                close_menu()
            })
        })

        globalThis.window.addEventListener("popstate", event => {
            Router.go(event.state.route, false);
        })

        Router.go(location.pathname)
    },
    go: (route, addToHistory=true) => {
        console.log(`going to ${route}`) 
        
        if (addToHistory) {
            history.pushState({ route }, null, route)
        }
        let page = null
        let container = null
        const menu_links = document.querySelectorAll(".menu_links");
        const page_containers = document.querySelectorAll(".page");
        switch(route) {
            case "/":
                page = document.createElement("hero-section")
                container = document.querySelector(".page_container")
                break;
            case "/projects":
                page = document.createElement("projects-section")
                container = document.querySelector(".project_container")
                break;
            case "/about_me":
                page = document.createElement("about-me-section")
                container = document.querySelector(".about_me_container")
                break;
        }

        if (page) {
            // clear container
            container.innerHTML = ""

            // add image
            const bg_image = document.createElement("img")
            bg_image.id = "page_bg_image"
            bg_image.src = "./assets/images/cube.png"
            container.appendChild(bg_image)
            globalThis.window.scrollX = 0
            globalThis.window.scrollY = 0

            // enhance links
            menu_links.forEach(link => {
                hackerAnimate(link)
            })

            page_containers.forEach(page => {
                page.hidden = true
            })

            container.hidden = false
            container.appendChild(page)
        }
    }
}

export default Router
