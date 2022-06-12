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



function logout() {
  sessionStorage.clear();
  window.location.href = "./index.html";
}

checkLoggedHome();
