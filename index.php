<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">

    <title>CNC Interface</title>
    <meta name="description"
          content="Control the Raspberry Pi-based CNC through the web">
    <meta name="author" content="Josh DeWitt">

    <link rel="stylesheet" type="text/css" href="css/main.css" media="screen"/>
</head>

<body>
    <?php include 'html/header.html' ?>
    <div id="main" class="content">
        <div id="home">
            <h1>Home</h1>
            <div class="content">
                <h2>Usage</h2>
                <p>
                There are three parts to the Configuration Page.
                The Restart Microcontroller button restarts the microcontroller.
                The Bootload New Firmware allows the user to reporgram the microcontroller.
                The user has to click the Choose File button, select the correct hex file, then click on the Upload button. 
                This will load the new firmware onto the microcontroller.
                The Machine Settings allows the user to change behavioral settings. 
                The user will change one of the values in the table and then click the Submit button. 
                The user will then be alerted that the update was successful.
                <br><br>
                The Upload page has two parts.
                The Upload New File option allows the user to upload a file.
                To upload a file, the user will click on the Choose File button, select the appropiate file from their computer, and then click the Upload button.
                The file whould then show up in the Existing Files table.
                In this table, the user can see which files are available to print and remove files.
                To remove a file from the system, a user will click on the red "X" button in the Delete collumn of the corresponding file.
                <br><br>   
                Every page has the Emergency Stop and Shutdown button available to them.
                The Emergency Stop can be pressed if the machine starts to behave irregularly and it will stop the motors.
                The Shutdown button will gracefully shutdown the system.
                <br><br>
                The Run page has two sections.
                The first, Manual Movement, allows the user to control the motors manually.
                There are a set of buttons that will allow the user to send a command of a set size.
                The size is set in the Movement Size text box.
                Then forward and backwards for each axis are controlled by the up and down buttons.
                The user can also send the machine to its home and set the home loaction in this menu.
                <br><br>
                The user can also send raw G-code through the textbox.
                The user can type in any G-code into the textbox and then click the Send Raw G-code button.
                Lastly, the user can enable the Leap Motion capability through the checkbox.
                The Leap Motion allows the user to use a touch free interface with gesture recognition to contor the axies.
                </p>
            </div>
        </div>
        <div id="configure" class="invisible"></div>
        <div id="upload" class="invisible"></div>
        <div id="run" class="invisible"></div>
    </div>
</body>
    <?php include 'html/footer.html' ?>
    <script src="//js.leapmotion.com/leap-0.4.3.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
    <script src="http://malsup.github.com/jquery.form.js"></script>
    <script src="js/main.js"></script>
    <script src="js/leap.js"></script>
</body>
</html>

