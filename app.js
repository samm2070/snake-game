//variables

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const gameMusic = new Audio('music.mp3');

let snakeSpeed = 9;
let lastRenderTime = 0;
let score = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
food = { x: 8, y: 15 };




//game function

function main(currentTime) {
    //currentTime : current time when the game runs;
    window.requestAnimationFrame(main);
    gameMusic.play();
    let secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) return;
    // if it's False then the below code will run and if it returns True the program will exits from the function
    // and the function will be recalled by window.requestAnimationFrame(main);            
    /*  if we increase the snake_speed then (1/snake_speed) value will be more lesser than secondsSinceLastRender and the lesser the (1/snake_speed) the less frequently
     the if statement will return true . || And the lastRendertime = currentTime will maintain the difference between the last render means secondsSinceLastRender */
    lastRenderTime = currentTime; //this will creat the time gap
    gameEngine();
}
// if the snake touch the wall or touch itself
function isCollide(snake) {
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

//to avoid food on snake body
function onSnake(snake) {
    for (let i = 0; i < snakeArr.length; i++) {
        if (snake[i].x === food.x && snake[i].y === food.y) {
            return true;
        }
    }
}

function gameEngine() {
    // Updating the snake array and food
    if (isCollide(snakeArr)) {
        gameMusic.pause();
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("Khatam tata bye bye goodbye");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
        gameMusic.play();
    }
    //display the snake and food
    // if food eaten
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score: " + score;

        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        //generating the food
        let a = 2;
        let b = 16;

        do {

            food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

        } while (onSnake(snakeArr)); // there's only one food (the food varible) so it will not creat 2 foods instead it will replace previous one


        // while (onSnake(snakeArr)) {
        //     food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
        // }
    }

    //moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) { snakeArr[i + 1] = { ...snakeArr[i] }; } //commenting this creats another game

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;    // this makes the snake go continously

    board.innerHTML = "";
    // Display the Snake
    snakeArr.forEach((element, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    // Display the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// main logic
window.requestAnimationFrame(main);
//keyboard
window.addEventListener('keydown', e => {
    moveSound.play();
    
    switch (e.key) {
        case "ArrowUp":
            inputDir = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            inputDir = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            inputDir = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            inputDir = { x: 1, y: 0 };
            break;
        default:
            break;
    }
})

