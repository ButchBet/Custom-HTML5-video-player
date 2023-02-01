const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");
const pausePlayButton = document.getElementById("pausePlayButton");
const videoScreen = document.getElementById("videoScreen");

// Code to animate the show and hidde of the videoControls
let id = null; // Interval used to show and hidde videoControls
let checkMovement = false; // Boolean to check if the mouse is being moved or not 
let hidde = null; // Timeout to hidde the videoControl

// let pos = (-21); // This will help us to move the videoControls naturally
let pos = null;// This will help us to move the videoControls naturally
setBottomPosition();

videoContainer.addEventListener("mouseenter", showControls);

videoContainer.addEventListener("mousemove", checkMosueMovements);

videoContainer.addEventListener("mouseleave", () => {
    clearTimeout(hidde);
    
    hiddeControls();
});

videoContainer.addEventListener("click", checkMosueMovements);

window.addEventListener("resize", setBottomPosition);

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
        if(pos == -37) {
            clearInterval(id);
        } else if(pos == -21 && window.outerWidth >= 599) {
            clearInterval(id);
        } else {
            pos--;
            
            videoControls.style.bottom = pos + "px";
        }
    }
}

// Function to set bottom position when the width of the window changes
function setBottomPosition() {
    if(window.outerWidth < 599) {
        pos = (-37); 
        
        videoControls.style.bottom = pos + "px";
    } else {
        pos = (-21); 

        videoControls.style.bottom = pos + "px";
    }
}

// Function to check if the mosue has been moved or has been clicked
function checkMosueMovements() {
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
}

// Code to add the pause and play event in the respective buttons and the space key
pausePlayButton.addEventListener("click", changeVideoStatus);

// Function to change the video status from pause to play and vice versa, also to change the src and alt attributes of the pausePlayButton
function changeVideoStatus(e) {
    console.log(videoScreen);
    if(videoScreen.paused) {
        pausePlayButton.src = "./src/assets/pause.png";

        pausePlayButton.alt = "Pause button";
        
        videoScreen.play();
    } else {
        pausePlayButton.src = "./src/assets/play.png";
        
        pausePlayButton.alt = "Play button";
        
        videoScreen.pause();
    }
}