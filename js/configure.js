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

    var all_settings = document.getElementsByTagName('input');
    var all_labels = document.getElementsByTagName('label');
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

        xmlhttp.open('POST', 'php/config.php');
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xmlhttp.send("dir=" + full_settings);
		alert("Sent");
}

