var times = [];
var fps;

function refreshLoop() {
    window.requestAnimationFrame(function () {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        refreshLoop();
    });
}

window.countFPS = (function () {
    var lastLoop = (new Date()).getMilliseconds();
    var count = 1;
    var fps = 0;

    return function () {
        var currentLoop = (new Date()).getMilliseconds();
        if (lastLoop > currentLoop) {
            fps = count;
            count = 1;
        } else {
            count += 1;
        }
        lastLoop = currentLoop;
        return fps;
    };
}());

export default class Game {
    oldWidth
    oldHeight

    GameDisplay

    times = []
    fps

    constructor() { }

    __init__() {
        this.oldWidth = window.innerWidth
        this.oldHeight = window.innerHeight

        this.GameDisplay = document.getElementById("canvas")
        this.__resize_window__(window.innerWidth, window.innerHeight)
    }

    __check_for_resize__() {
        if (
            this.oldHeight != window.innerHeight ||
            this.oldWidth != window.innerWidth
        ) {
            this.__resize_window__(window.innerWidth, window.innerHeight)
            this.oldHeight = window.innerHeight
            this.oldWidth = window.innerWidth
        }
    }

    __refresh_loop__() {
        var t = this
        window.requestAnimationFrame(function () {
            const now = performance.now();
            while (t.times.length > 0 && t.times[0] <= now - 1000) {
                t.times.shift();
            }
            t.times.push(now);
            t.fps = t.times.length;
            t.__refresh_loop__();
        });
    }


    __resize_window__(width, height) {
        this.GameDisplay.setAttribute("width", width)
        this.GameDisplay.setAttribute("height", height)
    }

    Loop() {
        refreshLoop()
        this.__check_for_resize__()
        setWindowTitle("Shadow Carnival || FPS: " + window.countFPS().toString())

    }
}