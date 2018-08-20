<?php
if ( $_SERVER['REQUEST_METHOD']=='GET' && realpath(__FILE__) == realpath( $_SERVER['SCRIPT_FILENAME'] ) ) {
	/* 
	   Up to you which header to send, some prefer 404 even if 
	   the files does exist for security
	*/
	header( 'HTTP/1.0 403 Forbidden', TRUE, 403 );

	/* choose the appropriate page to redirect users */
	die( header( 'location: /info_page.php' ) );

}
/*

COLLECT POSTED DATA

*/

//append and create if not exist
$data_file = fopen("surveyData.txt", "a");

//$_header = "q1"." ; "."q2_1"." ; "."q2_1a"." ; "."q2_1b"." ; "."q2_1c"." ; "."q2_1d"." ; "."q2_2"." ; "."q2_2a"." ; "."q2_2b"." ; "."q2_2c"." ; "."q2_2d"." ; "."q2_3"." ; "."q2_3a"." ; " ."q2_3b"." ; " . "q2_3c "." ; " ."q2_3d"." ; "."q3"." ; "."q4"." ; "."q5"." ; "."q6"." ; "."q7"." ; "."q8".PHP_EOL;

//acquire an exclusive lock
flock($data_file, LOCK_EX);
/*
$file_content = file_get_contents($data_file);
if((strlen($file_content)) ==0){
	fwrite($data_file, $_header);
}
*/
$q1 = $_POST['Q1'];//radio group

$q2_1 = $_POST["Q2_1"];//list of options
$q2_1a = $_POST["Q2_1a"];
$q2_1b = $_POST["Q2_1b"];
$q2_1c = $_POST["Q2_1c"];
$q2_1d = $_POST["Q2_1d"];

$q2_2 = $_POST["Q2_2"];
$q2_2a = $_POST["Q2_2a"];
$q2_2b = $_POST["Q2_2b"];
$q2_2c = $_POST["Q2_2c"];
$q2_2d = $_POST["Q2_2d"];

$q2_3 = $_POST["Q2_3"];
$q2_3a = $_POST["Q2_3a"];
$q2_3b = $_POST["Q2_3b"];
$q2_3c = $_POST["Q2_3c"];
$q2_3d = $_POST["Q2_3d"];

$q3 = $_POST["Q3"];
$q4 = $_POST["Q4"];
$q5 = $_POST["Q5"];
$q6 = $_POST["Q6"];
$q7 = $_POST["Q7"];
$q8 = $_POST["Q8"];


$form_data = $q1." ; ".$q2_1." ; ".$q2_1a." ; ".$q2_1b." ; ".$q2_1c." ; ".$q2_1d." ;".$q2_2." ; ".$q2_2a." ; ".$q2_2b." ; ".$q2_2c." ; ".$q2_2d." ; ".$q2_3." ; ".$q2_3a." ; " .$q2_3b." ; " . $q2_3c ." ; " .$q2_3d." ;".$q3." ; ".$q4." ; ".$q5." ; ".$q6." ; ".$q7." ; ".$q8.PHP_EOL;//create a new line

//WRITE/APPEND DATA TO FILE
fwrite($data_file, $form_data);
//release the lock
flock($data_file, LOCK_UN);
fclose($data_file);

if(isset($_POST["name"]) && isset($_POST["weight"])&& isset($_POST["height"])){
	if($ret === false) {
		die("There was an error writing this file");
	}
	else {
		echo "$ret bytes written to file";
	}
}

//References:
//https://stackoverflow.com/questions/1209688/php-simultaneous-file-writes
//http://php.net/manual/en/function.flock.php
?>