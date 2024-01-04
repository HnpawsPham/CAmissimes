const kettle = document.getElementById("kettle")
const tap = document.getElementById("tap")
const flow = document.getElementById("flow")
const fridge = document.getElementById("fridge")
const steam = document.getElementById("steam")
const bucket = document.getElementById("bucket")

let moveKettle = false
let moveBucket = false
let kettleOpen = false
let fridgeOpen = false
let kettleHasWater = false
let bucketHasWater = false

let waterType = "liquid"
let boilTried = false

// hàm đợi
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// hiện kết luận
function visibleConclusion() {
    if (boilTried) {
        document.getElementById("conclu").style.opacity = "1"
        let isOn = false
        document.getElementById("conclu").addEventListener("click", function () {
            if (!isOn) {
                document.getElementById("text").style.visibility = "visible"
                isOn = true
            }
            else {
                document.getElementById("text").style.visibility = "hidden"
                isOn = false
            }
        })
    }
}
// lấy biến css
const root = document.querySelector(":root")

//di chuyển objs
function moveObj(obj, move) {
    // bấm lần nữa ngừng di chueyern
    obj.addEventListener("click", function () {
        getWater(obj)
        move = false
    })

    document.addEventListener("mousemove", function (event) {
        // lấy pos chuột
        let mX = event.clientX
        let mY = event.clientY
        steamMargin()
        if (move) {
            obj.style.position = "absolute"
            obj.style.margin = "0"
            obj.style.top = mY - obj.getBoundingClientRect().height / 2 + "px"
            obj.style.left = mX - obj.getBoundingClientRect().width / 2 + "px"
        }

    })
}

kettle.addEventListener("click", function () {
    moveKettle = !moveKettle
    moveObj(kettle, moveKettle)
})
kettle.addEventListener("dblclick", function () {
    if (!kettleOpen) {
        kettle.src = "./assets/open.png"
        kettleOpen = true
    }
    else {
        kettle.src = "./assets/close.png"
        kettleOpen = false
    }
})
bucket.addEventListener("click", function () {
    putBucketInFridge()
    moveBucket = !moveBucket
    moveObj(bucket, moveBucket)
})

function getWater(obj) {
    if (obj == kettle && kettleOpen && !kettleHasWater) {
        if (kettle.getBoundingClientRect().top > tap.getBoundingClientRect().bottom - 20 && kettle.getBoundingClientRect().bottom < tap.getBoundingClientRect().bottom + kettle.getBoundingClientRect().height + 100) {
            if (kettle.getBoundingClientRect().left < tap.getBoundingClientRect().left + 50 && kettle.getBoundingClientRect().left > tap.getBoundingClientRect().left - kettle.getBoundingClientRect().width) {
                root.style.setProperty("--flowHeight", kettle.getBoundingClientRect().top + tap.getBoundingClientRect().bottom + "px")
                waterAnim()
                kettleHasWater = true
            }
        }
    }
    else if (obj == bucket && !bucketHasWater) {
        if (bucket.getBoundingClientRect().top > tap.getBoundingClientRect().bottom - 20 && bucket.getBoundingClientRect().bottom < tap.getBoundingClientRect().bottom + bucket.getBoundingClientRect().height + 100) {
            if (bucket.getBoundingClientRect().left < tap.getBoundingClientRect().left + 50 && bucket.getBoundingClientRect().left > tap.getBoundingClientRect().left - bucket.getBoundingClientRect().width) {
                root.style.setProperty("--flowHeight",bucket.getBoundingClientRect().top + tap.getBoundingClientRect().bottom + "px")
                waterAnim()
                bucketHasWater= true
            }
        }
    }
}

fridge.addEventListener("click", function () {
    if (!fridgeOpen) {
        fridge.src = "./assets/fridgeopen.png"
        fridgeOpen = true
        fridge.style.margin = "140px 0 0 810px"
    }
    else {
        fridge.src = "./assets/fridge.png"
        fridgeOpen = false
        fridge.style.margin = "100px 0 0 700px"
    }
})

function steamMargin() {
    if (!kettleOpen) {
        steam.style.transform = "rotate(0deg)"
        steam.style.margin = `${kettle.getBoundingClientRect().top - steam.getBoundingClientRect().height / 1.4}px 0 0 ${kettle.getBoundingClientRect().left - steam.getBoundingClientRect().width / 2.5}px`
    }
    else {
        steam.style.transform = "rotate(-20deg)"
        steam.style.margin = `${kettle.getBoundingClientRect().top - steam.getBoundingClientRect().height / 2}px 0 0 ${kettle.getBoundingClientRect().left - steam.getBoundingClientRect().width / 5}px`
    }
}

function boilWater() {
    document.addEventListener("keypress", async function (e) {
        if (e.key == "b" || e.key == "B" && kettleHasWater) {
            await sleep(3000)
            steam.style.animation = "start-steaming 3s ease"
            steam.addEventListener("animationend", async function () {
                steam.style.opacity = 0.6
                await sleep(10000)
                steam.style.animation = "end-steaming 3s ease"
                steam.addEventListener("animationend", function () {
                    steam.style.opacity = "0"
                    kettleHasWater = false
                    boilTried = true
                    visibleConclusion()
                })
            })
        }
    })
}
boilWater()

function waterAnim() {
    flow.style.animation = "waterflow 3s ease"
    flow.addEventListener("animationend", function () {
        flow.style.animation = "watershrink 1s ease"
        flow.addEventListener("animationend", function () {
            root.style.setProperty("--flowHeight", 0 + "px")
            flow.style.animation = "none"
        })
    })
}

function putBucketInFridge(){
    if(bucket.getBoundingClientRect().left > fridge.getBoundingClientRect().left && bucket.getBoundingClientRect().right < fridge.getBoundingClientRect().right){
        if(bucket.getBoundingClientRect().top > fridge.getBoundingClientRect().top && bucket.getBoundingClientRect().bottom < fridge.getBoundingClientRect().bottom){
            bucket.style.display="none"
        }

    }
}