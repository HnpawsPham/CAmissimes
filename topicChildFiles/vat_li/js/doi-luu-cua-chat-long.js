const help = document.getElementById("help")
const coc = document.getElementById("coc")
const nhietke = document.getElementById("nhietke")
const thuoctim = document.getElementById("thuoctim")
const den = document.getElementById("den")
const kieng = document.getElementById("kieng")
const batlua = document.getElementById("batlua")
const bubble = document.getElementById("boil")
const tap = document.getElementById("tap")
const water = document.getElementById("water")
const root = document.querySelector(":root")
const flow = document.getElementById("flow")

let moveCoc = false       //cho cốc di chuyển
let moveDen = false
let moveThuocTim = false
let filled = false;       //check xem đã đổ nước vào cốc chưa
let moveNhietKe = false;
let added = false;        //check xem thuốc tím đã bỏ vào cốc chưa
let moveKieng = false;
let turnedOn=false;     //check xem đã bật bật lửa chưa
let moveBatLua = false;
let isOnFire = false  //check xem bật bật lửa chưa
let waterIsBoiled = false //check xem nước sôi chưa
let t = 20 // biến tạm lưu nhiệt độ

// hiện menu điều khiển
help.addEventListener('click', function () {
    alert("Click: Bắt đầu di chuyển vật thể\nClick lần nữa: Ngừng di chuyển vật thể\n\n*Một vài hướng dẫn:\n -Nháy đúp chuột để kích hoạt bật lửa\n -Đưa bật lửa lại gần đèn cồn để đốt chát đèn cồn\n -Để cốc trên kiềng ba chân và đèn ở bên dưới kiềng để bắt đầu hiện tượng\n Để nhiệt kế vào để xem nhiệt độ của cốc")
})

