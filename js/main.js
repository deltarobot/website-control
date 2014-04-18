function transition ( oldPage, newPage ) {
    if( oldPage != newPage ) {
        window[ newPage + 'Update' ]();
        $( '#' + oldPage ).addClass( "invisible" );
        $( '#' + newPage ).removeClass( "invisible" );
    }
}

function showDiv ( which ) {
    transition( currentPage, which );
    currentPage = which;
}

function loadAllPages () {
    currentPage = "home";
    peakPage = ""
    var loadDivs = $( "#main div" ).filter( ".invisible" );
    loadedPages = 0;
    totalPages = loadDivs.size();
    loadDivs.each( function() {
        var thisId = $( this ).attr( "id" );
        $( this ).load( "html/" + thisId + ".html", function () {
            afterLoad( thisId );
        });
    });
}

function afterLoad ( loaded ) {
    loadedPages++;
    window[ loaded + 'Update' ]();
    if( loadedPages == totalPages ) {
        $( "#firmwareForm" ).ajaxForm( firmwareUploadComplete );
        $( "#uploadForm" ).ajaxForm( uploadComplete );
        $( "#fileInput" ).on( "change", function ( event ) {
            var fileSize = event.currentTarget.files[0].size / ( 1024 * 1024 );
            if( fileSize > 1 ) {
                $( "#uploadStatus" ).html( '<span class="error">File larger than 1MB, not uploaded.</span>' );
                $( this ).val('');
            }
        });
        getMachineSettings();
    }
}

function setupLinkListeners () {
    $( "#emergencyStop" ).click( emergencyStop );
    $( "#shutdown" ).click( shutdown );

    $( "#mainMenu li a" ).click( function() {
        showDiv( $( this ).attr( "page" ) );
        $( "#mainMenu li a" ).removeClass( "selectedMenu colorFlash" );
        $( this ).addClass( "colorFlash selectedMenu" );
    });

    $( "#mainMenu li a" ).hover( function() {
        transition( peakPage, currentPage );
        peakPage = $( this ).attr( "page" );
        transition( currentPage, peakPage );
    }, function() {});
    $( "#mainMenu li" ).hover( function() {}, function() {
        transition( peakPage, currentPage );
    });
}

$( function() {
    $( "#year" ).html( (new Date).getFullYear() );
    loadAllPages();
    setupLinkListeners();
});

function constructResponse( data, textStatus, errorThrown ) {
    var uploadResponse;
    if( textStatus == "success" ) {
        uploadResponse = data;
    } else {
        uploadResponse = textStatus + ": " + errorThrown;
    }
    return uploadResponse;
}

function loadResponse( id, url, data, callback, keepData ) {
    $( id ).load( url, data,
        function () {
            if( callback ) {
                callback();
            }
            if( !keepData ) {
                setTimeout( function () { $( id ).empty(); }, 2500 );
            }
        }
    );

}

function emergencyStop(){
    loadResponse( '#systemStatus', '/service/run.php', {'emergencyStop': true} );
}

function shutdown(){
    var userConfirm = confirm( "Are you sure you want to shutdown?" );
    if( userConfirm ) {
        loadResponse( '#systemStatus', 'service/run.php', {'shutdown': true} );
    }
}

/* Placeholder functions. Called whenever the page is shown. */
function homeUpdate() { }

