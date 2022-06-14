"use strict";
const sessionHome = localStorage.getItem("session");
let username = sessionStorage.getItem("logged");
const users = JSON.parse(localStorage.getItem("user")) ?? [];
const position = users.findIndex((currentUser) => currentUser.username == username);
const userObject = users[position];
function mostrarMensagem() {
    let HTMLmessages = "";
    const messages = userObject.recados;
    let corpoTable = document.getElementById("form-message");
    if (messages.length) {
        messages.forEach((message, index) => {
            HTMLmessages += `
        <tr class="line">
          <td class="table-id">${index}</td>
          <td class="table-description">${message.description}</td>
          <td class="table-details">${message.details}</td>
          <td class="table-buttons">
            <button class="btn btn-edit" onClick="salvarRecado(true, ${index})">Editar</button>
            
            <button class="btn btn-delete" onClick="deleteMessage(${index})">Apagar</button>
          </td>
        </tr>
      `;
        });
    }
    corpoTable.innerHTML = HTMLmessages;
}
function salvarRecado(isEdit, idEdit) {
    const formMessage = document.getElementById("form-message");
    const description = formMessage.message.value;
    const details = formMessage.details.value;
    if (!details || !description) {
        alert("Preencha todos os campos");
        return;
    }
    const users = JSON.parse(localStorage.getItem("user")) ?? [];
    const userObject = users[position];
    const listMensage = userObject.recados;
    const message = {
        description: description.value,
        details: details.value,
    };
    if (isEdit) {
        listMensage[idEdit] = message;
    }
    else {
        listMensage.push(message);
    }
    users[position] = userObject;
    localStorage.setItem("user", JSON.stringify(users));
    mostrarMensagem();
    formMessage.reset();
}
function deleteMessage(index) {
    userObject.recados.splice(index, 1);
    users[position] = userObject;
    localStorage.setItem("user", JSON.stringify(users));
    mostrarMensagem();
}
function editMessage(index, isEdit, idEdit) {
    const formMessage = document.getElementById("form-message");
    formMessage.message.value = userObject.recados[index].description;
    formMessage.details.value = userObject.recados[index].details;
    isEdit = true;
    idEdit = index;
}
function checkLoggedHome() {
    if (!username) {
        window.location.href = "./index.html";
        return;
    }
    const dataUser = sessionStorage.getItem(username);
    if (dataUser) {
        username = JSON.parse(dataUser);
    }
}
;
function logout() {
    sessionStorage.clear();
    window.location.href = "./index.html";
}
;
checkLoggedHome();
mostrarMensagem();
