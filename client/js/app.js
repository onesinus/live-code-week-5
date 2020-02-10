// Setup awal
if (localStorage.getItem("token")) {
    display('.comic-page');
    $("#btn-logout").show();
    loadDataComic();
}else{
    display('.login-page');
    $("#btn-logout").hide();
}


// Btn Register Handle
$(".btnRegister").on('click', function() {
    display('.register-page');
});

// btn to Login
$(".btnToLogin").on('click', function() {
    display('.login-page');
});

// Handle Random User
$(".btnRandomUser").on('click', function() {
    $.ajax({
        url: 'https://randomuser.me/api/',
        dataType: 'json',
        success: function(data) {
          let dataUser = data.results[0];
          console.log(dataUser);
          let $selector = ".register-page > form";
          $(`${$selector} #name`).val(`${dataUser.name.title}, ${dataUser.name.first} ${dataUser.name.last}`);
          $(`${$selector} #email`).val(`${dataUser.email}`);
        }
      });
});

// login
$(document).on('submit', ".login-page > form",  function(e) {
    e.preventDefault();
    
    let email       = $("#email").val();
    let password    = $("#password").val();
    
    $.ajax({
        url: `http://localhost:3000/login`,
        method: "POST",
        data: {email, password}
    })
    .then(res => {
        localStorage.setItem("token", res.access_token);
        display('.comic-page');
        loadDataComic()
    })
    .catch(err => {
        displayMessage(err.responseJSON);
    })
});

// register
$(document).on('submit', ".register-page > form",  function(e) {
    e.preventDefault();
    
    let $selector = ".register-page > form";

    let name        = $(`${$selector} #name`).val();
    let email       = $(`${$selector} #email`).val();
    let password    = $(`${$selector} #password`).val();
    
    $.ajax({
        url: `http://localhost:3000/register`,
        method: "POST",
        data: {name, email, password}
    })
    .then(res => {
        console.log(res);
        localStorage.setItem("token", res.access_token);
        display('.comic-page');
        loadDataComic();
    })
    .catch(err => {
        displayMessage(err.responseJSON);
    })
});


// prepare edit form
$(document).on('click', '.btnEdit', function() {
    let idComic = $(this).attr("id");
    let title   = $(this).attr("title");
    let author  = $(this).attr("author");
    let img     = $(this).attr("img");


    $selector = ".update-comic-page";

    $(`${$selector}  #id`).val(idComic);
    $(` ${$selector} #title`).val(title);
    $(` ${$selector} #author`).val(author);
    $(` ${$selector} #imgUrl`).val(img);

    display(".comic-page , .update-comic-page");
})

// Edit form submit
$(document).on('submit', ".update-comic-page > form", function(e) {
    e.preventDefault();

    $selector = ".update-comic-page";

    let idComic = $(`${$selector}  #id`).val();
    let title  = $(` ${$selector} #title`).val();
    let author  = $(` ${$selector} #author`).val();
    let imgUrl  = $(` ${$selector} #imgUrl`).val();

    console.log(idComic, " ", title , " " , author, " " , imgUrl);

    $.ajax({
        url: `http://localhost:3000/comics/${idComic}`,
        method: "PUT",
        headers: {
            access_token: localStorage.getItem("token")
        },
        data: {
            title, author, imgUrl
        }
    })
    .then(res => {
        console.log(res);
        $(".update-comic-page").hide();
        loadDataComic();
        $("#btn-logout").show();
    })
    .catch(err => {
        console.log(err);

        displayMessage(err);
    })
});

// logout
$("#btn-logout").on('click', function() {
    localStorage.removeItem("token");
    display(".login-page");
});

// manage show and hide display
function display(selector) {
    $('[class*=page]').hide();
    $(selector).show();
}

// handling error
function displayMessage(message) {
    $("#alert").text(message).show();    
    setTimeout(() => {
        $("#alert").text(" ").hide();
    }, 3000);
    
}

// load all comics data
function loadDataComic() {
    $.ajax({
        url: `http://localhost:3000/comics`,
        method: "GET",
        headers: {
            access_token: localStorage.getItem("token")
        }
    })
    .then(comics => {
        $(".comic-page > .row").empty();
        comics.forEach(comic => {
            $(".comic-page > .row").append(
                `
                    <div class="col-4 mb-4">
                        <div class="card text-center">
                        <img
                            src="${comic.imageUrl}"
                            class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${comic.title}</h5>
                            <p class="card-text">Author: ${comic.author}</p>
                            <button class="btn btn-primary btnEdit" id="${comic.id}" title="${comic.title}" author="${comic.author}" img="${comic.imageUrl}">Edit</button>
                        </div>
                        </div>
                    </div>    
                `
            )
        })
    })
    .catch(err => {
        displayMessage(err.responseJSON);
    })
}