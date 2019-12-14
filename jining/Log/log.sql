-- ----------------------------
-- Table structure for log
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
) ENGINE=InnoDB AUTO_INCREMENT=1287 DEFAULT CHARSET=utf8;