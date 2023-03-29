// fancy card hover animation (from https://www.youtube.com/watch?v=htGfnF1zN4g&list=PLlNMRtjl29p5QBGgLiK4KdqoWu-QJYolB&index=1)
const cards = document.querySelectorAll(".content");
cards.forEach(card => {
    card.onmousemove = e => { // listen for mous movement for all card
        // extract relative mouse position
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // set css variable
        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    }
})

// card navigation
const url = window.location.href.split("#");
function checkUrl() {
    const splitedUrl = url.length === 2 && url[1].length > 1 ? url : false; // check if an anchor is present to navigate to
    if (splitedUrl) {
        if (navTo(splitedUrl[1])) return; // if anchor recognized sucess
        window.location.href = splitedUrl[0] + "#"; // if anchor isn't recognized remove it
    }
}
checkUrl()

function navTo(target) { // return true if succes
    const toDisplay = document.getElementById("card-" + target);
    if (!toDisplay) return false; // target not found
    cards.forEach(card => {
        card.className = "content invisible";
    })
    window.location.href = `${url[0]}#${target}` // used so if the page reload still land to the same place as before
    toDisplay.className = "content";
    return true;
}

document.addEventListener("scroll", () => { // make sure that it's on top (sometimes on ios embeded browser scroll was possible during load then blocked)
    window.scroll(0,0);
})
setTimeout(() => { // same as for the addeventListener
    window.scroll(0,0);
}, 1000)
