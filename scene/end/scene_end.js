var SceneEnd = function(game) {
    var s = {
        game: game,
    }

    game.registerAction("r", function () {
        var s  = SceneTitle(game)
        game.replaceScene(s)
        })

    s.draw = function() {
        // Create gradient
        var gradient=game.context.createLinearGradient(0,0,400,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");

        game.context.fillStyle=gradient
        game.context.fillText("Game Over, press r to restart", 100, 30)

    }
    s.update = function() {

    }


    return s
}