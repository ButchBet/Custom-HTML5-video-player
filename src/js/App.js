const videoContainer = document.getElementById("videoContainer");

const videoControls = document.getElementById("videoControls");

const pausePlayButton = document.getElementById("pausePlayButton");

const videoScreen = document.getElementById("videoScreen");

const volumeRange = document.getElementById("volumeRange");

const speedRange = document.getElementById("speedRange");

const skipLeft = document.getElementById("skipLeft");

const skipRight = document.getElementById("skipRight");

const progressBar = document.getElementById("progressBar");

const progressContent = document.getElementById("progressContent");

let show = null; // Interval used to show and hidde videoControls

let checkMovement = false; // Boolean to check if the mouse is being moved 

let hidde = null; // Timeout to hidde the videoControl

let position = null;// This will help us to move the videoControls naturally

let rate = null; // This will help us to calculate how many seconds of the videoScreen ar represented in progressBar pixels and vice versa

updateBottomPosition();

updateProgressContent(videoScreen.currentTime * rate);

// Code to animate the show and hidde of the videoControls
videoContainer.addEventListener("mouseenter", showControls);

videoContainer.addEventListener("mousemove", checkMosueMovements);

videoContainer.addEventListener("mouseleave", () => {
    clearTimeout(hidde);
    
    hiddeControls();
});

videoContainer.addEventListener("click", checkMosueMovements);

window.addEventListener("resize", () => {
    updateRate();

    updateBottomPosition()
});

function showControls() {
    clearInterval(show);

    show = setInterval(frame, 1);

    function frame(){
        if(position == 8) {
            clearInterval(show);
        } else {
            position++;

            videoControls.style.bottom = position + "px";
        }
    }
}

function hiddeControls() {
    clearInterval(show);

    show = setInterval(frame, 1);

    function frame() {
        if(position == -37) {
            clearInterval(show);
        } else if(position == -21 && window.outerWidth >= 599) {
            clearInterval(show);
        } else {
            position--;
            
            videoControls.style.bottom = position + "px";
        }
    }
}

function updateBottomPosition() {
    if(window.outerWidth < 599) {
        position = (-37); 
        
        videoControls.style.bottom = position + "px";
    } else {
        position = (-21); 

        videoControls.style.bottom = position + "px";
    }

    updateRate();
}

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

// Code to add the pause and play event in the respective buttons 
pausePlayButton.addEventListener("click", updateVideoStatus);

videoScreen.addEventListener("click", updateVideoStatus);

function updateVideoStatus() {
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

// Code to add the change of the volume and speed correctly with the value and speed range elements
volumeRange.addEventListener("change", updateVolume);

speedRange.addEventListener("change", updateSpeed);

function updateVolume(e) {
    const volume = volumeRange.valueAsNumber / 100;

    videoScreen.volume = volume;
}

function updateSpeed(e) {
    const speed = speedRange.valueAsNumber / 100;

    videoScreen.playbackRate = speed;
}

// Code to add the skip actions with each arrows
skipLeft.addEventListener("click", skipToLeft);

skipRight.addEventListener("click", skipToRight);

function skipToLeft() {
    videoScreen.currentTime -= 10;

    if(videoScreen.currentTime < 0) {
        videoScreen.currentTime = 0;
    }
}

function skipToRight() {
    videoScreen.currentTime += 10;

    if(videoScreen.currentTime > videoScreen.duration) {
        videoScreen.currentTime = videoScreen.duration;
    }
}

// Code to go showing the video progress indicator 
progressBar.addEventListener("click", (e) => {
    updateCurrentTime(e.layerX / rate);

    updateProgressContent(e.layerX);
});

videoScreen.addEventListener("timeupdate", (e) => {
    updateProgressContent(e.target.currentTime * rate);
})

function updateCurrentTime(currentTime) {
    videoScreen.currentTime = currentTime;
}

function updateRate() {
    rate = progressBar.clientWidth / videoScreen.duration;
}

function updateProgressContent(progress) {
    progressContent.style.width =  progress + "px";
}