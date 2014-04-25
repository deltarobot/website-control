var lastFrame = {};
var curX = 0;
var curY = 0;
var curZ = 0;
var macX = 0;
var macY = 0;
var macZ = 0;
var deltaX = 0;
var deltaY = 0;
var deltaZ = 0;
var hasMoved = 0;
var hand = true;

var controller = new Leap.Controller();

function setLeapToZero() {
    macX = 0;
    macY = 0;
    macZ = 0;
}

function moveToZero() {
    curX = 0;
    curY = 0;
    curZ = 0;
}

function abs( i ) {
    if( i >= 0 )
        return  i;
    else
        return -i;
}

function sign( i ) {
    if( i >= 0 )
        return 1;
    else
        return -1;
}

function moveHeadByLeap() {
    deltaX = curX - macX;
    if( abs( deltaX ) > 5 ){
        hasMoved |= 1;
        macX = macX + (sign(deltaX));
    }
    deltaY = curY - macY;
    if( abs( deltaY ) > 5 ){
        hasMoved |= 2;
        macY = macY + (sign(deltaY));
    }
    deltaZ = curZ - macZ;
    if( abs( deltaZ ) > 5 ){
        hasMoved |= 4;
        macZ = macZ + (sign(deltaZ));
    }

    if( !( hasMoved & 1 ) && deltaX && curX == 0 ) {
        hasMoved |= 1;
        macX = 0;
    }
    if( !( hasMoved & 2 ) && deltaY && curY == 0 ) {
        hasMoved |= 2;
        macY = 0;
    }
    if( !( hasMoved & 4 ) && deltaZ && curZ == 0 ) {
        hasMoved |= 4;
        macZ = 0;
    }

    if( hasMoved ){
        hasMoved = 0;
        $.post( '/service/run.php', {'rawGcode': 'G90X'.concat( parseInt( ( macX ) ) ).concat( 'Y' ).concat( parseInt( ( macY ) ) ).concat( 'Z' ).concat( parseInt( ( macZ ) ) )} );
    }
}

this.controller.on( 'connect', function() {
        setInterval( function() {
            var obj = controller.frame();
            if( obj.hands.length > 0 && $( '#leapCheck' ).is( ':checked' ) ) {
                // only run this at state change...
                if( !hand ) {
                    hand = true;
                    $.post( '/service/run.php', {'rawGcode': 'M03\nG101|  Leap Control'} );
                }
                curY = -parseInt(obj.hands[0].palmPosition[0]/2);
                curZ = parseInt((obj.hands[0].palmPosition[1]-200)/5);
                curX = -parseInt(obj.hands[0].palmPosition[2]/2);

                // SET BOUNDS
                if( curY > 80 )
                    curY = 80;
                if( curY < -80 )
                    curY = -80;
                if( curX > 80 )
                    curX = 80;
                if( curX < -80 )
                    curX = -80;
                if( curZ > 50 )
                    curZ = 50;
                if( curZ < 0 )
                    curZ = 0;

                moveHeadByLeap();
            } else {
                if( hand ) {
                    hand = false;
                    $.post( '/service/run.php', {'rawGcode': 'M05\nC101|Waiting for user'} );
                    moveToZero();
                }

                if( macX || macY || macZ ) {
                    moveHeadByLeap();
                }
            }
        }, 100);
});

controller.connect();

