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

        let nbResult = $('#select_nb_result').val();
        let data = {};
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

    $('#tabs ul li#li-vue-photo').on('click', function () {

        let data = {};
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

});

function init(){
    for ( let i = 5; i <= 50; i += 5 ){
        $('select').append('<option>' + i + '</option>');
    }

    $("#tabs").tabs();
}

function showPhotoView(json) {
    console.log(json);

    $('#tabs-2').empty();

    for(let photo of json.photos.photo){
        console.log(photo);
        $('#tabs-2').append("<div class='div-container-pic'><img src='http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg' alt='" + json.title + "'/></div>");
    }
}

function photoCallback(json) {

    let rows = '150px';

    for( let i = 1; i < nb / 5; i++ ){
        rows += ' 150px';
    }

    let tab1 = $('#tabs-1');

    tab1.empty();

    tab1.css('grid-template-rows', rows);
    for(photo of json.photos.photo) {
        console.log("hey");
        tab1.append("<tr>");
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

        tab1.append("</tr>");
    }

    tab1.DataTable();

}

function showTabView(json) {

    console.log(json)


}