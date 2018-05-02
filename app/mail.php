<?php

$method = $_SERVER['REQUEST_METHOD'];
$c = true;

$project_name = "Dostavka Club";
//$admin_mail  = "mokselleweb@yandex.ru|mokselleweb@yandex.ru|malkolm063@yandex.ru";
$admin_mail  = "malkolm063@yandex.ru";
$form_subject = "Dostavka-club";
if ($method === 'POST') {


//    $form_subject = trim($_POST["form_subject"]);

    foreach ($_POST as $key => $value) {
        if ($key != "project_name" && $key != "admin_email" && $key != "form_subject") {
            $message .= "
			" . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
			<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
			<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
		</tr>
		";
        }
    }
} else if ($method === 'GET') {

    $form_subject = trim($_GET["form_subject"]);

    foreach ($_GET as $key => $value) {
        if ($value != "" && $key != "project_name" && $key != "admin_email" && $key != "form_subject") {
            $message .= "
			" . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
			<td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
			<td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
		</tr>
		";
        }
    }
}

$message = "<table style='width: 100%;'>$message</table>";
function adopt($text)
{
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
}

$mails = explode("|", $admin_mail);
$headers  = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: DostavkaClub <mail@malkolm.96.lt>\r\n";
$headers .= "Reply-To: mail@malkolm.96.lt\r\n";
$res = '';
foreach ($mails as $admin_email) {
    $res .= ", " . $admin_email;
//    echo $res;
}
$res = substr($res, 2);
mail($res, $form_subject, $message, $headers);
//print_r($_POST);
echo "\nПолучатели:\n".$res . "\n";
echo "Тема письма:\n" . $form_subject . "\n";
echo "Заголовки:\n".$headers . "\n";
echo "Текст письма:\n". $message;


