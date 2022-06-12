let users:any = undefined;
let isEdit:boolean = false;
let IdEdit:any = undefined;


const sessionHome = localStorage.getItem("session");
let loggedHome = sessionStorage.getItem("logged");

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

function mostrarMensagem() {
  let HTMLmessages = "";
  const messages = users.recados;
  if (messages.length) {
    messages.forEach((message:any, index:number) => {
      HTMLmessages += `
        <tr class="line">
          <td class="table-id">${index}</td>
          <td class="table-description">${message.description}</td>
          <td class="table-details">${message.details}</td>
          <td class="table-buttons">
            <button class="btn btn-edit" onClick="editMessage(${index})">Editar</button>
            
            <button class="btn btn-delete" onClick="deleteMessage(${index})">Apagar</button>
          </td>
        </tr>
      `;
    });
  }

  const element:HTMLElement = document.getElementById('table-body') as HTMLElement
  element.innerHTML = HTMLmessages

}

function salvarRecado() {
  const formMessage = document.getElementById("form-message") as HTMLFormElement;
  const description = formMessage.message.value;
  const details = formMessage.details.value;

  if (!details || !description) {
    alert("Preencha todos os campos");
    return;
  }

  const message = {
    description,
    details,
  };

  if (isEdit) {
    users.recados[IdEdit] = message;
    isEdit = false;
    IdEdit = null;
  } else {
    users.recados.push(message);
  }

  localStorage.setItem(users.username, JSON.stringify(users));
  mostrarMensagem();
  formMessage.reset();
}

function deleteMessage(index:number) {
  users.recados.splice(index, 1);
  localStorage.setItem(users.username, JSON.stringify(users));
  mostrarMensagem();
}

function editMessage(index:number) {
  const formMessage = document.getElementById("form-message") as HTMLFormElement;
  formMessage.message.value = users.recados[index].description;
  formMessage.details.value = users.recados[index].details;
  isEdit = true;
  IdEdit = index;
}



function logout() {
  sessionStorage.clear();
  window.location.href = "./index.html";
}

checkLoggedHome();
