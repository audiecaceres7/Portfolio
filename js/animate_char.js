export async function animate_char(text, text_container, color) {
    const letters = " ._ab[cdefghi+gklmn@opq-rs#t<uvwxyz,!=ABCD$EFGHIGKLMN%OPQR/STU>VWX?Y]Z";
   
    const container = document.querySelector(`#${text_container}`);
    for (let i = 0; i < text.length; i++) {
        const char = document.createElement("span");
        char.classList.add("slate-100");
        char.classList.remove(color);

        for (let j = 0; j < letters.length; j++) {
            container.appendChild(char)
            await new Promise((res) => {
                setTimeout(() => {
                    res()
                }, 10)
            })
            char.innerHTML = letters[j]
            if (letters[j] === text[i]) {
                container.appendChild(char)
                break
            }
        }
        await new Promise((res) => {
            setTimeout(() => {
                res()
            }, 10)
        })
        char.classList.remove("slate-100");
        char.classList.add("transition", color);
    }
}
