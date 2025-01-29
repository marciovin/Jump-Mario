const mario = document.querySelector(".mario")
const pipe = document.querySelector(".pipe")
const scoreElement = document.querySelector("#score")
const gameContainer = document.querySelector(".game-board")
const gameOverContainer = document.querySelector("#game-over-container")

let jumpCount = 0
let pipePassed = false
let pipeSpeed = 1.5

const jump = () => {
  mario.classList.add("jump")

  setTimeout(() => {
    mario.classList.remove("jump")
  }, 500)
}

const increaseSpeed = () => {
  if (jumpCount === 5) {
    pipeSpeed = 1.4
    console.log("Aumentou a velocidade para 2.5s")
  } else if (jumpCount === 10) {
    pipeSpeed = 1.3
    console.log("Aumentou a velocidade para 2s")
  } else if (jumpCount === 15) {
    pipeSpeed = 1.2
    console.log("Aumentou a velocidade para 1.5s")
  } else if (jumpCount === 20) {
    pipeSpeed = 1
    console.log("Aumentou a velocidade para 1s")
  } else if (jumpCount === 25) {
    pipeSpeed = 0.5
    console.log("Aumentou a velocidade para 1s")
  } else if (jumpCount === 30) {
    pipeSpeed = 0.4
    console.log("Aumentou a velocidade para 1s")
  } else if (jumpCount === 40) {
    pipeSpeed = 0.3
    console.log("Aumentou a velocidade para 1s")
  } else if (jumpCount === 50) {
    pipeSpeed = 0.2
    console.log("Aumentou a velocidade para 1s")
  } else if (jumpCount === 60) {
    pipeSpeed = 0.1
    console.log("Aumentou a velocidade para 1s")
  }

  // Reinicia a animação com a nova velocidade sem travar o cano
  pipe.style.animation = "none"
  void pipe.offsetWidth // Força um reflow para reiniciar a animação
  pipe.style.animation = `pipe-animation ${pipeSpeed}s linear infinite`
}

const calculatorJumpPipe = (pipePosition) => {
  if (pipePosition < 0 && !pipePassed) {
    jumpCount++
    pipePassed = true
    scoreElement.textContent = jumpCount
    console.log(`Mario pulou ${jumpCount} cano(s)!`)
    increaseSpeed() // Chama a função para aumentar a velocidade
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
}, 20)

document.addEventListener("click", jump)
document.addEventListener("keyup", jump)
