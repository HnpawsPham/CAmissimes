
import { findData, saveToStorage } from "./firebase.js";

let accountList = await findData("accountList");

let accountID = sessionStorage.getItem("accountID");

const adminName = document.getElementById("admin-name");
const table = document.getElementById("table");

// OPEN CHOSEN WORK
function viewUserWork(account, workID) {
    // OPEN NEW TAB
    const newTab = window.open('', '_blank');

    newTab.document.open();
    newTab.document.write(`${account.work[workID].html}`);

    // LOAD IMAGES AND AUDIOS
    let images = newTab.document.querySelectorAll("img");
    let audios = newTab.document.querySelectorAll("audio");

    if (images.length > 0) {
        for (let image of images) {
            image.src = account.work[workID].assets[`${image.src.split("/").pop()}`];
        }
    }

    if (audios.length > 0) {
        for (let audio of audios) {
            audio.src = account.work[workID].assets[`${audio.src.split("/").pop()}`];
        }
    }

    newTab.document.close();
}

// VISIBLE ADMIN NAME
adminName.innerHTML = "Admin: " + accountList[accountID].name;

// LOAD ALL ACCOUNTS ON TABLE
for (let [i, account] of accountList.entries()) {
    let tr = document.createElement("tr");

    let index = document.createElement("td");
    index.innerHTML = account.index;
    tr.appendChild(index);

    let name = document.createElement("td");
    name.innerHTML = account.name;
    tr.appendChild(name);

    let email = document.createElement("td");
    email.innerHTML = account.email;
    tr.appendChild(email);

    let pass = document.createElement("td");
    pass.innerHTML = account.pass;
    tr.appendChild(pass);

    let workList = document.createElement("td");

    for(let [i,work] of account.work.entries()){

        let card = document.createElement("div");
        card.style.display = "flex";
        card.style.justifyContent = "space-evenly";

        let name = document.createElement("p");
        name.style.textDecoration = "underlined";
        name.innerHTML = work.name;
        name.style.cursor = "pointer";
        card.appendChild(name);

        name.addEventListener("click", function(){
            viewUserWork(account, i);
        })

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = work.isVerified;
        card.appendChild(checkbox);

        checkbox.addEventListener("change",function(){
            if(checkbox.checked){
                work["isVerified"] = true;
            }
            else{
                work["isVerified"] = false;
            }

            saveToStorage("accountList", accountList);
    })

        workList.appendChild(card);
    }

    tr.appendChild(workList);


    let div = document.createElement("td");

    let role = document.createElement("input");
    role.type = "number";
    role.min = 0;
    role.max = 1;
    role.value = account.role;

    role.addEventListener("change", async function () {
        account.role = role.value;

        accountList[i] = account;
        saveToStorage("accountList", accountList).then(
            accountList = await findData("accountList")
        );

        // WAIT FOR DATABASE TO UPDATE
        let delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(3000);

        if (accountList[accountID].role == 0) {
            window.location.href = "../index.html"
        }
        else {
            alert("Change role successfully");
        }
    })


    div.appendChild(role);
    tr.appendChild(div);

    table.appendChild(tr);
}