我:
库里面
我:
然后读出来？
张样明:
对
我:
根据什么区分题型呢？
张样明:
你自己设计下表结构
张样明:
自己设计
我:
额
张样明:
DROP TABLE IF EXISTS `exam_mode`;
CREATE TABLE `exam_mode` (
  `mid` int(11) NOT NULL AUTO_INCREMENT COMMENT '模式ID',
  `title` varchar(100) NOT NULL DEFAULT '0' COMMENT '模式标题',
  `role` tinyint(4) NOT NULL DEFAULT '0' COMMENT '角色限制',
  `limit_time` tinyint(4) NOT NULL DEFAULT '0' COMMENT '答题时长（m）',
  `end_time` datetime NOT NULL DEFAULT '2011-08-01 00:00:00' COMMENT '结束时间',
  `answer_times` tinyint(4) NOT NULL DEFAULT '1' COMMENT '可答次数',
  `survey` tinyint(4) NOT NULL DEFAULT '1' COMMENT '是否调研',
  `time_change` tinyint(4) NOT NULL DEFAULT '0' COMMENT '刷屏换题（h）',
  `page_size` tinyint(4) NOT NULL DEFAULT '8' COMMENT '每页题数',
  `questions` varchar(255) NOT NULL DEFAULT '1:1:10:3|1:2:20:5' COMMENT '选题规则',
  `state` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态',
  `dtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`mid`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='答题系统 - 模式配置';

-- ----------------------------
-- Records of exam_mode
-- ----------------------------
INSERT INTO `exam_mode` VALUES ('1', '文献知识考试', '0', '30', '2021-12-02 00:00:00', '3', '1', '0', '8', '2:0:1:5', '1', '2015-04-17 10:29:10');
INSERT INTO `exam_mode` VALUES ('2', '专业知识考试', '0', '60', '2021-12-02 00:00:00', '3', '1', '0', '8', '0:0:6:5', '1', '2011-09-04 22:47:42');

-- ----------------------------
-- Table structure for `exam_record`
-- ----------------------------
DROP TABLE IF EXISTS `exam_record`;
CREATE TABLE `exam_record` (
  
  `rid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID主键',
  `uid` int(11) NOT NULL DEFAULT '0' COMMENT '答题人ID',
  `uname` varchar(100) NOT NULL DEFAULT '0' COMMENT '答题人名字',
  `mode` tinyint(1) DEFAULT '1' COMMENT '答题模式',
  `score` int(11) NOT NULL DEFAULT '0' COMMENT '得分',
  `mtime` int(11) NOT NULL DEFAULT '0' COMMENT '耗时（秒）',
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录时间',
  `ip` varchar(15) NOT NULL DEFAULT '127.0.0.1' COMMENT 'IP地址',
  `papers` text NOT NULL COMMENT '试卷记录',
  PRIMARY KEY 
张样明:
给你参考下 三张表 分别存 考试题目 考试模式 考试记录
我:
好的，谢啦
我:
考试模式是什么？
张样明:
DROP TABLE IF EXISTS `exam_record`;
CREATE TABLE `exam_record` (
  `rid` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID主键',
  `uid` int(11) NOT NULL DEFAULT '0' COMMENT '答题人ID',
  `uname` varchar(100) NOT NULL DEFAULT '0' COMMENT '答题人名字',
  `mode` tinyint(1) DEFAULT '1' COMMENT '答题模式',
  `score` int(11) NOT NULL DEFAULT '0' COMMENT '得分',
  `mtime` int(11) NOT NULL DEFAULT '0' COMMENT '耗时（秒）',
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '记录时间',
  `ip` varchar(15) NOT NULL DEFAULT '127.0.0.1' COMMENT 'IP地址',
  `papers` text NOT NULL COMMENT '试卷记录',
  PRIMARY KEY (`rid`),
  KEY `score` (`score`),
  KEY `ctime` (`ctime`),
  KEY `uid` (`uid`),
  KEY `ip` (`ip`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='答题系统 - 答题记录';

-- ----------------------------
-- Records of exam_record
-- ----------------------------

-- ----------------------------
-- Table structure for `exam_store`
-- ----------------------------
DROP TABLE IF EXISTS `exam_store`;
CREATE TABLE `exam_store` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `store` tinyint(4) NOT NULL DEFAULT '0' COMMENT '题库编号',
  `type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '类型：0单选|1多选|2判断',
  `question` varchar(255) NOT NULL COMMENT '题目',
  `answer1` varchar(255) DEFAULT NULL COMMENT '答案1',
  `answer2` varchar(255) DEFAULT NULL COMMENT '答案2',
  `answer3` varchar(255) DEFAULT NULL COMMENT '答案3',
  `answer4` varchar(255) DEFAULT NULL COMMENT '答案4',
  `answer5` varchar(255) DEFAULT NULL COMMENT '答案5',
  `answer6` varchar(255) DEFAULT NULL COMMENT '答案6',
  `answer7` varchar(255) DEFAULT NULL COMMENT '答案7',
  `answer8` varchar(255) DEFAULT NULL COMMENT '答案8',
  `correct` varchar(50) NOT NULL COMMENT '正确答案',
  `dtime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='答题系统 - 题库';

-- ----------------------------

张样明:
INSERT INTO `exam_store` VALUES ('1', '1', '1', '结肠和上段直肠的淋巴引流包括:', '结肠上淋巴结', '结肠周围淋巴结', '中间淋巴结', '中央淋巴结', '腹股沟淋巴结', '其他', '0', '0', '1,3,5', '2011-09-01 17:27:56');
张样明:
没发全
张样明:
模式就 第几条试卷
张样明:
用来从题库取试卷用的
我:
那我这里就没有这个，我的直接一个课程对应一份试卷
张样明:
也可以不加模式表
张样明:
你直接用一个题库id来取试卷也行
张样明:
统一的一个标记id是一套试卷
我:
嗯，是的
我:
大概了解了，有问题再问你