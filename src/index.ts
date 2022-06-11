const inputName = document.getElementById("user-create-input") as HTMLInputElement
const inputPass = document.getElementById("password-create-input") as HTMLInputElement
const buttonCadastro = document.getElementById("btn-criar-conta-modal") as HTMLButtonElement
const session = localStorage.getItem("session");
let logged = sessionStorage.getItem("logged");

interface IuserCadastro {
    name:string
    password:string
    recados:string[]
}

checkLogged();

function cadastrarUser() {

    if(!verificarNome(inputName.value)){
        return alert("Seu nome precisa ter pelo menos 3 letras!")
    }

    const newUser:IuserCadastro = {
        name: inputName.value,
        password: inputPass.value, 
        recados: []
    }

    const user:IuserCadastro[] = JSON.parse(window.localStorage.getItem('users') as string) ||[]
    if(user.findIndex((user) => user.name === newUser.name) !== -1){
        return alert(`O usuário ${newUser} não está disponivel!`)
    }

    user.push(newUser)

    localStorage.setItem('users', JSON.stringify(user))
    alert(`Tudo ok ${inputName.value}! Sua conta foi criada!`)
    return
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

function checkLogged(){
    if(session) {
        sessionStorage.setItem("logged", session)
        logged = session
    }

    if(logged){
        saveSession(logged);
        window.location.href = './home.html'
    }
}

function login(){
   
}

