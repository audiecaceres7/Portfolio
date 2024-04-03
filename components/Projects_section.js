import { pixelAnimate } from "../js/pixelAnimation"
import { hackerAnimate } from "../js/pixelAnimation.js";

export class Projects extends HTMLElement {
    constructor() {
        super()
        this.boxes = []
    }
    
    connectedCallback() {
        const template = document.getElementById("projects-template")
        const node = template.content.cloneNode(true)
        const des = node.querySelector(".projects_title")
        pixelAnimate("Projects", des)
        this.addGridBox(node)
        this.check_box(node)
        this.appendChild(node)
    }

    addGridBox(node) {
        this.boxes = [
            {
                title: "Folio website",
                url: "../assets/images/cube.png"
            },
            {
                title: "PokeApi website",
                url: "../assets/images/pokeball.png"
            },
            {
                title: "Marey's painting website",
                url: "../assets/images/marey.png"
            }
        ]
       
        for (let i = 0; i < this.boxes.length; i++) {
            const grid_box = document.createElement("div") 
            grid_box.classList.add("grid_box")
       
            grid_box.style = `--order: ${i+1}`
            grid_box.style.backgroundImage = `url(${this.boxes[i].url})`
            grid_box.classList.add("enter")
            grid_box.style.animationDelay = "calc(var(--order) * 100ms)";

            const inner_wrapper = document.createElement("div")
            inner_wrapper.classList.add("inner_wrapper")
            inner_wrapper.hidden = true;
            grid_box.appendChild(inner_wrapper)

            const title = document.createElement("div")
            title.classList.add("box_title")
            title.innerHTML = this.boxes[i].title

            const content = document.createElement("div")
            content.classList.add("box_content")
            content.style.display = "none"
            content.appendChild(title)

            grid_box.appendChild(content)
            node.querySelector(".projects_container").appendChild(grid_box)
        }
    }

    check_box(node) {
        node.querySelector(".projects_container").addEventListener("click", event => {
            if (event.target.id === "project_container") {
                return
            } else if (event.target.classList.contains("grid_box_image")) {
                return
            }
            

            event.target.parentElement.querySelectorAll(".grid_box").forEach(box => {
                box.classList.remove("active")
                box.classList.remove("enter")
                box.style.opacity = 0.5
                box.querySelector(".box_content").style.display = "none"
                box.querySelector(".inner_wrapper").hidden = true
            });
            event.target.style.opacity = 1
            event.target.querySelector(".inner_wrapper").hidden = false
            event.target.querySelector(".box_content").style.display = "flex"
            event.target.classList.add("active")
            const titles = event.target.parentElement.querySelectorAll(".box_title")
            titles.forEach((title, index)=> {
                pixelAnimate(this.boxes[index].title, title)
            })
        })
    }
}

customElements.define("projects-section", Projects)
