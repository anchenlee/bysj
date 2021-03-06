<?php
	session_start();
	// 本类由系统自动生成，仅供测试用途
	class UserAction extends Action {
		/*判断用户是否已经登录 session*/
		public function index() {
			if(isset($_SESSION['user_id'])) {
				$this->ajaxReturn(array('item'=> array('id' => $_SESSION['id'], 'username'=>$_SESSION['user_name']), 'message'=>'已经登录','success'=>true),'JSON');
			} else {
				$this->ajaxReturn(array('item'=>'', 'message'=>'未登录','success'=>false),'JSON');
			}
		}
		/*用户登录*/
		public function login() {
			$user = M('User');
			$con['studentId'] = $_POST['studentId'];
			$con['password'] = md5($_POST['password']);
			$con['usertype'] = $_POST['usertype'];
			if(isset($con['studentId']) && isset($con['password']) && isset($con['usertype'])){
				$count = count($user->where($con)->select()); 
				if($count == 1) {
					$username = $user->where($con)->getField('username');
					$id = $user->where($con)->getField('id');
					var_dump($username, $id);
					$_SESSION['id'] = $id;
					$_SESSION['user_name'] = $username;
					$this->ajaxReturn(array('item'=>array('id' =>$id, 'username' => $username), 'message'=>'登录成功', 'success'=>true),'JSON');
				} else {
					$this->ajaxReturn(array('message'=>'帐号不存在','success'=>false),'JSON');
				}
			} else {
				$this->ajaxReturn(array('message'=>'请输入完整的信息','success'=>false),'JSON');
			}
			/*$this->ajaxReturn($m);
			$this->ajaxReturn(array("Peter"=>$username,"Ben"=>"37","Joe"=>"43"), 'JSON');*/
		}
		/*登出*/
		public function loginOut() {
			if(isset($_SESSION['id'])){
			    //要清除会话变量，将$_SESSION超级全局变量设置为一个空数组
			    $_SESSION = array();
			    //如果存在一个会话cookie，通过将到期时间设置为之前1个小时从而将其删除
			    if(isset($_COOKIE[session_name()])){
			        setcookie(session_name(),'',time()-3600);
			    }
			    //使用内置session_destroy()函数调用撤销会话
			    session_destroy();
			    $this -> ajaxReturn(array('message'=>'登出成功','success'=>true),'JSON');
			} else {
				$this -> ajaxReturn(array('message'=>'登出成功','success'=>true),'JSON');
			}
		}
		/*修改密码*/
		public function resetpwd() {
			$cuser = M('User');
			$con['id'] = $_POST['id'];
			$con['userId'] = $_POST['userId'];
			$con['oldpwd'] = md5($_POST['oldpwd']);
			$con['newpwd'] = md5($_POST['newpwd']);
			if(isset($con['id'])) {
				$data['password'] = $con['newpwd'];
				$count = count($cuser->where('id=' $con['id'])->save($data));
				if($count == 1) {
					$this -> ajaxReturn(array('message'=>'密码修改成功','success'=>true),'JSON');
				}
			} else {
				$this -> ajaxReturn(array('message'=>'帐号异常','success'=>true),'JSON');
			}
		}
	}
?>