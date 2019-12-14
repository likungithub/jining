package com.xinhai.caiyun.commonmanager.config;

import java.io.File;

public interface CommonConfig {
    String getShareUrl();
    
    /**
     * 获取模板
     * @param pzlx 凭证类型
     * @param mbId id
     * @return 模板
     */
    String getSysMb(String pzlx, String mbId); 
}
