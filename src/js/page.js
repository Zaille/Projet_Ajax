"use strict";

$(document).ready(function () {

    init(); // Initialisation

    let input = $('#input_ville');
    input.on('input', function () { // Auto-complétion
        if(isNaN(input.val()) && (input.val().length >=3)) {
            $.ajax({ // Requête pour chercher les noms
                method: "GET",
                url: "https://geo.api.gouv.fr/communes?",
                data: {
                    nom: input.val(),
                    fields : "nom",
                },
                context: document.body
            }).done(function (json) { // Insertion des noms de ville récupérés
                let prop = $('#list_proposition');
                prop.empty();
                json.forEach((ville) => {
                    prop.append('<option value="'+ville.nom+'">');
                });

            });
        }
    });

    $('#tabs ul li#li-vue-tableau').on('click', function () { // Initialisation et affichage de la vue 'tableau'
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

    $('#tabs ul li#li-vue-photo').on('click', function () { // Initialisation et affichage de la vue 'photo'

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

/**
 * Initialise la page
 */
function init(){
    for ( let i = 5; i <= 50; i += 5 ){ // Initialisation du selecteur permettant de choisir le nombre de résultats que l'utilisateur souhaite recevoir
        $('select').append('<option>' + i + '</option>');
    }

    $("#tabs").tabs(); // Initialisation des vues 'tabs'
}

/**
 * Remplir la vue 'photo'
 * @param json JSON contenant les informations spécifiques à la recherche
 */
function showPhotoView(json) {

    $('#tabs-2').empty();

    for(let photo of json.photos.photo){ // Pour toute photo correspondant à la recherche

        $('#tabs-2').append("<div class='div-container-pic'>" +
            "<img id='" + photo.id +  "' src='http://farm" + photo.farm + ".staticflickr.com/"
            + photo.server + "/" + photo.id + "_" + photo.secret + ".jpg' " +
            "alt='" + json.title + "'/></div>"); // On ajoute la photo au tableau

        let $id = $('#' + photo.id ); // On récupère son id

        $id.on('click', function () { // Listener pour ouvrir la fenêtre d'information correspondant à la photo

            $.ajax({
                method: "GET",
                url: "https://api.flickr.com/services/rest/",
                data: {
                    method: "flickr.photos.getInfo",
                    api_key: "863289ef8435fbb2ad7b8e376a7fa291",
                    format: "json",
                    photo_id: photo.id,
                    secret: photo.secret,
                    jsoncallback: "popOpen"
                },
                context: document.body
            });

        });

    }

    $('.modal_close').on('click', function () { // Fermeture de la fenêtre d'information si l'utilisateur clique sur l'icon 'x' de la fenêtre

        popClose();

    });

}

/**
 * Initialisation des informations pour la vue 'tableau'
 * @param json JSON contenant les informations spécifiques à la recherche
 */
function photoCallback(json) {

    let tab1 = $('table');
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
        "<tbody>"+
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
        }).complete(
            function () {
                setTimeout(function () {
                    $('table').DataTable();
                },500);

            }
        );
    }
}

function showTabView(json) {
    let tab1 = $('tbody');
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


}


/**
 * Ouvre la fenêtre d'information d'une photo
 * @param json JSON contenant les informations spécifiques à la photo
 */
function popOpen( json ) {

    $( '#imgDisplay' ).attr('src', 'http://farm' + json.photo.farm + '.staticflickr.com/' +
        json.photo.server + '/' + json.photo.id + '_' + json.photo.secret + '.jpg' ); // Ajout de la source de la photo sélectionné à l'image prévu dans la fenêtre d'information
    $( '#imgDisplay' ).attr('alt', json.title );

    // Ajout des informations liées à la photo
    $('#titre').append(json.photo.title._content);
    $('#date').append(json.photo.dates.taken);
    $('#nom_utilisateur').append(json.photo.owner.username);

    // Affichage avec transition de la fenêtre
    $( '.modal, .modalbg' ).show();
    $( '.modal, .modalbg' ).fadeTo( 300, 1 );

}

/**
 * Ferme la fenêtre d'information d'une photo
 */
function popClose(){

    // Fermeture avec transition de la fenêtre
    $( '.modal, .modalbg' ).fadeTo( 300, 0, function () {

        $( '.modal, .modalbg' ).hide(); // On cache les élément car les éléments sont seulement transparent jusque là

        // Réinitialisation des différents éléments d'information
        $( '#imgDisplay' ).attr('src', '' );
        $( '#imgDisplay' ).attr('alt', '' );

        $('#titre').empty().append('<b>Titre :</b>');
        $('#date').empty().append('<b>Date :</b>');
        $('#nom_utilisateur').empty().append('<b>Nom Utilisateur :</b>');

    } );

}
