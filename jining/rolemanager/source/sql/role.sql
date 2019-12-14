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

-- 导出  表 security.role 结构
CREATE TABLE IF NOT EXISTS `role` (
  `id` char(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `customer_id` char(36) NOT NULL,
  `remark` text,
  `order_no` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 security.role_auth 结构
CREATE TABLE IF NOT EXISTS `role_auth` (
  `role_id` char(36) NOT NULL,
  `resource_id` char(36) NOT NULL,
  PRIMARY KEY (`role_id`,`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `role` (`id`, `name`, `customer_id`, `remark`, `order_no`) VALUES ('a32cf5e8-3dc1-49ad-8027-666a47a1f1c4', '超级管理员', '', '', 0);

INSERT INTO role_auth (role_id, resource_id) values ('a32cf5e8-3dc1-49ad-8027-666a47a1f1c4', '902bf15e-318d-4423-8738-9327ba91dbe0');
INSERT INTO role_auth (role_id, resource_id) values ('a32cf5e8-3dc1-49ad-8027-666a47a1f1c4', '90e1e9ad-6c30-4d58-93f4-66c5f4da2fac');
-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
