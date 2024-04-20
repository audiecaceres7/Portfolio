import { pixelAnimate } from "../js/pixelAnimation.js"

export class Projects extends HTMLElement {
    constructor() {
        super()
        this.boxes = [
            {
                title: "FOLIO WEBSITE",
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
                title: "MAREY'S PAINTING",
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
                title: "POKE API",
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
            {class: "prev", z: 1, rgba: 0.8},
            {class: "active", z: 100, rgba: 1},
            {class: "next", z: 1, rgba: 0.8},
        ]
        this.index = 1
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
        const box_list = this.querySelectorAll(".box")

        box_list.forEach((box, i) => {
            let positionIndex = (i + this.index) % this.positions.length;
            if (positionIndex < 0) positionIndex += this.positions.length;
            const position = this.positions[positionIndex];
            const classes = ["last", "prev", "active", "next", "first"];
            box.classList.remove(...classes);
            box.classList.add(position.class);
            box.style.zIndex = position.z;
            box.style.opacity = position.rgba;
            setTimeout(() => {
                box.querySelectorAll(".box_link_container").forEach(elm => elm.style.display = "none");
            }, 100)
        });

        setTimeout(() => {
            this.querySelector(".active").querySelectorAll(".box_link_container").forEach(elm => elm.style.display = "")
        }, 100);
        pixelAnimate(
            this.querySelector(".active").querySelector(".box_title").innerText.toUpperCase(), 
            this.querySelector(".active").querySelector(".box_title"), 
        );
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
