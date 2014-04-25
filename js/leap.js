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

function moveHead() {
    deltaX = curX - macX;
    if( abs( deltaX ) > 5 ){
        hasMoved++;
        macX = macX + (sign(deltaX));
    }
    deltaY = curY - macY;
    if( abs( deltaY ) > 5 ){
        hasMoved++;
        macY = macY + (sign(deltaY));
    }
    deltaZ = curZ - macZ;
    if( abs( deltaZ ) > 5 ){
        hasMoved++;
        macZ = macZ + (sign(deltaZ));
    }

    if( hasMoved ){
        hasMoved = 0;
        loadResponse( '#rawGcodeStatus', '/service/run.php', {'rawGcode': 'G90X'.concat(parseInt((macX))).concat('Y').concat(parseInt((macY))).concat('Z').concat(parseInt((macZ)))} );
    }
}

this.controller.on( 'connect', function() {
        setInterval( function() {
            var obj = controller.frame();
            if( obj.hands.length > 0 ) {
                // only run this at state change...
                if( !hand ) {
                    hand = true;
                    loadResponse( '#rawGcodeStatus', '/service/run.php', {'rawGcode': 'M03'} );
                    loadResponse( '#rawGcodeStatus', '/service/run.php', {'rawGcode': 'G101|  Leap Control'} );
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

                deltaX = curX - macX;
                if( abs( deltaX ) > 5 ) {
                    hasMoved++;
                    macX = macX + (sign(deltaX));
                }
                deltaY = curY - macY;
                if( abs( deltaY ) > 5 ) {
                    hasMoved++;
                    macY = macY + (sign(deltaY));
                }
                deltaZ = curZ - macZ;
                if( abs( deltaZ ) > 5 ) {
                    hasMoved++;
                    macZ = macZ + (sign(deltaZ));
                }

                if( hasMoved ) {
                    hasMoved = 0;
                    loadResponse( '#rawGcodeStatus', '/service/run.php', {'rawGcode': 'G90X'.concat(parseInt((macX))).concat('Y').concat(parseInt((macY))).concat('Z').concat(parseInt((macZ)))} );
                }
            } else {
                if( hand ) {
                    hand = false;
                    loadResponse( '#rawGcodeStatus', '/service/run.php', {'rawGcode': 'M05'} );
                    loadResponse( '#rawGcodeStatus', '/service/run.php', {'rawGcode': 'G101|Waiting for user'} );
                    curX = 0;
                    curY = 0;
                    curZ = 0;
                }

                if( macX || macY || macZ ) {

                    deltaX = curX - macX;
                    if( abs( deltaX ) > 5 ){
                        hasMoved++;
                        macX = macX + (sign(deltaX));
                    }
                    deltaY = curY - macY;
                    if( abs( deltaY ) > 5 ){
                        hasMoved++;
                        macY = macY + (sign(deltaY));
                    }
                    deltaZ = curZ - macZ;
                    if( abs( deltaZ ) > 5 ){
                        hasMoved++;
                        macZ = macZ + (sign(deltaZ));
                    }

                    if( hasMoved ){
                        hasMoved = 0;
                        loadResponse( '#rawGcodeStatus', '/service/run.php', {'rawGcode': 'G90X'.concat(parseInt((macX))).concat('Y').concat(parseInt((macY))).concat('Z').concat(parseInt((macZ)))} );
                    }
                }
            }
        }, 100);
});

controller.connect();

