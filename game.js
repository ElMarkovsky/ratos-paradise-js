let player,playerSpeed;
let rato,ratoSpeed;
let spike1,spike2,spike3,spikeX,spikeY,spikeSpeed;
let zombie,zombieSpeed;
let meds,medsX,medsY;
let score,scoreGoal,scoreScore,scoreBar;
let fuel,fuelLimit,fuelScore,fuelBar;
let hp,hpLimit,hpScore,hpBar;
let ground,groundTexture;
let wall;
let level;
let char1,char2,char3,char4,char5,char6,char7,char8;
let sound1,sound2,sound3,sound4,sound5,sound6,sound7,sound8;
let menu,main,play,controls,lore,exit;
let gameName,keysBox,loreBox,winBox,loseBox,winGameBox,mousePointer;
let mainLoaded,gameLoaded,keysLoaded,loreLoaded,winLoaded,loseLoaded,winGameLoaded;

function preload(){
    char1 = loadImage("assets/background.png");
    char2 = loadImage("assets/dirt.png");
    char3 = loadImage("assets/grass.png");
    char4 = loadImage("assets/gravel.png");
    char5 = loadImage("assets/slime.png");
    char6 = loadImage("assets/rato_spritesheet_complete.png")
    char7 = loadImage("assets/spike.png")
    char8 = loadImage("assets/zombie.png")

    sound1 = loadSound("assets/menu_select.wav")
    sound2 = loadSound("assets/damage.mp3")
    sound3 = loadSound("assets/med_pickup.wav")
    sound4 = loadSound("assets/jetpack.ogg")
    sound5 = loadSound("assets/level_win.wav")
    sound6 = loadSound("assets/level_lose.wav")
    sound7 = loadSound("assets/game_win.ogg")
    sound8 = loadSound("assets/jump.flac")

    menuMusic = loadSound("assets/menu_music.wav")
    gameMusic = loadSound("assets/game_music.wav")
}

function setup(){
	new Canvas(1280, 720);
	displayMode('centered');
    menu = 0;
    level = 1;
    mainLoaded = false;
    gameLoaded = false;
    keysLoaded = false;
    loreLoaded = false;
    winLoaded = false;
    loseLoaded = false;
    winGameLoaded = false;
}

function draw(){
    clear();
    if(menu == 0){
        mainMenu();
    }
    else if(menu == 1){
        playGame();
    }
    else if(menu == 2){
        keysMenu();
    }
    else if(menu == 3){
        loreMenu();
    }
    else if(menu == 4){
        menuMusic.stop();
        noLoop();
    }
    else if(menu == 5){
        winMenu();
    }
    else if(menu == 6){
        loseMenu();
    }
    else if(menu == 7){
        winGameMenu();
    }
}

// Main menu code
function mainMenu(){
    if(mainLoaded == false){
        loadMain();
        mainLoaded = true;
    }

    if(menuMusic.isPlaying() == false){
        menuMusic.play();
        menuMusic.setVolume(0.3);
    }

    background(char1);
    mousePointer.x = mouse.x;
    mousePointer.y = mouse.y;
    
    if(mouse.pressing()){
        if(mousePointer.overlapping(play)){
            menu = 1;
            sound1.play();
            menuMusic.stop();
            clearMenu();
        }
        else if(mousePointer.overlapping(controls)){
            menu = 2;
            sound1.play();
            clearMenu();
        }
        else if(mousePointer.overlapping(lore)){
            menu = 3;
            sound1.play();
            clearMenu();
        }
        else if(mousePointer.overlapping(exit)){
            menu = 4;
            sound1.play();
            clearMenu();
        }
    }


}

