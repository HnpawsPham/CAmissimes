const search = document.getElementById("search")
const body = document.querySelector(".container")
const notFoundText = document.querySelector(".notfound")
const suggest = document.getElementById("suggest")


let grade6 = suggest.querySelectorAll("li")[0]
let grade7 = suggest.querySelectorAll("li")[1]
let grade8 = suggest.querySelectorAll("li")[2]
let allGrade = suggest.querySelectorAll("li")[3]


grade6.addEventListener("click", function () {
    visibleToList(6)
})

grade7.addEventListener("click", function () {
    visibleToList(7)
})

grade8.addEventListener("click", function () {
    visibleToList(8)
})

allGrade.addEventListener("click", function () {
    for (let i in list) {
        card[i].classList.remove("hide")
        notFoundText.classList.add("hide")
    }
    if (body.querySelectorAll(".hide").length == body.querySelectorAll(".col").length) {
        notFoundText.classList.remove("hide")
    }
})

for (let info of list) {
    let card = document.createElement("div")
    card.classList.add("col")

    let title = document.createElement("h2")
    title.innerHTML = info.title
    card.appendChild(title)

    let desc = document.createElement("p")
    desc.innerHTML = info.desb
    card.appendChild(desc)

    let button = document.createElement("a")
    button.innerHTML = "Xem ngay"
    button.href = info.link
    button.target = "_blank"

    card.appendChild(button)
    body.appendChild(card)
}
// bỏ dấu tiếng việt
function normalizeStr(str) {
    return str.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .toLowerCase()
}
// TÍNH NĂNG TÌM KIẾM

search.addEventListener("keypress", function () {
    searchItem()
    document.querySelector("ul").style.opacity = "1"
})

search.addEventListener("submit", function () {
    searchItem()
})

let titles = document.querySelectorAll("h2")
let card = document.querySelectorAll(".col")

function searchItem() {
    notFoundText.classList.add("hide")

    if (search.value != "") {
        for (let i in titles) {
            notFoundText.classList.add("hide")
            try {
                card[i].classList.add("hide")
            }
            catch { }

            if (normalizeStr(titles[i].innerHTML).includes(normalizeStr(search.value))) {
                card[i].classList.remove("hide")
                notFoundText.classList.add("hide")
            }
        }
    }
    if (body.querySelectorAll(".hide").length == body.querySelectorAll(".col").length) {
        notFoundText.classList.remove("hide")
    }
}

// HIỆN CÁC THÍ NGHIỆM THEO LỚP
function visibleToList(grade) {
    for (let i in list) {
        notFoundText.classList.add("hide")
        try {
            card[i].classList.add("hide")
        }
        catch { }

        if (list[i].grade == grade || list[i].grade == 0) {
            console.log(card[i])
            card[i].classList.remove("hide")
            notFoundText.classList.add("hide")
        }
        if (body.querySelectorAll(".hide").length == body.querySelectorAll(".col").length) {
            notFoundText.classList.remove("hide")
        }
    }
}