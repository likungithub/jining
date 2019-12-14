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




