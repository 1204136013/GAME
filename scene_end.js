var SceneEnd = function(game) {
    var s = {
        game: game,
    }
    s.draw = function() {
        // Create gradient
        var gradient=game.context.createLinearGradient(0,0,400,0);
        gradient.addColorStop("0","magenta");
        gradient.addColorStop("0.5","blue");
        gradient.addColorStop("1.0","red");

        game.context.fillStyle=gradient
        game.context.fillText("Game Over", 100, 30)

    }
    s.update = function() {

    }


    return s
}