// Levels code
function playGame(){
    if(gameLoaded == false){
        loadGame();
        gameLoaded = true;
    }

    if(gameMusic.isPlaying() == false){
        gameMusic.play();
        gameMusic.setVolume(0.3);
    }

    background(char1);
    obstacles();
    movement();
    collectibles();

    scoreBar.remove();
    scoreScore.remove();
    scoreBar = new Sprite(150,45,200,20,);
    scoreBar.collider = "null";
    scoreBar.color = "black";
    scoreScore = new Sprite(50 + 100*score/scoreGoal,45,200*score/scoreGoal,20);
    scoreScore.collider = "null";
    scoreScore.color = "darkred";

    fuelBar.remove();
    fuelScore.remove();
    fuelBar = new Sprite(50 + fuelLimit/2,75,fuelLimit,20,);
    fuelBar.collider = "null";
    fuelBar.color = "black";
    fuelScore = new Sprite(50 + fuel/2,75,fuel,20);
    fuelScore.collider = "null";
    fuelScore.color = "orange";

    hpBar.remove();
    hpScore.remove();
    hpBar = new Sprite(50 + hpLimit,105,2 * hpLimit,20,);
    hpBar.collider = "null";
    hpBar.color = "black";
    hpScore = new Sprite(50 + hp,105,2 * hp,20);
    hpScore.collider = "null";
    hpScore.color = "green";

    scoreBar.draw();
    scoreScore.draw();
    fuelBar.draw();
    fuelScore.draw();
    hpBar.draw();
    hpScore.draw();
    textSize(16);
    textStyle(BOLD);
    fill("white");
    text("Score: " + score + "/" + scoreGoal,55,50);
    text("Energy",55,80);
    text("Health",55,110);
    world.gravity.y = 10;

    if(player.y > height - 70 && !kb.pressing("shift")){
        if(fuel + 0.5 <= fuelLimit){
            fuel += 0.5;
        }
        if(kb.presses("w") || kb.presses("arrowUp") || mouse.pressed("left")){
            world.gravity.y = -500;
            sound8.play();
        }
        else if(player.colliding(ground)){
        world.gravity.y = 0;
        }
    }

    if(player.overlapping(rato)){
        if(fuel + 10 < fuelLimit){
            fuel += 5;
        }
    } 

    if(score == scoreGoal){
        gameMusic.stop();
        if(level == 3){
            level = 1;
            menu = 7;
            sound7.play();
        }
        else{
            level += 1;
            menu = 5;
            sound5.play();
        }
        clearGame();
    }

    if(hp <= 0){
        menu = 6;
        gameMusic.stop();
        sound6.play();
        clearGame();
    }
}

// Controls page code
function keysMenu(){
    if(keysLoaded == false){
        loadKeys();
        keysLoaded = true;
    }

    if(menuMusic.isPlaying() == false){
        menuMusic.play();
        menuMusic.setVolume(0.3);
    }

    background(char1);
    keysBox.draw();
    textSize(30);
    fill("white")
    text("This is how to play señor:",120,150);
    text("To walk left, press A or Left arrow",120,200);
    text("To walk right, press D or Right arrow",120,250);
    text("To jump, press W, Up arrow or LMB",120,300)
    text("To use jetpack, press Space or RMB",120,350);
    text("To sprint, hold Shift",120,400);
    text("Useful tip:",120,500)
    text("If you ran out of energy and need to refill it fast, approach me",120,550)
    mousePointer.x = mouse.x;
    mousePointer.y = mouse.y;

    if(mouse.pressing()){
        if(mousePointer.overlapping(main)){
            menu = 0;
            sound1.play();
            clearKeys();
        }
    }
}

// Lore page code
function loreMenu(){
    if(loreLoaded == false){
        loadLore();
        loreLoaded = true;
    }

    if(menuMusic.isPlaying() == false){
        menuMusic.play();
        menuMusic.setVolume(0.3);
    }

    background(char1);
    loreBox.draw();
    textSize(30);
    fill("white")
    text("¡Hola señor!",120,150);
    text("¿Habla español?",120,200);
    text("¿No?",120,250);
    text("Ok, I am rato. I will keep you company throughout your adventure.",120,300)
    text("You have to save the infected people by collecting medication.",120,350);
    text("¡Buena suerte!",120,400);
    text("One more thing:",120,500)
    text("If you need to refill energy quickly just approach me and I will do it for you!",120,550)
    mousePointer.x = mouse.x;
    mousePointer.y = mouse.y;

    if(mouse.pressing()){
        if(mousePointer.overlapping(main)){
            menu = 0;
            sound1.play();
            clearLore();
        }
    }
}

