<?php
/**
 * Created by PhpStorm.
 * User: jary.chen
 * Date: 14-4-4
 * Time: 上午9:25
 */
define('DOME_APP','./qk static html/');

$dir = DOME_APP;
// $date = date('Y-m-d');
// $dir = DOME_APP.$date.'/';
// if(!file_exists($dir))
// {
//   if (!mkdir( $dir, 0777, true )) {
//     die( 'Failed to create folders...' );
//   }
// }
$urls = array(
  'content'=>'http://172.16.85.120/p/content.html',
/*  'page-sale'=>'http://172.16.85.120/1/qk/page-sale.html',
  'page-qiang'=>'http://172.16.85.120/1/qk/page-qiang.html',
  'page-us'=>'http://172.16.85.120/1/qk/page-us.html',
  'page-news'=>'http://172.16.85.120/1/qk/page-news.html',
  'page-list'=>'http://172.16.85.120/1/qk/page-list.html',
  'content'=>'http://172.16.85.120/1/qk/content.html',
  'contrast'=>'http://172.16.85.120/1/qk/contrast.html',
  'popup'=>'http://172.16.85.120/1/qk/popup.html',


  'findpw-step1.html'=>'http://172.16.85.120/1/qk/findpw-step1.html',
  'findpw-step2.html'=>'http://172.16.85.120/1/qk/findpw-step2.html',
  'findpw-step3.html'=>'http://172.16.85.120/1/qk/findpw-step3.html',


  'act-51'=>'http://172.16.85.120/1/qk/act-51.html',
  'act-67'=>'http://172.16.85.120/1/qk/act-67.html',
  'act-712'=>'http://172.16.85.120/1/qk/act-712.html',
  'act-halfbmw'=>'http://172.16.85.120/1/qk/act-halfbmw.html',*/
);

if(is_array($urls))
{
  foreach($urls as $key=>$val)
  {
    $url = parse_url($val);
    $html = file_get_contents($val);
    $filename = str_replace('/','',$url['path']);
    if(empty($filename))$filename = time();
    file_put_contents($dir.$key.'.html',$html);
  }
}
else
{
  $url = parse_url($urls);
  $html = file_get_contents($val);
//  $html = iconv('utf-8','gbk',$html);
  $filename = str_replace('/','',$url['path']);
  if(empty($filename))$filename = time();
  file_put_contents($dir.$filename.'_temp.html',$html);
}

?>

