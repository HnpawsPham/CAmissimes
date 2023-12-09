const search=document.getElementById("search")
const body=document.querySelector(".container")
let i=0;

let row=document.createElement("div")
row.classList.add("row")

for(let info of list){
    
    if (i<3){

        let card=document.createElement("div")
        card.classList.add("col")
    
        let title=document.createElement("h2")
        title.innerHTML=info.title
        card.appendChild(title)
        
        let desc=document.createElement("p")
        desc.innerHTML=info.desb
        card.appendChild(desc)
    
        let button=document.createElement("a")
        button.innerHTML="Xem ngay"
        button.href=info.link

        card.appendChild(button)
        row.appendChild(card)
        body.appendChild(row)
        
        let space=document.createElement("br")
        body.appendChild(space)
        
        i++
    }
    else if(i==3){
        
        row=document.createElement("div")
        row.classList.add("row")
        i=0
    }
}
// bỏ dấu tiếng việt
function normalizeStr(str){
    return str  .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd').replace(/Đ/g, 'D')
                .toLowerCase()
}
// TÍNH NĂNG TÌM KIẾM
search.addEventListener("keypress",function(){
    document.querySelector(".notfound").classList.add("hide")
    let titles=document.querySelectorAll("h2")
    let card=document.querySelectorAll(".col")
    let noResult=true

    if(search.value!=""){
        for(let i in titles){
            try{
                document.querySelector(".notfound").classList.add("hide")
                card[i].classList.add("hide")

                if(normalizeStr(titles[i].innerHTML).includes(normalizeStr(search.value))){
                    card[i].classList.remove("hide")
                    noResult=false
                }
            }
            catch{}
        }
        if(noResult){
            document.querySelector(".notfound").classList.remove("hide")
        }
    }
})
