
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
    listNews()
    $(`#home-after-login`).show()
    $(`#login-button`).hide()
    $(`#form-login`).hide()
    $(`#form-register`).hide()
    $(`#home-before-login`).hide()
    $(`#logout-button`).show()
    $(`#after-page-search`).hide()
    $(`#searchEngine`).val(``)
    $(`#language`).val(`select language`)
    $(`.results`).empty()
    $(`#fromCurrency`).val(`select`)
    $(`#toCurrency`).val(`select`)
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
        // console.log(err)
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

function listNews() {
    $.ajax({
        method: `GET`,
        url: `http://localhost:3000/news/us`,
        headers: {
            access_token: localStorage.access_token    
        }
    })
    .done(data => {
        console.log(data)    
        if (data.totalResults == 0) {
            $(`#news-page`).text(`We are apologize, currently we can't find any news for you. Please try again later.`)
        }
        data.forEach(element => {
            if (element.content != null) {
                $(`#news-page`).append(`
                <div class="card mb-3">
                    <img src="${element.urlToImage}" class="card-img-top" alt="news-image.jpg">
                    <div class="card-body">
                    <h5 class="card-title font-weight-bold">${element.title}</h5>
                    <p class="card-text">${element.content}</p>
                    <p>source: <span>${element.source.name}</span> <a target="_blank" href="${element.url}">${element.url}</a></p>
                    <p class="card-text"><small class="text-muted">published at ${new Date(element.publishedAt).toDateString()}</small></p>
                    </div>
                </div>
                `)    
            }
        });
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
    })
}

function listNewsSearch(event) {
    event.preventDefault()
    console.log($(`#source`).val())
    $(`#news-page`).empty()
    $.ajax({
        method: `GET`,
        url: `http://localhost:3000/news/${$(`#source`).val()}`,
        headers: {
            access_token: localStorage.access_token    
        }
    })
    .done(data => {
        console.log(data)    
        if (data.totalResults == 0) {
            $(`#news-page`).text(`We are apologize, currently we can't find any news for you. Please try again later.`)
        }
        data.forEach(element => {
            if (element.content !== null) {
                $(`#news-page`).append(`
                <div class="card mb-3">
                    <img src="${element.urlToImage}" class="card-img-top" alt="news-image.jpg">
                    <div class="card-body">
                    <h5 class="card-title font-weight-bold">${element.title}</h5>
                    <p class="card-text">${element.content}</p>
                    <p>source: <span>${element.source.name}</span> <a target="_blank" href="${element.url}">${element.url}</a></p>
                    <p class="card-text"><small class="text-muted">published at ${new Date(element.publishedAt).toDateString()}</small></p>
                    </div>
                </div>
                `)    
            }
        });
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
    })
}


function searchNews(event) {
    event.preventDefault()
    console.log($(`#searchEngine`).val())
    console.log($(`#language`).val())
    $(`#before-page-search`).hide()
    $(`#after-page-search`).show()
    $(`#news-search`).empty()
    $(`#searchAlert`).empty()
    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/news/search`,
        headers: {
            access_token: localStorage.access_token    
        },
        data: {
            keywords: $(`#searchEngine`).val(),
            language: $(`#language`).val()  
        }
    })
    .done(data => {
        if ($(`#searchEngine`).val().length == 0) {
            $(`#news-search`).append(`Sorry, we can't find any news with keywords: "${$(`#searchEngine`).val()}"`)
        } else {
            if(data.totalResults != 0 || data.articles == undefined) {
                data.articles.forEach(element => {
                    if (element.content !== null) {
                        $(`#news-search`).append(`
                        <div class="card mb-3">
                        <img src="${element.urlToImage}" class="card-img-top" alt="news-image.jpg">
                        <div class="card-body">
                        <h5 class="card-title font-weight-bold">${element.title}</h5>
                        <p class="card-text">${element.content}</p>
                        <p>source: <span>${element.source.name}</span> <a target="_blank" href="${element.url}">${element.url}</a></p>
                        <p class="card-text"><small class="text-muted">published at ${new Date(element.publishedAt).toDateString()}</small></p>
                        </div>
                        </div>
                        `)
                    }
                });
            } else {
                $(`#news-search`).append(`Sorry, we can't find any news with keywords: "${$(`#searchEngine`).val()}"`)
            }
        }
    })
    .fail(err => {
        console.log(err)
    })
    .always(() => {
        $(`#searchEngine`).val(``)
        $(`#language`).val(`select language`)
    })
}

function converter(event) {
    event.preventDefault()
    console.log($(`#fromCurrency`).val())
    console.log($(`#toCurrency`).val())
    $(`.results`).empty()
    $.ajax({
        method: `POST`,
        url: `http://localhost:3000/currency`,
        data: {
            from: $(`#fromCurrency`).val(),
            to: $(`#toCurrency`).val()
        },
        headers: {
            access_token: localStorage.access_token    
        }
    })
    .done(data => {
        console.log(data)
        $(`.results`).append(`Result: ${data.toLocaleString('id-ID', { style: 'currency', currency: `${$(`#toCurrency`).val()}` }) }`)
    })
    .fail(err => {
        console.log(err)
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
        url: `http://localhost:3000/googleSignIn`,
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

// $.getJSON("https://api.fixer.io/latest?base=ZAR", function(data) {
//   var currencies = [];
//   $.each(data.rates, function(currency, rate) {
//     // Currency options dropdown menu
//     currencies.push("<option id='" + currency.toLowerCase() + "' value='" + rate + "' >" + currency + "</option>");
//   });
//   $(".currency-list").append(currencies);
// })

//Calculate and output the new amount
// function exchangeCurrency() {
//   var amount = $(".amount").val();
//   var rateFrom = $(".currency-list")[0].value;
//   var rateTo = $(".currency-list")[1].value;
//   if ((amount - 0) != amount || (''+amount).trim().length == 0) {
//     $(".results").html("0");
//     $(".error").show()
//   } else {
//     $(".error").hide()
//     if (amount == undefined || rateFrom == "--Select--" || rateTo == "--Select--") {
//       $(".results").html("0");

//     } else {
//       $(".results").html((amount * (rateTo * (1 / rateFrom))).toFixed(2));
//     }
//   }
// }
