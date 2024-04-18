import { clip_path, hackerAnimate, pixelAnimate } from "../js/pixelAnimation"

export class Projects extends HTMLElement {
    constructor() {
        super()
        this.boxes = [
            {
                title: "Folio website",
                des: "This portfolio website is a dynamic showcase of the creator's work and skills, created using HTML, CSS, and JavaScript",
                icons: [
                    `<i class="fa-brands fa-html5"></i>`,
                    `<i class="fa-brands fa-css3-alt"></i>`,
                    `<i class="fa-brands fa-js"></i>`
                ],
                link: "https://portfolio-website-psi-tawny.vercel.app/",
                code: "https://github.com/audiecaceres7/portfolio-website"

            },
            {
                title: "Saas website",
                des: "Proximamente",
                icons: [
                    `<i class="fa-brands fa-html5"></i>`,
                    `<i class="fa-brands fa-css3-alt"></i>`,
                    `<i class="fa-brands fa-js"></i>`
                ],
                link: "",
                code: ""
            },
            {
                title: "Mareys website",
                des: "Painting company website using HTML, CSS, and JavaScript to bring creativity to life. Our team of painters specializes in transforming spaces into stunning works of art that inspire.",
                icons: [
                    `<i class="fa-brands fa-html5"></i>`,
                    `<i class="fa-brands fa-css3-alt"></i>`,
                    `<i class="fa-brands fa-js"></i>`
                ],
                link: "https://mareyspainting.com",
                code: "https://github.com/audiecaceres7/mareys_painting"

            },
            {
                title: "VIM_legends website",
                des: "Soon <3",
                icons: [],
                link: "",
                code: ""
            },
            {
                title: "poke website",
                des: "this web application, powered by html, css, and typescript, presents a visually appealing collection of pokémon cards sourced from a pokémon api.",
                icons: [
                    `<i class="fa-brands fa-html5"></i>`,
                    `<i class="fa-brands fa-css3-alt"></i>`,
                    `<i class="fa-brands fa-js"></i>`
                ],
                link: "https://poke-api-flame.vercel.app/",
                code: "https://github.com/audiecaceres7/poke-api"
            },
        ]
        this.positions = [
            {class: "last", z: 0, rgba: 0.4},
            {class: "prev", z: 1, rgba: 0.8},
            {class: "active", z: 100, rgba: 1},
            {class: "next", z: 1, rgba: 0.8},
            {class: "first", z: 0, rgba: 0.4},
        ]
        this.index = 2
    }
    
    connectedCallback() {
        const template = document.getElementById("projects-template")
        const node = template.content.cloneNode(true)
        const des = node.querySelector(".projects_title")
        this.appendChild(node)
        pixelAnimate("Projects", des)
        this.addGridBox()
        this.moveGridBox()
        this.control()
    }

    rotateArray(array, mainIndex) {
        const middleIndex = Math.floor(array.length / 2);
        const indexOffset = mainIndex - middleIndex;
        const rotatedArray = array.map((_, i) => {
            return array[(i - indexOffset + array.length) % array.length]
        })
        return rotatedArray;
    }

    control() {
        this.querySelector(".control_container").onclick = (event) => {
            if (event.target.id === "right") {
                this.index = (this.index - 1)
            } else if (event.target.id === "left") {
                this.index = (this.index + 1)
            }
            this.moveGridBox();
        };

        // Touch screen listener to drag box
        let startX, movingX;
        this.querySelector(".projects_container").addEventListener("touchstart", (event) => {
            startX = event.touches[0].clientX
        });

        this.querySelector(".projects_container").addEventListener("touchmove", (event) => {
            movingX = event.touches[0].clientX
        });

        this.querySelector(".projects_container").addEventListener("touchend", () => {
            if (startX+100 < movingX) {
                this.index = (this.index - 1)
            } else if (startX-100 > movingX) {
                this.index = (this.index + 1)
            }
            this.moveGridBox();
        });
    }

    moveGridBox() {
        const pos = this.rotateArray(this.positions.map((_, i) => i), this.index);
        const box_list = this.querySelectorAll(".box");
        for (let i = 0; i < pos.length; i++) {
            if (
                box_list[pos[i]].classList.contains("last") ||
                box_list[pos[i]].classList.contains("prev") ||
                box_list[pos[i]].classList.contains("active") ||
                box_list[pos[i]].classList.contains("next") ||
                box_list[pos[i]].classList.contains("first")
            ) {
                console.log(box_list[[pos[i]]])
                box_list[pos[i]].classList.remove("last")
                box_list[pos[i]].classList.remove("prev")
                box_list[pos[i]].classList.remove("active")
                box_list[pos[i]].classList.remove("next")
                box_list[pos[i]].classList.remove("first")
            }
            box_list[pos[i]].classList.add(this.positions[i].class)
            box_list[pos[i]].style.zIndex = this.positions[i].z;
            box_list[pos[i]].style.opacity = this.positions[i].rgba;
            box_list[pos[i]].querySelectorAll(".box_link_container").forEach(elm => elm.style.display = "none")
        }
        box_list[pos[2]].querySelectorAll(".box_link_container").forEach(elm => elm.style.display = "")
        pixelAnimate(
            box_list[pos[2]].querySelector(".box_title").innerText.toUpperCase(), 
            box_list[pos[2]].querySelector(".box_title")
        )
    }

    addGridBox() {
        for (let i = 0; i < this.boxes.length; i++) {
            const grid_box = `
                <div class="box_nav">  
                    <div class="box_title">${this.boxes[i].title}</div>
                <p class="box_des">${this.boxes[i].des}</p>
                </div>
                <div class="box_link_container">
                    <div class="icon_title">Website link</div>
                    <a href="${this.boxes[i].link}" target="_blank">${this.boxes[i].link}</a>
                </div>
                <div class="box_link_container">
                    <div class="icon_title">Code link</div>
                    <a href="${this.boxes[i].code}" target="_blank">${this.boxes[i].code}</a>
                </div> 
                <div class="proj_tech">
                    <div class="icon_title">Technolgies used</div>
                    <ul class="icon_container">
                        ${this.boxes[i].icons.join("")}
                    </lu>
                </div>
            `
            const box_parsed = document.createElement("div")
            box_parsed.classList.add("box")
            box_parsed.innerHTML = grid_box
            this.querySelector(".projects_container").appendChild(box_parsed)
        }
    }
}

customElements.define("projects-section", Projects)
