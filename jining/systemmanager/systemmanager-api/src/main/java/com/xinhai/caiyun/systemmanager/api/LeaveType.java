package com.xinhai.caiyun.systemmanager.api;

import java.math.BigInteger;
import java.util.Date;

/**
 * Created by wangshuo on 2018/3/26 0026.
 */

public class LeaveType {
    /**
     * id
     */
    private BigInteger id;
    /**
     * 代理机构编码
     */
    private String agencyCode;
    /**
     * 请假类型编码
     */
    private String leaveCode;
    /**
     * 请假类型名称
     */
    private String leaveName;
    /**
     * 是否带薪休假
     */
    private String ifVacation;

    /**
     * 备注信息
     */
    private String remarkInfo;
    /**
     * 删除标志
     */
    private String deleteFlag;
    /**
     * 录入人员
     */
    private String inputPeople;
    /**
     *修改人员
     */
    private String updatePeople;
    /**
     *  删除人员
     */
    private String deletePeople;
    /**
     * 录入时间
     */
    private Date inputTime;
    /**
     * 修改日期
     */
    private Date updateTime;
    /**
     * 删除日期
     */
    private Date deleteTime;
    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public String getAgencyCode() {
        return agencyCode;
    }

    public void setAgencyCode(String agencyCode) {
        this.agencyCode = agencyCode;
    }

    public String getLeaveCode() {
        return leaveCode;
    }

    public void setLeaveCode(String leaveCode) {
        this.leaveCode = leaveCode;
    }

    public String getLeaveName() {
        return leaveName;
    }

    public void setLeaveName(String leaveName) {
        this.leaveName = leaveName;
    }

    public String getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(String deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public String getInputPeople() {
        return inputPeople;
    }

    public void setInputPeople(String inputPeople) {
        this.inputPeople = inputPeople;
    }

    public String getUpdatePeople() {
        return updatePeople;
    }

    public void setUpdatePeople(String updatePeople) {
        this.updatePeople = updatePeople;
    }

    public String getDeletePeople() {
        return deletePeople;
    }

    public void setDeletePeople(String deletePeople) {
        this.deletePeople = deletePeople;
    }

    public Date getInputTime() {
        return inputTime;
    }

    public void setInputTime(Date inputTime) {
        this.inputTime = inputTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public Date getDeleteTime() {
        return deleteTime;
    }

    public void setDeleteTime(Date deleteTime) {
        this.deleteTime = deleteTime;
    }
    public String getRemarkInfo() {
        return remarkInfo;
    }

    public void setRemarkInfo(String remarkInfo) {
        this.remarkInfo = remarkInfo;
    }
    public String getIfVacation() {
        return ifVacation;
    }

    public void setIfVacation(String ifVacation) {
        this.ifVacation = ifVacation;
    }


}