// Win page code
function winMenu(){
    if(winLoaded == false){
        loadWin();
        winLoaded = true;
    }

    background(char1);
    winBox.draw();
    textSize(50);
    fill("white")
    text("You passed the level!",120,150);
    textSize(30);
    text("Looks like you had a blast with this level.",120,250);
    text("Let's try the next one!",120,300)
    text("Go back to main menu and click play to start the next level.",120,350);
    text("¡Buena suerte!",120,400);
    mousePointer.x = mouse.x;
    mousePointer.y = mouse.y;

    if(mouse.pressing()){
        if(mousePointer.overlapping(main)){
            menu = 0;
            sound1.play();
            clearWin();
        }
    }
}

// Lose page code
function loseMenu(){
    if(loseLoaded == false){
        loadLose();
        loseLoaded = true;
    }

    background(char1);
    loseBox.draw();
    textSize(50);
    fill("white")
    text("You failed the level!",120,150);
    textSize(30);
    text("It seems like the enemies have beat you.",120,250);
    text("Let's start the level over!",120,300)
    text("Go back to main menu and click play to replay the level.",120,350);
    text("¡Buena suerte!",120,400);
    mousePointer.x = mouse.x;
    mousePointer.y = mouse.y;

    if(mouse.pressing()){
        if(mousePointer.overlapping(main)){
            menu = 0;
            sound1.play();
            clearLose();
        }
    }
}

// Game win page
function winGameMenu(){
    if(winGameLoaded == false){
        loadWinGame();
        winGameLoaded = true;
    }

    background(char1);
    winGameBox.draw();
    textSize(50);
    fill("white")
    text("You won the game!",120,150);
    textSize(30);
    text("Congratulations, you managed to save the infected!",120,250);
    text("You can try playing once again.",120,300)
    text("To do that, go back to main menu and click play.",120,350);
    text("¡Adiós!",120,400);
    mousePointer.x = mouse.x;
    mousePointer.y = mouse.y;

    if(mouse.pressing()){
        if(mousePointer.overlapping(main)){
            menu = 0;
            sound1.play();
            clearWinGame();
        }
    }
}

// Loads the main menu
function loadMain(){
    gameName = new Sprite(200,height - 270,300,100);
	gameName.color = "black";
    gameName.stroke = "white";
    gameName.textSize = 40;
    gameName.textColor = "lightgreen";
    gameName.text = "Rato's paradise";
    gameName.collider = "null";

    play = new Sprite(200,height - 190,300,40);
	play.color = "black";
    play.stroke = "white";
    play.textSize = 25;
    play.textColor = "white";
    play.text = "Play";
    play.collider = "null";

    controls = new Sprite(200,height - 140,300,40);
	controls.color = "black";
    controls.stroke = "white";
    controls.textSize = 25;
    controls.textColor = "white";
    controls.text = "Controls"; 
    controls.collider = "null";
	
    lore = new Sprite(200,height - 90,300,40);
	lore.color = "black";
    lore.stroke = "white";
    lore.textSize = 25;
    lore.textColor = "white";
    lore.text = "Game lore";
    lore.collider = "null";

    exit = new Sprite(200,height - 40,300,40);
	exit.color = "black";
    exit.stroke = "white";
    exit.textSize = 25;
    exit.textColor = "white";
    exit.text = "Exit";
    exit.collider = "null";

    mousePointer = new Sprite(mouse.x,mouse.y,0,0);
    mousePointer.color = "black";
    mousePointer.collider = "null";

    player = new Sprite(850,height - 17.5,42,35);
    player.image = char5;
    player.image.scale.x = 7;
    player.image.scale.y = 7;
    player.collider = "null";

    rato = new Sprite(700,height - 18,128,36);
    rato.spriteSheet = char6;
        rato.anis.frameDelay = 8;
        rato.addAnis({
            stand:{ 
                row:0,
                frames:3
            },
            run:{
                row:1,
                frames:3
            }
        });
    rato.ani = "stand";
    rato.ani.scale = 2;
    rato.collider = "null";
}

