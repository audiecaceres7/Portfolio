const toggleData = (elm, dataset, theme1, theme2) => {
    if (elm.dataset[dataset] === theme1) {
        elm.dataset[dataset] = theme2
    } else {
        elm.dataset[dataset] = theme1
    }
}

const iconToggle = (elm, dataset, option, icon1, icon2) => {
    if (elm.dataset[dataset] === option) {
        return icon1
    } else {
        return icon2
    }
}

document.addEventListener("DOMContentLoaded", () => {   
    const body = document.querySelector("body");
    const theme_btn = document.querySelector(".theme_btn");
    const menu_btn = document.querySelector(".menu_btn");
    const close_btn = document.querySelector(".close_btn");

    const links = document.querySelectorAll(".menu_links");

    links.forEach(link => {
        link.addEventListener("mouseenter", () => {
            console.log("nice")
        })
    })

    const sidenav = document.querySelector(".sidenav");

    menu_btn.addEventListener("click", () => {
        sidenav.classList.add("slidein")
        sidenav.classList.remove("slideout")
        sidenav.hidden = false
    })

    close_btn.addEventListener("click", () => {
        sidenav.classList.add("slideout")
        sidenav.classList.remove("slidein")
        sidenav.addEventListener("animationend", () => {
            sidenav.hidden = true
        }, { once: true })
    })



    theme_btn.addEventListener("click", async () => {
        await new Promise((res) => {
            setTimeout(() => {
                theme_btn.classList.add("fadein")
                theme_btn.addEventListener("animationend", () => {
                    theme_btn.classList.add("fadeout")
                    theme_btn.innerHTML = iconToggle(
                        body, 
                        "theme",
                        "light", 
                        `<i class="fa-solid fa-moon"></i>`,
                        `<i class="fa-solid fa-lightbulb"></i>`,
                    )
                })
            })
            res()
        })
        theme_btn.classList.remove("fadeout", "fadein")
        toggleData(body, "theme", "light", "dark")
    })
})
