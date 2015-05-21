<?php 
	class TaskAction extends Action{
		public function addTask() {
			$task =M("Task");
			$con['uid'] = $_POST['uid'];
			$con['uname'] = $_POST['uname'];
			$con['cid'] = $_POST['taskfile']['name'];
			$con['fname'] = $_POST['cid'];
			$con['task_url'] = $_POST['taskfile']['file_url'];
			$con['size'] = $_POST['taskfile']['size'];
			$count = count($task->add($con));
			if ($count ==1) {
				# code...
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

		/* 获取作业列表 */
		public function getTask() {
			$task =M("Task");
			$con['cid'] = $_GET['cid'];
			$data['cid'] = $con['cid'];    
			$result = $task->where($data)->select();
			
			if($result) {
				$this->ajaxReturn(
					array(
						'item'=>$result,
						'message'=>'请求成功',
						'success'=>true
					)
				);
			} else {
				$this->ajaxReturn(
					array(
						'item'=>'',
						'message'=>'请求失败',
						'success'=>false
					)
				);
			}
		}
	}
?>