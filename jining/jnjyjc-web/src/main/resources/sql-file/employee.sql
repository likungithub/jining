-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.5.35-log - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.3.0.5043
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 demo 的数据库结构
CREATE DATABASE IF NOT EXISTS `platform` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_bin */;
USE `platform`;

-- 导出  表 demo.employee 结构
CREATE TABLE IF NOT EXISTS `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `sex` enum('male','female') NOT NULL DEFAULT 'female',
  `age` int(11) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `interest` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- 正在导出表  demo.employee 的数据：~8 rows (大约)
DELETE FROM `employee`;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` (`id`, `name`, `code`, `sex`, `age`, `birthday`, `nationality`, `interest`) VALUES
	(4, 'kong', 'sda', 'female', 12, '2016-03-12', 'dada', 'dada'),
	(14, 'one1', 'dada', 'male', 12, '2016-03-14', 'dada', 'basketball;football;running;'),
	(15, 'dafda', 'fdasfdsa', 'male', 12, '2016-03-26', NULL, 'football;running;other;'),
	(16, 'two', 'twos', 'male', 11, '2016-03-12', NULL, 'basketball;football;running;'),
	(17, 'one2', 'dada', 'male', 12, '2016-03-14', 'dada', 'basketball;football;running;other;'),
	(18, 'one3', 'dada', 'male', 12, '2016-03-14', 'dada', 'basketball;football;'),
	(19, 'one3', 'dada', 'male', 12, '2016-03-14', 'dada', 'football;running;'),
	(20, 'one', 'dada', 'female', 12, '2016-03-14', 'dada', 'frfd');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
