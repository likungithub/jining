package com.xinhai.usermanager.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Table;

/**
 * 用户信息
 * @author 李茂飞修改
 */
@Table(name = "user")
public class User implements Serializable {

    
    /**
     * 
     */
    private static final long serialVersionUID = -1215822894017647517L;

    /**
     * 用户主键
     */
    private String id;
    
    /**
     * 用户登陆账号
     */
    private String userAccount;
    
    /**
     * 用户登录密码
     */
    private String password;
    
    /**
     * 用户名称
     */
    private String name;
    
    /**
     * 是否启用
     */
    private boolean enabled;
    
    /**
     * 是否为管理员
     */
    private boolean ifManager;
    
    /**
     * 手机
     */
    private String tel;
    
    /**
     * 员工头像
     */
    private String ygtx;
    
    /**
     * 邮箱
     */
    private String email;
    
    /**
     * 所属客户
     */
    private String customerId;
    
    /**
     * 所属组织结构
     */
    private String orgId;

    /**
     * 员工学历
     */
    private String ygxl;

    /**
     * 身份证号码
     */
    private String sfzhm;

    /**
     * 从业资质
     */
    private String cyzz;

    /**
     * 从业日期
     */
    private Date cyrq;

    /**
     * 部门代码
     */
    private String bmdm;
    
    /**
     * 部门名称
     */
    private String bmmc;
    
    /**
     * user表部门代码权限
     */
    private String bmqxdm;
    
    /**
     * 部门权限表部门编码
     */
    private String savebmqxdm;
    
    /**
     * 
     * 所属组织结构名称
     */
    private String orgName;

    /**
     * 上次登陆时间
     */
    private Date lastLoginDate;
    
    /**
     * 创建时间
     */
    private Date createDate;
    
    /**
     * 审核时间
     */
    private Date shDate;
    
    /**
     * 备注
     */
    private String remark;

    /**
     * 未知
     */
    private boolean isSync;
    
    /**
     * 员工id
     */
    private Long ygid;
    
    /**
     * 是否删除
     */
    private boolean isDelete;
    
    /**
     * 职员代码（会计代码）| 编码规则如下KJ1000000001，数字10位，每次加1
     */
    private String zydm;
    
    /**
     * 员工性别（0男；1女）
     */
    private Integer xbdm;
    
    /**
     * 出生日期
     */
    private Date csrq;
    
    /**
     * 移动电话（需要加密）
     */
    private String yddh;
    
    /**
     * QQ
     */
    private String qq;
    
    /**
     * 备注
     */
    private String bzxx;
    
    /**
     * 联系地址（需要加密）
     */
    private String lxdz;
    
    /**
     * 角色代码（用于标记员工所属的角色 | 角色代码存储以逗号（，）分割）
     */
    private String jsdm;
    
    /**
     * 角色名称
     */
    private String jsname;
    
    /**
     * 纳税人识别号（备用）
     */
    private String nsrsbh;
    
    /**
     * 代理机构编码 （用于标记职员所属代理记账公司 | 编码规则如下DL1000000001，数字10位，每次加1）
     */
    private String dljgBm;
    
    /**
     * 录入人员（员工编码）
     */
    private String lrry;
    
    /**
     * 更新人员（员工编码）
     */
    private String gxry;
    
    /**
     * 删除人员（员工编码）
     */
    private String scry;
    
    /**
     * 更新日期
     */
    private Date gxrq;
    /**
     * 用户是否首次登录标志
     */
    private char is_first;
    /**
     * 删除日期
     */
    private Date scrq;
    
    /**
     * 服务开始日期
     */
    private Date fwksrq;
    
    /**
     * 服务结束日期
     */
    private Date fwjsrq;
    
    /**
     * 审核意见
     */
    private String shyj;
    
    /**
     * 缴费时间
     */
    private Date jfsj;
    
    /**
     * 缴费状态
     */
    private boolean jfzt;
    
    /**
     * 角色是否改变
     */
    private String ifChangeJsdm;
    
    /**
     * 员工姓名是否改变
     */
    private String ifChangName;

    public String getJsname() {
        return jsname;
    }

    public void setJsname(String jsname) {
        this.jsname = jsname;
    }

    public String getIfChangeJsdm() {
        return ifChangeJsdm;
    }

    public void setIfChangeJsdm(String ifChangeJsdm) {
        this.ifChangeJsdm = ifChangeJsdm;
    }

    public String getIfChangName() {
        return ifChangName;
    }

    public void setIfChangName(String ifChangName) {
        this.ifChangName = ifChangName;
    }

    public String getSavebmqxdm() {
        return savebmqxdm;
    }

    public void setSavebmqxdm(String savebmqxdm) {
        this.savebmqxdm = savebmqxdm;
    }

    public String getBmqxdm() {
        return bmqxdm;
    }

