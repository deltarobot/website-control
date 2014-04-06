function firmwareUploadComplete ( data, textStatus, errorThrown ) {
    $( "#firmwareUploadStatus" ).html( constructResponse( data, textStatus, errorThrown ) );
}

function restartMicrocontroller () {
    $( "#restartStatus" ).load (
            "/service/bootload.php",
            {"restart": true}
            );
}

function updateSettings() {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else {
        throw new Error("Ajax is not supported by this browser");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status == 200 && xmlhttp.status < 300) {
                document.getElementById('div1').innerHTML = xmlhttp.responseText;
            }
        }
    }
    var all_settings = document.getElementsByName('setting');
    var all_labels = document.getElementsByName('settinglabel');
    var full_settings = " ";
    for(var k=0;k<all_settings.length;k++)
    {
        var setting = all_settings[k];
        var label = all_labels[k];


        if(setting.type!= 'text') continue;
        if(setting.value != '')
        {
            var dir = label.innerHTML.trim().concat(setting.value.trim());
            full_settings = full_settings.concat(dir);
            full_settings = full_settings.concat("   ");
        }
    }
    xmlhttp.open('POST', '/service/config.php');
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xmlhttp.send("dir=" + full_settings);
    alert("Sent");
}

var current_settings;

window.onload = getSettings();
function getSettings() {

    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    else {
        throw new Error("Ajax is not supported by this browser");
    }

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status == 200 && xmlhttp.status < 300) {

                current_settings = xmlhttp.responseText;

                populateFields();
            }
        }
    }
    xmlhttp.open('GET', '/service/configUpload.php');

    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();

}

function populateFields()
{
    var split_settings = current_settings.match(/\d*\.?\d+/g);
    var inputs = document.getElementsByName('setting');
    for( var i = 0; i < split_settings.length; i++)
    {
        inputs[i].value = split_settings[i];
    }
}
