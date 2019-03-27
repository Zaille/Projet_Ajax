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

    $('#tabs ul li#li-vue-photo').on('click', function () {

        let nbResult = $('#select_nb_result').val();
        // let data = getData($('#input_ville').val()); // TODO Alban
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
                    per_page: $('#select_nb_result').val()
                },
                context: document.body
            });
        }


        showPhotoView( nbResult, null );
    });

    $('#tabs ul li#li-vue-tableau').on('click', function () {

        let nbResult = $('#select_nb_result').val();
        // let picture = getPhoto($('#input_ville').val()); // TODO Alban

        showTabView( nbResult, null );
    });

});

function init(){
    for ( let i = 5; i <= 50; i += 5 ){
        $('select').append('<option>' + i + '</option>');
    }

    $("#tabs").tabs();
}

function showPhotoView( nb, data ) {
}

function showTabView( nb, pic ) {

    let rows = '150px';
    for( let i = 1; i < nb / 5; i++ ){
        rows += ' 150px';
    }

    $('#tabs-2').empty();

    $('#tabs-2').css('grid-template-rows', rows);

    for( let i = 0; i < nb; i++ ){
        $('#tabs-2').append("<div>Photo</div>");

    }

}

function jsonFlickrApi(json) {
    console.log(json);

    $('#tabs-1').html('');

    for(let photo of json.photos.photo){
        console.log(photo);
        $('#tabs-1').append("<img src='http://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+".jpg' alt='"+json.title+"'/>");
    }
}