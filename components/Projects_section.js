import { clip_path, hackerAnimate, pixelAnimate } from "../js/pixelAnimation"

export class Projects extends HTMLElement {
    constructor() {
        super()
        this.boxes = [
            {
                title: "Folio website",
                gallery: [
                    "../assets/images/cube.png",
                ],
                des: "This portfolio website is a dynamic showcase of the creator's work and skills, created using HTML, CSS, and JavaScript",
                icons: [
                    `<i class="fa-brands fa-html5"></i>`,
                    `<i class="fa-brands fa-css3-alt"></i>`,
                    `<i class="fa-brands fa-js"></i>`
                ]

            },
            {
                title: "Saas website",
                gallery: [
                    "../assets/images/cube.png"
                ],
                des: "Proximamente",
                icons: [
                    `<i class="fa-brands fa-html5"></i>`,
                    `<i class="fa-brands fa-css3-alt"></i>`,
                    `<i class="fa-brands fa-js"></i>`
                ]
            },
            {
                title: "Mareys website",
                gallery: [
                    "../assets/images/marey.png"
                ],
                des: "Painting company website using HTML, CSS, and JavaScript to bring creativity to life. Our team of painters specializes in transforming spaces into stunning works of art that inspire.",
                icons: [
                    `<i class="fa-brands fa-html5"></i>`,
                    `<i class="fa-brands fa-css3-alt"></i>`,
                    `<i class="fa-brands fa-js"></i>`
                ]
            },
            {
                title: "VIM_legends website",
                gallery: [
                    "../assets/images/cube.png"
                ],
                des: "Soon <3",
                icons: []
            },
            {
                title: "poke website",
                gallery: [
                    "../assets/images/pokeball.png"
                ],
                des: "This web application, powered by HTML, CSS, and TypeScript, presents a visually appealing collection of Pokémon cards sourced from a Pokémon API.",
                icons: [
                    `<i class="fa-brands fa-html5"></i>`,
                    `<i class="fa-brands fa-css3-alt"></i>`,
                    `<i class="fa-brands fa-js"></i>`
                ]
            }
        ]
        this.arr = [0, 1, 2, 3, 4]
        this.positions = [
            {x: 450, y: 100, z: 0, rgba: 0.4},
            {x: 550, y: -150, z: 1, rgba: 0.8},
            {x: 0, y: -300, z: 100, rgba: 1},
            {x: -550, y: -150, z: 1, rgba: 0.8},
            {x: -450, y: 100, z: 0, rgba: 0.4},
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

    rotateArray(array, mainIndex) {
        const middleIndex = Math.floor(array.length / 2);
        const indexOffset = mainIndex - middleIndex;
        const rotatedArray = array.map((_, i) => array[(i - indexOffset + array.length) % array.length]);
        return rotatedArray;
    }

    onClick() {
        const close = this.querySelector("#close_proj_btn")
        if (this.dataset.box === "open") {
            console.log("its already open")
            close.onclick = () => {
                this.dataset.box = "close"
            }
        }
        console.log("nice")
        close.dataset.box = "open"
        this.dataset.box = "open"
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
    }

    moveGridBox() {
        const pos = this.rotateArray(this.arr, this.index);
        const box_list = this.querySelectorAll(".box");
        for (let i = 0; i < pos.length; i++) {
            box_list[pos[i]].style.transform = `translate(${this.positions[i].x}px, ${this.positions[i].y}px)`;
            box_list[pos[i]].style.zIndex = this.positions[i].z;
            box_list[pos[i]].style.opacity = this.positions[i].rgba;
            box_list[pos[i]].classList.remove("active")
        }
        
        box_list[pos[2]].classList.add("active")
        box_list[pos[2]].dataset.box = ""
        box_list[pos[2]].onclick = this.onClick
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
                    <i id="close_proj_btn" data-box="close" class="fa-solid fa-xmark"></i>
                </div>
                <p class="box_des">${this.boxes[i].des}</p>
                <div class="proj_tech">
                    <div class="icon_title">Technolgies used</div>
                    <ul class="icon_container">
                        ${this.boxes[i].icons.join("")}
                    </lu>
                </div>
                <div class="proj_gallery">
                    ${this.boxes[i].gallery.forEach(img => {
                        `<img src="${img}"></img>`
                    })}
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
