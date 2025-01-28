const mario = document.querySelector(".mario")
const pipe = document.querySelector(".pipe")
const scoreElement = document.querySelector("#score")
const gameContainer = document.querySelector(".game-board")
const gameOverContainer = document.querySelector("#game-over-container")

let jumpCount = 0
let pipePassed = false

const jump = () => {
  mario.classList.add("jump")

  setTimeout(() => {
    mario.classList.remove("jump")
  }, 500)
}

const calculatorJumpPipe = (pipePosition) => {
  if (pipePosition < 0 && !pipePassed) {
    jumpCount++
    pipePassed = true
    scoreElement.textContent = jumpCount
    console.log(`Mario pulou ${jumpCount} cano(s)!`)
  }

  if (pipePosition > 0) {
    pipePassed = false
  }
}

const showGameOver = async () => {
  // Carrega o conteúdo de game-over.html
  const response = await fetch("./game-over.html")
  const gameOverHTML = await response.text()

  // Insere o HTML carregado no contêiner
  gameOverContainer.innerHTML = gameOverHTML

  // Atualiza o placar com o número de pulos
  const scoreValue = document.querySelector("#score-value")
  scoreValue.textContent = jumpCount

  // Adiciona funcionalidade ao botão de reiniciar
  const restartButton = document.querySelector("#restart-button")
  restartButton.addEventListener("click", () => {
    window.location.reload()
  })
}

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft
  const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "")

  if (pipePosition <= 108 && pipePosition > 0 && marioPosition < 70) {
    pipe.style.animation = "none"
    pipe.style.left = `${pipePosition}px`

    mario.style.animation = "none"
    mario.style.bottom = `${marioPosition}px`

    mario.src = "./images/game-over.png"
    mario.style.width = "75px"
    mario.style.marginLeft = "50px"

    clearInterval(loop)
    console.log(`Game Over! Mario pulou ${jumpCount} cano(s).`)

    showGameOver()
  } else {
    calculatorJumpPipe(pipePosition)
  }
}, 10)

document.addEventListener("click", jump)
