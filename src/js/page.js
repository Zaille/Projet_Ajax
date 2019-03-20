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

        showPhotoView( nbResult, null );
    });

});

function init(){
    for ( let i = 0; i <= 50; i += 5 ){
        $('select').append('<option>' + i + '</option>');
    }

    $("#tabs").tabs();
}

function showPhotoView( nb, data ) {

    let rows = '100px';
    for( let i = 1; i < nb; i++ ){
        rows += ' 100px';
    }

    $('#tabs-1').empty();

    $('#tabs-1').css('grid-template-rows', rows);

    for( let i = 0; i < nb; i++ ){
        $('#tabs-1').append("<div>Photo</div>");
        $('#tabs-1').append("<div>Text</div>");
    }

}

/* function showTabView( nb, data ) {

    alert(nb);

    let rows = '100px';
    for( let i = 1; i < nb / 5; i++ ){
        rows += ' 100px';
    }

    alert(rows);

    $('#tabs-2').empty();

    $('#tabs-2').css('grid-template-rows', rows);

    for( let i = 0; i < nb; i++ ){
        $('#tabs-2').append("<div>Photo</div>");
        $('#tabs-2').append("<div>Text</div>");
    }

} */