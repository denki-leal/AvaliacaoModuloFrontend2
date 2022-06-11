"use strict";
const inputName = document.getElementById("user-create-input");
const inputPass = document.getElementById("password-create-input");
const buttonCadastro = document.getElementById("btn-criar-conta-modal");
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");
checkLogged();
function cadastrarUser() {
    if (!verificarNome(inputName.value)) {
        return alert("Seu nome precisa ter pelo menos 3 letras!");
    }
    const newUser = {
        name: inputName.value,
        password: inputPass.value,
        recados: []
    };
    const user = JSON.parse(window.localStorage.getItem('users')) || [];
    if (user.findIndex((user) => user.name === newUser.name) !== -1) {
        return alert(`O usuário ${newUser} não está disponivel!`);
    }
    user.push(newUser);
    localStorage.setItem('users', JSON.stringify(user));
    alert(`Tudo ok ${inputName.value}! Sua conta foi criada!`);
    return;
}
function verificarNome(name) {
    if (name.length >= 3) {
        return true;
    }
    return false;
}
function saveSession(data) {
    sessionStorage.setItem('logged', data);
}
function checkLogged() {
    if (session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }
    if (logged) {
        saveSession(logged);
        window.location.href = './home.html';
    }
}
function login() {
}
