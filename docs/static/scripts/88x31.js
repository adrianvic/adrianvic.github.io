const images = document.querySelectorAll(".i88x31");

images.forEach(image => {
    image.addEventListener("click", () => {
        const selected = document.querySelectorAll(".i88x31.selected");
        selected.forEach(s => {
            if (s != image) {
                s.classList.toggle("selected");
            }
        })
        image.classList.toggle("selected");
    })
})