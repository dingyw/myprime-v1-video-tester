<?php
echo "<pre>Starting up...\n";
//set_time_limit(600000); 
//ignore_user_abort();
$i =  exec('git pull origin master'); 
echo $i;
error_log("myPrime Video Utility: Incoming Github" . $i,1,"quan.ngo@windwalker.com","From: quan.ngo@windwalker.com\nSubject: myPrime video Utility Incoming GitHub"); 
echo "</pre>";

?>
