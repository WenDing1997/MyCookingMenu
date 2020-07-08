<?php

$x = intval($_REQUEST['x']);
// print_r('x');
// print_r($x);
$y = intval($_REQUEST['y']);
// print_r('y');
// print_r($y);

if ($_REQUEST['submit']) {
  // print_r($_REQUEST);
  $data = $_POST['data'];
  $txt_value = $data['txtValue'];
  $x = $data['x'];
  $y = $data['y'];

  # Validate data
  // list($data, $success) = validateData($x, $y, $data);
  # list($data, $success) = array($data, 1);
  print_r(1);
  // if (!$success) {
  //   print "<script>$data</script>";
  //   return;
  // }

  print_r(2);
  # Save to file.
  $key = "$x,$y";
  print_r($x);
  print_r($y);

  $filename = "tmp/" . $key . '-' . time();
  file_put_contents($filename, json_encode($txt_value));

  print_r(3);
  # Send to firestore.
  $result = trim(shell_exec("/usr/local/bin/python3 save.py '$x' '$y' '$filename' 2>&1"));
  // if ($result != 1) {
  //   die("Error saving. $result<HR>");
  // }

  print_r(4);
  // print "debug1";
  // print "<script>window.location = 'index.html';</script>";
  return;
}
?>


<!doctype html>
<html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<!-- <link class="jsbin" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" /> -->
<script class="jsbin" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script class="jsbin" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.0/jquery-ui.min.js"></script>
<script src="js/write.js?001"></script>

<style>
  article, aside, figure, footer, header, hgroup, 
  menu, nav, section { display: block; }
</style>


<body>
<textarea id="txt" rows="20" cols="50" style="font-size: 15pt"></textarea>
<br>
<input id=saveButton type=submit value=Save onclick="save(<? echo $x; ?>, <? echo $y; ?>)">

<input type='file' onchange="readURL(this);" />
    <img id="blah" src="#" alt="your image" />

</body>
</html>


<!-- <input type="submit" id="submit" value="Save" style="font-size: 15pt" onclick="save($x, $y)"/> -->
