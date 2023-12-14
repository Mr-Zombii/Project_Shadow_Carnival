import Game from "/js/Game.js"

window.onload = () => {
    let game = new Game()
    game.__init__()
    setInterval(() => {
        game.Loop()
    }, 100)
}