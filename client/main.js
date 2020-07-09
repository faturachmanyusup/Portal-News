$(document).ready(function () {
    if (localStorage.token) {
        $(".after-login").show()
        $(".login-form").hide()
        getTodoList()
        
    } else {
        $(".after-login").hide()
        $(".login-form").show()
    }
});

function processLogin() {
    $(".after-login").hide()
    $(".login-form").show()
}

function afterLogin(event) {
    event.preventDefault()
    let email = $("#emailLogin").val()
    let password = $("#passwordLogin").val()

    $.ajax({
        method: 'POST',
        url: 'http://localhost:5500/users/login',
        data: { email: email, password: password }
    })
    .done(function (result) {
        localStorage.token = result.access_token
        getTodoList()
        $(".after-login").show()
        $(".login-form").hide()
        $("#emailErrLogin").val('')
        $("#passErrLogin").val('')
    })
    .fail(function (err) {
        console.log(err.responseJSON)
        if(err.responseJSON.message === "Email not found!" || err.responseJSON.message === "Incorrect Email or Password!") {
            $("#emailErrLogin").text(err.responseJSON.message)
        } else if (err.responseJSON.message === "Incorrect Email or Password!") {
            $("#passErrLogin").text(err.responseJSON.message)
        }    
    })
    .always(function (_) {
        email = $("#emailLogin").val('')
        password = $("#passwordLogin").val('')
    })
}

function getTodoList() {
    $.ajax({
        method:"GET",
        url: "http://localhost:5500/todos/",
        headers: {
            access_token: localStorage.token
        }
    })
    .done(function (todo) {
        $(".todo-list").empty()

        for (let i = 0; i < todo.length; i++) {
            $(".todo-list").append(
                `<div class="col md-4 mb-3">
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${todo[i].title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Description</h6>
                    </div>
                </div>
            </div>`
            )
        }  
    })
    .fail(function (err) {
        console.log(err, 'ERROR KETIKA GET TODO LIST')
    })
    .always(function (_) {
    })
}
function afterLogout() {
    let email = $("#emailLogin").val()
    let password = $("#passwordLogin").val()
    signOut()
    localStorage.clear()

    $(".after-login").hide()
    $(".login-form").show()
    
    email = $("#emailLogin").val('')
    password = $("#passwordLogin").val('')
}
function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token
    // var profile = googleUser.getBasicProfile();
    console.log(id_token)
    
    $.ajax({
        method: "POST",
        url: "http://localhost:5500/users/googleSignIn",
        data: {id_token}
    })
    .done(function(response) {
        console.log(response)
        localStorage.setItem('token',response.access_token)
        getTodoList()
        $(".after-login").show()
        $(".login-form").hide()
        $("#emailErrLogin").val('')
        $("#passErrLogin").val('')
    });
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.  
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });  
}

$.getJSON("https://api.fixer.io/latest?base=ZAR", function(data) {
  var currencies = [];
  $.each(data.rates, function(currency, rate) {
    // Currency options dropdown menu
    currencies.push("<option id='" + currency.toLowerCase() + "' value='" + rate + "' >" + currency + "</option>");
  });
  $(".currency-list").append(currencies);
})

//Calculate and output the new amount
function exchangeCurrency() {
  var amount = $(".amount").val();
  var rateFrom = $(".currency-list")[0].value;
  var rateTo = $(".currency-list")[1].value;
  if ((amount - 0) != amount || (''+amount).trim().length == 0) {
    $(".results").html("0");
    $(".error").show()
  } else {
    $(".error").hide()
    if (amount == undefined || rateFrom == "--Select--" || rateTo == "--Select--") {
      $(".results").html("0");

    } else {
      $(".results").html((amount * (rateTo * (1 / rateFrom))).toFixed(2));
    }
  }
}