const tb = document.getElementById("alert")

const waterBottle = document.getElementById("water-bottle")
const oilBottle = document.getElementById("oil-bottle")
const wineBottle = document.getElementById("wine-bottle")

const water = document.getElementById("water")
const oil = document.getElementById("oil")
const wine = document.getElementById("wine")

const kettle = document.getElementById("kettle")
const tap = document.getElementById("tap")
const flow = document.getElementById("flow")
const help = document.getElementById("help")
const restart = document.getElementById("restart")
const waterInside = document.getElementById("water-inside")
const glassContainer = document.getElementById("glass-container")
const glassContainerWater = document.getElementById("glass-container-water")
const glassContainerSteam = document.getElementById("slight-steam")


let moveOilBottle = false
let moveWaterBottle = false
let moveWineBottle = false
let moveKettle = false
let kettleIsOpen = false
let kettleHasWater = false
let isBoiling = false
let glassContainerHasWater = false
let waterInGlassContainerIsBoiling = false

// hàm đợi
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// làm lại thí nghiệm
restart.addEventListener("click", function () {
    location.reload()
})

// hướng dẫn thao tác
help.addEventListener("click", function () {
    alert("- Click: bắt đầu di chuyển đồ vật\n- Click lần nữa: bỏ đồ vật xuống\n- Di chuột: di chuyển đồ vật\n- Lấy nước vào ấm bằng cách click vào ấm, di chuyển ấm đến vòi nước ở góc phải bên trên rồi click vào ấm lần nữa/n- Bấm 'p' trên bàn phím để đổ nước\n- Bấm 'b' trên bàn phím để sử dụng ấm đun siêu tốc\n   * Có ba lọ:\n     - Màu vàng: lọ dầu\n     - Màu đỏ: lọ rượu\n     - Màu xanh dương: lọ nước")
})

// custom alert
function notification(content, milisec) {
    tb.style.display = "flex"
    tb.innerHTML = content
    setTimeout(function () {
        tb.style.display = "none"
    }, milisec)

}

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

oilBottle.addEventListener("click", function () {
    if (checkIfInGlassContainer(oilBottle)) {
        liquidBloom(oilBottle)
    }
    moveOilBottle = !moveOilBottle
    moveObj(oilBottle, moveOilBottle)
})

waterBottle.addEventListener("click", function () {
    if (checkIfInGlassContainer(waterBottle)) {
        liquidBloom(waterBottle)
    }
    moveWaterBottle = !moveWaterBottle
    moveObj(waterBottle, moveWaterBottle)
})

wineBottle.addEventListener("click", function () {
    if (checkIfInGlassContainer(wineBottle)) {
        liquidBloom(wineBottle)
    }
    moveWineBottle = !moveWineBottle
    moveObj(wineBottle, moveWineBottle)
})

kettle.addEventListener("click", function () {
    pourWater()

    moveKettle = !moveKettle
    moveObj(kettle, moveKettle)
})

kettle.addEventListener("dblclick", function () {
    pourWater()
    if (!kettleIsOpen) {
        kettle.querySelector("img").src = "./assets/open.png"
        kettleIsOpen = true
    }
    else {
        kettle.querySelector("img").src = "./assets/close.png"
        kettleIsOpen = false
    }
})

// LẤY CHIỀU CAO GIỚI HẠN CỦA DUNG DỊCH
function getLiquidRisingHeight(bottle) {
    if (bottle == oilBottle) {
        return 100
    }
    else if (bottle == waterBottle) {
        return 70
    }
    else if (bottle == wineBottle) {
        return 20
    }
}

// LẤY NƯỚC VÀO ẤM ĐUN
function getWater(obj) {
    if (obj == kettle) {
        if (kettle.getBoundingClientRect().top > tap.getBoundingClientRect().bottom - 50 && kettle.getBoundingClientRect().bottom < tap.getBoundingClientRect().bottom + kettle.getBoundingClientRect().height + 100) {
            if (kettle.getBoundingClientRect().left < tap.getBoundingClientRect().left && kettle.getBoundingClientRect().left > (tap.getBoundingClientRect().left - kettle.getBoundingClientRect().width)) {
                if (!kettleHasWater) {
                    if (kettleIsOpen) {
                        root.style.setProperty("--flowHeight", kettle.getBoundingClientRect().top + tap.getBoundingClientRect().bottom + "px")
                        waterAnim()
                        kettle.style.transform = "rotate(0deg)"
                    }
                    else {
                        notification("Chưa mở nắp ấm đun!", 2000)
                    }
                }
                else {
                    notification("Trong ấm đã có nước", 2000)
                }
            }
        }
    }

}

async function waterAnim() {
    kettle.style.position = "fixed"
    kettle.style.top = "0"
    kettle.style.left = "0"
    kettle.style.margin = "70px 0 0 90vw"
    flow.style.animation = "waterflow 3s ease"
    await sleep(2000)

    flow.addEventListener("animationend", function () {
        flow.style.animation = "watershrink 1s ease "
        flow.addEventListener("animationend", function () {
            root.style.setProperty("--flowHeight", 0 + "px")
            flow.style.animation = "none"
            kettleHasWater = true
        })
    })
}

