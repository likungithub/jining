package com.xinhai.caiyun.bean;

/**
 * @description: 业务合作
 * @version: v1.0
 * @author lixp
 * @date: 2017年7月25日 下午5:28:13
 */
public class PtYwhz implements Cloneable{
    /** 客户编码 */
    String khbm;
    /** 合作ID*/
    String hzid;
    /** 客户名称 */
    String khmc;
    /** 公司名称 */
    String gsmc;
    /** 纳税人识别号 */
    String nsrsbh;
    /** 代理机构编码，用于标识该客户属于哪家代理记账公司 */
    String dljgbm;
    /** 联系方式：存储手机号、QQ或者邮箱 */
    String lxfs;
    /** 留言信息 */
    String lyxx;
    /** 业务类型代码，可以多个；存附表 */
    String ywdm;
    /** 业务类型名称，可以多个；存附表 */
    String ywmc;
    /** 图片链接，可以上传多个图片；存附表 */
    String tp;
    /** 业务类型代码，可以多个；存附表 */
    String ywlxdm;
    /** 业务类型名称，可以多个；存附表 */
    String ywlxmc;
    /** 图片链接，可以上传多个图片；存附表 */
    String tplj;

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }
    
    
    public String getHzid() {
        return hzid;
    }

    public void setHzid(String hzid) {
        this.hzid = hzid;
    }

    public String getKhmc() {
        return khmc;
    }

    public void setKhmc(String khmc) {
        this.khmc = khmc;
    }

    public String getDljgbm() {
        return dljgbm;
    }

    public void setDljgbm(String dljgbm) {
        this.dljgbm = dljgbm;
    }

    public String getLxfs() {
        return lxfs;
    }

    public void setLxfs(String lxfs) {
        this.lxfs = lxfs;
    }

    public String getLyxx() {
        return lyxx;
    }

    public void setLyxx(String lyxx) {
        this.lyxx = lyxx;
    }

    public String getYwdm() {
        return ywdm;
    }

    public void setYwdm(String ywdm) {
        this.ywdm = ywdm;
    }

    public String getYwmc() {
        return ywmc;
    }

    public void setYwmc(String ywmc) {
        this.ywmc = ywmc;
    }

    public String getTp() {
        return tp;
    }

    public void setTp(String tp) {
        this.tp = tp;
    }
    
    
    
    public String getNsrsbh() {
        return nsrsbh;
    }

    public void setNsrsbh(String nsrsbh) {
        this.nsrsbh = nsrsbh;
    }

    public String getYwlxdm() {
        return ywlxdm;
    }

    public void setYwlxdm(String ywlxdm) {
        this.ywlxdm = ywlxdm;
    }

    public String getYwlxmc() {
        return ywlxmc;
    }

    public void setYwlxmc(String ywlxmc) {
        this.ywlxmc = ywlxmc;
    }

    public String getTplj() {
        return tplj;
    }

    public void setTplj(String tplj) {
        this.tplj = tplj;
    }
    
    public String getGsmc() {
        return gsmc;
    }

    public void setGsmc(String gsmc) {
        this.gsmc = gsmc;
    }

    @Override  
    public Object clone() throws CloneNotSupportedException  
    {  
        return super.clone();  
    }  
}
