
import express from "express"
import cors from "cors";
import type { ToDo } from "../domain/toDo";
// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore,deleteDoc, setDoc, doc, getDoc, getDocs, collection, addDoc } from "firebase/firestore";
import * as dotenv from 'dotenv';
import { initializeApp } from "firebase/app";
dotenv.config();
// const firebaseConfig = {
//     apiKey: process.env.VITE_apikey,
//     authDomain: process.env.VITE_authDomain,
//     projectId: process.env.VITE_projectId,
//     storageBucket: process.env.VITE_storageBucket,
//     messagingSenderId: process.env.VITE_messagingSenderId,
//     appId: process.env.VITE_appId
// };
const firebaseConfig = {
    apiKey: "AIzaSyDhHjhc56740EXC5JokTL1Q69MP1JV1qp4",
authDomain: "day27-f9d4f.firebaseapp.com",
projectId: "day27-f9d4f",
storageBucket: "day27-f9d4f.appspot.com",
messagingSenderId: "58144372448",
appId: "1:58144372448:web:b440d02de95a616626c285"

}
// const firebaseConfig= process.env.VITE_firebaseConfig;
// Initialize Firebase
const todoapp = initializeApp(firebaseConfig);
const database = getFirestore(todoapp);


//express for server functions below----------
const app = express();
app.use(express.json());
app.use(cors());

app.get("/todolist", async (req, res) => {
    let cleanData: ToDo[] = [];
    console.log('getting to do list')
    const toDos = await getDocs(collection(database, "HWday27"))
  
    // const toDos = fs.readFileSync('./todolist.json')
    toDos.forEach((item) => {
      
         let task = item.data() as any as ToDo
          task.id = item.id
        cleanData.push(task)
        // console.log (cleanData)
    })
    res.send(cleanData)
});

app.post("/todolist", async (req, res) => {
    console.log(req.body)
    // const toDos: ToDo[] = await getDocs(collection(database, "gsdlist")) as any as ToDo[]

    // const toDos:ToDo[] = JSON.parse(fs.readFileSync('./todolist.json') as any as string);
    //    const toDos= [];
    const toDoItem = req.body.toDoItem;
    const dueDate = req.body.dueDate;
    const date = new Date(dueDate);
    console.log(date)
    // const timestamp = firebase.firestore.Timestamp.fromDate(date);

    const toDo: ToDo = {
        toDoItem: toDoItem,
        dueDate: dueDate,
        isCompleted: false,
        id:"" // null so that we can assign it when read later.
    }
    // toDos.push(toDo);
    const newlist = await addDoc(collection(database, "HWday27"), toDo)
    // fs.writeFileSync("./todolist.json", JSON.stringify(toDos))
    res.send(newlist)

})

app.post("/removeitem", async (req, res) => {
    console.log(req.body)
    // const toDos: ToDo[] = await getDocs(collection(database, "gsdlist")) as any as ToDo[]

    // const toDos:ToDo[] = JSON.parse(fs.readFileSync('./todolist.json') as any as string);
    //    const toDos= [];
    const id = req.body.id;
    
    const newlist = await deleteDoc(doc(database, "HWday27", id))
    // fs.writeFileSync("./todolist.json", JSON.stringify(toDos))
    res.send(newlist)

})


app.post("/toggleCompleted", async (req, res) => {
    console.log(req.body)
    // const toDos: ToDo[] = await getDocs(collection(database, "gsdlist")) as any as ToDo[]

    // const toDos:ToDo[] = JSON.parse(fs.readFileSync('./todolist.json') as any as string);
    //    const toDos= [];
    const id = req.body.id;
    
    const newlist = await setDoc(doc(database, "HWday27", id),{
        isCompleted:true
    }, {merge:true})
    // fs.writeFileSync("./todolist.json", JSON.stringify(toDos))
    res.send(newlist)

})


app.listen(3000)
