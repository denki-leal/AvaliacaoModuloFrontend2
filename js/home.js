"use strict";
const sessionHome = localStorage.getItem("session");
let loggedHome = sessionStorage.getItem("logged");
let users;
let isEdit = false;
let ixEdit = undefined;
const form = document.querySelector('#form-message');
const corpoTabela = document.querySelector('#table-body');
const salvarRecado = (event) => {
    event.preventDefault();
    const descricao = form?.message.value;
    const detalhes = form?.details.value;
    if (!detalhes || !descricao) {
        alert("Preencha todos os campos");
        return;
    }
    const message = {
        descricao,
        detalhes,
    };
    if (isEdit) {
        users.recados[ixEdit] = message;
        isEdit = false;
        ixEdit = null;
    }
    else {
        users.recados.push(message);
    }
    const recados = JSON.parse(localStorage.getItem(users.recados) || "[]");
    recados.push({
        descricao,
        detalhes
    });
    localStorage.setItem(users.recados, JSON.stringify(users.recados));
    preencherTabela();
    form.reset();
};
const preencherTabela = () => {
    let HTMLmessages = "";
    const messages = users.recados;
    if (messages.length) {
        messages.array.forEach((message, index) => {
            HTMLmessages += `
       <tr class="line">
          <td class="table-id">${index}</td>
          <td class="table-description">${messages.descricao}</td>
          <td class="table-details">${messages.detalhes}</td>
          <td class="table-buttons">
            <button class="btn btn-edit" onClick="editMessage(${index})">Editar</button>
            <button class="btn btn-delete" onClick="deleteMessage(${index})">Apagar</button>
          </td>
        </tr>
      `;
        });
    }
    corpoTabela.innerHTML = HTMLmessages;
};
form?.addEventListener('submit', salvarRecado);
function deleteMessage(index) {
    users.recados.splice(index, 1);
    localStorage.setItem(users.name, JSON.stringify(users));
    preencherTabela();
}
function editMessage(index) {
    const formMessage = document.querySelector("#form-message");
    formMessage.message.value = users.recados[index].message;
    formMessage.details.value = users.recados[index].details;
    isEdit = true;
    ixEdit = index;
}
function checkLoggedHome() {
    if (!loggedHome) {
        window.location.href = "./index.html";
        return;
    }
    const dataUser = localStorage.getItem(loggedHome);
    if (dataUser) {
        users = JSON.parse(dataUser);
    }
}
;
function logout() {
    sessionStorage.clear();
    window.location.href = "./index.html";
}
;
checkLoggedHome();
document.addEventListener('DOMContentLoaded', preencherTabela);
