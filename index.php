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
                <h2>Some sub-header</h2>
                <p></p>
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

