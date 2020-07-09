
$(document).ready(function() {

    if (localStorage.access_token) {
        homeAfterLogin()
    } else {
        homeBeforeLogin()
    }
    // loginPage()
    // registerPage()
})


function loginPage() {
    $(`#loginEmail`).val(``)
    $(`#loginPassword`).val(``)
    $(`#form-login`).show()
    $(`#home-before-login`).hide()
    $(`#form-register`).hide()
    $(`#logout-button`).hide()
    $(`#home-after-login`).hide()
    $(`#login-button`).show()
}

function registerPage() {
    $(`#form-login`).hide()
    $(`#home-before-login`).hide()
    $(`#form-register`).show()
    $(`#logout-button`).hide()
    $(`#home-after-login`).hide()
    $(`#login-button`).show()
    $(`#registerEmail`).val(``)
    $(`#registerPassword`).val(``)
    $(`#registerName`).val(``)
}

function homeAfterLogin() {
    $(`#home-after-login`).show()
    $(`#login-button`).hide()
    $(`#form-login`).hide()
    $(`#form-register`).hide()
    $(`#home-before-login`).hide()
    $(`#logout-button`).show()
    $(`#after-page-search`).hide()
    $(`#searchEngine`).val(``)
    $(`#language`).val(`select language`)
}

function homeBeforeLogin() {
    $(`#logout-button`).hide()
    $(`#form-login`).hide()
    $(`#form-register`).hide()
    $(`#home-after-login`).hide()
    $(`#home-before-login`).show()
    $(`#login-button`).show()
    $(`#after-page-search`).hide()
}


function loginForm(event) {
    event.preventDefault()
    const email = $(`#loginEmail`).val()
    const password = $(`#loginPassword`).val()
    $(`#alertLogin`).empty()
    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/login`,
        data: {
            email: email,
            password: password
        }
    })
    .done((result) => {
        localStorage.access_token = result.access_token
        homeAfterLogin()
    })
    .fail((err) => {
        console.log(err.responseJSON.errors)
        $(`#alertLogin`).append(`
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${err.responseJSON.errors[0].message}        
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`)
    })
    .always( () => {
        console.log(`tes`)
        $(`#loginEmail`).val(``)
        $(`#loginPassword`).val(``)
    })
}

function registerForm(event) {
    event.preventDefault()
    const email = $(`#registerEmail`).val()
    const password = $(`#registerPassword`).val()
    const name = $(`#registerName`).val()
    $(`#alertRegister`).empty()
    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/register`,
        data: {
            email: email,
            password: password,
            name: name
        }
    })
    .done((result) => {
        console.log(result)
        $(`#alertRegister`).append(`
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                successfully registered! Please sign in to surf in our Portal News!        
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)
    })
    .fail((err) => {
        let errors = err.responseJSON.errors
        errors.forEach(element => {
            $(`#alertRegister`).append(`
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                ${element.message}        
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>`)    
        });
    })
    .always( () => {
        console.log(`tes`)
        $(`#registerEmail`).val(``)
        $(`#registerPassword`).val(``)
        $(`#registerName`).val(``)
    })
}

function searchNews(event) {
    event.preventDefault()
    $.ajax({
        method: `POST`,
        url: ``,
        data: ``
    })
    .done(data => {

    })
    .fail(err => {

    })
    .always(() => {
        
    })
}

function logoutButton() {
    localStorage.clear()
    homeBeforeLogin()
    signOut()
}

function loginButton() {
    loginPage()
}

function registerButton() {
    registerPage()
}

function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/users/login/google`,
        data: {
            id_token
        }
    })
    .done((result) => {
        localStorage.setItem(`access_token`, result.access_token)
        homeAfterLogin()
    })
    .fail((err) => {
        console.log(err)
    })
    .always(() => {

    })
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}
