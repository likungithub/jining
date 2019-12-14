package com.xinhai.caiyun.commonmanager.dao;

import org.apache.ibatis.annotations.Param;

import com.xinhai.caiyun.commonmanager.api.EmailConfig;

/**
 * mybatis Mapper接口，对应同名称的xml文件
 * 
 * @author xinhai conper 2016-03-11
 *
 */
public interface CommonManagerMapper {
    
    /**
     * 合同编码最大值
     * 
     * @return 合同编码最大值
     */
    String getMaxHtbm();

    /**
     * 代理机构编码最大值
     * 
     * @return 代理机构编码最大值
     */
    String getMaxDljgbm();
    
    /**
     * 代理记账公司税号(纳税人识别号)最大值
     * 
     * @return 代理记账公司税号(纳税人识别号)最大值
     */
    String getMaxNsrsbh();
    
    /**
     * 员工编码（会计编码、职员编码）最大值
     * 
     * @return 员工编码（会计编码、职员编码）最大值
     */
    String getMaxYgbm();

    /**
     * 客户编码（代理记账公司的客户）最大值
     * 
     * @return 客户编码（代理记账公司的客户）最大值
     */
    String getMaxKhbm();
    
    /**
     * 收据编码最大值
     * @return 收据编码 最大值
     */
    String getMaxSjbm();

    /** 邮件系统参数
     * @return  邮件系统
     */
    EmailConfig getEmailConfig();

    /**
     * 获取模板
     * @param pzlx 凭证类型
     * @param mbId id
     * @return 模板
     */
    String getSysMb(@Param("pzlx") String pzlx, @Param("mbId") String mbId);

    String getShareConfig();

}