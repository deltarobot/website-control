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

$( function() {
    $( "#year" ).html( (new Date).getFullYear() );
    currentPage = "#home";
    $( "#main div" ).each( function() {
        if( $( this ).hasClass( "invisible" ) ) {
            $( this ).load( $( this ).attr( "id" ) + ".html" );
        }
    });

    $( "#header ul li a" ).click( function() {
        showDiv( $( this ).attr( "page" ) );
    });
    $( "#header ul li a" ).hover( function() {
        transition( currentPage, $( this ).attr( "page" ) );
    }, function() {
        transition( $( this ).attr( "page" ), currentPage );
    });
});

