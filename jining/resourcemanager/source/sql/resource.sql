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

-- 导出  表 security.resource 结构
CREATE TABLE IF NOT EXISTS `resource` (
  `id` char(36) NOT NULL,
  `func_id` char(36) NOT NULL,
  `customer_id` char(36) NOT NULL COMMENT '所属客户',
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

INSERT INTO `resource` (`id`,`func_id`, `description`, `name`, `identifier`, `menu_icon`, `url`, `category`, `parent_id`, `order_no`, enabled, update_date) VALUES
('902bf15e-318d-4423-8738-9327ba91dbe0','902bf15e-318d-4423-8738-9327ba91dbe0', '', '系统管理', '', NULL, '', 'menu', '', 9, true, now());
INSERT INTO `resource` (`id`,`func_id`, `description`, `name`, `identifier`, `menu_icon`, `url`, `category`, `parent_id`, `order_no`, enabled, update_date) VALUES
('90e1e9ad-6c30-4d58-93f4-66c5f4da2fac','90e1e9ad-6c30-4d58-93f4-66c5f4da2fac', '', '客户管理', '/**/customer/**', NULL, '/customer/customer/customer.jsp', 'menu', '902bf15e-318d-4423-8738-9327ba91dbe0', 5, true, now());

-- 数据导出被取消选择。
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
