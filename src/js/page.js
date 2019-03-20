"use strict";

$(document).ready(function () {

    init();
    let input = $('#input_ville');
    $('#input_ville').on( 'input', function () {

        input.vicopo(function (value) {
            //$('#vicopo').text(JSON.stringify(value, null, 2));
            $('#list_proposition').empty();
            value.forEach((ville) => {
                $('#list_proposition').append('<option value="'+ville.city+', '+ville.code+'">');
            })
        });
    });





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