const form=document.getElementById("form")
const content=document.getElementById("content")
const commentList=document.getElementById("commentList")

let list=JSON.parse(localStorage.getItem("list")) || []

form.addEventListener("submit",function(e){
    e.preventDefault()
    if(content.value != ""){
        sendComment()
    }
})

// content.addEventListener("keydown",function(e){
//     e.preventDefault()
//     if(e.key=="Enter" && content.value != ""){
//         sendComment()
//     }
// })

function sendComment(){
    list.push(
        {
            name:"Anomyous",
            content:content.value,
        }
    )
    localStorage.setItem("list",JSON.stringify(list))
    location.reload()
}

let visibleComments=[]
if(JSON.parse(localStorage.getItem("list")) != [] && JSON.parse(localStorage.getItem("list"))){
    visibleComments=JSON.parse(localStorage.getItem("list"))

    for(let i in visibleComments){
       
        let mess=document.createElement("div")
        console.log(visibleComments[i].content)
        mess.innerHTML=visibleComments[i].content
        mess.classList.add("mess")

        let space=document.createElement("br")
        commentList.appendChild(mess)
        commentList.appendChild(space)
    }
}

// chặn thiết bị là điện thoại
let width = window.matchMedia("(min-width: 1460px)","(min-height: 720px)")
function blockMobile(){
    if (!width.matches) { 
        alert("Chỉ hỗ trợ cho Laptop / Máy tính bàn hoặc để tab full màn hình")
        window.location.href=""
    }
}
blockMobile()
width.addEventListener("change",function(){
    blockMobile()
})

  