    public void setBmqxdm(String bmqxdm) {
        this.bmqxdm = bmqxdm;
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Date getJfsj() {
        return jfsj;
    }

    public void setJfsj(Date jfsj) {
        this.jfsj = jfsj;
    }

    public boolean isJfzt() {
        return jfzt;
    }

    public void setJfzt(boolean jfzt) {
        this.jfzt = jfzt;
    }

    public String getShyj() {
        return shyj;
    }

    public void setShyj(String shyj) {
        this.shyj = shyj;
    }

    public Date getFwksrq() {
        return fwksrq;
    }

    public void setFwksrq(Date fwksrq) {
        this.fwksrq = fwksrq;
    }

    public Date getFwjsrq() {
        return fwjsrq;
    }

    public void setFwjsrq(Date fwjsrq) {
        this.fwjsrq = fwjsrq;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public boolean isIfManager() {
        return ifManager;
    }

    public void setIfManager(boolean ifManager) {
        this.ifManager = ifManager;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getYgtx() {
        return ygtx;
    }

    public void setYgtx(String ygtx) {
        this.ygtx = ygtx;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getYgxl() {
        return ygxl;
    }

    public void setYgxl(String ygxl) {
        this.ygxl = ygxl;
    }

    public String getSfzhm() {
        return sfzhm;
    }

    public void setSfzhm(String sfzhm) {
        this.sfzhm = sfzhm;
    }

    public String getCyzz() {
        return cyzz;
    }

    public void setCyzz(String cyzz) {
        this.cyzz = cyzz;
    }

    public Date getCyrq() {
        return cyrq;
    }

    public void setCyrq(Date cyrq) {
        this.cyrq = cyrq;
    }

    public String getBmdm() {
        return bmdm;
    }

    public void setBmdm(String bmdm) {
        this.bmdm = bmdm;
    }
    
    
    public String getBmmc() {
        return bmmc;
    }

    public void setBmmc(String bmmc) {
        this.bmmc = bmmc;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public Date getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(Date lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Date getShDate() {
        return shDate;
    }

    public void setShDate(Date shDate) {
        this.shDate = shDate;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public boolean isSync() {
        return isSync;
    }

    public void setSync(boolean sync) {
        isSync = sync;
    }

    public Long getYgid() {
        return ygid;
    }

    public void setYgid(Long ygid) {
        this.ygid = ygid;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public String getZydm() {
        return zydm;
    }

    public void setZydm(String zydm) {
        this.zydm = zydm;
    }

    public Integer getXbdm() {
        return xbdm;
    }

    public void setXbdm(Integer xbdm) {
        this.xbdm = xbdm;
    }

    public Date getCsrq() {
        return csrq;
    }

    public void setCsrq(Date csrq) {
        this.csrq = csrq;
    }

    public String getYddh() {
        return yddh;
    }

    public void setYddh(String yddh) {
        this.yddh = yddh;
    }

    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public String getLxdz() {
        return lxdz;
    }

    public void setLxdz(String lxdz) {
        this.lxdz = lxdz;
    }

    public String getJsdm() {
        return jsdm;
    }

    public void setJsdm(String jsdm) {
        this.jsdm = jsdm;
    }

    public String getNsrsbh() {
        return nsrsbh;
    }

    public void setNsrsbh(String nsrsbh) {
        this.nsrsbh = nsrsbh;
    }

    public String getDljgBm() {
        return dljgBm;
    }

    public void setDljgBm(String dljgBm) {
        this.dljgBm = dljgBm;
    }

    public String getLrry() {
        return lrry;
    }

    public void setLrry(String lrry) {
        this.lrry = lrry;
    }

    public String getGxry() {
        return gxry;
    }

    public void setGxry(String gxry) {
        this.gxry = gxry;
    }

    public String getScry() {
        return scry;
    }

    public void setScry(String scry) {
        this.scry = scry;
    }

    public Date getGxrq() {
        return gxrq;
    }

    public void setGxrq(Date gxrq) {
        this.gxrq = gxrq;
    }

    public char getIs_first() {
        return is_first;
    }

    public void setIs_first(char is_first) {
        this.is_first = is_first;
    }

    public Date getScrq() {
        return scrq;
    }

    public void setScrq(Date scrq) {
        this.scrq = scrq;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", userAccount='" + userAccount + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", enabled=" + enabled +
                ", ifManager=" + ifManager +
                ", tel='" + tel + '\'' +
                ", ygtx='" + ygtx + '\'' +
                ", email='" + email + '\'' +
                ", customerId='" + customerId + '\'' +
                ", orgId='" + orgId + '\'' +
                ", ygxl='" + ygxl + '\'' +
                ", sfzhm='" + sfzhm + '\'' +
                ", cyzz='" + cyzz + '\'' +
                ", cyrq=" + cyrq +
                ", bmdm='" + bmdm + '\'' +
                ", orgName='" + orgName + '\'' +
                ", lastLoginDate=" + lastLoginDate +
                ", createDate=" + createDate +
                ", shDate=" + shDate +
                ", remark='" + remark + '\'' +
                ", isSync=" + isSync +
                ", ygid=" + ygid +
                ", isDelete=" + isDelete +
                ", zydm='" + zydm + '\'' +
                ", xbdm=" + xbdm +
                ", csrq=" + csrq +
                ", yddh='" + yddh + '\'' +
                ", qq='" + qq + '\'' +
                ", bzxx='" + bzxx + '\'' +
                ", lxdz='" + lxdz + '\'' +
                ", jsdm='" + jsdm + '\'' +
                ", nsrsbh='" + nsrsbh + '\'' +
                ", dljgBm='" + dljgBm + '\'' +
                ", lrry='" + lrry + '\'' +
                ", gxry='" + gxry + '\'' +
                ", scry='" + scry + '\'' +
                ", gxrq=" + gxrq +
                ", is_first=" + is_first +
                ", scrq=" + scrq +
                '}';
    }
}
