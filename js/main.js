function showDiv ( which ) {
    var pages = [ "home", "configure" ];
    for( var i in pages ) {
        if( pages[i] != which ) {
            $( "#" + pages[i] ).addClass( "invisible" );
        } else {
            $( "#" + pages[i] ).removeClass( "invisible" );
        }
    }
}

$( function() {
    $( "#year" ).html( (new Date).getFullYear() );
    showDiv( "home" );
    $( "#configure" ).load( "configure.html" );
});

