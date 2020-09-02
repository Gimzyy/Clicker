'use strict';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

let displayHeight = document.body.clientHeight;
let displayWidth = document.body.clientWidth;

let score = 0;



function createEnemy(enemyConf) {
        let enemyBad = document.createElement('div');
        enemyBad.classList.add(enemyConf.className);
        enemyBad.style.left = enemyConf.x + 'px';
        enemyBad.style.top = enemyConf.y + 'px';
        enemyBad.style.backgroundImage = "url("+enemyConf.imgUrl+")" ;
        enemyBad.style.height = enemyConf.height + 'px';
        enemyBad.style.width = enemyConf.width + 'px';
        document.body.append(enemyBad);

        let addEnemy = {
            div: enemyBad,
            x: enemyConf.x,
            y: enemyConf.y,
            height: enemyConf.height,
            width: enemyConf.width,
            direction: null,
            counter: 0,

            step: function () {
                this.y += 10;
                this.div.style.top =this.y + 'px';

                if(this.y >= displayHeight){
                    this.div.remove();
                    // document.body.style.filter = 'blur(5px)';
                }
                

                if (this.direction === null || this.counter === 20){
                    let rnd = getRandomInt(0,2);
                    this.direction = rnd === 0 ? 'left' : 'right';
                    this.counter = 0;
                }
                else if (this.direction === 'left'){
                    this.div.style.left = this.x - getRandomInt(100,250) + 'px';
                }
                else if(this.direction === 'right'){
                    this.div.style.left = this.x + getRandomInt(100,250) + 'px';
                }
                this.counter++;
            }
        };

    return addEnemy;
}


function createMainAir(mainAirConf) {
    let mainAir = document.createElement('div');
    mainAir.id = (mainAirConf.className);
    mainAir.style.top = mainAirConf.y + 'px';
    mainAir.style.left = mainAirConf.x + 'px';
    mainAir.style.backgroundImage = "url("+mainAirConf.imgUrl+")";
    mainAir.style.height = mainAirConf.height + 'px';
    mainAir.style.width = mainAirConf.width + 'px';
    document.body.append(mainAir);

    let addMainAir = {
        div: mainAir,
        x: mainAirConf.x,
        y: mainAirConf.y,

        step: function (x,y) {
            this.x = x ;
            this.y = y;
            this.div.style.top = this.y + 'px';
            this.div.style.left = this.x + 'px';
        }
    };



    return addMainAir;
}


function createBullet(mainBulletConf) {
    let bulletMain = document.createElement('div');
    bulletMain.classList.add(mainBulletConf.className);
    bulletMain.style.top = mainBulletConf.y + 'px';
    bulletMain.style.left = mainBulletConf.x + 'px';
    bulletMain.style.backgroundImage = "url("+mainBulletConf.imgUrl+")";
    bulletMain.style.height = mainBulletConf.height + 'px';
    bulletMain.style.width = mainBulletConf.width + 'px';
    document.body.append(bulletMain);

    let addBulletMain = {
        div: bulletMain,
        x: mainBulletConf.x ,
        y: mainBulletConf.y ,
        step: function  (){
            // if(this.x === undefined || this.x === null || this.y === undefined || this.y === null){
            //     return;
            // }
            this.y -= 20;
            this.div.style.left = this.x + 'px';
            this.div.style.top = this.y+ 'px';

            if (this.y <= 0){
                this.div.remove();
            }

        },

    };

    return addBulletMain;
}


function createDblBullet(mainBulletConf2) {
    let bulletMain2 = document.createElement('div');
    bulletMain2.classList.add(mainBulletConf2.className);
    bulletMain2.style.top = mainBulletConf2.y + 'px';
    bulletMain2.style.left = mainBulletConf2.x + 'px';
    bulletMain2.style.backgroundImage = "url("+mainBulletConf2.imgUrl+")";
    bulletMain2.style.height = mainBulletConf2.height + 'px';
    bulletMain2.style.width = mainBulletConf2.width + 'px';
    bulletMain2.style.display = 'none';
    document.body.append(bulletMain2);

    let addDblBulletMain = {
        div: bulletMain2,
        x: mainBulletConf2.x,
        y: mainBulletConf2.y,
        bullTop: 0,
        step: function () {
            this.x = mouseX;
            this.y = mouseY;
            this.div.style.left = this.x + 40 + 'px';
            this.div.style.top = this.y + -20 + 'px';
        }
    };

    return addDblBulletMain;
}



