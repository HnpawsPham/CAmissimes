import { saveToStorage,findData } from "./firebase.js";

let container = document.getElementById("commentList");
const form = document.getElementById("form");
const content = document.getElementById("content");

let isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
let accountID = sessionStorage.getItem("accountID");

let commentList = await findData("commentList");
let accountList = await findData("accountList");

form.addEventListener("submit",function(){
    if(isLoggedIn){
        if(accountList[accountID].canComment){
            if(content.value.trim() != 0){
                let date = new Date();
                date = date.toLocaleDateString()
    
                commentList.push({
                    text: content.value,
                    date: date,
                    critic: accountList[accountID].email,
                    critic_index: accountList[accountID].index
                })
    
                saveToStorage("commentList",commentList);
            }
        }
        else{
            alert("You have been blocked for a violation!");
        }
    }
    else{
        window.location.href = "../pages/login.html";
        alert("You must log in to comment");
    }
})


for (let comment of commentList) {
    let mess = document.createElement("div");
    mess.innerHTML = comment.text;
    mess.classList.add("mess");

    let date = document.createElement("i");
    date.innerHTML = comment.date;
    mess.appendChild(date);

    container.appendChild(mess);
}