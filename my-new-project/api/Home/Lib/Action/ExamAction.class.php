<?php 
	class ExamAction extends Action{
		public function getExamPaper() {
			$exam = M('Exam_store');
			$con['id'] = $_GET['id'];
			if(isset($con['id'])) {
				$data['cid'] = $con['id'];
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
	}
?>