function clickerFunction() {
    return {
        mouseX : null,
        mouseY : null,
        mainAir: null,
        setMouseXY: function(event) {
            this.mouseY = event.pageY;
            this.mouseX = event.pageX;
            this.mainAir.step(this.mouseX,this.mouseY);
        },
        shot: function(event) {
            let bulConf = this.config.bulletConfig;
            bulConf.x = event.pageX + 26;
            bulConf.y = event.pageY - 20;
            this.bulletMain = createBullet(bulConf);
            this.shots.push(this.bulletMain);
        },
        config: {},
        enemies: [],
        shots: [],
        timer: null,
        timer2: null,
        run: function(){

            // if (this.enemies.x === this.shots.x && this.enemies.y === this.shots.y){
            //     console.log('!!!!!')
            // }
           this.timer = setInterval( () => {
                for (let i = 0; i < this.enemies.length; i++){
                    let tmpEnemy = this.enemies[i];
                    tmpEnemy.step();

                        for (let j = 0; j < this.shots.length; j++){
                            let tmpShot = this.shots[j];
                            tmpShot.step();
                            if (tmpShot.x >= tmpEnemy.x  && tmpShot.x <= tmpEnemy.x + tmpEnemy.width && tmpShot.y >= tmpEnemy.y &&  tmpShot.y <= tmpEnemy.y + tmpEnemy.height){
                                console.log('!!!!!');
                                counter.textContent = score++;
                                delete tmpEnemy.step();
                                this.enemies[i].div.style.backgroundImage = "url('media/img/explosion.png')";

                            }
                        }
                }

                // this.bulletMain2.step();
            },150)


        },

        init: function(configuration) {


            this.config = configuration;
            this.mainAir = createMainAir(this.config.userConfig);
            this.bulletMain2 = createDblBullet(this.config.dblBulletConfig);

            console.log(this.config);


            for (let i = 0; i < this.config.enemiesConfig.length; i++){
                for (let j = 0; j < 25; j++){
                    let tmp = createEnemy(this.config.enemiesConfig[i]);
                    this.enemies.push(tmp);

                }
            }

                console.log(this.shots);
                console.log(this.enemies);
            document.addEventListener('mousemove', (event) => this.setMouseXY(event));
            document.addEventListener('click',(event) => this.shot(event));
        },



    };
}

let configuration = config;
let game = clickerFunction();

game.init(configuration);

game.run();


//
// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min)) + min;
// }
//
// //Массив объектов
//
// const arrayBad = [
//
//
// ]
//
// var factoryConfig = {
//     type: 'enemy',
//     className: '',
//     imgUrl: '',
//     x: 0,
//     y: 0,
//
// }
//
//
//
// function createAllDiv(factoyConfi) {
//
//     switch (factoyConfi.type) {
//         case enemy1:
//             return createEnemy1(factoyConfi.x, factoyConfi.y);
//
//     }
// }
//
//
//
//
//
//
// function createEnemy1(x, y, image) {
//     let bad1 = document.createElement('div');
//     bad1.classList.add(enemy1.className);
//     document.append('bad1');
//     bad1.style.top = enemy1.position.y + 'px';
//     bad1.style.left = enemy1.position.x + 'px';
//     bad1.style.backgroundImage = enemy1.imgUrl;
//     return {
//         div: bad1,
//             position:{
//         y: y,
//             x: getRandomInt(200, 1300),
//     },
//         imgUrl: true,
//             className: 'allBadAir',
//     }
// }
//
//
//

