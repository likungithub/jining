package com.xinhai.caiyun.customermanage.api;

import com.xinhai.security.api.SecurityResourceTag;

import javax.persistence.Id;
import java.util.Date;

/**
 * Created by  on 2018/3/28 0028.
 *
 * @escription: 主管会计，客户经理修改记录
 * @tableName: pt_xgjl
 */
public class PtXgjl {

    @Id
    private long id;

    /**
     * 客户编码
     */
    private String khbm;

    /**
     * 客户名称
     */
    private String khmc;

    /**
     * 代理机构编码
     */
    private String dljg_bm;

    /**
     * 变更前主管会计
     */
    private String zydm_bef;

    /**
     * 变更后主管会计
     */
    private String zydm_cha;

    /**
     * 变更前主管会计姓名
     */
    private String zymc_bef;

    /**
     * 变更后主管会计姓名
     */
    private String zymc_cha;

    /**
     * 变更前客户经理
     */
    private String jldm_bef;

    /**
     * 变更后客户经理
     */
    private String jldm_cha;

    /**
     * 变更后客户经理姓名
     */
    private String jlmc_bef;

    /**
     * 变更后客户经理姓名
     */
    private String jlmc_cha;

    private String lrry;

    private String lrmc;

    private Date lrrq;

    public String getKhmc() {
        return khmc;
    }

    public void setKhmc(String khmc) {
        this.khmc = khmc;
    }

    public String getLrmc() {
        return lrmc;
    }

    public void setLrmc(String lrmc) {
        this.lrmc = lrmc;
    }

    public String getDljg_bm() {
        return dljg_bm;
    }

    public void setDljg_bm(String dljg_bm) {
        this.dljg_bm = dljg_bm;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getKhbm() {
        return khbm;
    }

    public void setKhbm(String khbm) {
        this.khbm = khbm;
    }

    public String getZydm_bef() {
        return zydm_bef;
    }

    public void setZydm_bef(String zydm_bef) {
        this.zydm_bef = zydm_bef;
    }

    public String getZydm_cha() {
        return zydm_cha;
    }

    public void setZydm_cha(String zydm_cha) {
        this.zydm_cha = zydm_cha;
    }

    public String getZymc_bef() {
        return zymc_bef;
    }

    public void setZymc_bef(String zymc_bef) {
        this.zymc_bef = zymc_bef;
    }

    public String getZymc_cha() {
        return zymc_cha;
    }

    public void setZymc_cha(String zymc_cha) {
        this.zymc_cha = zymc_cha;
    }

    public String getJldm_bef() {
        return jldm_bef;
    }

    public void setJldm_bef(String jldm_bef) {
        this.jldm_bef = jldm_bef;
    }

    public String getJldm_cha() {
        return jldm_cha;
    }

    public void setJldm_cha(String jldm_cha) {
        this.jldm_cha = jldm_cha;
    }

    public String getJlmc_bef() {
        return jlmc_bef;
    }

    public void setJlmc_bef(String jlmc_bef) {
        this.jlmc_bef = jlmc_bef;
    }

    public String getJlmc_cha() {
        return jlmc_cha;
    }

    public void setJlmc_cha(String jlmc_cha) {
        this.jlmc_cha = jlmc_cha;
    }

    public String getLrry() {
        return lrry;
    }

    public void setLrry(String lrry) {
        this.lrry = lrry;
    }

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }
}
