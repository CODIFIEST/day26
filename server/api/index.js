"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var cors_1 = require("cors");
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
var firestore_1 = require("../node_modules/@firebase/firestore");
var dotenv = require("../node_modules/dotenv");
var app_public_1 = require("../node_modules/@firebase/app/dist/app-public");
dotenv.config();
var firebaseConfig = {
    apiKey: process.env.VITE_apikey,
    authDomain: process.env.VITE_authDomain,
    projectId: process.env.VITE_projectId,
    storageBucket: process.env.VITE_storageBucket,
    messagingSenderId: process.env.VITE_messagingSenderId,
    appId: process.env.VITE_appId
};
// const firebaseConfig= process.env.VITE_firebaseConfig;
// Initialize Firebase
var todoapp = (0, app_public_1.initializeApp)(firebaseConfig);
var database = (0, firestore_1.getFirestore)(todoapp);
//express for server functions below----------
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.get("/todolist", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cleanData, toDos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cleanData = [];
                console.log('getting to do list');
                return [4 /*yield*/, (0, firestore_1.getDocs)((0, firestore_1.collection)(database, "HWday27"))
                    // const toDos = fs.readFileSync('./todolist.json')
                ];
            case 1:
                toDos = _a.sent();
                // const toDos = fs.readFileSync('./todolist.json')
                toDos.forEach(function (item) {
                    var task = item.data();
                    task.id = item.id;
                    cleanData.push(task);
                    // console.log (cleanData)
                });
                res.send(cleanData);
                return [2 /*return*/];
        }
    });
}); });
app.post("/todolist", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var toDoItem, dueDate, date, toDo, newlist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                toDoItem = req.body.toDoItem;
                dueDate = req.body.dueDate;
                date = new Date(dueDate);
                console.log(date);
                toDo = {
                    toDoItem: toDoItem,
                    dueDate: dueDate,
                    isCompleted: false,
                    id: "" // null so that we can assign it when read later.
                };
                return [4 /*yield*/, (0, firestore_1.addDoc)((0, firestore_1.collection)(database, "HWday27"), toDo)
                    // fs.writeFileSync("./todolist.json", JSON.stringify(toDos))
                ];
            case 1:
                newlist = _a.sent();
                // fs.writeFileSync("./todolist.json", JSON.stringify(toDos))
                res.send(newlist);
                return [2 /*return*/];
        }
    });
}); });
app.post("/removeitem", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, newlist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                id = req.body.id;
                return [4 /*yield*/, (0, firestore_1.deleteDoc)((0, firestore_1.doc)(database, "HWday27", id))
                    // fs.writeFileSync("./todolist.json", JSON.stringify(toDos))
                ];
            case 1:
                newlist = _a.sent();
                // fs.writeFileSync("./todolist.json", JSON.stringify(toDos))
                res.send(newlist);
                return [2 /*return*/];
        }
    });
}); });
app.post("/toggleCompleted", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, newlist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body);
                id = req.body.id;
                return [4 /*yield*/, (0, firestore_1.setDoc)((0, firestore_1.doc)(database, "HWday27", id), {
                        isCompleted: true
                    }, { merge: true })
                    // fs.writeFileSync("./todolist.json", JSON.stringify(toDos))
                ];
            case 1:
                newlist = _a.sent();
                // fs.writeFileSync("./todolist.json", JSON.stringify(toDos))
                res.send(newlist);
                return [2 /*return*/];
        }
    });
}); });
app.listen(3000);
