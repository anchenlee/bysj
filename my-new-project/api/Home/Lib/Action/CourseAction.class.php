<?php 
	class CourseAction extends Action{
		public function getCourse() {
			$course = M('Labs');
			$con['lab_id'] = $_GET['id'];
			if(isset($con['lab_id'])) {
				$result = $course->where($con)->select();
				$count = count($course->where($con)->select());
				if($count == 1) {
					$this->ajaxReturn(
						array(
							'item'=>$result[0],
							'message'=>'',
							'success'=>true
						)
					);
				} else {
					$this->ajaxReturn(
						array(
							'item'=>'',
							'message'=>'没有该课程',
							'success'=>false
						)
					);
				}
			} else {
				$this->ajaxReturn(
					array(
						'item'=>$course->select(),
						'message'=>'',
						'success'=>true
					)
				);
			}
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
			if($con) {
				$count = count($course->add($con));
				if($count == 1) {
					$this->ajaxReturn(
						array(
							'item'=>'',
							'message'=>'添加成功',
							'success'=>true
						)
					);
				} else {
					$this->ajaxReturn(
						array(
							'item'=>'',
							'message'=>'添加失败',
							'success'=>false
						)
					);
				}
			} else {
				$this->ajaxReturn(
					array(
						'item'=>'',
						'message'=>'课程信息不完整',
						'success'=>false
					)
				);
			}
		}
	}
?>