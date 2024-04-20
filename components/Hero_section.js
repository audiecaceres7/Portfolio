import { pixelAnimate } from "../js/pixelAnimation.js";

export class Hero extends HTMLElement {    
    constructor() {
        super()

    }

    connectedCallback() {
        const template = document.getElementById("hero-template");
        const node = template.content.cloneNode(true)
        this.appendChild(node)
        const hero_des = this.querySelector(".hero_des")
        if (window.globalThis.innerWidth < 1200) {
            hero_des.innerHTML = "MY NAME IS AUDIE CACERES AND I'M A 23 YEAR OLD SOFTWARE ENGINEER LIVING IN MIAMI, FL."
        } else {
            pixelAnimate(
                "MY NAME IS AUDIE CACERES AND I'M A 23 YEAR OLD SOFTWARE ENGINEER LIVING IN MIAMI, FL.",
                hero_des
            )
        }
    }
}

customElements.define("hero-section", Hero)