// hiện kết luận
function visibleConclusion() {
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

// hiệu ứng bling
function bling(obj) {
    obj.style.animation = "bling 3s ease"
    obj.addEventListener("animationend", function () {
        obj.style.animation = "none"
    })
}

// custom alert
$("#alert").hide()
function tb(ms){
    $("#alert").show()
    setTimeout(function(){
        $("#alert").hide()
    },ms)
}
// hàm đợi
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

// điều chỉnh move=true / false
function moveCtrl(move) {
    if (move) {
        return false
    }
    return true
}

//di chuyển objs
function moveObj(obj, move, index) {
    console.log(isOnFire)
    pourWater()
    boil()
    conditionsToStartEvent()

    // bấm lần nữa ngừng di chuyển
    obj.addEventListener("click", function () {
        move = false
    })
    document.addEventListener("mousemove", function (event) {
        // lấy pos chuột
        let mX = event.clientX
        let mY = event.clientY

        if (move) {
            obj.style.position = "absolute"
            obj.style.margin = "0"
            if (obj.id == "nhietke") {
                obj.style.top = mY - obj.getBoundingClientRect().height / 5 + "px"
            }
            else {
                obj.style.top = mY - obj.getBoundingClientRect().height / 2 + "px"
            }
            obj.style.left = mX - obj.getBoundingClientRect().width / 2 + "px"
        }
    })
}

// di chuyển cốc
coc.addEventListener("click", function () {
    moveCoc = moveCtrl(moveCoc)
    moveObj(coc, moveCoc)
})

// di chuyển đèn cồn
den.addEventListener("click", function () {
    moveDen = moveCtrl(moveDen)
    moveObj(den, moveDen)
})

// di chuyển thuốc tím
thuoctim.addEventListener("click", function () {
    moveThuocTim = moveCtrl(moveThuocTim)
    moveObj(thuoctim, moveThuocTim)
})

// di chuyển nhiệt kế
nhietke.addEventListener("click", function () {
    moveNhietKe = moveCtrl(moveNhietKe)
    moveObj(nhietke, moveNhietKe)
})

// di chuyển kiềng
kieng.addEventListener("click", function () {
    moveKieng = moveCtrl(moveKieng)
    moveObj(kieng, moveKieng)
})

// di chuyển bật lửa
batlua.addEventListener("click", function () {
    moveBatLua = moveCtrl(moveBatLua)
    moveObj(batlua, moveBatLua)
})
// kích hoạt bất lửa
batlua.addEventListener("dblclick", function () {
    if (!turnedOn) {
        batlua.src = "./assets/batluafire.png"
        turnedOn = true
    }
    else{
        batlua.src = "./assets/batlua.png"
        turnedOn = false
    }
})
// đốt đền cồn
den.addEventListener("mouseenter", function () {
    if (turnedOn) {
        den.src = "./assets/dencon.png"
        isOnFire=true
    }
})
// đun nước
async function boil() {
    if (coc.getBoundingClientRect().left > kieng.getBoundingClientRect().left && coc.getBoundingClientRect().right < kieng.getBoundingClientRect().right) {
        if (coc.getBoundingClientRect().top >= kieng.getBoundingClientRect().top - 160 && coc.getBoundingClientRect().bottom < kieng.getBoundingClientRect().top + 100) {
            if (den.getBoundingClientRect().left > kieng.getBoundingClientRect().left && den.getBoundingClientRect().right < kieng.getBoundingClientRect().right) {
                if (den.getBoundingClientRect().top > kieng.getBoundingClientRect().top && den.getBoundingClientRect().bottom <= kieng.getBoundingClientRect().bottom) {
                    console.log(isOnFire)
                    if (isOnFire) {
                        if (filled) {
                            TemperControl()
                            waterIsBoiled = true
                            await sleep(2000)
                            document.getElementById("heat").play()
                            bubble.style.animation = "visibleBubbles 8s ease"
                            bubble.addEventListener("animationend", function () {
                                bubble.style.opacity = "0.6"
                            })
                        }
                        else {
                            $("#alert").text("Chưa có nước!")
                            tb(3000)
                        }
                    }
                    else{
                        $("#alert").text("Cần có nhiệt!")
                        tb(3000)
                    }
                }
            }

        }
    }
}
// nhiệt kế tăng độ
async function TemperControl() {
    if (nhietke.getBoundingClientRect().left > coc.getBoundingClientRect().left && nhietke.getBoundingClientRect().right < coc.getBoundingClientRect().right) {
        if (nhietke.getBoundingClientRect().bottom < coc.getBoundingClientRect().bottom) {
            if (waterIsBoiled) {
                nhietke.querySelector(".thanhchay").style.animation = "increaseTemper 15s ease"
                nhietke.querySelector(".temperature").style.animation = "moveTemperIndex 15s ease"
                // tăng chỉ số nhiệt độ
                for (let i = 20; i <= 100; i++) {
                    document.addEventListener("click", function () {
                        i = t
                    })
                    await sleep(160)
                    t = i
                    nhietke.querySelector("p").innerHTML = i + "°"
                }

                nhietke.querySelector(".temperature").addEventListener("animationend", function () {
                    nhietke.querySelector(".temperature").style.bottom = "220px"
                    nhietke.querySelector(".thanhchay").style.height = "200px"
                })
            }
        }
    }
}
// hiện tượng nước có màu thuốc tím
function mainEvent() {
    water.style.animation = "changeColor 10s ease"
    thuoctim.style.animation = "disappear 10s ease"
       
    water.addEventListener("animationend", function () {
        water.style.backgroundColor = "rgba(92, 5, 109, 0.674)"
        thuoctim.style.opacity = "0"
        visibleConclusion()
    })
}
// xét các điều kiện để bắt đầu hiện tượng
async function conditionsToStartEvent() {
    // xét thuốc tím đặt vào cốc
    if (thuoctim.getBoundingClientRect().left > coc.getBoundingClientRect().left + 20 && thuoctim.getBoundingClientRect().right < coc.getBoundingClientRect().right - 20) {
        if (thuoctim.getBoundingClientRect().top > coc.getBoundingClientRect().top + 20 && thuoctim.getBoundingClientRect().bottom < coc.getBoundingClientRect().bottom - 20) {
            if (!added) {
                thuoctim.style.transition = "all 0.8s"
                thuoctim.style.top = coc.getBoundingClientRect().bottom - 60 + "px"
                added = true
            }
            else {
                thuoctim.style.transition = "none"
                added = false
            }

            if (waterIsBoiled) {
                mainEvent()
            }
        }
    }
}

// lấy nước vào bình
function pourWater() {
    coc.addEventListener("click", async function () {
        if (coc.getBoundingClientRect().left > tap.getBoundingClientRect().left - 200 && coc.getBoundingClientRect().right <= tap.getBoundingClientRect().right+ 30) {
            if (coc.getBoundingClientRect().top > tap.getBoundingClientRect().bottom && coc.getBoundingClientRect().bottom < tap.getBoundingClientRect().bottom + coc.getBoundingClientRect().height + 300) {
                if (!filled) {
                    filled = true
                    root.style.setProperty("--flowheight", (Math.round(water.getBoundingClientRect().bottom) - 100 + "px"))
                  
                    flow.style.animation = "flowEffect 4s ease"
                    await sleep(2000)
                    water.style.animation = "fill 2.5s ease"
                    water.addEventListener("animationend", function () {
                        water.style.height = "150px"
                    })
                    flow.addEventListener("animationend", function () {
                        flow.style.animation = "off 1s ease"
                    })
                }

            }
        }
    })
}