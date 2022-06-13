const inputName = document.getElementById("user-create-input") as HTMLInputElement
const inputPass = document.getElementById("password-create-input") as HTMLInputElement
const buttonCadastro = document.getElementById("btn-criar-conta-modal") as HTMLButtonElement
const sessionIndex = localStorage.getItem("session");
let loggedIndex = sessionStorage.getItem("logged");

interface IuserCadastro {
    name:string
    password:string
    recados:string[]
}

checkLoggedIndex();

function cadastrarUser() {

    if(!verificarNome(inputName.value)){
        return alert("Seu nome precisa ter pelo menos 3 letras!")
    }

    const newUser:IuserCadastro = {
        name: inputName.value,
        password: inputPass.value, 
        recados: []
    }

    const user:IuserCadastro[] = JSON.parse(localStorage.getItem('users') as string) ||[]
    if(user.findIndex((user) => user.name === newUser.name) !== -1){
        return alert(`O usuário ${newUser} não está disponivel!`)
    }

    user.push(newUser)

    localStorage.setItem('users', JSON.stringify(user))
    alert(`Tudo ok ${inputName.value}! Sua conta foi criada!`)
    return
    limparForms()
}

function verificarNome(name:string){
    if(name.length>= 3){
        return true
    }
    return false
}

function saveSession(data:string){
    sessionStorage.setItem('logged', data)
}

function checkLoggedIndex(){
    if(sessionIndex) {
        sessionStorage.setItem("logged", sessionIndex)
        loggedIndex = sessionIndex
    }

    if(loggedIndex){
        saveSession(loggedIndex);
        window.location.href = './home.html'
    }
}

const qSelect = (select:any) => document.querySelector(select);

function login(){
    const form = qSelect("#formulario");

  const user = JSON.parse(localStorage.getItem("users") as string) || ""
  const indiceUsuario = user.findIndex((us:any)=>us.name === form.username.value)
  if(indiceUsuario === -1){
    alert("Login ou senha invalidos")
    return
    }
    const indicePass = user.findIndex((us:any) => us.password === form.password.value)
    if(indicePass === -1){
    alert("Login ou senha invalidos")
    return;
    }
  
  saveSession(form.username.value);
  window.location.href = "./home.html"
}

function limparForms():void {
    inputName.value = ""    
    inputPass.value = ""        
}