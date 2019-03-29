"use strict";

$(document).ready(function () {

    init();

    let input = $('#input_ville');
    input.on('input', function () {
        if(isNaN(input.val()) && (input.val().length >=3)) {
            $.ajax({
                method: "GET",
                url: "https://geo.api.gouv.fr/communes?",
                data: {
                    nom: input.val(),
                    fields : "nom",
                },
                context: document.body
            }).done(function (json) {
                let prop = $('#list_proposition');
                prop.empty();
                json.forEach((ville) => {
                    prop.append('<option value="'+ville.nom+'">');
                });

            });
        }
    });

    $('#tabs ul li#li-vue-tableau').on('click', function () {
        if(isNaN(input.val())) {
            $.ajax({
                method: "GET",
                url: "https://api.flickr.com/services/rest/",
                data: {
                    method: "flickr.photos.search",
                    api_key: "863289ef8435fbb2ad7b8e376a7fa291",
                    format: "json",
                    text: input.val(),
                    per_page: $('#select_nb_result').val(),
                    jsoncallback : "photoCallback"
                },
                context: document.body
            });
        }
    });

    $('#tabs ul li#li-vue-photo').on('click', function () {

        if(isNaN(input.val())) {
            $.ajax({
                method: "GET",
                url: "https://api.flickr.com/services/rest/",
                data: {
                    method: "flickr.photos.search",
                    api_key: "863289ef8435fbb2ad7b8e376a7fa291",
                    format: "json",
                    text: input.val(),
                    per_page: $('#select_nb_result').val(),
                    jsoncallback : "showPhotoView"
                },
                context: document.body
            });
        }
    });

});

function init(){
    for ( let i = 5; i <= 50; i += 5 ){
        $('select').append('<option>' + i + '</option>');
    }

    $("#tabs").tabs();
}

function showPhotoView(json) {

    $('#tabs-2').empty();

    for(let photo of json.photos.photo){
        $('#tabs-2').append("<div class='div-container-pic'>" +
            "<img src='http://farm" + photo.farm + ".staticflickr.com/"
            + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg' " +
            "alt='" + json.title + "'/></div>");
    }
}

function photoCallback(json) {

    let tab1 = $('#tabs-1');
    tab1.empty();
    tab1.append("<thead>"+
        "<tr>"+
        "<th>Photo</th>"+
        "<th>Titre</th>"+
        "<th>Date</th>"+
        "<th>Auteur</th>"+
        "<th>ID de l'auteur</th>"+
        "</tr>"+
        "</thead>"+
        "<tbody id='tableBody'>"+
        "</tbody>");

    for(let photo of json.photos.photo) {
        $.ajax({
            method: "GET",
            url: "https://api.flickr.com/services/rest/",
            data: {
                method: "flickr.photos.getInfo",
                api_key: "863289ef8435fbb2ad7b8e376a7fa291",
                format: "json",
                photo_id: photo.id,
                secret: photo.secret,
                jsoncallback: "showTabView"
            },
            context: document.body
        });
    }
}

function showTabView(json) {
    let tab1 = $('#tableBody');
    tab1.append("<tr>"+
        "<td>" +
        "<img src='http://farm" + json.photo.farm + ".staticflickr.com/"
        + json.photo.server + "/" + json.photo.id + "_" + json.photo.secret + ".jpg' " +
        "alt='" + json.title + "'/>"+
        "</td>"+
        "<td>"+json.photo.title._content+"</td>"+
        "<td>"+json.photo.dates.taken+"</td>"+
        "<td>"+json.photo.owner.username+"</td>"+
        "<td>"+json.photo.owner.nsid+"</td>"+
        "</tr>");
    $('#tabs-1').DataTable();
}