const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const downControls = document.getElementById("downControls");

console.log(videoControls)

videoContainer.addEventListener("mouseenter", (e) => {
    videoControls.classList.add("hoverButton");
});

videoContainer.addEventListener("mouseleave", (e) => {
    videoControls.classList.remove("hoverButton");
})