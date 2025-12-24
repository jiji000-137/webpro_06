"use strict"; 

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");


let characters = [
    { id: 1, name: "アルス", job: "勇者", hp: 120, mp: 30 },
    { id: 2, name: "ルナ", job: "魔法使い", hp: 60, mp: 150 }
];

let todos = [
    { id: 1, task: "課題提出", deadline: "2025-01-10", status: "未完了" },
    { id: 2, task: "買い物", deadline: "2024-12-24", status: "完了" }
];

let music = [
    { id: 1, title: "アイラブユー", artist: "back number", length: "3:56" },
    { id: 2, title: "ベルベットの詩", artist: "back number", length: "4:14" }
];

// トップページ
app.get("/", (req, res) => { res.render("top"); });

function createRoutes(resourceName, dataArray, viewPrefix) {
    // 一覧 
    app.get(`/${resourceName}`, (req, res) => {
        res.render(`${viewPrefix}_list`, { data: dataArray });
    });

    // 新規登録フォーム表示
    app.get(`/${resourceName}/create`, (req, res) => {
        res.render(`${viewPrefix}_new`);
    });

    // 詳細表示
    app.get(`/${resourceName}/:number`, (req, res) => {
        const n = req.params.number; 
        res.render(`${viewPrefix}_detail`, { id: n, data: dataArray[n] });
    });

    // 削除処理
    app.get(`/${resourceName}/delete/:number`, (req, res) => {
        dataArray.splice(req.params.number, 1);  
        res.redirect(`/${resourceName}`);
    });

    // 編集フォーム表示
    app.get(`/${resourceName}/edit/:number`, (req, res) => {
        const n = req.params.number;
        res.render(`${viewPrefix}_edit`, { id: n, data: dataArray[n] });
    });
}

createRoutes("characters", characters, "char");
createRoutes("todos", todos, "todo");
createRoutes("music", music, "music");

// RPG新規登録
app.post("/characters", (req, res) => {
    characters.push({ id: characters.length + 1, ...req.body }); // データの追加 [cite: 160]
    res.redirect("/characters");
});
// RPG更新
app.post("/characters/update/:number", (req, res) => {
    characters[req.params.number] = { id: characters[req.params.number].id, ...req.body };
    res.redirect("/characters");
});

// To-Do新規登録
app.post("/todos", (req, res) => {
    todos.push({ id: todos.length + 1, ...req.body });
    res.redirect("/todos");
});
// To-Do更新
app.post("/todos/update/:number", (req, res) => {
    todos[req.params.number] = { id: todos[req.params.number].id, ...req.body };
    res.redirect("/todos");
});

// 音楽新規登録
app.post("/music", (req, res) => {
    music.push({ id: music.length + 1, ...req.body });
    res.redirect("/music");
});
// 音楽更新
app.post("/music/update/:number", (req, res) => {
    music[req.params.number] = { id: music[req.params.number].id, ...req.body };
    res.redirect("/music");
});

app.listen(8080, () => console.log("Server running at http://localhost:8080"));
