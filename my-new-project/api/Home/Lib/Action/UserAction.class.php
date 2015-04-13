<?php
	session_start();
	// 本类由系统自动生成，仅供测试用途
	class UserAction extends Action {
		/*判断用户是否已经登录 session*/
		public function index() {
			if(isset($_SESSION['id'])) {
				$this->ajaxReturn(
					array(
						'item'=> array(
							'id' => $_SESSION['id'], 
							'userName'=> $_SESSION['userName'], 
							'userType'=> $_SESSION['userType'], 
							'superAdmin'=> $_SESSION['superAdmin'], 
							'teamAdmin'=> $_SESSION['teamAdmin']
						), 
						'message'=>'已经登录',
						'success'=>true
					),'JSON');
			} else {
				$this->ajaxReturn(array('item'=>'', 'message'=>'未登录','success'=>false),'JSON');
			}
		}
		/*用户登录*/
		public function login() {
			$user = M('User');
			$con['userId'] = $_POST['userId'];
			$con['password'] = md5($_POST['password']);
			/*$con['userType'] = $_POST['userType'];*/
			if(isset($con['userId']) && isset($con['password'])){/* && isset($con['userType']*/
				$count = count($user->where($con)->select()); 
				if($count == 1) {
					$resule['id'] = $user->where($con)->getField('id');
					$resule['userName'] = $user->where($con)->getField('userName');
					$resule['userType'] = $user->where($con)->getField('userType');
					$resule['superAdmin'] = $user->where($con)->getField('superAdmin');
					$resule['teamAdmin'] = $user->where($con)->getField('teamAdmin');
					
					$_SESSION = $resule;
					$this->ajaxReturn(
						array(
							'item'=>array(
								'id'=>$resule['id'], 
								'userName'=>$resule['userName'], 
								'userType'=>$resule['userType'], 
								'superAdmin'=>$resule['superAdmin'], 
								'teamAdmin'=>$resule['teamAdmin']
							), 
							'message'=>'登录成功', 
							'success'=>true
						),'JSON');
				} else {
					$this->ajaxReturn(array('message'=>'帐号不存在','success'=>false),'JSON');
				}
			} else {
				$this->ajaxReturn(array('message'=>'请输入完整的信息','success'=>false),'JSON');
			}
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
		/*验证密码*/
		/*public function checkOldpwd() {
			$user = M('User');
			$con['id'] = $_POST['id'];
			$con['studentId'] = $_POST['studentId']
		}*/
		/*修改密码*/
		public function resetpwd() {
			$user = M('User');
			$con['id'] = $_POST['id'];
			$con['userId'] = $_POST['userId'];
			$con['oldpwd'] = md5($_POST['oldpwd']);
			$con['newpwd'] = md5($_POST['newpwd']);
			$Ccon['id'] = $con['id'];
			if(isset($con['id'])) {
				$data['password'] = $con['newpwd'];
				$count = count($user->where($Ccon)->save($data));
				if($count == 1) {
					$this -> ajaxReturn(array('message'=>'密码修改成功','success'=>true),'JSON');
				}
			} else {
				$this -> ajaxReturn(array('message'=>'帐号异常','success'=>true),'JSON');
			}
		}
		/* 添加管理员 */
		public function addAdmin() {
			$user = M('User');
			$con['userId'] = $_POST['adminId'];
			$con['userName'] = $_POST['adminName'];
			if(isset($con['userId']) && count($user->where($con)->select()) == 1) {
				$data['teamAdmin'] = 1;
				$count = count($user->where($con)->save($data));
				if($count == 1) {
					$this -> ajaxReturn(array('message'=>'管理员添加成功','success'=>true),'JSON');
				} else {
					$this -> ajaxReturn(array('message'=>'帐号不存在','success'=>false),'JSON');
				}
			} 
		}
		/* 添加老师 */
		public function addMenber() {
			$user = M('User');
			$con['userId'] = $_POST['userId'];
			$con['userName'] = $_POST['userName'];
			$con['type'] = $_POST['type'];
			
			if(isset($con['userId']) && isset($con['userName']) && isset($con['type'])) {
				$data['userId'] = $con['userId'];
				$data['userName'] = $con['userName'];
				$data['superAdmin'] = 0;
				$data['teamAdmin'] = 0;
				$data['userType'] = $con['type'];
				$data['password'] = md5('000000');
				$count = count($user->add($data));
				/*var_dump($count);
				exit;*/
				if($count == 1) {
					$this -> ajaxReturn(array('message'=>$con['userName'].'添加成功','success'=>true),'JSON');
				} else {
					$this -> ajaxReturn(array('message'=>'添加失败','success'=>false),'JSON');
				}
			} else {
				$this -> ajaxReturn(array('message'=>'数据异常','success'=>false),'JSON');
			}
		}
	}
?>