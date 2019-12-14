CREATE TABLE `t_ypjc_report` (
	`ypid` VARCHAR(50) NOT NULL,
	`jcxmid` VARCHAR(50) NOT NULL,
	`file_name` VARCHAR(500) NOT NULL,
	`updated_by` VARCHAR(500) NOT NULL,
	`updated_at` DATE NOT NULL,
	PRIMARY KEY (`ypid`, `jcxmid`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
CREATE TABLE `quantitation_report` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`ypid` VARCHAR(255) NOT NULL,
	`jcxmid` VARCHAR(255) NOT NULL,
	`file_name` VARCHAR(500) NOT NULL,
	`lab_name` VARCHAR(255) NOT NULL,
	`instrument` VARCHAR(255) NOT NULL,
	`user` VARCHAR(255) NOT NULL,
	`batch` VARCHAR(255) NOT NULL,
	`sample_type` VARCHAR(255) NULL DEFAULT NULL,
	`vial_position` VARCHAR(255) NULL DEFAULT NULL,
	`injection_volume` INT(11) NULL DEFAULT NULL,
	`acquisition_date` DATETIME NULL DEFAULT NULL,
	`compound_name` VARCHAR(255) NULL DEFAULT NULL,
	`total_area` VARCHAR(255) NULL DEFAULT NULL,
	`retention_time` VARCHAR(255) NULL DEFAULT NULL,
	`calculated_amount` VARCHAR(255) NULL DEFAULT NULL,
	`units` VARCHAR(255) NULL DEFAULT NULL,
	`uploaded_by` VARCHAR(255) NULL DEFAULT NULL,
	`uploaded_at` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1
;