function pourWater() {
    document.body.addEventListener("keypress", function (e) {
        if (e.key.toLowerCase() == "p") {
            if (!glassContainerHasWater) {
                if (kettleHasWater) {
                    if (kettle.getBoundingClientRect().left > glassContainer.getBoundingClientRect().left && kettle.getBoundingClientRect().right < glassContainer.getBoundingClientRect().right) {
                        if (kettle.getBoundingClientRect().bottom < glassContainer.getBoundingClientRect().bottom && kettle.getBoundingClientRect().top < glassContainer.getBoundingClientRect().top - 200) {

                            kettle.style.transform = "rotate(-90deg)"
                            root.style.setProperty("--pourWaterHeight", (glassContainer.getBoundingClientRect().bottom - kettle.getBoundingClientRect().bottom - 18 + "px"))

                            if (kettleIsOpen) {
                                waterInside.style.top = "80px"
                            }
                            else {
                                waterInside.style.top = "15px"
                            }

                            waterInside.style.animation = "none"
                            waterInside.style.animation = "pourWater 3s ease"

                            waterInside.addEventListener("animationend", function () {
                                root.style.setProperty("--liquid-height", 150 + "px")

                                glassContainerWater.style.animation = "liquid-rising 2s ease"
                                glassContainerWater.addEventListener("animationend", function () {
                                    glassContainerWater.style.height = "150px"
                                    glassContainerHasWater = true

                                    checkAll()

                                    if (isBoiling) {
                                        glassContainerSteam.style.opacity = "1"
                                        waterInGlassContainerIsBoiling = true
                                        checkAll()
                                        steam.style.opacity = "0"
                                    }
                                })



                                waterInside.style.animation = "pourWaterShrink 3s ease"

                                waterInside.addEventListener("animationend", function () {
                                    waterInside.style.animation = "none"
                                    waterInside.style.width = "0px"

                                    kettle.style.transform = "rotate(0deg)"
                                    kettleHasWater = false
                                })
                            })
                        }
                    }
                }
                else {
                    notification("Ấm không có nước!", 2000)
                }
            }
            else {
                notification("Bể đã có nước! Không thể đổ được nữa", 4000)
            }
        }
    })
}

function steamMargin() {
    if (!kettleIsOpen) {
        if(kettle.style.transform == "rotate(0deg)"){
            steam.style.transform = "rotate(0deg)"
            steam.style.margin = `${kettle.getBoundingClientRect().top - steam.getBoundingClientRect().height / 1.3}px 0 0 ${kettle.getBoundingClientRect().left - steam.getBoundingClientRect().width / 2.5}px`
        }
        else{
            steam.style.transform = "rotate(120deg)"
            steam.style.margin = `${-kettle.getBoundingClientRect().left/2}px 0 0 ${kettle.getBoundingClientRect().top/2}px`
        }
    }
    else {
        if(kettle.style.transform == "rotate(0deg)"){
            steam.style.transform = "rotate(-20deg)"
            steam.style.margin = `${kettle.getBoundingClientRect().top - steam.getBoundingClientRect().height / 2}px 0 0 ${kettle.getBoundingClientRect().left - steam.getBoundingClientRect().width / 5}px`
        }
        else{
            steam.style.transform = "rotate(-140deg)"
            steam.style.margin = `${kettle.getBoundingClientRect().left - steam.getBoundingClientRect().height / 2}px 0 0 ${kettle.getBoundingClientRect().top - steam.getBoundingClientRect().width / 5}px`
        }
    }
}

// ĐUN SÔI NƯỚC
function boilWater() {
    document.addEventListener("keypress", async function (e) {
        if (e.key.toLowerCase() == "b") {
            if (kettleHasWater) {
                await sleep(2500)

                isBoiling = true
                steam.style.animation = "start-steaming 3s ease"

                steam.addEventListener("animationend", async function () {
                    await sleep(100000)
                    steam.style.animation = "end-steaming 3s ease"

                    steam.addEventListener("animationend", function () {
                        isBoiling = false
                        waterInGlassContainerIsBoiling = false
                        glassContainerSteam.style.opacity = "0"
                        steam.style.opacity = "0"
                        kettleHasWater = false
                    })
                })
            }
            else {
                notification("Ấm không có nước để đun!", 3000)
            }
        }
    })
}
boilWater()

// KIỂM TRA XEM LỌ CHẤT CÓ NẰM TRONG BỂ THỦY TINH HAY K
function checkIfInGlassContainer(bottle) {
    if (bottle.getBoundingClientRect().left > glassContainer.getBoundingClientRect().left + 30 && bottle.getBoundingClientRect().right < glassContainer.getBoundingClientRect().right - 30) {
        if (bottle.getBoundingClientRect().bottom < glassContainer.getBoundingClientRect().bottom - 10 && bottle.getBoundingClientRect().top > glassContainer.getBoundingClientRect().top - bottle.getBoundingClientRect().height) {
            return true
        }
        return false
    }
    return false
}

function appendAnim(liquid,animName,sec,height){
    liquid.style.animation = `${animName} ${sec}s ease`

    liquid.addEventListener("animationend", function () {
        liquid.style.height = height + "px" ///CẦN SỬA
    })
}

function liquidBloom(bottle) {
    if (glassContainerHasWater) {
        if (waterInGlassContainerIsBoiling) {
            let height
            let liquid

            if (bottle == wineBottle) {
                appendAnim(wine,"wine-rising",8,50)
            }
            else if (bottle == waterBottle) {
                appendAnim(water,"water-rising",5,20)
            }
            else if (bottle == oilBottle) {
                appendAnim(oil,"oil-rising",12,90)
            }
            
        }
        else {
            notification("Nước ở nhiệt độ bình thường, không có gì thay đổi", 5000)
        }
    }
    else {
        notification("Bể không có nước, không có gì thay đổi", 4500)
    }

}

function checkAll() {
    if (checkIfInGlassContainer(waterBottle)) {
        liquidBloom(waterBottle)
    }
    if (checkIfInGlassContainer(oilBottle)) {
        liquidBloom(oilBottle)
    }
    if (checkIfInGlassContainer(wineBottle)) {
        liquidBloom(wineBottle)
    }
}