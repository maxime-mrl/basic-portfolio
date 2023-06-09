const cards = document.querySelectorAll(".content");
const url = window.location.href.split("#");

const images = document.querySelectorAll(".caroussel-content > *");
const autoDefil = document.querySelector(".caroussel .auto");
let progress = document.querySelector(".caroussel .progress")
let actualSlide = 0;
let autoSlideInterval;
initCaroussel()

/* ----------------------- fancy card hover animation ----------------------- */
// (from https://www.youtube.com/watch?v=htGfnF1zN4g&list=PLlNMRtjl29p5QBGgLiK4KdqoWu-QJYolB&index=1)
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

/* ----------------------------- card navigation ---------------------------- */
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

/* -------------------------------- CAROUSSEL ------------------------------- */
function changeSlide(to) {
    images[actualSlide].className = "hidden-slide"; // hide last image
    images[actualSlide].querySelector("video").pause();
    actualSlide += to; // define slide to display for access latter images array
    if (actualSlide < 0) actualSlide = images.length-1;
    else if (actualSlide >= images.length) actualSlide = 0;
    images[actualSlide].className = "active"; // display wanted image
    images[actualSlide].querySelector("video").play();
    // update dot progress
    progress.forEach(dot => {
        dot.className = "dot"
    })
    progress[actualSlide].className = "dot active"
}

function goToSlide(to) {
    if (to >= images.length || to < 0) return;
    pause()
    images[actualSlide].className = "hidden-slide"; // hide last image
    images[actualSlide].querySelector("video").pause();
    actualSlide = to;
    changeSlide(0)
}

function play() {
    autoSlideInterval = setInterval(() => {
        if (document.querySelector(".caroussel .text:hover")) return;
        changeSlide(1)
    }, 6000);
    autoDefil.setAttribute("data-state", "play") // change datastae of play/pause container to update CSS
}
function pause() {
    clearInterval(autoSlideInterval);
    autoDefil.setAttribute("data-state", "pause") // change datastae of play/pause container to update CSS
}

function initCaroussel() {
    if (autoDefil.getAttribute("data-state") == "play") play();
    images.forEach((e, i) => {
        const dot = document.createElement("div")
        dot.className = "dot"
        progress.appendChild(dot)
        dot.addEventListener("click", () => goToSlide(i))
    })
    progress = progress.querySelectorAll("*")
    progress[0].className = "dot active"
}


/* ------------------------------ Check scroll ------------------------------ */
document.addEventListener("scroll", () => { // make sure that it's on top (sometimes on ios embeded browser scroll was possible during load then blocked)
    window.scroll(0,0);
})
setTimeout(() => { // same as for the addeventListener
    window.scroll(0,0);
}, 1000);
