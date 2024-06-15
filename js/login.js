import { saveToStorage,findData } from "./firebase.js";

let accountList = await findData("accountList");

const form = document.getElementById("form");
const emailInput = document.getElementById("email-input");
const passInput = document.getElementById("pass-input");
const notice = document.getElementById("notice");

// DELAY
function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

// notice appear
function visibleNotice(text){
    notice.style.display = "flex";
    notice.innerHTML = text;

    setTimeout(function(){
        notice.style.display = "none";
    },3000)
}

form.addEventListener("submit",function(e){
    e.preventDefault();
    
    let check = accountList.filter((account) => account.email == emailInput.value && account.pass == passInput.value);

    if(check.length != 0){
        visibleNotice("Login successfully");

        sessionStorage.setItem("isLoggedIn",true);
        sessionStorage.setItem("accountID", check[0].index);

        sleep(2000);
        window.location.href = "../index.html";
    }
    else{
        visibleNotice("Please check your information again");
    }
})


