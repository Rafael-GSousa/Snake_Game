let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};
let direction = "right";
let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
};

let pontos = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function criarBG() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function criarCobrinha() {
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "white";
        context.fillRect(snake[i].x, snake[i].y, box, box);
        pontos = i;
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

function reposicionarComida() {
    food.x = Math.floor(Math.random() * (canvas.width / box)) * box;
    food.y = Math.floor(Math.random() * (canvas.height / box)) * box;
}

document.getElementById("up").addEventListener("click", () => {
    if (direction !== "down") {
        direction = "up";
    }
});

document.getElementById("left").addEventListener("click", () => {
    if (direction !== "right") {
        direction = "left";
    }
});

document.getElementById("right").addEventListener("click", () => {
    if (direction !== "left") {
        direction = "right";
    }
});

document.getElementById("down").addEventListener("click", () => {
    if (direction !== "up") {
        direction = "down";
    }
});

function iniciarJogo() {
    if (snake[0].x > canvas.width && direction === "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction === "left") snake[0].x = canvas.width;
    if (snake[0].y > canvas.height && direction === "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction === "up") snake[0].y = canvas.height;

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            clearInterval(jogo);
            alert("Game Over! ='(");
            alert("Sua pontuação ==> " + pontos + " pontos");
            location.reload();
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "right") snakeX += box;
    if (direction === "left") snakeX -= box;
    if (direction === "up") snakeY -= box;
    if (direction === "down") snakeY += box;

    if (snakeX !== food.x || snakeY !== food.y) {
        snake.pop();
    } else {
        reposicionarComida();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100);