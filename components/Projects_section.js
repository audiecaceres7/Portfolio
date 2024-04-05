import { pixelAnimate } from "../js/pixelAnimation"

export class Projects extends HTMLElement {
    constructor() {
        super()
        this.boxes = [
            {
                title: "Folio website",
                url: "../assets/images/cube.png"
            },
            {
                title: "Saas website",
                url: "../assets/images/cube.png"
            },
            {
                title: "Mareys website",
                url: "../assets/images/cube.png"
            },
            {
                title: "VIM_legends website",
                url: "../assets/images/cube.png"
            },
            {
                title: "poke website",
                url: "../assets/images/cube.png"
            }
        ]
       
        this.positions = [
            {x: 600, y: 0, z: 0},
            {x: 350, y: -50, z: 1},
            {x: 0, y: -100, z: 10},
            {x: -350, y: -50, z: 1},
            {x: -600, y: 0, z: 0},
        ]
        this.index = 2
    }
    
    connectedCallback() {
        const template = document.getElementById("projects-template")
        const node = template.content.cloneNode(true)
        const des = node.querySelector(".projects_title")
        pixelAnimate("Projects", des)
        this.appendChild(node)
        this.addGridBox()
        this.moveGridBox()
        this.control()
    }

    control() {
        this.querySelector(".control_container").onclick = (event) => {
            if (event.target.id === "left") {
                this.index--
            } else if (event.target.id === "right") {
                this.index++
            }
            this.moveGridBox() 
        }
    }

    moveGridBox() {
        const pos = [
            this.index - 2 < 0 ? 4 - 2 : this.index - 2,
            this.index - 1 < 0 ? 4 - 1 : this.index - 1,
            this.index,
            this.index + 1 > 4 ? 0 + 1 : this.index + 1,
            this.index + 2 > 4 ? 0 + 2 : this.index + 2,
        ]

        console.log(this.index)
        console.log(pos)

        const box_list = this.querySelectorAll(".grid_box")
        for (let i = 0; i < this.positions.length; i++) {
            box_list[i].style.transform = `translate(${this.positions[i].x}px, ${this.positions[i].y}px)`
            box_list[i].style.zIndez = this.positions[i].z
        }

        for (let i = 0; i < pos.length; i++) {
            box_list[pos[i]].style.transform = `translate(${this.positions[i].x}px, ${this.positions[i].y}px)`
        }
    }

    addGridBox() {
        for (let i = 0; i < this.boxes.length; i++) {
            const grid_box = document.createElement("div") 
            grid_box.classList.add("grid_box")
            this.querySelector(".projects_container").appendChild(grid_box)

            const title = document.createElement("div")
            title.classList.add("box_title")
            title.innerText = this.boxes[i].title
            grid_box.appendChild(title)
        }
    }
}

customElements.define("projects-section", Projects)
