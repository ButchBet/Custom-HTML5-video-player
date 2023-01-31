const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const downControls = document.getElementById("downControls");

let id = null; // Interval used to show and hidde videoControls
let checkMovement = false; // Boolean to check if the mouse is being moved or not 
let hidde = null; // Timeout to hidde the videoControl
let pos = (-32); // This will help us to move the videoControls naturally

videoContainer.addEventListener("mouseenter", showControls);

videoContainer.addEventListener("mousemove", (e) => {
    if(checkMovement) {
        clearTimeout(hidde);
    
        hidde = setTimeout(() => {
            hiddeControls();

            checkMovement = false;
        }, 2000);
    } else {
        showControls();

        checkMovement = true;
    }
});

videoContainer.addEventListener("mouseleave", () => {
    clearTimeout(hidde);
    
    hiddeControls();
})

// Fucntion to how the videoControls slowly
function showControls() {
    clearInterval(id);

    id = setInterval(frame, 1);

    function frame(){
        if(pos == 8) {
            clearInterval(id);
        } else {
            pos++;

            videoControls.style.bottom = pos + "px";
        }
    }
}

// Function to hidde the videoControls slowly
function hiddeControls() {
    clearInterval(id);

    id = setInterval(frame, 1);

    function frame() {
        if(pos == -32) {
            clearInterval(id);
        } else {
            pos--;
            
            videoControls.style.bottom = pos + "px";
        }
    }
}