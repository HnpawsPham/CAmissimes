const roses = document.querySelectorAll(".rose")
const knife = document.getElementById("knife")
const colorPicker = document.getElementById("colorPicker")
const help = document.getElementById("help")
const dropper = document.getElementById("dropper")
const water = document.querySelectorAll(".water")
const coc = document.querySelectorAll(".childContainer")
const flow = document.getElementById("flow")
const dye = document.querySelectorAll(".dye")
const tap = document.getElementById("tap")

let moveDropper = false   //cho dropper di chuyển
let moveKnife = false         //cho dao mổ di chuyển
let moveRose = [false, false]      //cho hoa hồng trắng di chuỷen
let moveCoc = [false, false]     //cho cốc di chuyển
let isCut = [false, false]         //check xem đã cắt bông hồng hay chưa
let cocHasWater = [false, false]       //check cốc đã có nước chưa
let isRotated = false         //check xem bình nước đã nghiêng chưa
let take = 0      //check xem đổ nước mấy lần r
let isDyed = [false, false]      //check xem hoa đã được nhuộm chưa
let waterColor = ["", ""]
let startEvent = false        //check xem bắt đầu cho hoa nhuộm đc chưa

// hiện controller menu
help.addEventListener("click", function () {
    alert("Click: Di chuyển vật\nNháy đúp chuột: Tương tác với vật\n*Thao tác:\n -Click, di chuột, click gần vòi nước để lấy nước vào cốc\n -Chọn phẩm màu tuỳ thích bằng cách bấm vào ô chọn rồi chọn màu\n -Cắt cuống hoa bằng cách cầm dao và nháy đúp chuột vào thân hoa\n -Nhuộm nước bằng cách cầm ống nhỏ giọt rồi nháy đúp chuột ở phạm vi trong cốc cần nhỏ")
})
$("#alert").hide()

const root = document.querySelector(":root")

// hàm đợi
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// đổi phẩm màu cho nước
changeWaterColor()

function changeWaterColor() {
    dropper.addEventListener("dblclick", function () {
        root.style.setProperty("--dropperColor", colorPicker.value)
        for (let liquid of water) {
            if (dropper.getBoundingClientRect().left > liquid.getBoundingClientRect().left && dropper.getBoundingClientRect().right < liquid.getBoundingClientRect().right) {
                if (dropper.getBoundingClientRect().bottom < liquid.getBoundingClientRect().bottom) {
                    liquid.style.animation = "waterColored 2s ease"
                    liquid.addEventListener("animationend", async function () {
                        liquid.style.backgroundColor = colorPicker.value
                        liquid.style.animation = "none"
                        startEvent = true
                        console.log(startEvent)
                        return
                    })
                }
            }
        }
    })
}
// hiệu ứng hoa nhuộm màu
async function mainEvent(i) {
    for (let j=0; j< coc.length; j++) {
    
        if (roses[i].getBoundingClientRect().left >= coc[j].getBoundingClientRect().left - 20 && roses[i].getBoundingClientRect().right <= coc[j].getBoundingClientRect().right + 40) {
            if (roses[i].getBoundingClientRect().bottom <= coc[j].getBoundingClientRect().bottom && cocHasWater[j] && !isDyed[i]) {
               console.log(startEvent)
                if (startEvent) {
                    if(isCut[i]){
                        isDyed[i] = true
                        cocHasWater[j]=false
                        roses[i].style.zIndex = "-2"
                        dye[i].style.opacity = "0.2"
                        dye[i].style.backgroundColor = coc[j].querySelector(".water").style.backgroundColor
                        dye[i].style.animation = "dyeing 7s ease"
                        dye[i].addEventListener("animationend", function () {
                            dye[i].style.backgroundColor = coc[j].querySelector(".water").style.backgroundColor
                            dye[i].style.height = "90px"
                            dye[i].style.top = "5px"
                            visibleConclusion()
                        })
                    } 
                    else{
                        alert("Cắt cuống xéo để cây hút nước tốt hơn!")
                    }
                }
                else if(!startEvent){
                    alert("Nhuộm màu trước để màu dễ hoà tan trong nước hơn!")
                }
            }
        }
    }
}

