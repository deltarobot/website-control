function transition ( oldPage, newPage ) {
    if( oldPage != newPage ) {
        $( oldPage ).addClass( "invisible" );
        $( newPage ).removeClass( "invisible" );
    }
}

function showDiv ( which ) {
    transition( currentPage, which );
    currentPage = which;
}

function loadAllPages () {
    currentPage = "#home";
    peakPage = ""
    var loadDivs = $( "#main div" ).filter( ".invisible" );
    loadedPages = 0;
    totalPages = loadDivs.size();
    loadDivs.each( function() {
        $( this ).load( "html/" + $( this ).attr( "id" ) + ".html", afterLoad );
    });
}

function afterLoad () {
    loadedPages++;
    if( loadedPages == totalPages ) {
        ajaxForm( $( "#uploadForm" ), uploadComplete );
    }
}

function uploadComplete ( data, textStatus, errorThrown ) {
    var uplaodResponse;
    if( textStatus == "success" ) {
        uploadResponse = data;
    } else {
        uploadResponse = textStatus + ": " + errorThrown;
    }
    $( "#uploadStatus" ).html( uploadResponse );
    $( "#fileList" ).load( "/service/fileList.php" );
}

function ajaxForm ( form, responseHandler ) {
    form.submit( function ( ev ) {
        $.ajax({
            url: form.attr( "action" ),
            type: form.attr( "method" ),
            data: form.serialize()
        }).always( responseHandler );

        ev.preventDefault();
    });
}

function setupLinkListeners () {
    $( "#header ul li a" ).click( function() {
        showDiv( $( this ).attr( "page" ) );
        $( "#header ul li a" ).removeClass( "selectedMenu colorFlash" );
        $( this ).addClass( "colorFlash selectedMenu" );
    });

    $( "#header ul li a" ).hover( function() {
        transition( peakPage, currentPage );
        peakPage = $( this ).attr( "page" );
        transition( currentPage, peakPage );
    }, function() {});
    $( "#header ul" ).hover( function() {}, function() {
        transition( peakPage, currentPage );
    });
}

$( function() {
    $( "#year" ).html( (new Date).getFullYear() );
    loadAllPages();
    setupLinkListeners();
});

