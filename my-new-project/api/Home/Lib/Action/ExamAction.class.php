<?php 
	class ExamAction extends Action{
		public function getExamPaper() {
			$exam = M('Exam_store');
			$con['cid'] = $_GET['cid'];
			if(isset($con['cid'])) {
				$data['cid'] = $con['cid'];
				$result = $exam->where($data)->select();
				$count = count($exam->where($data)->select());
				if($count) {
					$this->ajaxReturn(
						array(
							'item'=>$result,
							'message'=>'',
							'success'=>true
						)
					);
				} 
			}

		}

		public function addExamPaper() {
			$exam = M('Exam_store');
			$data = $_POST['questions'];
			$count = 0;
			for($i = 0; $i < count($data); $i++) {
				$count = $count + count($exam->add($data[$i]));
			}
			if($count == count($data)) {
				$this->ajaxReturn(
					array(
						'item'=>'',
						'message'=>'试卷添加成功',
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
		}

		/* 提交试卷 */
		public function submitPaper() {
			$exam = M('Exam_record');
			$con['uid'] = $_POST['uid'];
			$con['cid'] = $_POST['cid'];
			$con['uname'] = $_POST['uname'];
			$con['score'] = $_POST['score'];
			$con['papers'] = $_POST['papers'];
			if($con) {
				$count = $count + count($exam->add($con));
				if($count == 1) {
					$this->ajaxReturn(
						array(
							'item'=>'',
							'message'=>'提交成功',
							'success'=>true
						)
					);
				} else {
					$this->ajaxReturn(
						array(
							'item'=>'',
							'message'=>'提交失败',
							'success'=>false
						)
					);
				}
			}
		}

		/* 获取考试情况 */
		public function getExamRecord() {
			$Exam = M('Exam_record');
			$con['cid'] = $_GET['cid'];
			$result = $Exam->where($con)->select();
			if($result) {
				$this->ajaxReturn(
					array(
						'item'=> $result,
						'message'=>'获取结果成功',
						'success'=>true
					)
				);
			}
		}
	}
?>