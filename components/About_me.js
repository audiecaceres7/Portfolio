import { change_container_shape } from "../js/pixelAnimation.js"

export class AboutMe extends HTMLElement {
    constructor() {
        super()
        this.box_info = [
            {
                des: "My name is Audie Caceres and i'm a 23-year-old software engineer specializing in the field of web development living in Miami, FL .",
                image_one: "",
                image_two: "",
            },
            {
                des: "",
                image_one: "/assets/images/cube.png",
                image_two: "/assets/images/cube.png",
            },
            {
                des: "In my journey through the vast world of programming, I recognize the importance of diversifying my knowledge. Exploring new languages, frameworks, and domains not only expands my technical proficiency but also enriches my problem-solving abilities. I aim to grow as a versatile programmer, capable of navigating diverse challenges, contributing to innovative solutions, and staying adaptable in an ever-evolving tech landscape. My path involves continuous learning, embracing new technologies, and building a solid foundation to excel in the dynamic field of programming.",
                image_one: "",
                image_two: "",
            },
            {
                des: "For me, programming is more than a skill, it's a dynamic way for problem-solving and turning creative concepts into reality .Ever since I was little I had a deep respect for creativity in general and I always found myself wanting to learn new things. I have a huge passion for programming, animation, music and design . When I started to learn the basics of computer science i was amazed on the great posibilities that it can bring to my ideas. And thats where my journey started...",
                des_two: "I find it crucial to explore subjects beyond my field, as it cultivates adaptability, fosters creativity through diverse perspectives, and enhances problem-solving skills. In my free time i like to draw small anime sketches and play guitar since it's very relaxing and it helps me clear my mind for any problems that i have to solve in the future .",
                image_one: "",
                image_two: "",
            },
            {
                des: "",
                image_one: "/assets/images/cube.png",
                image_two: "/assets/images/marey.png",
            },
        ]
    }

    connectedCallback() {
        const template = document.querySelector("#about_me_template")
        const node = template.content.cloneNode(true)
        this.appendChild(node)
        this.createBoxes()
        this.animateBox()
    }

    createBoxes() {
        for(let i = 0; i < this.box_info.length; i++) {
            const box = document.createElement("div") 
            const header = document.createElement("div") 
            const des = document.createElement("p") 

            if (i === 4 || i === 1) {
                const image_one = document.createElement("img")
                const image_two = document.createElement("img")
                image_one.classList.add("about_me_image")
                image_two.classList.add("about_me_image")
                image_one.src = this.box_info[i].image_one
                image_two.src = this.box_info[i].image_two
                box.appendChild(image_one)
                box.appendChild(image_two)
            } else {
                header.classList.add(`about_me_title_${i}`)
                des.classList.add(`about_me_des_${i}`)
                des.innerHTML += this.box_info[i].des
                box.appendChild(header)

                if (i === 3) {
                    const des_two = document.createElement("div")
                    const des_container = document.createElement("div")
                    des_container.classList.add("des_container")
                    des_two.innerHTML = this.box_info[i].des_two
                    des_two.classList.add(`about_me_des_${i}`)
                    des_container.appendChild(des)
                    des_container.appendChild(des_two)
                    box.appendChild(des_container)
                } else {
                    box.appendChild(des)
                }
            }
            box.classList.add("grid_box")
            const parent = this.querySelector(".about_me_main")
            parent.appendChild(box)
        }
    }

    animateBox() {
        const boxes = this.querySelectorAll(".grid_box")
        change_container_shape(boxes)
    }
}

customElements.define("about-me-section", AboutMe)
