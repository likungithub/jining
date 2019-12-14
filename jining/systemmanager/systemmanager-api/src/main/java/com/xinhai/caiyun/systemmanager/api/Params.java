package com.xinhai.caiyun.systemmanager.api;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * 基础参数代码
 * @author tangck
 * 
 */

public class Params implements Serializable{
    
    /**
     * 编号
     */
    private String id;
    
	/**
	 * 参数类型
	 */
    private String type;
    
	/**
	 * 类型名称
	 */
    private String typename;
    
	/**
	 * 参数代码
	 */
    private String typecode;
	
	/**
	 * 参数名称
	 */
    private String paramsname;
    
    /**
     * 代理机构编码
     */
    private String institutionid;
    
    /**
     * 末级菜单
     */
    private String lastmenu;
    
    /**
     * 有效标志
     */
    private int onuse;
    
    /**
     * 删除标志
     */
    private int deleteflag;
    
    /**
     * 录入人员
     */
    private String insertperson;
    
    /**
     * 更新人员
     */
    private String updateperson;
    
    /**
     * 删除人员
     */
    private String deleteperson;
    
    /**
     * 录入时间
     */
    private Date inserttime;
    
    /**
     * 更新时间
     */
    private Date updatetime;
    
    /**
     * 删除时间
     */
    private Date deletetime;

    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTypename() {
        return typename;
    }

    public void setTypename(String typename) {
        this.typename = typename;
    }

    public String getTypecode() {
        return typecode;
    }

    public void setTypecode(String typecode) {
        this.typecode = typecode;
    }

    public String getParamsname() {
        return paramsname;
    }

    public void setParamsname(String paramsname) {
        this.paramsname = paramsname;
    }

    public String getInstitutionid() {
        return institutionid;
    }

    public void setInstitutionid(String institutionid) {
        this.institutionid = institutionid;
    }

    public String getLastmenu() {
        return lastmenu;
    }

    public void setLastmenu(String lastmenu) {
        this.lastmenu = lastmenu;
    }

    public int getOnuse() {
        return onuse;
    }

    public void setOnuse(int onuse) {
        this.onuse = onuse;
    }

    public int getDeleteflag() {
        return deleteflag;
    }

    public void setDeleteflag(int deleteflag) {
        this.deleteflag = deleteflag;
    }

    public String getInsertperson() {
        return insertperson;
    }

    public void setInsertperson(String insertperson) {
        this.insertperson = insertperson;
    }

    public String getUpdateperson() {
        return updateperson;
    }

    public void setUpdateperson(String updateperson) {
        this.updateperson = updateperson;
    }

    public String getDeleteperson() {
        return deleteperson;
    }

    public void setDeleteperson(String deleteperson) {
        this.deleteperson = deleteperson;
    }

    public Date getInserttime() {
        return inserttime;
    }

    public void setInserttime(Date inserttime) {
        this.inserttime = inserttime;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }

    public Date getDeletetime() {
        return deletetime;
    }

    public void setDeletetime(Date deletetime) {
        this.deletetime = deletetime;
    }
    
    
}