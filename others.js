// GET COMMENTS
const btn = document.getElementById("getComment")
const form = document.getElementById("form")
const content = document.getElementById("content")
const commentList = document.getElementById("commentList")

btn.addEventListener("click", async function () {
    const response = await fetch("http://localhost:5500/getComment");
    const responseJSON = await response.json();

    if (responseJSON.code == 200) {
        for (let comment of responseJSON.data) {
            let mess = document.createElement("div")
            mess.innerHTML = comment
            mess.classList.add("mess")

            let space = document.createElement("br")
            commentList.appendChild(mess)
            commentList.appendChild(space)
        }
    } else {
        console.log("loi roi ne: " + responseJSON.message)
    }
})

// chặn thiết bị là điện thoại
let width = window.matchMedia("(min-width: 1460px)", "(min-height: 720px)")
function blockMobile() {
    if (window.innerWidth <= 768) {
        alert("Chỉ hỗ trợ cho Laptop / Máy tính bàn hoặc để tab full màn hình")
        location.reload()
    }
}
blockMobile()
width.addEventListener("change", function () {
    blockMobile()
})

