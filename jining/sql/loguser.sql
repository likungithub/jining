/*
Navicat MySQL Data Transfer

Source Server         : lol
Source Server Version : 50624
Source Host           : localhost:3306
Source Database       : caiyun

Target Server Type    : MYSQL
Target Server Version : 50624
File Encoding         : 65001

Date: 2017-06-19 09:31:14
*/

SET FOREIGN_KEY_CHECKS=0;

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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of loguser
-- ----------------------------
INSERT INTO `loguser` VALUES ('2', '213213', 'sadsa', 'sadasd', '123123', 'pc', '192.168.1.108');
INSERT INTO `loguser` VALUES ('3', null, null, null, '1497146424', null, '192.168.1.102');
INSERT INTO `loguser` VALUES ('4', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497147455', null, '192.168.1.102');
INSERT INTO `loguser` VALUES ('5', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497231100', null, '192.168.1.115');
INSERT INTO `loguser` VALUES ('6', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497250657', null, '192.168.1.115');
INSERT INTO `loguser` VALUES ('7', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497253351', null, '192.168.1.115');
INSERT INTO `loguser` VALUES ('8', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497254610', null, '192.168.1.115');
INSERT INTO `loguser` VALUES ('9', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497255238', null, '192.168.1.104');
INSERT INTO `loguser` VALUES ('10', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497256663', null, '192.168.1.104');
INSERT INTO `loguser` VALUES ('11', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497314653', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('12', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497322630', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('13', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497400059', null, '172.72.100.208');
INSERT INTO `loguser` VALUES ('14', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497420420', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('15', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497420795', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('16', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497425727', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('17', '54a0a7bd-7be9-4c2b-8463-e106cc9d02ee', 'ws131255', '王硕', '1497428599', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('18', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497428625', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('19', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497429336', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('20', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497429543', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('21', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497430102', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('22', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497431188', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('23', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497432026', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('24', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497432940', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('25', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497432979', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('26', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497433323', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('27', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497433648', null, '192.168.191.1');
INSERT INTO `loguser` VALUES ('28', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497485523', null, '172.72.100.208');
INSERT INTO `loguser` VALUES ('29', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497496447', null, '172.72.100.208');
INSERT INTO `loguser` VALUES ('30', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497496495', null, '172.72.100.208');
INSERT INTO `loguser` VALUES ('31', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497507594', null, '172.72.100.208');
INSERT INTO `loguser` VALUES ('32', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497507924', null, '172.72.100.208');
INSERT INTO `loguser` VALUES ('33', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497508146', null, '172.72.100.208');
INSERT INTO `loguser` VALUES ('34', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497512836', null, '172.72.100.208');
INSERT INTO `loguser` VALUES ('35', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497515758', null, '172.72.100.208');
INSERT INTO `loguser` VALUES ('36', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497572547', null, '172.72.100.208');
INSERT INTO `loguser` VALUES ('37', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497594695', null, '172.72.100.208');
INSERT INTO `loguser` VALUES ('38', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497602419', null, '172.72.100.208');
INSERT INTO `loguser` VALUES ('39', '332f67bc-5b09-4352-bd6c-c108fe098067', 'admin', '管理员', '1497660070', null, '172.72.100.208');
