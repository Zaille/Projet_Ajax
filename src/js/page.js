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



   /* $('#input_ville').on( 'input', function () {

        input.vicopo(function (value) {
            //$('#vicopo').text(JSON.stringify(value, null, 2));

            value.forEach((ville) => {
                $('#list_proposition').append('<option value="'+ville.city+', '+ville.code+'">');
            })
        });
    });*/


});

function init(){
    for ( let i = 0; i <= 50; i += 5 ){
        $('select').append('<option>' + i + '</option>');
    }
}

function showResult() {




    /*for ( let i = 0; i <= 5; i ++ ){

    }*/
    $("#div_print_result").html("You wrote: " + input.val());
}