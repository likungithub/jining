/*
Navicat MySQL Data Transfer

Source Server         : lol
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : caiyun

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-06-12 09:44:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `customer`
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` varchar(36) NOT NULL,
  `code` varchar(255) NOT NULL COMMENT '客户编号',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '客户名称',
  `create_date` datetime DEFAULT NULL COMMENT '创建日期',
  `state` tinyint(4) DEFAULT NULL COMMENT '状态,是否启用',
  `ext_atrr` text COMMENT '扩展属性列,保存json数据',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='客户信息';

-- ----------------------------
-- Records of customer
-- ----------------------------
INSERT INTO `customer` VALUES ('09de1a86-2e14-4e1c-ab34-269563fc1698', '22222', 'sss', '2017-06-08 18:36:19', '1', '{}');
INSERT INTO `customer` VALUES ('30281730-85f4-430b-8a92-e877c0658207', 'default_customer', '默认客户', '2017-06-07 13:00:16', '1', '{}');

-- ----------------------------
-- Table structure for `customer_parameter`
-- ----------------------------
DROP TABLE IF EXISTS `customer_parameter`;
CREATE TABLE `customer_parameter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(40) DEFAULT NULL COMMENT '客户id',
  `parameter_id` varchar(40) DEFAULT NULL COMMENT '系统参数id',
  `value` varchar(254) DEFAULT NULL COMMENT '客户自定义数值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of customer_parameter
-- ----------------------------
INSERT INTO `customer_parameter` VALUES ('5', '30281730-85f4-430b-8a92-e877c0658207', '220090b2-ea72-4fae-8af6-eb9a33f8ec0a', '3123');

-- ----------------------------
-- Table structure for `dictionary`
-- ----------------------------
DROP TABLE IF EXISTS `dictionary`;
CREATE TABLE `dictionary` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID无意义',
  `name` varchar(50) NOT NULL COMMENT '字典名称',
  `code` varchar(50) NOT NULL COMMENT '字典编码',
  `description` varchar(50) NOT NULL COMMENT '字典描述',
  `is_tree` int(11) NOT NULL DEFAULT '0' COMMENT '是否树形展示 0不是 1是',
  `enable_change` int(11) NOT NULL DEFAULT '0' COMMENT '字典下是否可修改 0 不可以，1可以',
  `dictionary_group_id` int(11) NOT NULL COMMENT '所属字典分组id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dictionary
-- ----------------------------

-- ----------------------------
-- Table structure for `dictionary_group`
-- ----------------------------
DROP TABLE IF EXISTS `dictionary_group`;
CREATE TABLE `dictionary_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID无意义',
  `name` varchar(50) NOT NULL COMMENT '字典分组名称',
  `code` varchar(50) NOT NULL COMMENT '字典分组编码',
  `parent_id` int(11) DEFAULT NULL COMMENT '父节点ID',
  `description` varchar(200) DEFAULT NULL COMMENT '字典分组描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dictionary_group
-- ----------------------------
INSERT INTO `dictionary_group` VALUES ('-1', '高信平台', 'gxfw', '-1', null);

-- ----------------------------
-- Table structure for `dictionary_item`
-- ----------------------------
DROP TABLE IF EXISTS `dictionary_item`;
CREATE TABLE `dictionary_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL COMMENT '业务代码名称',
  `code` varchar(50) DEFAULT NULL COMMENT '编码',
  `dictionary_id` int(11) DEFAULT NULL COMMENT '字典ID',
  `description` varchar(200) DEFAULT NULL COMMENT '描述',
  `sequence` int(11) DEFAULT NULL COMMENT '序号',
  `category` varchar(50) DEFAULT NULL COMMENT '自定义分类',
  `data` varchar(50) DEFAULT NULL COMMENT '自定义数据',
  `standard_code` varchar(50) DEFAULT NULL COMMENT '标准编码',
  `parent_id` int(11) DEFAULT NULL COMMENT '父节点id',
  `tree_level` int(11) DEFAULT NULL COMMENT '所在树等级',
  `address` varchar(50) DEFAULT NULL COMMENT '路径,如 父节点/子节点',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dictionary_item
-- ----------------------------

-- ----------------------------
-- Table structure for `log`
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `menuID` varchar(50) DEFAULT NULL,
  `logdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `logValue` varchar(255) DEFAULT NULL,
  `userID` varchar(50) DEFAULT NULL,
  `ip` varchar(20) DEFAULT NULL,
  `detail` text,
  `log_level` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of log
-- ----------------------------
INSERT INTO `log` VALUES ('1', null, '2017-06-08 18:37:58', '添加用户', '332f67bc-5b09-4352-bd6c-c108fe098067', '192.168.1.108', '[调用方法：com.xinhai.usermanager.controller.UserController$$EnhancerBySpringCGLIB$$b0cb2b96.addUser] [参数：{\"arg(0)\":\"{\\\"orgName\\\":null,\\\"remark\\\":\\\"\\\",\\\"lastLoginDate\\\":null,\\\"sync\\\":false,\\\"enabled\\\":true,\\\"orgId\\\":\\\"9a25a17e-f229-483a-8707-25daf57dc86b\\\",\\\"password\\\":\\\"96e79218965eb72c92a549dd5a330112\\\",\\\"userAccount\\\":\\\"ws131255\\\",\\\"name\\\":\\\"王硕\\\",\\\"customerId\\\":\\\"30281730-85f4-430b-8a92-e877c0658207\\\",\\\"tel\\\":\\\"\\\",\\\"id\\\":\\\"54a0a7bd-7be9-4c2b-8463-e106cc9d02ee\\\",\\\"email\\\":\\\"\\\",\\\"createDate\\\":\\\"2017-06-08 18:37:57\\\"}\"}]', 'OPERATOR');
INSERT INTO `log` VALUES ('2', null, '2017-06-08 18:42:39', '添加用户', '332f67bc-5b09-4352-bd6c-c108fe098067', '172.72.100.208', '[调用方法：com.xinhai.usermanager.controller.UserController$$EnhancerBySpringCGLIB$$b0cb2b96.addUser] [参数：{\"arg(0)\":\"{\\\"orgName\\\":null,\\\"remark\\\":\\\"\\\",\\\"lastLoginDate\\\":null,\\\"sync\\\":false,\\\"enabled\\\":true,\\\"orgId\\\":\\\"633fc55d-7772-46ec-9f53-f0589d1015cd\\\",\\\"password\\\":\\\"96e79218965eb72c92a549dd5a330112\\\",\\\"userAccount\\\":\\\"111111\\\",\\\"name\\\":\\\"ssss\\\",\\\"customerId\\\":\\\"30281730-85f4-430b-8a92-e877c0658207\\\",\\\"tel\\\":\\\"\\\",\\\"id\\\":\\\"5812ad86-a62e-4e97-b0c2-8e7db01dfa6f\\\",\\\"email\\\":\\\"\\\",\\\"createDate\\\":\\\"2017-06-08 18:42:39\\\"}\"}]', 'OPERATOR');

-- ----------------------------
-- Table structure for `loguser`
-- ----------------------------
DROP TABLE IF EXISTS `loguser`;
CREATE TABLE `loguser` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `employeesid` varchar(50) DEFAULT NULL,
  `useraccount` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `logtime` int(10) DEFAULT NULL,
  `logtype` varchar(50) DEFAULT NULL,
  `userip` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of loguser
-- ----------------------------
INSERT INTO `loguser` VALUES ('2', '213213', 'sadsa', 'sadasd', '123123', 'pc', '192.168.1.108');
INSERT INTO `loguser` VALUES ('3', null, null, null, '1497146424', null, '192.168.1.102');
INSERT INTO `loguser` VALUES ('4', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497147455', null, '192.168.1.102');
INSERT INTO `loguser` VALUES ('5', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497231100', null, '192.168.1.115');

-- ----------------------------
-- Table structure for `organization`
-- ----------------------------
DROP TABLE IF EXISTS `organization`;
CREATE TABLE `organization` (
  `id` varchar(36) NOT NULL,
  `code` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `parent_id` varchar(36) DEFAULT NULL,
  `is_independent` tinyint(4) DEFAULT NULL,
  `org_type` varchar(50) DEFAULT NULL,
  `path` varchar(36) DEFAULT NULL,
  `remark` varchar(36) DEFAULT NULL,
  `order_no` int(11) DEFAULT NULL,
  `customer_id` varchar(50) DEFAULT NULL,
  `is_delete` tinyint(4) DEFAULT '0',
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `attr1` varchar(100) DEFAULT NULL,
  `attr2` varchar(100) DEFAULT NULL,
  `attr3` varchar(100) DEFAULT NULL,
  `attr4` varchar(100) DEFAULT NULL,
  `attr5` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of organization
-- ----------------------------
INSERT INTO `organization` VALUES ('633fc55d-7772-46ec-9f53-f0589d1015cd', 'sss', 'ssss', '', '1', 'usualorg', 'test|&sss', '', '1', '30281730-85f4-430b-8a92-e877c0658207', '0', '2017-06-08 18:41:01', '', '', '', '', '');
INSERT INTO `organization` VALUES ('9a25a17e-f229-483a-8707-25daf57dc86b', 'test', '测试', '', '1', '', 'test', '', '1', '30281730-85f4-430b-8a92-e877c0658207', '0', '2017-06-07 14:42:45', '', '', '', '', '');

-- ----------------------------
-- Table structure for `organization_auth`
-- ----------------------------
DROP TABLE IF EXISTS `organization_auth`;
CREATE TABLE `organization_auth` (
  `org_id` char(36) NOT NULL,
  `resource_id` char(36) NOT NULL,
  PRIMARY KEY (`org_id`,`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of organization_auth
-- ----------------------------

-- ----------------------------
-- Table structure for `org_type`
-- ----------------------------
DROP TABLE IF EXISTS `org_type`;
CREATE TABLE `org_type` (
  `code` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='组织结构类型';

-- ----------------------------
-- Records of org_type
-- ----------------------------
INSERT INTO `org_type` VALUES ('usualorg', '一般组织');

-- ----------------------------
-- Table structure for `resource`
-- ----------------------------
DROP TABLE IF EXISTS `resource`;
CREATE TABLE `resource` (
  `id` char(36) NOT NULL,
  `func_id` char(36) NOT NULL,
  `customer_id` char(36) DEFAULT NULL COMMENT '所属客户',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `identifier` varchar(255) DEFAULT NULL COMMENT '如果不是菜单的资源标识',
  `menu_icon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `url` varchar(512) DEFAULT NULL COMMENT '菜单url',
  `category` varchar(255) DEFAULT NULL COMMENT '分类',
  `parent_id` char(36) DEFAULT NULL COMMENT '父级id，null标识根级',
  `order_no` int(11) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of resource
-- ----------------------------
INSERT INTO `resource` VALUES ('1759d70e-4b52-11e7-a919-92ebcb67fe33', '9', '30281730-85f4-430b-8a92-e877c0658207', '系统管理与维护', '系统管理与维护', '', 'fa fa-cogs', '', 'menu', null, '9', '', '2017-06-07 13:34:05');
INSERT INTO `resource` VALUES ('1759d9a2-4b52-11e7-a919-92ebcb67fe33', '9.1', '30281730-85f4-430b-8a92-e877c0658207', '组织结构管理', '组织结构管理', '/**/organization/**', 'fa fa-users', '/organization/organization/list.jsp', 'menu', '9', '1', '', '2017-06-07 13:34:06');
INSERT INTO `resource` VALUES ('1759dab0-4b52-11e7-a919-92ebcb67fe33', '9.2', '30281730-85f4-430b-8a92-e877c0658207', '角色及权限管理', '角色及权限管理', '/**/roles/**', 'fa fa-street-view', '/role/roles/list.jsp', 'menu', '9', '2', '', '2017-06-07 13:34:06');
INSERT INTO `resource` VALUES ('1759db8c-4b52-11e7-a919-92ebcb67fe33', '9.3', '30281730-85f4-430b-8a92-e877c0658207', '菜单管理', '菜单管理', '/**/resource/**', 'fa fa-outdent', '/resource/resources/list.jsp', 'menu', '9', '3', '', '2017-06-07 13:34:06');
INSERT INTO `resource` VALUES ('1759e21c-4b52-11e7-a919-92ebcb67fe33', '9.6', '30281730-85f4-430b-8a92-e877c0658207', '业务字典管理', '业务字典管理', '/**/dictionary/**', 'fa fa-list', 'frame:/dictionary/pages/dict/index.jsp', 'menu', '9', '6', '', '2017-06-07 13:34:06');
INSERT INTO `resource` VALUES ('1759e2ee-4b52-11e7-a919-92ebcb67fe33', '9.7', '30281730-85f4-430b-8a92-e877c0658207', '系统参数配置', '系统参数配置', '/**/systemparameter/**', 'fa fa-minus-square-o', 'frame:/systemparameter/pages/systemparameter/syspara-list.jsp', 'menu', '9', '7', '', '2017-06-07 13:34:06');
INSERT INTO `resource` VALUES ('1759e99c-4b52-11e7-a919-92ebcb67fe33', '9.4', '30281730-85f4-430b-8a92-e877c0658207', '用户管理', '用户管理', '/**/user/**', 'fa fa-user', '/user/users/list.jsp', 'menu', '9', '4', '', '2017-06-07 13:34:06');
INSERT INTO `resource` VALUES ('1759ecbc-4b52-11e7-a919-92ebcb67fe33', '9.8', '30281730-85f4-430b-8a92-e877c0658207', '日志查询统计', '日志查询统计', '/**/log/**', 'fa fa-file-text-o', '/log/Log/log.jsp', 'menu', '9', '8', '', '2017-06-07 13:34:06');
INSERT INTO `resource` VALUES ('902bf15e-318d-4423-8738-9327ba91dbe0', '902bf15e-318d-4423-8738-9327ba91dbe0', null, '系统管理', '', '', null, '', 'menu', '', '9', '', '2017-06-07 13:05:48');
INSERT INTO `resource` VALUES ('90e1e9ad-6c30-4d58-93f4-66c5f4da2fac', '90e1e9ad-6c30-4d58-93f4-66c5f4da2fac', null, '客户管理', '', '/**/customer/**', null, '/customer/customer/customer.jsp', 'menu', '902bf15e-318d-4423-8738-9327ba91dbe0', '5', '', '2017-06-07 13:05:49');

-- ----------------------------
-- Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` char(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `customer_id` char(36) NOT NULL,
  `remark` text,
  `order_no` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('946bc4ea-e3fd-4c74-b9ca-46fd70d8fad9', '管理员', '30281730-85f4-430b-8a92-e877c0658207', '', '1');
INSERT INTO `role` VALUES ('a32cf5e8-3dc1-49ad-8027-666a47a1f1c4', '超级管理员', '', '', '0');

-- ----------------------------
-- Table structure for `role_auth`
-- ----------------------------
DROP TABLE IF EXISTS `role_auth`;
CREATE TABLE `role_auth` (
  `role_id` char(36) NOT NULL,
  `resource_id` char(36) NOT NULL,
  PRIMARY KEY (`role_id`,`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_auth
-- ----------------------------
INSERT INTO `role_auth` VALUES ('946bc4ea-e3fd-4c74-b9ca-46fd70d8fad9', '1759d70e-4b52-11e7-a919-92ebcb67fe33');
INSERT INTO `role_auth` VALUES ('946bc4ea-e3fd-4c74-b9ca-46fd70d8fad9', '1759d9a2-4b52-11e7-a919-92ebcb67fe33');
INSERT INTO `role_auth` VALUES ('946bc4ea-e3fd-4c74-b9ca-46fd70d8fad9', '1759dab0-4b52-11e7-a919-92ebcb67fe33');
INSERT INTO `role_auth` VALUES ('946bc4ea-e3fd-4c74-b9ca-46fd70d8fad9', '1759db8c-4b52-11e7-a919-92ebcb67fe33');
INSERT INTO `role_auth` VALUES ('946bc4ea-e3fd-4c74-b9ca-46fd70d8fad9', '1759e21c-4b52-11e7-a919-92ebcb67fe33');
INSERT INTO `role_auth` VALUES ('946bc4ea-e3fd-4c74-b9ca-46fd70d8fad9', '1759e2ee-4b52-11e7-a919-92ebcb67fe33');
INSERT INTO `role_auth` VALUES ('946bc4ea-e3fd-4c74-b9ca-46fd70d8fad9', '1759e99c-4b52-11e7-a919-92ebcb67fe33');
INSERT INTO `role_auth` VALUES ('946bc4ea-e3fd-4c74-b9ca-46fd70d8fad9', '1759ecbc-4b52-11e7-a919-92ebcb67fe33');
INSERT INTO `role_auth` VALUES ('a32cf5e8-3dc1-49ad-8027-666a47a1f1c4', '902bf15e-318d-4423-8738-9327ba91dbe0');
INSERT INTO `role_auth` VALUES ('a32cf5e8-3dc1-49ad-8027-666a47a1f1c4', '90e1e9ad-6c30-4d58-93f4-66c5f4da2fac');

-- ----------------------------
-- Table structure for `system_parameter`
-- ----------------------------
DROP TABLE IF EXISTS `system_parameter`;
CREATE TABLE `system_parameter` (
  `id` varchar(40) NOT NULL COMMENT 'id',
  `code` varchar(50) NOT NULL COMMENT '编码',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `descrition` varchar(200) DEFAULT NULL COMMENT '描述',
  `data_type` varchar(50) DEFAULT NULL COMMENT '数据类型',
  `data_typename` varchar(50) DEFAULT NULL COMMENT '数据类型名称',
  `value` varchar(254) DEFAULT NULL COMMENT '值',
  `orig_value` varchar(254) DEFAULT NULL,
  `customer_editable` tinyint(4) DEFAULT '1' COMMENT '客户是否可以编辑',
  `user_editable` tinyint(4) DEFAULT '1' COMMENT '用户是否可编辑',
  `using_combobox` tinyint(1) DEFAULT NULL COMMENT '是否用下拉列表框',
  `data_source` varchar(100) DEFAULT NULL COMMENT '参数查询表',
  `key_name` varchar(50) DEFAULT NULL COMMENT '参数ID字段名',
  `value_name` varchar(50) DEFAULT NULL COMMENT '参数值字段名',
  `enable_change` tinyint(1) DEFAULT NULL COMMENT '参数可否修改',
  `query_condition` varchar(50) DEFAULT NULL COMMENT '查询条件\n',
  `index_id` int(11) DEFAULT NULL COMMENT '本列不存数据，方便客户和用户参数查询使用，虚拟外键',
  PRIMARY KEY (`id`),
  UNIQUE KEY `system_parameter_code_uindex` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of system_parameter
-- ----------------------------
INSERT INTO `system_parameter` VALUES ('220090b2-ea72-4fae-8af6-eb9a33f8ec0a', 'code', '编码', '', '1', '字符串', '123', '123', '0', '0', '0', '', '', '', '1', '', null);

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` char(36) NOT NULL,
  `user_account` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `is_enabled` bit(1) NOT NULL COMMENT '是否启用',
  `email` varchar(50) DEFAULT NULL,
  `customer_id` char(36) DEFAULT NULL COMMENT '所属客户',
  `org_id` varchar(50) DEFAULT NULL COMMENT '所属组织',
  `last_login_date` datetime DEFAULT NULL COMMENT '最近一次登录时间',
  `create_date` datetime DEFAULT NULL,
  `remark` text,
  `is_delete` bit(1) NOT NULL DEFAULT b'0',
  `tel` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('137a1f0e-8173-4cd1-9108-fb85fb078922', 'sysadmin', '超级管理员', '96e79218965eb72c92a549dd5a330112', '', '', '', '', null, '2016-05-16 17:01:45', '', '', null);
INSERT INTO `user` VALUES ('332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '96e79218965eb72c92a549dd5a330112', '', '', '30281730-85f4-430b-8a92-e877c0658207', '', null, '2017-06-07 13:44:02', '', '', null);
INSERT INTO `user` VALUES ('54a0a7bd-7be9-4c2b-8463-e106cc9d02ee', 'ws131255', '王硕', '96e79218965eb72c92a549dd5a330112', '', '', '30281730-85f4-430b-8a92-e877c0658207', '9a25a17e-f229-483a-8707-25daf57dc86b', null, '2017-06-08 18:37:57', '', '', '');
INSERT INTO `user` VALUES ('5812ad86-a62e-4e97-b0c2-8e7db01dfa6f', '111111', 'ssss', '96e79218965eb72c92a549dd5a330112', '', '', '30281730-85f4-430b-8a92-e877c0658207', '633fc55d-7772-46ec-9f53-f0589d1015cd', null, '2017-06-08 18:42:39', '', '', '');

-- ----------------------------
-- Table structure for `user_auth`
-- ----------------------------
DROP TABLE IF EXISTS `user_auth`;
CREATE TABLE `user_auth` (
  `user_id` char(36) NOT NULL,
  `resource_id` char(36) NOT NULL,
  PRIMARY KEY (`user_id`,`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_auth
-- ----------------------------

-- ----------------------------
-- Table structure for `user_parameter`
-- ----------------------------
DROP TABLE IF EXISTS `user_parameter`;
CREATE TABLE `user_parameter` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(40) NOT NULL COMMENT '用户id',
  `parameter_id` varchar(40) NOT NULL COMMENT '系统参数ID',
  `value` varchar(254) DEFAULT NULL COMMENT '用户自定义数值',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_parameter
-- ----------------------------

-- ----------------------------
-- Table structure for `user_role`
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `user_id` char(36) NOT NULL,
  `role_id` char(36) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('137a1f0e-8173-4cd1-9108-fb85fb078922', 'a32cf5e8-3dc1-49ad-8027-666a47a1f1c4');
INSERT INTO `user_role` VALUES ('332f67bc-5b09-4352-bd6c-c108fe098067', '946bc4ea-e3fd-4c74-b9ca-46fd70d8fad9');
INSERT INTO `user_role` VALUES ('54a0a7bd-7be9-4c2b-8463-e106cc9d02ee', '8b9bc97c-5bbe-45fc-8ff7-ddbe42da80d9');
