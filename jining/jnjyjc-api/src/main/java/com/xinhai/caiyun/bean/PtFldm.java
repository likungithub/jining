package com.xinhai.caiyun.bean;

import java.util.List;

/**
 * @description: 分类代码
 * @version: v1.0
 * @author lixp
 * @date: 2017年7月31日 上午11:16:09
 */
public class PtFldm {
    
    /**
     * 首字母
     */
    private String szm;
    
    /**
     * 名称
     */
    private List<String> mc;

    public String getSzm() {
        return szm;
    }

    public void setSzm(String szm) {
        this.szm = szm;
    }

    public List<String> getMc() {
        return mc;
    }

    public void setMc(List<String> mc) {
        this.mc = mc;
    }

   
}
