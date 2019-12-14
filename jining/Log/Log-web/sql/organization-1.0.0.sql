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
  `id` char(50) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `parent_id` char(50) DEFAULT NULL,
  `is_independent` bit(1) NOT NULL COMMENT '是否独立应用组织',
  `org_type` int(11) DEFAULT NULL COMMENT '部门类型',
  `path` text,
  `remark` text,
  `order_no` int(11) NOT NULL DEFAULT '0',
  `customer_id` varchar(50) NOT NULL COMMENT '所属客户主键',
  `is_delete` bit(1) NOT NULL DEFAULT b'0',
  `update_date` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='组织结构';

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
