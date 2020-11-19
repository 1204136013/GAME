const config = {
    player_speed: 10,
    cloud_speed: 1,
    enemy_speed: 3,
    bullet_speed: 6,
    fire_cooldown: 10,
    enemy_fire_cooldown: 50,
}

class Scene extends FourScene {
    constructor(game) {
        super(game)
        this.setup()
        this.setupInputs()
    }

    update() {
        super.update()
        // 判断敌机是否被玩家击中
        for (var i = 0; i < this.enemies.length; i++){
            var e = this.enemies[i]
            if (e.collide(this.bullets)){
                log("击坠敌机")
                e.explode()
            }
        }
        // 判断玩家是否碰到敌人或者被击中
        var p = this.player
        var eb = this.bullets.filter(b => b.reverse)
        if (p.collide(this.enemies.concat(eb))){
            log("玩家坠毁")
            p.explode()
            var e = SceneEnd.new(this.game)
            // this.game.replaceScene(e)
        }

    }

    setup() {
        this.numberOfEnemies = 7
        this.bg = FourImage.new(this.game, "sky")
        this.cloud = Cloud.new(this.game, "cloud")
        this.player = Player.new(this.game)
        this.bullets = []
        // 这里 push 的顺序需要注意, bg必须第一个， 不然会盖住其他图片
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addElement(this.cloud)
        this.addEnemies()
    }

    addEnemies() {
        var es = []
        for (var i = 0; i < this.numberOfEnemies; i++) {
            var e = Enemy.new(this.game, i)
            es.push(e)
            this.addElement(e)
        }
        this.enemies = es
    }

    setupInputs() {
        var g = this.game
        var s = this
        g.registerAction("a", function () {
            s.player.moveLeft()
        })
        g.registerAction("d", function () {
            s.player.moveRight()
        })
        g.registerAction("w", function () {
            s.player.moveUp()
        })
        g.registerAction("s", function () {
            s.player.moveDown()
        })
        g.registerAction("j", function () {
            s.player.fire()
        })

        // game.registerAction("f", function () {
        //     ball.fire()
        // })

    }
}

// 敌机发射子弹
// 多加几片云
// 分数

