import express from "express"
import path from 'path'
import fs from "fs"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from "cors"
import { results } from "./network.js";
const PORT = 5500;
// Create a server with express
const app = express()

// Receive object
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));

// GG bảo v
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Hien thi trang html dung get het nha 
app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})


// Phan nay dung de :))) viet file gi day cua em
app.post("/addComment", (req, res) => {
    const content = req.body.content;
    // ghi de file thi them option
   // fs.appendFileSync("commentsList.txt", content + "\r\n");
   if (!fs.existsSync("./data.json")) {
    fs.writeFileSync("./data.json", "[]")
   } else {
    let data;

    function callBack() {
        data.push(content);
        fs.writeFileSync("./data.json", JSON.stringify(data));
    }
    // La do tep ton tai nhung khong co gi ca co the la do em vua xoa cai [], de fix thi chi can them
    try {
        data = JSON.parse(fs.readFileSync("./data.json"))
        callBack()
    } catch{
        data = [];
        callBack()
    }
   }

    // return
    res.sendFile(path.join(__dirname, 'index.html'));
})
// Neu ma muon :)) doc du liẹu  chuyen thanh mang thi nên luu duoi dang json.

app.get("/getComment",(req,res) => {

   res.send(
    {
        code: 200,
        message: "Read file succsesfully",
        data: JSON.parse(fs.readFileSync("data.json"))
    }
   )
})



// Cho nay dung de xoa comment
app.delete("/deleteComment", (req, res) => {


})


// I can not use live server , I use express instead
app.listen(PORT, () => {
    console.log(`Server is listening: http://${results["Wi-Fi"]}:${PORT}`)
})