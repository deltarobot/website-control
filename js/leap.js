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
var hand = 1;
var timeout = 110;
var spindleState = 0;

var controller = new Leap.Controller({enableGestures: true});
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

function moveToLeapHome() {
    curX = 0;
    curY = 0;
    curZ = 10;
}

function abs( i ) {
    if( i >= 0 )
        return  i;
    else
        return -i;
}

function scale( i ) {
    // 28v, 350000acc, 16000sps, 4xMS
    // I've massaged these numbers a lot, handle with care.
    j = 0;
    t = 100;
    if( i > 0 ){
        j = 1;
        t = 70;
    }
    if( i > 4 ){
        j = 2;
        t = 120;
    }

    if( i > 9 ){
        j = 3;
        t = 170;
    }

    if( i > 16 ){
        j = 4;
        t = 220;
    }
    if( i > 25 ){
        j = 5;
        t = 270;
    }
    if( timeout < t )
        timeout = t;
    return j;
}

function sign( i ) {

    if( i >= 0 )
        return scale(i);
    else
        return -scale(abs(i));
}

function checkBounds() {
    if( macY > 80 )
        macY = 80;
    if( macY < -80 )
        macY = -80;
    if( macX > 80 )
        macX = 80;
    if( macX < -80 )
        macX = -80;
    if( macZ > 55 )
        macZ = 55;
    if( macZ < 0 )
        macZ = 0;
}

function moveHeadByLeap() {
    deltaX = curX - macX;
    if( abs( deltaX ) > 5*hand ){
        hasMoved++;
        macX = macX + (sign(deltaX));
    }
    deltaY = curY - macY;
    if( abs( deltaY ) > 5*hand ){
        hasMoved++;
        macY = macY + (sign(deltaY));
    }
    deltaZ = curZ - macZ;
    if( abs( deltaZ ) > 5*hand ){
        hasMoved++;
        macZ = macZ + (sign(deltaZ));
    }
    if( curZ < 5 ){
        sign( macZ );// just to get proper timeout
        macZ = 0;
    }
    checkBounds();
    if( hasMoved ){
        hasMoved = 0;
        $.post( '/service/run.php', {'rawGcode': 'G90X'.concat( parseInt( ( macX ) ) ).concat( 'Y' ).concat( parseInt( ( macY ) ) ).concat( 'Z' ).concat( parseInt( ( macZ ) ) )} );
    }
}

function processCommand() {
    var obj = controller.frame();

    // Handled outside of main checkbox.
    if( obj.gestures.length > 0 ){
        var gesture = obj.gestures[0];
        if( gesture.type == "circle" && gesture.progress >= 2 ){
            if( gesture.normal[2]<=0){
                $.post( '/service/run.php', {'rawGcode': 'M03\nG101|  Spindle On!~    (>\'_\')>'} );
            } else {
                $.post( '/service/run.php', {'rawGcode': 'M05\nG101|  Spindle Off!~    <(\'_\'<)'} );
             }
        }
//        if( gesture.type == "swipe" )
  //          $.post( '/service/run.php', {'rawGcode': 'M03\nG28\nG101|Homing'} );

    }

    // Dependant upon main checkbox.
    if( obj.hands.length > 0 && $( '#leapCheck' ).is( ':checked' ) ) {
        if( !hand ) {
            hand = 1;
            spindleState = 1;
            $.post( '/service/run.php', {'rawGcode': 'G101|  Leap Control~    ( @_@ )'} );
       }

        curY = -parseInt(obj.hands[0].palmPosition[0]/2);
        curZ = parseInt((obj.hands[0].palmPosition[1]-200)/5);
        curX = -parseInt(obj.hands[0].palmPosition[2]/2);
        moveHeadByLeap();
    } else {
        if( hand ) {
            hand = 0;
            spindleState = 0;
            $.post( '/service/run.php', {'rawGcode': 'M05\nG101|Waiting on user~    ( =_= )'} );
            moveToLeapHome();
        }

        if( macX || macY || macZ ) {
            moveHeadByLeap();
        }
    }
    setTimeout( function() { processCommand() }, timeout );
    timeout = 0;
}

this.controller.on( 'connect', function() {
    processCommand();
        //setInterval( function() { processCommand() }, timeout);
});

controller.connect();

