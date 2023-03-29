// fancy card hover animation
const cards = document.querySelectorAll(".content")
cards.forEach(card => {
    card.onmousemove = e => {
        const { currentTarget: target } = e;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--mouse-x", `${x}px`)
        target.style.setProperty("--mouse-y", `${y}px`)
    }
})

function navTo(target) {
    if (!document.getElementById(target)) return -1; // target not found
    cards.forEach(card => {
        card.className = "content hidden"
    })
}
