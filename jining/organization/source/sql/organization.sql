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

-- 导出  表 security.organization 结构
CREATE TABLE IF NOT EXISTS `organization` (
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

-- 数据导出被取消选择。
-- 导出  表 security.organization_auth 结构
CREATE TABLE IF NOT EXISTS `organization_auth` (
  `org_id` char(36) NOT NULL,
  `resource_id` char(36) NOT NULL,
  PRIMARY KEY (`org_id`,`resource_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 数据导出被取消选择。
-- 导出  表 security.org_type 结构
CREATE TABLE IF NOT EXISTS `org_type` (
  `id` char(36) NOT NULL,
  `name` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='组织结构类型';

-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
