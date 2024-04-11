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
            iterations += 1 / 3
        }, 30)
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
            header: "WHERE IM HEADED",
            box_size: [
                {w: 700, h: 800},
                {w: 700, h: 600},
                {w: 500, h: 600},
                {w: 500, h: 700},
                {w: 700, h: 700},
                {w: 700, h: 380}
            ],
            intro: "slide_box",
            position: {x: 120, y: 0} 
        },
        {
            header: "",
            box_size: [
                {w: 700, h: 400},
                {w: 700, h: 600},
                {w: 500, h: 600},
                {w: 500, h: 400},
                {w: 400, h: 400},
                {w: 700, h: 400},
            ],
            intro: "slide_box",
            position: {x: 120, y: 100} 
        },
        {
            header: "What I love to do",
            box_size: [
                {w: 700, h: 400},
                {w: 500, h: 600},
                {w: 700, h: 600},
                {w: 700, h: 700},
                {w: 500, h: 700},
                {w: 800, h: 400},
            ],
            intro: "slide_box",
            position: {x: 0, y: 100} 
        },
        {
            header: `${greetings[Math.floor(Math.random() * greetings.length)]}...`,
            box_size: [
                {w: 800, h: 380},
            ],
            intro: "slide_box",
            position: {x: 0, y: 0} 
        },
    ]

    for (let i = 0; i < boxes.length; i++) {
        container[i].classList.add(boxes[i].intro)
        container[i].addEventListener("animationend", () => {
            container[i].style.opacity = 1
            container[i].classList.remove(boxes[i].intro)
        })

        if (i != 1) {
            pixelAnimate(
                boxes[i].header,
                container[i].querySelector(`.about_me_title_${i}`), 
            )
        }

        for (let j = 0; j < boxes[i].box_size.length; j++) {
            if (j === 5) {
                container[i].style.transform = `translate(0, ${boxes[i].position.y}%)`
            }
            const h = boxes[i].box_size[j].h
            const w = boxes[i].box_size[j].w
            container[i].style.width = `${w}px`
            container[i].style.height = `${h}px`
            await new Promise(res => {
                setTimeout(() => {
                    res()
                }, 300)
            })
        }
        container[i].style.transform = `translate(${boxes[i].position.x}%, ${boxes[i].position.y}%)`
    }
    await new Promise(res => {
        setTimeout(() => {
            res()
        }, 2500)
    })
}
