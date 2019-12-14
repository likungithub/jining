package com.xinhai.caiyun.commonmanager.api;

/**
 * @description: 获取编码最大值接口
 * @author lixp
 * @date: 2017年6月20日 上午9:24:54
 * @version: v1.0
 */
public interface MaxAtomicInteger {
    
    /**
     * 合同编码最大值
     * @return 合同编码最大值
     */
    String getMaxHtbm();
    
    /**
     * 委托编码最大值
     * @return 委托编码最大值
     */
    String getMaxWtbm();
    
    /**
     * 公司税号(纳税人识别号)最大值
     * 
     * @return 公司税号(纳税人识别号)最大值
     */
    String getMaxYpbm();
    
    /**
     * 员工编码（会计编码、职员编码）最大值
     * @return 员工编码（会计编码、职员编码）最大值
     */
    String getMaxYgbm();
    
    /**
     * 客户编码（公司的客户）最大值
     * @return 客户编码（公司的客户）最大值
     */
    String getMaxKhbm();
    
    /**
     * 收据编码最大值
     * @return 收据编码 最大值
     */
    String getMaxSjbm();
    
    String getMaxDljgbm();
    
    String getMaxNsrsbh();
    
    
}
