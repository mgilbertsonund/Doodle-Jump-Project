// document.addEventListener('DOMContentLoaded', () => {

//})
// an alternative is to put js file at bottom of html

// connects with grid that is already created
const grid = document.querySelector('.grid');
// since doodler was not created, can create here in a div
const doodler = document.createElement('div');
// setting the doodler 50 px to the left and communictaes with the doodler.style.left to help doodler move left
let doodlerLeftSpace = 50;
let doodlerBottomSpace = 250;
// if game is over then it wont run
isGameOver = false;
let platformCount = 5;
let platforms = [];
let upTimerId;
let downTimerId;
let isJumping = true;

// create the doodler
function createDoodler() {
    // grid is the parent, so this will put doodler div inside of grid div
    grid.appendChild(doodler);
    // this will create doodler on screen by using CSS styling
    doodler.classList.add('doodler');
    doodlerLeftSpace = platforms[0].left;
    doodler.style.left = doodlerLeftSpace + 'px';
    doodler.style.bottom = doodlerBottomSpace + 'px';

}
//createDoodler();


// 
class Platform {
    constructor(newPlatformBottom) {
        this.bottom = newPlatformBottom;
        // 315 comes from the grid width - platform width (400-85)
        this.left = Math.random() * 315;
        this.visual = document.createElement('div');

        const visual = this.visual;
        visual.classList.add('platform');
        visual.style.left = this.left + 'px';
        visual.style.bottom = this.bottom + 'px';
        grid.appendChild(visual);

    }
}

// create the platforms
function createPlatforms() {
    // will loop through creating platforms that are spaced out
    for(let i = 0; i < platformCount; i++) {
        // creates the gaps in between platforms
        // 600 is used from the grid px and divivde by number of platforms
        let platformGap = 600 / platformCount;
        // creates a new platform on top of the first one
        // first one: 100 * 0 * 120 = 100
        // second: 100 * 1 * 120 = 220... and so on
        let newPlatformBottom = 100 + i * platformGap;
        let newPlatform = new Platform(newPlatformBottom);
        platforms.push(newPlatform);
        console.log(platforms);
    }
}

function movePlatforms() {
    // will help to only move platforms is doodler is above 200px
    if(doodlerBottomSpace > 200) {
        platforms.forEach(platform => {
            platform.bottom -= 4;
            let visual = platform.visual;
            visual.style.bottom = platform.bottom + 'px';
        })
    }
}

function jump() {
    clearInterval(downTimerId);
    upTimerId = setInterval(function () {
        doodlerBottomSpace += 20;
        doodler.style.bottom = doodlerBottomSpace + 'px';
        if (doodlerBottomSpace > 350) {
            fall();
        }
    }, 30)
}

function fall() {
    clearInterval(upTimerId);
    downTimerId = setInterval(function() {
        doodlerBottomSpace -= 5;
        doodler.style.bottom = doodlerBottomSpace + 'px';
        if (doodlerBottomSpace <= 0) {
            gameOver();
        }
    }, 30)
}

function gameOver() {
    console.log('game over');
    isGameOver = true;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
}

function control() {
    if(e.key === "ArrowLeft") {
        // move left
    } else if (e.key === "Arrow Right") {
        // move right
    } else if (e.key === "ArrowUp") {
        // move straight
    }
}

function start() {
    // another way to write is !isGameOver
    // just checking to see if game is not over
    if(isGameOver === false) {
        createPlatforms();
        createDoodler();
        setInterval(movePlatforms, 30);
        jump();
    }
}

// attach to a buton
start();