// Loads the levels
function loadGame(){
    world.gravity.y = 10;
    playerSpeed = 3;
    spikeSpeed = 5;
    medsX = int(random(50,width - 50));
    medsY = int(random(50,height - 70));
    fuelLimit = 200;
    fuel = fuelLimit;
    hpLimit = 100;
    hp = hpLimit;
    score = 0;

    if(level == 1){
        groundTexture = char2;
        spikeSpeed = 3;
        zombieSpeed = 2;
        scoreGoal = 50;
    }
    else if(level == 2){
        groundTexture = char3;
        spikeSpeed = 5;
        zombieSpeed = 3;
        scoreGoal = 70;
    }
    else if(level == 3){
        groundTexture = char4;
        spikeSpeed = 7;
        zombieSpeed = 5;
        scoreGoal = 100;
    }

    player = new Sprite(100,height - 32,42,35);
    player.image = char5;
    player.image.scale.x = 7;
    player.image.scale.y = 7;
    player.collider = "dynamic";
    player.rotationLock = true;

    rato = new Sprite(200,height - 50,128,36);
    rato.spriteSheet = char6;
        rato.anis.frameDelay = 8;
        rato.addAnis({
            stand:{ 
                row:0,
                frames:3
            },
            run:{
                row:1,
                frames:3
            }
        });
    rato.ani.scale = 2;
    rato.collider = "null";
    rato.rotationLock = true;
    
    spikeX = int(random(50,width - 50));
    spikeY = int(random(0,100));
    spike1 = new Sprite(spikeX,-spikeY,24,56);  
    spike1.image = char7;
    spike1.image.scale = 8;
    spike1.collider = "static";

    spikeX = int(random(50,width - 50));
    spikeY = int(random(0,100));
    spike2 = new Sprite(spikeX,-spikeY,24,56);  
    spike2.image = char7;
    spike2.image.scale = 8;
    spike2.collider = "static";

    spikeX = int(random(50,width - 50));
    spikeY = int(random(0,100));
    spike3 = new Sprite(spikeX,-spikeY,24,56);  
    spike3.image = char7;
    spike3.image.scale = 8;
    spike3.collider = "static";

    zombie = new Sprite(500,height - 71,48,78);  
    zombie.image = char8;
    zombie.image.scale = 4;
    zombie.collider = "null";

    ground = new Sprite(width/2,height - 16,width,32);
	ground.image = groundTexture;
	ground.image.scale.x = 2;
    ground.image.scale.y = 1;
    ground.collider = "static";

    scoreBar = new Sprite();
    scoreScore = new Sprite();

    fuelBar = new Sprite();
    fuelScore = new Sprite();

    hpBar = new Sprite();
    hpScore = new Sprite();

    wall = new Sprite(0,height/2,0,height,"static");
    wall = new Sprite(width,height/2,0,height,"static");
    wall = new Sprite(width/2,0,width,0,"static");

    meds = new Group();
    meds.w = 50;
    meds.collider = "static";
    if(level == 1){
        meds.image = "🩹";
    }
    else if(level == 2){
        meds.image = "💊";
    }
    else if(level == 3){
        meds.image = "💉";
    } 
    new meds.Sprite(medsX,medsY)

    menuMusic.stop();
}

// Loads the controls page
function loadKeys(){
    keysBox = new Sprite(width/2,height/2,width - 200,height - 200);
    keysBox.color = "black";
    keysBox.stroke = "white";
    keysBox.collider = "null";

    main = new Sprite(width/2,height - 40,300,40);
	main.color = "black";
    main.stroke = "white";
    main.textSize = 25;
    main.textColor = "white";
    main.text = "Main menu";
    main.collider = "null";

    mousePointer = new Sprite(mouse.x,mouse.y,0,0);
    mousePointer.color = "black";
    mousePointer.collider = "null";

    rato = new Sprite(100,height - 18,128,36);
    rato.spriteSheet = char6;
        rato.anis.frameDelay = 8;
        rato.addAnis({
            stand:{ 
                row:0,
                frames:3
            },
            run:{
                row:1,
                frames:3
            }
        });
    rato.ani = "stand";
    rato.ani.scale = 2;
    rato.collider = "null";
}

