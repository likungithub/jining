package com.xinhai.caiyun.bean;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * @description: 分类代码
 * @version: v1.0
 * @author lixp
 * @date: 2017年7月31日 上午11:16:09
 */
public class PtKhSfxx {
    
    /**
     * 费用类型
     */
    private String fylx;
    
    /**
     * 费用类型名称
     */
    private String fylxMc;
    
    
    /** 总缴费金额 */
    private BigDecimal zjfje;
    
    /**
     * 费用占比
     */
    private String fyzb;;
    
    /**
     * 名称
     */
    private List<PtKhSfxxMx> mx;
    
  

    public String getFylx() {
        return fylx;
    }

    public void setFylx(String fylx) {
        this.fylx = fylx;
    }

    public String getFylxMc() {
        return fylxMc;
    }

    public void setFylxMc(String fylxMc) {
        this.fylxMc = fylxMc;
    }

    public BigDecimal getZjfje() {
        return zjfje;
    }

    public void setZjfje(BigDecimal zjfje) {
        this.zjfje = zjfje;
    }

    public List<PtKhSfxxMx> getMx() {
        return mx;
    }

    public void setMx(List<PtKhSfxxMx> mx) {
        this.mx = mx;
    }

    public String getFyzb() {
        return fyzb;
    }

    public void setFyzb(String fyzb) {
        this.fyzb = fyzb;
    }

    

    
}
