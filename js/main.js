function peakDiv ( which ) {
    var pages = [ "home", "configure" ];

    for( var i in pages ) {
        if( pages[i] != which ) {
            $( "#" + pages[i] ).addClass( "invisible" );
        } else {
            $( "#" + pages[i] ).removeClass( "invisible" );
        }
    }
}

function showDiv ( which ) {
    currentPage = which;
    peakDiv( which );
}

$( function() {
    $( "#year" ).html( (new Date).getFullYear() );
    showDiv( "home" );
    $( "#configure" ).load( "configure.html" );

    $( "#header ul li a" ).hover( function() {
        peakDiv( $( this ).attr( "page" ) );
    }, function() {
        peakDiv( currentPage );
    });
});

