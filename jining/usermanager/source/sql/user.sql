-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        10.1.10-MariaDB - mariadb.org binary distribution
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.3.0.5072
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出  表 security.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `id` char(36) NOT NULL,
  `user_account` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `is_enabled` bit(1) NOT NULL COMMENT '是否启用',
  `email` varchar(50) DEFAULT NULL,
  `customer_id` char(36) DEFAULT NULL COMMENT '所属客户',
  `org_id` varchar(50) DEFAULT NULL COMMENT '所属组织',
  `last_login_date` datetime DEFAULT NULL COMMENT '最近一次登陆时间',
  `create_date` datetime DEFAULT NULL,
  `remark` text,
  `is_delete` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 security.user_auth 结构
CREATE TABLE IF NOT EXISTS `user_auth` (
  `user_id` char(36) NOT NULL,
  `resource_id` char(36) NOT NULL,
  PRIMARY KEY (`user_id`,`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 security.user_role 结构
CREATE TABLE IF NOT EXISTS `user_role` (
  `user_id` char(36) NOT NULL,
  `role_id` char(36) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user` (`id`, `user_account`, `name`, `password`, `is_enabled`, `email`, `customer_id`, `org_id`, `last_login_date`, `create_date`, `remark`, `is_delete`) VALUES ('137a1f0e-8173-4cd1-9108-fb85fb078922', 'admin', '超级管理员', '0192023a7bbd73250516f069df18b500', b'1', '', '', '', NULL, '2016-05-16 17:01:45', '', b'0');

INSERT INTO `user_role` (`user_id`, `role_id`) VALUES ('137a1f0e-8173-4cd1-9108-fb85fb078922', 'a32cf5e8-3dc1-49ad-8027-666a47a1f1c4');

-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
