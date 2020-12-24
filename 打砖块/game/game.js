class Game {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.scene = null
        this.actions = {}
        this.keydonws = {}
        this.canvas = document.querySelector("#id-canvas")
        this.context = this.canvas.getContext("2d")

        window.addEventListener("keydown", event => {
            this.keydonws[event.key] = true
        })
        window.addEventListener("keyup", event => {
            this.keydonws[event.key] = false
        })

        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawImage(img) {
        var p = img
        this.context.drawImage(p.image, p.x, p.y)
    }

    update = () => {
        this.scene.update()
    }

    draw = () => {
        this.scene.draw()
    }

    clear = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    replaceScene = (scene) => {
        this.scene = scene
    }

    sceneName = () => {
        return this.scene.__proto__.constructor.name
    }

    imageByName = (name) => {
        // log(name)
        // log(this.images)
        var img = this.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    runloop = () => {
        var actions = Object.keys(this.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (this.keydonws[key]) {
                this.actions[key]()
            }
        }
        this.update()
        this.clear()
        this.draw()
        setTimeout(() => {
            this.runloop()
        }, 1000 / window.fps)
    }

    // 开始运行
    runWithScene = (scene) => {
        // call(g)
        this.scene = scene
        // log("runloop", this.runloop)
        setTimeout(() => {
            this.runloop()
        }, 1000 / window.fps)
    }

    registerAction = (key, callback) => {
        this.actions[key] = callback
    }

    run = () => {
        this.runCallback(this)
    }

    init = () => {
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(this.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = this.images[name];
            let img = new Image()
            img.src = path
            img.onload = () => {
                this.images[name] = img
                // 所有图片载入成功后，调用 run
                loads.push(1)
                if (loads.length == names.length) {
                    this.run()
                }
            }
        }
    }
}

