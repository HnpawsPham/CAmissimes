import { saveToStorage,findData } from "./firebase.js";

let container = document.getElementById("commentList");
const form = document.getElementById("form");
const content = document.getElementById("content");

let isLoggedIn = sessionStorage.getItem("isLoggedIn");

let commentList = await findData("commentList");

form.addEventListener("submit",function(){
    if(isLoggedIn){
        if(content.value.trim() != 0){
            commentList.push(content.value)
            saveToStorage("commentList",commentList);
        }
    }
    else{
        alert("You must log in to comment");
    }
})


for (let comment of commentList) {
    let mess = document.createElement("div");
    mess.innerHTML = comment;
    mess.classList.add("mess");

    let space = document.createElement("br");
    container.appendChild(mess);
    container.appendChild(space);
}