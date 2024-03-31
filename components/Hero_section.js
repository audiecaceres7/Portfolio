import { pixelAnimate } from "../js/pixelAnimation";

export class Hero extends HTMLElement {    
    constructor() {
        super()

    }

    connectedCallback() {
        const template = document.getElementById("hero-template");
        const node = template.content.cloneNode(true)
        const des = node.querySelector(".hero_des")
        pixelAnimate(
            "My name is Audie Caceres and I'm a 24 year old software engineer living in Miami, FL.".toUpperCase(), 
            des    
        )
        this.appendChild(node)
    }
}

customElements.define("hero-section", Hero)
