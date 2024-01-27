
let container = document.getElementById("commentList")
let list = JSON.parse(localStorage.getItem("commentsList")) || []
const form = document.getElementById("form")
const content = document.getElementById("content")

form.addEventListener("submit",function(){
    if(content.value.trim() != 0){
        list.push(content.value)
        localStorage.setItem("commentsList",JSON.stringify(list))
    }
})


for (let comment of list) {
    let mess = document.createElement("div")
    mess.innerHTML = comment
    mess.classList.add("mess")

    let space = document.createElement("br")
    container.appendChild(mess)
    container.appendChild(space)
}