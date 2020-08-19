'use strict'

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const shotObj = {
    className : 'shot1',
    imgUrl : 'fire.png',
    height: 25,
    width: 25,
};
let enemy1 = {
    className : 'allBadAir',
    imgUrl : "war1.png",
    height : 50,
    width : 50,
    top :  -200,
    left : getRandomInt(200, 1700),
};

let shotLeft = null;
let shotTop = null;

let onePx = 1 + 'px';
let shotLeft2 = +shotLeft;
let shotTop2 = +shotTop;

let score = 1000;
counter.textContent = score;
let buy = false;

//create Bad Air

function createEnemy() {
    let enemyBad = document.createElement('div');
    enemyBad.classList.add(enemy1.className);
    enemyBad.style.height = enemy1.height +'px';
    enemyBad.style.width = enemy1.width + 'px';
    enemyBad.style.backgroundImage = "url(war"+getRandomInt(1,6)+".png)";
    document.body.append(enemyBad);

    enemyBad.style.top = enemy1.top + onePx + 'px';
    enemyBad.style.left = enemy1.left + onePx + 'px';
    setInterval(function () {
        enemyBad.style.left =  getRandomInt(300, 1200) + 'px';
    },2000);
    setTimeout(function () {
        enemyBad.remove();
    },13000);




    return enemyBad;
}

createEnemy();



let count = 0;

const intervalId = setInterval(function(){
    count++;
    if(count === 30){
        clearInterval(intervalId);
    }
    createEnemy();
}, 2000);


// Shot



function fireShot(event) {
    let pos = 0;
    let shot = document.createElement('div');
    document.body.append(shot);
    shot.classList.add(shotObj.className);
    shot.style.height = shotObj.height + 'px';
    shot.style.width = shotObj.width + 'px';
    shot.style.display = 'block';
    shotLeft = shot.style.left = event.clientX + 56 + 'px';
    shotTop = shot.style.top = event.clientY + 10 + 'px';

    if (buy === true){
        shot.style.left = event.clientX + 40 + 'px';
    }

    if (buy === true){
        console.log('!');
        let pos = 0;
        let shot = document.createElement('div');
        document.body.append(shot);
        shot.classList.add(shotObj.className);
        shot.style.height = shotObj.height + 'px';
        shot.style.width = shotObj.width + 'px';
        shot.style.display = 'block';
        shot.style.left = event.clientX + 70 + 'px';
        shot.style.top = event.clientY + 10 + 'px';

        setTimeout(function () {
            shot.style.top = pos + 'px';
            shotLeft += event.clientX;
            shotTop += event.clientY;
            setTimeout(function () {
                shot.remove();
            },2000);
        },50);
    }

    setTimeout(function () {
        shot.style.top = pos + 'px';
        shotLeft += event.clientX;
        shotTop += event.clientY;
        setTimeout(function () {
            shot.remove();
        },2000);
    },50);


}



document.addEventListener('click', fireShot);


// check shot


function deadAir() {
    let deadShot = document.elementFromPoint(enemy1.left, enemy1.top);

    if (deadShot.classList.contains('shot') === true){
        console.log('!');
    }
}


// MOve Air main

function moveAir(event) {
    airGalaxy.style.top = event.clientY + 30 +  'px';
    airGalaxy.style.left = event.clientX + 30 + 'px';
}

document.addEventListener('mousemove', moveAir);

// Main Menu

function shopOpen(){
    shopBox.style.right = 100 + 'px';
    shopBox.style.display = 'block';
    shopBox.classList.toggle('menuBox');
}
function optionsOpen(){
    optionsBox.style.right = 100 + 'px';
    optionsBox.style.display = 'block';

}
function referenceOpen(){
    referenceBox.style.right = 100 + 'px';
    referenceBox.style.display = 'block';
}

function playPlayer(){
    Player.muted = true;
    btnMute.backgroundImage = "url('mute.png')"
}

function newBg(){
    wrapper.style.backgroundImage = "url('media/img/main2.jpg')";
}
function oldBg(){
    wrapper.style.backgroundImage = "url('media/img/main.jpg')";
}

function dblShot(){
    score = score - 150;
    buy = true;
    counter.textContent = score;
}

updateShot.addEventListener('click', dblShot);
optionBg.addEventListener('click',newBg);
optionBgOld.addEventListener('click',oldBg);
btnMute.addEventListener('click',playPlayer);
shop.addEventListener('click', shopOpen);
options.addEventListener('click', optionsOpen);
reference.addEventListener('click', referenceOpen);
