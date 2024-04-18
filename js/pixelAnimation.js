const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export const hackerAnimate = (elm) => {
    const word = elm.innerText
    elm.onmouseover = event => {
        let iterations = 0
        const interval = setInterval(() => {
            event.target.innerText = event.target.innerText.split("")
                .map((_, index) => {
                    if (index < iterations) {
                        return word[index]
                    }
                    return chars[Math.floor(Math.random() * chars.length)]
                })
                .join("")

            if (iterations >= event.target.innerText.length) {
                clearInterval(interval)
            } 
            iterations += 1 / 4
        }, 20)
    }
}

export const pixelAnimate = (word, html_elm) => {    
    let iterations = 0
    const interval = setInterval( async() => {
        let text = ""
        for (let i = 0; i < word.length; i++) {
            text += chars[Math.floor(Math.random() * chars.length)]
        }
        html_elm.innerText = text

        html_elm.innerText = html_elm.innerText.split("") 
            .map((_, index) => {
                if (index < iterations) {
                    return word[index]
                } 
                return chars[Math.floor(Math.random() * chars.length)]
            })
            .join("")

        if (iterations >= word.length) {
            clearInterval(interval)
        }
        await new Promise(res => {
            setTimeout(() => {
                res()
            }, 200)
        })
        iterations += 1 / 2
    }, 25)
}

export const clip_path = (html_elm, time) => {
    let iterations = 0.00
    const interval = setInterval(() => {
    html_elm.style.clipPath = `polygon(0 0, ${iterations*190}% 0, ${iterations*100}% 100%, 0% 100%)`;
    if (iterations >= 1) {
        clearInterval(interval)
    }
    iterations+=0.01
  }, time)
}

export const change_container_shape = async (container) => {
    const greetings = ["Hello", "Hi", "Hola"]
    const boxes = [
        {
            header: `${greetings[Math.floor(Math.random() * greetings.length)]}...`,
            box_size: [
            ],
            intro: "slide_box",
        },
        {
            header: "",
            box_size: [],
            intro: "slide_box",
        },
        {
            header: "WHERE IM HEADED",
            box_size: [
            ],
            intro: "slide_box",
        },
        {
            header: "What I love to do",
            box_size: [
            ],
            intro: "slide_box",
        },
        {
            header: "",
            box_size: [],
            intro: "slide_box",
        },
    ]

    for (let i = 0; i < boxes.length; i++) {
        container[i].classList.add(boxes[i].intro)
        container[i].addEventListener("animationend", () => {
            container[i].style.opacity = 1
            container[i].classList.remove(boxes[i].intro)
        })

        if (i != 4 && i != 1) {
            pixelAnimate(
                boxes[i].header,
                container[i].querySelector(`.about_me_title_${i}`), 
            )
        }

        for (let j = 0; j < boxes[i].box_size.length; j++) {
            const w = boxes[i].box_size[j]
            container[i].style.width = `${w}px`
            await new Promise(res => {
                setTimeout(() => {
                    res()
                }, 400)
            })
        }
        container[i].style.border = "none"
        container[i].style.width = "100%"
    }
}