// Loads the lore page
function loadLore(){
    loreBox = new Sprite(width/2,height/2,width - 200,height - 200);
    loreBox.color = "black";
    loreBox.stroke = "white";
    loreBox.collider = "null";

    main = new Sprite(width/2,height - 40,300,40);
	main.color = "black";
    main.stroke = "white";
    main.textSize = 25;
    main.textColor = "white";
    main.text = "Main menu";
    main.collider = "null";

    mousePointer = new Sprite(mouse.x,mouse.y,0,0);
    mousePointer.color = "black";
    mousePointer.collider = "null";

    rato = new Sprite(100,height - 18,128,36);
    rato.spriteSheet = char6;
        rato.anis.frameDelay = 8;
        rato.addAnis({
            stand:{ 
                row:0,
                frames:3
            },
            run:{
                row:1,
                frames:3
            }
        });
    rato.ani = "stand";
    rato.ani.scale = 2;
    rato.collider = "null";
}

// Loads the win page
function loadWin(){
    winBox = new Sprite(width/2,height/2,width - 200,height - 200);
    winBox.color = "black";
    winBox.stroke = "white";
    winBox.collider = "null";

    main = new Sprite(width/2,height - 40,300,40);
	main.color = "black";
    main.stroke = "white";
    main.textSize = 25;
    main.textColor = "white";
    main.text = "Main menu";
    main.collider = "null";

    mousePointer = new Sprite(mouse.x,mouse.y,0,0);
    mousePointer.color = "black";
    mousePointer.collider = "null";
}

//  Loads the lose page
function loadLose(){
    loseBox = new Sprite(width/2,height/2,width - 200,height - 200);
    loseBox.color = "black";
    loseBox.stroke = "white";
    loseBox.collider = "null";

    main = new Sprite(width/2,height - 40,300,40);
	main.color = "black";
    main.stroke = "white";
    main.textSize = 25;
    main.textColor = "white";
    main.text = "Main menu";
    main.collider = "null";

    mousePointer = new Sprite(mouse.x,mouse.y,0,0);
    mousePointer.color = "black";
    mousePointer.collider = "null";
}

// Loads the game win page
function loadWinGame(){
    winGameBox = new Sprite(width/2,height/2,width - 200,height - 200);
    winGameBox.color = "black";
    winGameBox.stroke = "white";
    winGameBox.collider = "null";

    main = new Sprite(width/2,height - 40,300,40);
	main.color = "black";
    main.stroke = "white";
    main.textSize = 25;
    main.textColor = "white";
    main.text = "Main menu";
    main.collider = "null";

    mousePointer = new Sprite(mouse.x,mouse.y,0,0);
    mousePointer.color = "black";
    mousePointer.collider = "null";
}

// Clears the main menu
function clearMenu(){
    gameName.remove();
    play.remove();
    controls.remove();
    lore.remove();
    exit.remove();
    mousePointer.remove();
    player.remove();
    rato.remove();
    mainLoaded = false;
}

// Clears the levels
function clearGame(){
    world.gravity.y = 0;
    player.remove();
    rato.remove();
    spike1.remove();
    spike2.remove();
    spike3.remove();
    zombie.remove();
    ground.remove();
    scoreBar.remove();
    scoreScore.remove();
    fuelBar.remove();
    fuelScore.remove();
    hpBar.remove();
    hpScore.remove();
    wall.remove();
    meds.remove();
    gameLoaded = false;
}

// Clears the control menu
function clearKeys(){
    keysBox.remove();
    main.remove();
    mousePointer.remove();
    rato.remove();
    keysLoaded = false;
}

// Clears the lore page
function clearLore(){
    loreBox.remove();
    main.remove();
    mousePointer.remove();
    rato.remove();
    loreLoaded = false;
}

