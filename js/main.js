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

function constructResponse( data, textStatus, errorThrown ) {
    var uploadResponse;
    if( textStatus == "success" ) {
        uploadResponse = data;
    } else {
        uploadResponse = textStatus + ": " + errorThrown;
    }
    return uploadResponse;
}

/* Placeholder functions. Called whenever the page is shown. */
function homeUpdate() { }
function configureUpdate() { }

