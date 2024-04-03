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
        const menu_links = document.querySelectorAll(".menu_links");
        switch(route) {
            case "/":
                page = document.createElement("hero-section")
                break;
            case "/projects":
                page = document.createElement("projects-section")
                break;
        }

        if (page) {
            const page_container = document.querySelector(".page_container");
            page_container.innerHTML = ""
            page_container.appendChild(page)
            globalThis.window.scrollX = 0
            globalThis.window.scrollY = 0

            menu_links.forEach(link => {
                hackerAnimate(link)
            })
        }
    }
}

export default Router
