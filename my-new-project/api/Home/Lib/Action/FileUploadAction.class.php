<?php
	class FileUploadAction extends Action{
		public function upload() {
			if ( !empty( $_FILES ) ) {
			    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
			    $arr=explode(".", $_FILES["file"]["name"]);
 				$hz=$arr[count($arr)-1];
 				//时间戳将文件重命名
			    $randname=date("Y").date("m").date("d").date("H").date("i").date("s").rand(100, 999).".".$hz;
			    $uploadPath = 'E:/wamp/www/bysj/my-new-project/app/uploads/';
			    move_uploaded_file( $tempPath, $uploadPath.$randname );
				/*    $answer = array( 'answer' => 'File transfer completed' );*/
				$_FILES['file']['file_url'] = $uploadPath.$randname;
			    $answer = array( 'answer' => $_FILES );
			    $json = json_encode( $answer );
			    echo $json;
			} else {
			    echo 'No files';
			}
		}
	}
?>