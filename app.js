import { animate_char } from "./js/animate_char.js"

document.addEventListener("DOMContentLoaded", async () => {   
    const form = document.querySelector("#form_name");
    const name = document.querySelector("#name_input");
    const container = document.querySelector("#name_container");

    const random_greeting = ["Hi", "Hello", "Hola"];

    await animate_char("Welcome to vim legends", "name_container", "teal-100")
    animate_char("Enter name", "label_name", "slate-100")

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        animate_char(`${random_greeting[Math.floor(Math.random() * random_greeting.length)]}, ${name.value}...`, "hello_container", "teal-100")
        form.remove()
        container.remove()
    })
})
