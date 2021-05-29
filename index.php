<?php
    $chuyênMụcLớn = 7365;
	$cdn = "https://cdn.inevn.com";
	$uri = explode("?",$_SERVER[REQUEST_URI])[0];
	$host = $_SERVER[HTTP_HOST];
	$news = preg_match("/\/(news|a|p)\/(\d+)\/.*/",$uri,$match); //Regex kiểm tra link dạng bài viết
	$categ = preg_match("/\/(c)\/(\d+)\/.*/",$uri,$matchCate); //Regex kiểm tra link dạng chuyên mục
    $pv = 25; //Phạm vi
    $dsKhoa = array(
        "fmt" => "KHOA QUẢN TRỊ KINH DOANH VÀ DU LỊCH",
        "cn" => "KHOA TIẾNG TRUNG",
        "fit" => "KHOA CÔNG NGHỆ THÔNG TIN",
        "fis" => "KHOA QUỐC TẾ HỌC",
        "pt" => "KHOA TIẾNG BỒ ĐÀO NHA",
        "en" => "KHOA TIẾNG ANH",
        "es" => "KHOA TIẾNG TÂY BAN NHA",
        "fr" => "KHOA TIẾNG PHÁP",
        "kr" => "KHOA TIẾNG HÀN QUỐC",
        "it" => "KHOA TIẾNG ITALIA",
        "jp" => "KHOA TIẾNG NHẬT",
        "ru" => "KHOA TIẾNG NGA",
        "de" => "KHOA TIẾNG ĐỨC",
        "vnh" => "KHOA VIỆT NAM HỌC",
        "ctsv" => "PHÒNG CÔNG TÁC SINH VIÊN - ĐẠI HỌC HÀ NỘI",
        "itec" => "TRUNG TÂM CÔNG NGHỆ THÔNG TIN",
        "dttx" => "TRUNG TÂM ĐÀO TẠO TỪ XA",
        "tuxa" => "TRUNG TÂM ĐÀO TẠO TỪ XA",
        "khaothi" => "TRUNG TÂM KHẢO THÍ",
        "lhs" => "PHÒNG HỢP TÁC QUỐC TẾ",
    );
	if ($match) { //cache bài viết
        $urlBV = "cacheBV/$match[2].json";
        if(file_exists($urlBV)){
            $content = file_get_contents($urlBV);
        }
        if(!$content){
            $content = file_get_contents("$cdn/?a=$match[2]&json=1&pv=$pv");
            if(!empty(json_decode($content,true))){
                $content = json_decode($content,true);
                $content["time"] = $timestamp;
                file_put_contents($urlBV, json_encode($content,JSON_UNESCAPED_UNICODE));
            }
        } else {
            
        }
        $q = json_decode($content,true);
        preg_match('/\<img.+id=["][0-9]+["].+\>/', $q[ộ], $matches);
        preg_match('/id=["][0-9]+["]/', $matches[0], $matches);
        preg_match("/\<img.+src\=(?:\"|\')(.+?)(?:\"|\')(?:.+?)\>/", $q[ộ], $urlI);
        $matches = preg_replace("/[^0-9]+/","",$matches);
        $ả = $q[ả]>0 ? $q[ả] : ($q[ả] ?: $matches[0]);
        $ô = str_replace(["\t","\n"],"",strip_tags($q[ô]));
        $ậ = $q[ậ]?:$q[time];
    }
    if ($matchCate) { //Cache chuyên mục
        $urlCM = "cacheCM/$matchCate[2].json";
        if(file_exists($urlCM)){
            $content = file_get_contents($urlCM);
        };
        if(!$content){
            $content = file_get_contents("$cdn/?c=$matchCate[2]&json=1&pv=$pv");
            if(!empty(json_decode($content,true))){
                $content = json_decode($content,true);
                $content["time"] = $timestamp;
                file_put_contents($urlCM, json_encode($content,JSON_UNESCAPED_UNICODE));
            }
        } else {
            
        };
        $q = json_decode($content,true);
        $ả = $q[ì];
        $ô = str_replace(["\n","\t"]," ",strip_tags($q[ô]));
        $ậ = $q[ậ]?:$q[time];
    }
    if(preg_match("/\-/",$host,$match)){
        $uK = explode("-", $host)[0];
    } else {
        $uK = explode(".", $host)[0];
    };
    $urlCMC = "cacheKhoa/cache_$uK.json";
    if(file_exists($urlCMC)){
        $content1 = file_get_contents($urlCMC);
    };
    $q1 = json_decode($content1,true);
    $ậ1 = $q1[time];
    if (!$matchCate&&!$match) {
        $bvind = "cacheBV/dlBVCache_$uK.json";
        if(file_exists($bvind)){
            $content2 = file_get_contents($bvind);
        };
        $q2 = json_decode($content2,true);
        $ậ2 = $q2[time];
    }
	$data = [
		title=>$dsKhoa[$uK] ?: "Trường Đại học Hà Nội - HANU | https://hanu.edu.vn/",
		icon=>"https://i2.wp.com/cdn.inevn.com/img/other/hanu.png",
		site=>"Trường Đại học Hà Nội",
		des=> $ô ?: "Trường Đại học Hà Nội - Hanoi University.",
		img=> $ả>0 ? "https://connections.hanu.vn/img/thumb/".$ả.".1kx.isij" : (preg_match('/hanu.edu.vn/', $ả)? "https://hanu.edu.vn/img/hanu4.jpg" : ($ả ?: "https://hanu.edu.vn/img/hanu4.jpg")),
		type=>$match ? "article" : "website",
		time=>$ậ?:0,
		time1=>$ậ1?:0,
		time2=>$ậ2?:0,
	];
	$des = trim(str_replace("'","\\'",$data[des]));
    $ntime = $data[time];
    $time = $data[time1];
    $time2 = $data[time2];
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name=viewport content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no" />
		<meta name="keywords" content="hanu, đại học hà nội, trường đại học hà nội" />
		<meta name="description" content="Trường Đại học Hà Nội" />
        <title><?php echo $data[title]; ?> - TRƯỜNG ĐẠI HỌC HÀ NỘI</title>
        <meta name="description" content='<?php echo $des; ?>' />
        <?php
			foreach ([
				title=>str_replace("'","\\'",$data[title]),
				site_name=>$data[site],
				type=>$data[type],
				url=>"http://$host$uri",
				image=>$data[img],
				description=>$des,
			] as $á=>$à)
				echo "<meta property='og:$á' content='$à' />";
			foreach (["jquery.main","include.core"] as $á)
				echo "<script src='$cdn/js/$á.isj'></script>";
		?>
		<link rel="icon" type="image/png" sizes="32x32" href="https://cdn.inevn.com/img/thumb/37489.50x.isij">
        <link rel="stylesheet" href="/css/style.css">
		<script src="https://cdn.inevn.com/js/jquery.main.isj"></script>
		<script src="https://cdn.inevn.com/js/include.core.isj"></script>
        <script src="https://www.youtube.com/iframe_api"></script> 
		<link href="sitemap_<?php echo $chuyênMụcLớn; ?>.xml">
        <style>
            
        </style>
        <script type="text/javascript">
			$(function(){
				tảiTrước({
                    màuNền: "#8c0025", //Màu nền chờ
                    biểuTượng:"https://cdn.inevn.com/img/other/hanu.png",
                    // koChe: false, //không hiển thị
					riêng:true, //tải theo thư viện khác
					// youtube:1, //kèm theo thư viện youtube
                    cache:true,
                    trước: function(){
                        $("head").iStyle(Chíp.làmMàu(["#8c0025","#8b0000"]));
                    },
					xong:function(){
                        var jsAll = location.origin+"/js/all.js",
                            jsHuy="https://thuctap.inevn.com/nguyendinhhuy/HANU/function.min.js?";
                        CẦN.js([jsAll,jsHuy],false)
					},
				});
			});
		</script>
	</head>
	<body class="" >
     
	</body>
</html>