// hiệu ứng bling
function bling(obj) {
    obj.style.animation = "bling 3s ease"
    obj.addEventListener("animationend", function () {
        obj.style.animation = "none"
    })
}

// điều chỉnh move=true / false
function moveCtrl(move) {
    if (move) {
        return false
    }
    return true
}

//di chuyển objs
function moveObj(obj, move) {
    // bấm lần nữa ngừng di chueyern
    obj.addEventListener("click", function () {
        move = false
    })

    document.addEventListener("mousemove", function (event) {
        // lấy pos chuột
        let mX = event.clientX
        let mY = event.clientY

        if (move) {
            obj.style.position = "absolute"
            obj.style.margin = "0px"
            obj.style.top = mY - obj.getBoundingClientRect().height / 2 + "px"
            obj.style.left = mX - obj.getBoundingClientRect().width / 2 + "px"
        }
    })
}


// di chuyển dropper
dropper.addEventListener("click", function () {
    moveDropper = moveCtrl(moveDropper)
    moveObj(dropper, moveDropper)
})

// lấy nước
async function getWater(obj, i) {
    if (obj.className == "childContainer" && !cocHasWater[i]) {
        if (obj.getBoundingClientRect().left > (tap.getBoundingClientRect().left - 200)) {
            if (obj.getBoundingClientRect().bottom <= (tap.getBoundingClientRect().bottom + 400)) {
                obj.style.top = "200px"
                obj.style.right = "300px"

                flow.style.animation = "pouring 2.5s ease"
                flow.addEventListener("animationend", function () {
                    flow.style.height = "400px"
                })

                await sleep(2000)
                water[i].style.animation = "waterRising 4s ease"
                water[i].addEventListener("animationend", function () {
                    water[i].style.height = "180px"
                })

                await sleep(2000)
                flow.style.animation = "stop 2.5s ease"
                flow.addEventListener("animationend", function () {
                    flow.style.height = "0px"
                    cocHasWater[i] = true
                    return
                })
            }
        }
    }
}

// cắt cọng hoa
function cutRose(i) {
    knife.addEventListener("dblclick", function () {
        if (knife.getBoundingClientRect().left > roses[i].getBoundingClientRect().left && knife.getBoundingClientRect().right < roses[i].getBoundingClientRect().right + knife.getBoundingClientRect().width) {
            if (knife.getBoundingClientRect().top > roses[i].getBoundingClientRect().top + 100 && knife.getBoundingClientRect().bottom < roses[i].getBoundingClientRect().bottom) {
                if (!isCut[i]) {
                    roses[i].querySelector("img").src = "./assets/cut.png"
                    isCut[i] = true;
                    console.log(isCut)
                }
            }
        }
    })
}
// cho dao di chuyển
knife.addEventListener("click", function () {
    moveKnife = moveCtrl(moveKnife)
    moveObj(knife, moveKnife)
})

// cho hoa hồng trắng di chuyển
for (let i = 0; i < roses.length; i++) {
    cutRose(i)
    roses[i].style.zIndex="1"

    roses[i].addEventListener("click", function () {
        mainEvent(i)
        moveRose[i] = moveCtrl(moveRose[i])
        moveObj(roses[i], moveRose[i])
    })
}

// di chuyển cốc
for (let i = 0; i < coc.length; i++) {
    coc[i].addEventListener("click", function () {
        coc[i].style.width="230px"

        getWater(coc[i], i)
        moveCoc[i] = moveCtrl(moveCoc[i])
        moveObj(coc[i], moveCoc[i])
    })
}


// hiện kết luận
function visibleConclusion(){
    document.getElementById("conclu").style.opacity="1"
    let isOn=false
    document.getElementById("conclu").addEventListener("click",function(){
        if(!isOn){
            document.getElementById("text").style.visibility="visible"
            isOn=true
        }
        else{
            document.getElementById("text").style.visibility="hidden"
            isOn=false
        }
    })
}
