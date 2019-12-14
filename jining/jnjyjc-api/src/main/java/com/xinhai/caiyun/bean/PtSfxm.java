package com.xinhai.caiyun.bean;

import javax.persistence.Table;

/**
 * @description: 获取当前代理记账公司的收费项目信息
 * @author  xinl
 * @date: 2017年11月03日 上午08:54:40
 * @version: v1.0
 */
@Table(name = "PT_SFXMGL")
public class PtSfxm {
    /**
     * 收费项目代码
     */
    private  String sfxmdm;

    /**
     * 收费项目名称
     */
    private  String sfxmmc;

    /**
     * 收费标准
     */
    private  String  sfbz;

    /**
     * 费用折扣
     */
    private String  fwzk;

    /**
     * 实际收费
     */
    private String  sjsf;

    /**
     * 图片链接
     */
    private String tplj;

    /**
     * 备注信息
     */
    private String bzxx;

    /**
     * 服务规则
     */
    private String fwgz;

    public String getSfxmdm() {
        return sfxmdm;
    }

    public void setSfxmdm(String sfxmdm) {
        this.sfxmdm = sfxmdm;
    }

    public String getSfxmmc() {
        return sfxmmc;
    }

    public void setSfxmmc(String sfxmmc) {
        this.sfxmmc = sfxmmc;
    }

    public String getSfbz() {
        return sfbz;
    }

    public void setSfbz(String sfbz) {
        this.sfbz = sfbz;
    }

    public String getFwzk() {
        return fwzk;
    }

    public void setFwzk(String fwzk) {
        this.fwzk = fwzk;
    }

    public String getSjsf() {
        return sjsf;
    }

    public void setSjsf(String sjsf) {
        this.sjsf = sjsf;
    }

    public String getTplj() {
        return tplj;
    }

    public void setTplj(String tplj) {
        this.tplj = tplj;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public String getFwgz() {
        return fwgz;
    }

    public void setFwgz(String fwgz) {
        this.fwgz = fwgz;
    }
}
