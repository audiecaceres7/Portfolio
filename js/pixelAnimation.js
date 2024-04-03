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
                    return chars[Math.floor(Math.random() * chars.length )]
                })
                .join("")

            if (iterations >= event.target.innerText.length) {
                clearInterval(interval)
            } 
            iterations += 1 / 2
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

export const clip_path = (html_elm) => {
    let iterations = 0.00
    const interval = setInterval(() => {
    html_elm.style.clipPath = `polygon(0 0, ${iterations*190}% 0, ${iterations*100}% 100%, 0% 100%)`;
    if (iterations >= 1) {
        clearInterval(interval)
    }
    iterations+=0.01
  })
}
