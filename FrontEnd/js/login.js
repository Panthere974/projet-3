import { loginPortfolio } from "./export-login-api.js"

/** Récuperer les éléments du HTML */
const email = document.getElementById("email");
const Password = document.getElementById("login-password");
const btnSubmit = document.getElementById("btn-login");

let emailInput = ""
let passwordInput = ""

console.log(email)

/** Connexion avec l'input de l'email */
email.addEventListener("input", (connexion) => {
    emailInput = connexion.target.value
})

/** Connexion avec l'input du mot de passe */
password.addEventListener("input", (connexion) => {
    passwordInput = connexion.target.value
})

/** Connexion avec le bouton du login form */
btnSubmit. addEventListener("click", async (connexion) => {
    connexion.preventDefault()
    let user = {"email": emailInput, "password": password};
    console.log(user)
})

/** Comparaison et action avec les données de l'API */



