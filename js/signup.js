
import { saveToStorage,findData } from "./firebase.js";

let accountList = await findData("accountList");

const form = document.getElementById("form");
const emailInput = document.getElementById("email-input");
const passInput = document.getElementById("pass-input");
const passConfirm = document.getElementById("pass-confirm");
const notice = document.getElementById("notice");

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
    if(passInput.value.trim().length > 5){
        if(passInput.value == passConfirm.value){
            accountList.push({
                email: emailInput.value,
                pass: passInput.value,
                role: 0,
                index: accountList.length,
                canComment: true
            })

            saveToStorage("accountList", accountList);

            visibleNotice("Create new account succesfully");
        }
        else{
            visibleNotice("Please check your confirm password again");
        }
    }
    else{
        visibleNotice("Password must be at least 6 characters");
    }
})

