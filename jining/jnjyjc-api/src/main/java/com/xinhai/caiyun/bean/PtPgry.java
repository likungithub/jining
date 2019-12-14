package com.xinhai.caiyun.bean;

import javax.persistence.Table;

import org.springframework.util.StringUtils;

/**
 * @description: 当前客户所属派工人员
 * @author  xinl
 * @date: 2017年7月04日 上午17:14:40
 * @version: v1.0
 */
@Table(name = "PT_PGGL")
public class PtPgry {
    /**
     * 客户编码
     */
    private String khbm;

    /**
     * 代理机构编码
     */
    private String dljgbm;

    /**
     * 职员代码
     */
    private String zydm;

    /**
     * 员工姓名
     */
    private String ygxm;
    
    /**
     * 派工角色名称
     */
    private String pgjsmc;

    /**
     * 个人头像
     */
    private String grtx;

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    public String getDljgbm() {
        return dljgbm;
    }

    public void setDljgbm(String dljgbm) {
        this.dljgbm = dljgbm;
    }

    public String getZydm() {
        return zydm;
    }

    public void setZydm(String zydm) {
        this.zydm = zydm;
    }

    public String getYgxm() {
        return ygxm;
    }

    public void setYgxm(String ygxm) {
        this.ygxm = ygxm;
    }

    public String getGrtx() {
        return grtx;
    }

    public void setGrtx(String grtx) {
        this.grtx = grtx;
    }

    public String getPgjsmc() {
        if(!StringUtils.isEmpty(pgjsmc) && pgjsmc.substring(0,pgjsmc.length()-1).equals(",")){
            return pgjsmc.substring(0,pgjsmc.length()-1);
        }
        
        return pgjsmc;
    }

    public void setPgjsmc(String pgjsmc) {
        this.pgjsmc = pgjsmc;
    }
    
    
}
