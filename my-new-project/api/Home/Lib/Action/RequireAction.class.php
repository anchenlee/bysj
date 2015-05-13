<?php 
	class RequireAction extends Action{
		public function addRequire() {
			$require = M('Require');
			$con['require'] = $_POST['require'];
			$con['cid'] = $_POST['cid'];
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
		/* 获取课程要求 */
		public function getRequire() {
			$require = M('Require');
			$con['cid'] = $_GET['cid'];
			$count = count($require->where($con)->select());
			$result = $require->where($con)->getField('require');
			if($count == 1) {
				$this->ajaxReturn(
					array(
						'item'=>$result,
						'message'=>'操作成功',
						'success'=>true
					)
				);
			}
		}
	}
?>
		