"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firestore_1 = require("firebase/firestore");
const dotenv = __importStar(require("dotenv"));
const app_1 = require("firebase/app");
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
};
// const firebaseConfig= process.env.VITE_firebaseConfig;
// Initialize Firebase
const todoapp = (0, app_1.initializeApp)(firebaseConfig);
const database = (0, firestore_1.getFirestore)(todoapp);
//express for server functions below----------
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/todolist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cleanData = [];
    console.log('getting to do list');
    const toDos = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(database, "HWday27"));
    // const toDos = fs.readFileSync('./todolist.json')
    toDos.forEach((item) => {
        let task = item.data();
        task.id = item.id;
        cleanData.push(task);
        // console.log (cleanData)
    });
    res.send(cleanData);
}));
app.post("/todolist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    // const toDos: ToDo[] = await getDocs(collection(database, "gsdlist")) as any as ToDo[]
    // const toDos:ToDo[] = JSON.parse(fs.readFileSync('./todolist.json') as any as string);
    //    const toDos= [];
    const toDoItem = req.body.toDoItem;
    const dueDate = req.body.dueDate;
    const date = new Date(dueDate);
    console.log(date);
    // const timestamp = firebase.firestore.Timestamp.fromDate(date);
    const toDo = {
        toDoItem: toDoItem,
        dueDate: dueDate,
        isCompleted: false,
        id: "" // null so that we can assign it when read later.
    };
    // toDos.push(toDo);
    const newlist = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(database, "HWday27"), toDo);
    // fs.writeFileSync("./todolist.json", JSON.stringify(toDos))
    res.send(newlist);
}));
app.post("/removeitem", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    // const toDos: ToDo[] = await getDocs(collection(database, "gsdlist")) as any as ToDo[]
    // const toDos:ToDo[] = JSON.parse(fs.readFileSync('./todolist.json') as any as string);
    //    const toDos= [];
    const id = req.body.id;
    const newlist = yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(database, "HWday27", id));
    // fs.writeFileSync("./todolist.json", JSON.stringify(toDos))
    res.send(newlist);
}));
app.post("/toggleCompleted", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    // const toDos: ToDo[] = await getDocs(collection(database, "gsdlist")) as any as ToDo[]
    // const toDos:ToDo[] = JSON.parse(fs.readFileSync('./todolist.json') as any as string);
    //    const toDos= [];
    const id = req.body.id;
    const newlist = yield (0, firestore_1.setDoc)((0, firestore_1.doc)(database, "HWday27", id), {
        isCompleted: true
    }, { merge: true });
    // fs.writeFileSync("./todolist.json", JSON.stringify(toDos))
    res.send(newlist);
}));
app.listen(3000);
