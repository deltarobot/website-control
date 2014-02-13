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
    <?php include 'html/footer.html' ?>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>

