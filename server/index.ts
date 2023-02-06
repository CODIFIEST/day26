import express from "express";
import fs from "fs";
import cors from "cors";
import type { ToDo } from "./domain/toDo";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/todolist", (req, res)=>{
    console.log('getting to do list')
    const toDos = fs.readFileSync('./todolist.json')
    res.send(toDos)
});

app.post("/todolist", (req, res)=>{
    console.log(req.body)
    const toDos:ToDo[] = JSON.parse(fs.readFileSync('./todolist.json') as any as string);
    const toDoItem = req.body.toDoItem;
    const dueDate = req.body.dueDate;

    const toDo:ToDo = {
        toDoItem:toDoItem,
        dueDate:dueDate,
        isCompleted: false
    }
    toDos.push(toDo);
    fs.writeFileSync("./todolist.json", JSON.stringify(toDos))
    res.send(toDos)
    
})
app.listen(3000)
