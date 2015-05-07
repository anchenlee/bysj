<?php 
	class CourseAction extends Action{
		public function getCourse() {
			$course = M('Labs');
			$con['id'] = $_GET['id'];
			$con['keyword'] = $_GET['keyword'];
			$con['ctype'] = $_GET['ctype'];
			if(isset($con['id'])) {
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
				} 
			}

			if(isset($con['keyword'])) {
				$data['uploader']=$con['keyword'];
				$map['lab_name'] = array('like', '%'.$con['keyword'].'%');
				if(is_array($course->where($data)->select())) {
					$a = $course->where($data)->select();
				} else {
					$a = array($course->where($data)->select());
				}
				if(is_array($course->where($map)->select())) {
					$b = $course->where($map)->select();
				} else {
					$b = array($course->where($map)->select());
				}
				
				$this->ajaxReturn(
					array(
						'item'=> array_filter(array_merge($a, $b)), 
						'message'=>'搜索',
						'success'=>true
					)
				);
			}
            if(isset($con['ctype'])) {
            	$data['ctype'] = $con['ctype'];
                $result = $course->where($data)->select();
                $this->ajaxReturn(
                    array(
                        'item'=>$result,
                        'message'=>'类型',
                        'success'=>true
                    )
                );
            }
            if(!isset($con['keyword']) && !isset($con['id']) && !isset($con['ctype'])){
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
			$con['lab_name'] = $_POST['labName'];
			$con['lab_intro'] = $_POST['labIntro'];
			$con['lab_url'] = $_POST['labFile']['file_url'];
			$con['size'] = $_POST['labFile']['size'];
			$con['ctype'] = $_POST['ctype'];
			$con['createTime'] = mktime();
			$con['uploader'] = $_POST['uploader'];
			$con['testtype'] = $_POST['testType'];

			if($con['ctype'] == 1) {
				$con['cposter'] = './images/c++.jpg';
			}
			if($con['ctype'] == 2) {
				$con['cposter'] = './images/vb.jpg';
			}
			if($con['ctype'] == 3) {
				$con['cposter'] = './images/sql.jpg';
			}
			if($con) { 
				$count = count($course->add($con));
				if($count == 1) {
					if(isset($con['testtype'])) {
						$courseId = $course->where($con)->getField('id');
						$this->ajaxReturn(
							array(
								'item'=>$courseId,
								'message'=>'添加成功',
								'success'=>true
							)
						);
					} else {
						$this->ajaxReturn(
							array(
								'item'=>'',
								'message'=>'添加成功',
								'success'=>true
							)
						);
					}
					
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
		public function addRequire() {
			$require = M('Require');
			$con['require'] = $_POST['require'];
			$con['courseId'] = $_POST['courseId'];
			$count = count($require->add($con));
			if($count==1) {
				$this->ajaxReturn(
					array(
						'item'=>'',
						'message'=>'课程要求添加成功',
						'success'=>true
					)
				);
			} else {
				$this->ajaxReturn(
					array(
						'item'=>'',
						'message'=>'课程要求添加失败',
						'success'=>false
					)
				);
			}
		}
	}
?>