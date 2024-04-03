import { pixelAnimate } from "../js/pixelAnimation"

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

            //const image = document.createElement("img")
            //image.classList.add("grid_box_image")
            //image.src = this.boxes[i].url
            //grid_box.appendChild(image)
       
            grid_box.style = `--order: ${i+1}`
            grid_box.style.backgroundImage = `url(${this.boxes[i].url})`
            grid_box.classList.add("enter")
            grid_box.style.animationDelay = "calc(var(--order) * 100ms)";

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
                box.classList.remove("enter")
                box.classList.remove("active")
                box.style.opacity = 1
            });
            event.target.classList.add("active")
        })
    }
}

customElements.define("projects-section", Projects)
