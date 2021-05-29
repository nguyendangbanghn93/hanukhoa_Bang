<?php 
    // $_POST["data"]
    // $d = json_decode($data,true);
    // echo json_encode($_POST['sitemap']);
        file_put_contents('sitemap_'.$_POST['chuyênMục'].'.xml', $_POST['sitemap']);
        echo file_get_contents('sitemap_'.$_POST['chuyênMục'].'.xml');
?>