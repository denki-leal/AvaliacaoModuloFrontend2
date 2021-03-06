const sessionHome = localStorage.getItem("session");
let username = sessionStorage.getItem("logged");
type TUser={
    username: string,
    password: string,
    recados: any
}
const users:TUser[] = JSON.parse(localStorage.getItem("user") as string) ?? [];
const position = users.findIndex((currentUser:TUser) => currentUser.username == username);
const userObject = users[position]
function mostrarMensagem() {
  let HTMLmessages = "";
  const messages = userObject.recados;
  let corpoTable = document.getElementById("table-body") as HTMLElement
  if (messages.length) {
    messages.forEach((message:any, index:number) => {
      HTMLmessages += `
        <tr class="line">
          <td class="table-id">${index}</td>
          <td class="table-description">${message.description}</td>
          <td class="table-details">${message.details}</td>
          <td class="table-buttons">
            <button class="btn btn-edit" onClick="salvarRecado(true, ${index}); refresh();">Editar</button>
            
            <button class="btn btn-delete" onClick="deleteMessage(${index})">Apagar</button>
          </td>
        </tr>
      `;
    });
  }
  corpoTable.innerHTML = HTMLmessages;
}
function salvarRecado(isEdit:boolean, idEdit:number) {
  const formMessage = document.getElementById("form-message") as HTMLFormElement;
  const description = formMessage.message.value;
  const details = formMessage.details.value;
  if (!details || !description) {
    alert("Preencha todos os campos");
    return;
  }
  const users:TUser[] = JSON.parse(localStorage.getItem("user") as string) ?? [];
  const userObject = users[position];
  const listMensage = userObject.recados;
  const mensagem = {
    description: description,
    details: details,
  };
  if (isEdit) {
    listMensage[idEdit] = mensagem;
  } else {
    listMensage.push(mensagem);
  }
  users[position] = userObject
  localStorage.setItem("user", JSON.stringify(users));
  formMessage.reset();
  mostrarMensagem();
}
function deleteMessage(index: number) {
  userObject.recados.splice(index, 1);
  users[position] = userObject
  localStorage.setItem("user", JSON.stringify(users));
  mostrarMensagem();
}
function refresh(){
  location.reload();
}
function checkLoggedHome(): void {
  if (!username) {
    window.location.href = "./index.html";
    return;
  }
  const dataUser = sessionStorage.getItem(username);
  if (dataUser) {
    username = JSON.parse(dataUser);
  }
};
function logout() {
  sessionStorage.clear();
  window.location.href = "./index.html";
};
checkLoggedHome();
mostrarMensagem();