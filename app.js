let renderTime = 0
let gameOver = false
const snakeSpeed =7
const snake = [ { x: 10, y:10} ]
let food = randomFoodLocation()
const growth_rate = 1
let newBody = 0
let direction = { x: 0, y: -1}
let lastDirection = { x: 0, y: 0}
let score = 0

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp' :
            if (lastDirection.y !== 0) break
           direction = { x:0, y:-1}
           break 
        case 'ArrowDown' :
            if (lastDirection.y !== 0) break
           direction = { x:0, y:1}
           break 
        case 'ArrowLeft' :
            if (lastDirection.x !== 0) break
           direction = { x:-1, y:0}
           break 
        case 'ArrowRight' :
            if (lastDirection.x !== 0) break
           direction = { x:1, y:0}
           break 
    }
})



function getDirection () { 
    lastDirection = direction
    return direction;
}

function getSnakeHead() {
    return snake[0]
}

function snakeCollision() {
    return snakePass(snake[0], {ignoreHead: true})
}

const gameBoard = document.getElementById('game-board')

function state () {
    bodyGrowth()
    const direction = getDirection()
    for(let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = {...snake[i] }
    }
    
    snake[0].x += direction.x
    snake[0].y += direction.y
    gameBoard.innerHTML = ''
}



function snakeBody (gameBoard) {
    snake.forEach(segemnt => {
        const snakeLength = document.createElement('div')
        snakeLength.style.gridRowStart = segemnt.y
        snakeLength.style.gridColumnStart = segemnt.x
        snakeLength.classList.add('snake')
        gameBoard.appendChild(snakeLength)
    })
}


function placeFood (gameBoard) {
    const foodEle = document.createElement('div')
    foodEle.style.gridRowStart = food.y
    foodEle.style.gridColumnStart = food.x
    foodEle.classList.add('food')
    gameBoard.appendChild(foodEle)
}


function snakePass(location, {ignoreHead = false} = {}) {
    return snake.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return equalLoaction(segment, location)
    })
}
function equalLoaction(location1, location2) {
    return (location1.x === location2.x && location1.y === location2.y)
}

function growSnake(amount) {
    newBody += amount
}

function randomGridLocation(){
    return {
        x: Math.floor(Math.random() * 19) + 1,
        y: Math.floor(Math.random() * 19) + 1    
    }
}

function outsideBoard(location) {
    return(
        location.x < 1 || location.x > 19 ||
        location.y < 1 || location.y > 19
        )
    }
    
    
    function randomFoodLocation(){
        let newFoodLocation
        while(newFoodLocation == null || snakePass(newFoodLocation)) {
            newFoodLocation = randomGridLocation()
        }
        return newFoodLocation
    }
    
    function bodyGrowth() {
        for(let i = 0; i < newBody; i ++) {
            snake.push({...snake[snake.length - 1]})
        }
        
    newBody = 0
}


function checkDeath() {
    gameOver = outsideBoard(getSnakeHead()) || snakeCollision()
}

const element = document.getElementById('start');
    element.addEventListener('click', tick);
function tick (currentTime) {
    if (gameOver) {
        if (confirm('Game Over. Press ok to restart')) {
        window.location = './'
    }
    return
}

    window.requestAnimationFrame(tick)
    const timeSinceLastRender = (currentTime - renderTime) / 1000
    if (timeSinceLastRender < 1 / snakeSpeed) return
    
    console.log('Render')
    renderTime = currentTime
    
    state()
    snakeBody(gameBoard)
    placeFood(gameBoard)
    if (snakePass(food)) {
       growSnake(growth_rate)
       food = randomFoodLocation();
    }
    checkDeath()
    
    
}
// window.requestAnimationFrame(tick)

