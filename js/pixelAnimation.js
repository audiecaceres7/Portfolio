const chars = " ,ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export const hackerAnimate = (html_elm) => {
    html_elm.forEach(elm => {
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
    })
}

export const pixelAnimate = (word_len, html_elm) => {    
    for (let i = 0; i < word_len; i++) {
        html_elm.innerText += chars[Math.floor(Math.random() * chars.length)]
    }

    setInterval(() => {
        console.log(html_elm.innerText.length)
        html_elm.innerText = html_elm.innerText.split("") 
            .map(() => chars[Math.floor(Math.random() * chars.length)])
            .join("")
    }, 100)
}
