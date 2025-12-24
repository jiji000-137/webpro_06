"use strict"; 

const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));

// System A: RPGキャラクター図鑑
let characters = [
    { id: 1, name: "勇者アベル", job: "勇者", level: 50, hp: 500, bio: "伝説の剣を探している。" },
    { id: 2, name: "魔法使いマリ", job: "魔法使い", level: 48, hp: 250, bio: "古代魔法の研究家。" }
];

// System B: To Do リスト
let todos = [
    { id: 1, task: "レポート作成", deadline: "2025-12-25", priority: "高", status: "未着手" },
    { id: 2, task: "食材の買い出し", deadline: "2025-12-23", priority: "中", status: "完了" }
];

// System C: 音楽プレイリスト
let playlist = [
    { id: 1, title: "Shape of You", artist: "Ed Sheeran", genre: "Pop", year: 2017 },
    { id: 2, title: "Bohemian Rhapsody", artist: "Queen", genre: "Rock", year: 1975 }
];

// --- System B: To Do リスト (/todo) ---

// 1. 一覧表示
app.get("/todo", (req, res) => {
    res.render('todo_list', { data: todos });
});

// 2. 新規登録フォーム表示
app.get("/todo/create", (req, res) => {
    // 講義通り HTMLファイルを redirect するか、ejsを render する
    res.redirect('/public/todo_new.html');
});

// 3. 新規登録処理
app.post("/todo", (req, res) => {
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
    const item = {
        id: newId,
        task: req.body.task,
        deadline: req.body.deadline,
        priority: req.body.priority,
        status: req.body.status
    };
    todos.push(item); // 配列に追加
    res.redirect('/todo');
});

// 4. 詳細表示
app.get("/todo/:number", (req, res) => {
    const number = req.params.number; // 配列のインデックスを利用
    res.render('todo_detail', { id: number, data: todos[number] });
});

// 5. 編集フォーム表示
app.get("/todo/edit/:number", (req, res) => {
    const number = req.params.number;
    res.render('todo_edit', { id: number, data: todos[number] });
});

// 6. 更新処理
app.post("/todo/update/:number", (req, res) => {
    const n = req.params.number;
    todos[n].task = req.body.task;
    todos[n].deadline = req.body.deadline;
    todos[n].priority = req.body.priority;
    todos[n].status = req.body.status;
    res.redirect('/todo');
});

// 7. 削除処理
app.get("/todo/delete/:number", (req, res) => {
    todos.splice(req.params.number, 1); // 指定インデックスを削除
    res.redirect('/todo');
});

// サーバー起動
app.listen(8080, () => console.log("Example app listening on port 8080!"));
