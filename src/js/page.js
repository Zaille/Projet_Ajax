"use strict";

$(document).ready(function () {

    init();

    $('#input_ville').on( 'input', function () {
        showResult();
    });

});

function init(){
    for ( let i = 0; i <= 50; i += 5 ){
        $('select').append('<option>' + i + '</option>');
    }
}

function showResult() {
    $('#list_proposition').empty();
    for ( let i = 0; i <= 5; i ++ ){
        $('#list_proposition').append('<option value="xxx">');
    }
    $("#div_print_result").html("You wrote: " + $("#input_ville").val());
}