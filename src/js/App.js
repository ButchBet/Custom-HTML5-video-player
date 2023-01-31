const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const downControls = document.getElementById("downControls");

let id = null;

videoContainer.addEventListener("mouseenter", showControls);

videoContainer.addEventListener("mouseleave", hiddeControls)

function showControls() {
    let pos = (-32);

    clearInterval(id);

    id = setInterval(frame, 2);

    function frame(){
        if(pos == 8) {
            clearInterval(id);
        } else {
            pos++;

            videoControls.style.bottom = pos + "px";
        }
    }
}

function hiddeControls() {
    let pos = 8;

    clearInterval(id);

    id = setInterval(frame, 2);

    function frame() {
        if(pos == -32) {
            clearInterval(id);
        } else {
            pos--;
            
            videoControls.style.bottom = pos + "px";
        }
    }
}