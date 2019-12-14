package com.xinhai.rolemanager.entity;

import javax.persistence.Id;
import java.util.Date;

/**
 * 代理菜单的实体类
 * Created by Administrator on 2018/3/21 0021.
 */
public class PtRole {

    @Id
    private long id;

    /**
     * uuid
     */
    private String uuid;

    /**
     * 菜单名称
     */
    private String name;

    /**
     * 菜单代码
     */
    private String dm;

    /**
     * 分类代码
     */
    private String fldm;

    /**
     * 上级代码
     */
    private String sjdm;

    /**
     * 删除标志
     */
    private boolean scbz;

    /**
     * 录入人员
     */
    private String lrry;

    /**
     * 删除人员
     */
    private String scry;

    /**
     * 更新人员
     */
    private String gxry;

    /**
     * 录入日期
     */
    private Date lrrq;

    /**
     * 更新日期
     */
    private Date gxrq;

    /**
     * 删除日期
     */
    private Date scrq;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDm() {
        return dm;
    }

    public void setDm(String dm) {
        this.dm = dm;
    }

    public String getFldm() {
        return fldm;
    }

    public void setFldm(String fldm) {
        this.fldm = fldm;
    }

    public String getSjdm() {
        return sjdm;
    }

    public void setSjdm(String sjdm) {
        this.sjdm = sjdm;
    }

    public boolean isScbz() {
        return scbz;
    }

    public void setScbz(boolean scbz) {
        this.scbz = scbz;
    }

    public String getLrry() {
        return lrry;
    }

    public void setLrry(String lrry) {
        this.lrry = lrry;
    }

    public String getScry() {
        return scry;
    }

    public void setScry(String scry) {
        this.scry = scry;
    }

    public String getGxry() {
        return gxry;
    }

    public void setGxry(String gxry) {
        this.gxry = gxry;
    }

    public Date getLrrq() {
        return lrrq;
    }

    public void setLrrq(Date lrrq) {
        this.lrrq = lrrq;
    }

    public Date getGxrq() {
        return gxrq;
    }

    public void setGxrq(Date gxrq) {
        this.gxrq = gxrq;
    }

    public Date getScrq() {
        return scrq;
    }

    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }
}
