// class SceneEnd extends FourScene {
//     constructor(game) {
//         super(game)
//         game.registerAction("r", function () {
//             var gs = game.sceneName()
//             if (gs != "SceneEnd"){
//                 return
//             }    
//             var s = SceneTitle.new(game)
//             log("end 2 title")
//             game.replaceScene(s)
//         })
//     }
    
//     draw() {
//         this.game.context.fillText("游戏结束, 按 r 重开", 100, 30)
//     }
    
//     update() {

//     }
// }


class SceneEnd extends FourScene {
    constructor(game) {
        super(game)
        this.setup(game)
    }

    setup() {
        this.elements = []
        var game = this.game
        //bg
        var bg = FourImage.new(game, "bg")
        this.addElement(bg)
        // 加入地面
        var g = Grounds.new(game)
        this.ground = g
        this.addElement(this.ground)

        var t = Over.new(game)
        this.addElement(t)
        this.setupInputs()
    }

    update() {
    }
    
    draw() {
        super.draw()
        this.game.context.fillText("游戏结束, 按 r 重开", 130, 100)
    }

    stop(){
        var g = this.ground
        g.stop()
    }

    setupInputs = () => {        
        this.game.registerAction("r", () =>{
            var gs = this.game.sceneName()
            if (gs != "SceneEnd"){
                return
            }    
            var s = SceneTitle.new(this.game)
            s.back()
            this.game.replaceScene(s)
        })
    }

}
