<?php 
	class CourseAction extends Action{
		public function getCourse() {
			$course = M('Labs');
			/*var_dump($course->select());
			exit;*/
			$this->ajaxReturn(
				array(
					'item'=>$course->select(),
					'message'=>'',
					'success'=>true
				)
			);
		}
		public function addCourse() {
			$course = M('Labs');
			/* 获取课程数据 */
			$con['lab_id'] = rand(1000,9999);
			$con['lab_name'] = $_POST['labName'];
			$con['lab_intro'] = $_POST['labIntro'];
			$con['lab_url'] = $_POST['labFile']['file_url'];
			$con['size'] = $_POST['labFile']['size'];
			$con['createTime'] = time();
			$con['uploader'] = $_POST['uploader'];
			var_dump($con);
			exit;
			if($con) {
				$count = count($course->add($con));
			}
		}
	}
?>