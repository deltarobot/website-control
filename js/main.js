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
    $( "#main div" ).each( function() {
        if( $( this ).hasClass( "invisible" ) ) {
            $( this ).load( "html/" + $( this ).attr( "id" ) + ".html" );
        }
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