// Clears the win page
function clearWin(){
    winBox.remove();
    main.remove();
    mousePointer.remove();
    winLoaded = false;
}

// Clears the lose page
function clearLose(){
    loseBox.remove();
    main.remove();
    mousePointer.remove();
    loseLoaded = false;
}

// Clears the game win page
function clearWinGame(){
    winGameBox.remove();
    main.remove();
    mousePointer.remove();
    winGameLoaded = false;
}

// All below is related to the levels
function movement(){
    if(kb.pressing("a") || kb.pressing("arrowLeft")){
        player.vel.x = -playerSpeed;
        player.mirror.x = false;
    }
    else{
        if(player.vel.x < 0){
            player.vel.x += 0.05;
        }
    }

    if(kb.pressing("d") || kb.pressing("arrowRight")){
        player.vel.x = playerSpeed;
        player.mirror.x = true;

    }
    else{
        if(player.vel.x > 0){
            player.vel.x -= 0.05;
        }
    }

    if(kb.pressing("shift") && fuel - 2 > 0){
        playerSpeed = 5;
        fuel -= 2;
    }
    else{
        playerSpeed = 3;
    }

    if((kb.pressing("space") || mouse.pressing("right")) && fuel - 4 > 0){
            sound4.play();
            sound4.setVolume(0.3);
            player.vel.y = -4;
            fuel -= 4;
    }
    else if(sound4.isPlaying() == true){
        sound4.stop();
    }

    if(rato.x > player.x && rato.x - 100 > player.x || rato.x < player.x && rato.x + 100 < player.x){
    rato.moveTowards(player.x,rato.y,0.01)
    rato.ani = "run"
    rato.ani.scale = 2;
    }
    else{
        rato.vel.x = 0
        rato.ani = "stand"
        rato.ani.scale = 2;
    }

    if(rato.vel.x < 0){
        rato.mirror.x = true;
    }
    else if(rato.vel.x > 0){
        rato.mirror.x = false;
    }
}

function obstacles(){
    spike1.y += spikeSpeed;
    spike2.y += spikeSpeed;
    spike3.y += spikeSpeed;

    if(spike1.y > height){
        spike1.remove();
        spikeX = int(random(50,width - 50));
        spikeY = int(random(0,100));
        spike1 = new Sprite(spikeX,-spikeY,24,56);
        spike1.image = char7;
        spike1.image.scale = 8;
        spike1.collider = "null";
    }

    if(spike2.y > height){
        spike2.remove();
        spikeX = int(random(50,width - 50));
        spikeY = int(random(0,100));
        spike2 = new Sprite(spikeX,-spikeY,24,56);
        spike2.image = char7;
        spike2.image.scale = 8;
        spike2.collider = "null";
    }

    if(spike3.y > height){
        spike3.remove();
        spikeX = int(random(50,width - 50));
        spikeY = int(random(0,100));
        spike3 = new Sprite(spikeX,-spikeY,24,56);
        spike3.image = char7;
        spike3.image.scale = 8;
        spike3.collider = "null";
    }
    
    if(player.overlaps(spike1) || player.overlaps(spike2) || player.overlaps(spike3)){
        hp -= 10;
        sound2.play();
    }

    zombie.x += zombieSpeed;

    if(zombie.x >= width || zombie.x <= 0){
        zombieSpeed = -zombieSpeed;
    }

    if(zombieSpeed > 0){
        zombie.mirror.x = false;
    }
    else if(zombieSpeed < 0){
        zombie.mirror.x = true;
    }

    if(player.overlaps(zombie)){
        hp -= 10;
        sound2.play();
    }
}

function collectibles(){
    if(player.overlaps(meds)){
        sound3.play();
        meds.removeAll();
        medsX = int(random(50,width - 50));
        medsY = int(random(height - 300,height - 70));
        meds.w = 50;
        meds.collider = "n";
        if(level == 1){
            meds.image = "🩹";
        }
        else if(level == 2){
            meds.image = "💊";
        }
        else if(level == 3){
            meds.image = "💉";
        }
        new meds.Sprite(medsX,medsY);
        score += 1;
    }
}