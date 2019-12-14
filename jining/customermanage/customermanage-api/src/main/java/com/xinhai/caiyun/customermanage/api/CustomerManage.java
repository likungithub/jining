package com.xinhai.caiyun.customermanage.api;

import java.io.Serializable;

import javax.persistence.Id;
import javax.persistence.Table;

import com.xinhai.caiyun.commonmanager.api.ExcelVOAttribute;

import java.util.Date;

/**
 * 
 * 代理记账公司的客户管理信息
 * @author 李茂飞
 * 
 */
@Table(name = "customerManage")
public class CustomerManage implements Serializable {
	
    private static final long serialVersionUID = 1L;


    private String szsfmc ;//省份名称
    private String szcsmc;//城市名称
    private String is_qfz;//是否开启骑缝章 Y是否 N否

    public String getIs_qfz() {
        return is_qfz;
    }

    public void setIs_qfz(String is_qfz) {
        this.is_qfz = is_qfz;
    }

    public String getSzsfmc() {
        return szsfmc;
    }

    public void setSzsfmc(String szsfmc) {
        this.szsfmc = szsfmc;
    }

    public String getSzcsmc() {
        return szcsmc;
    }

    public void setSzcsmc(String szcsmc) {
        this.szcsmc = szcsmc;
    }

    /**
     * 用户id 主键
     */
    @Id
    private Long yhid;
    
    /**
     * UUID
     */
    private String id;
    
    /**
     * 账户
     */
    @ExcelVOAttribute(name = "登录账号", column = "A")
    private String yhzh;
    
    /**
     * 密码
     */
    @ExcelVOAttribute(name = "密码", column = "B")
    private String yhmm;
    
    /**
     * 代理机构编码(编码规则如下DL1000000001，数字10位，每次加1)
     */
    private String code;
    
    /**
     * 企业类型（01单企业、02代理公司、03个人）
     */
    private String qylx_dm;
    
    /**
     * 手机号码（加密）
     */
    @ExcelVOAttribute(name = "手机号码", column = "C")
    private String sjhm;
    
    /**
     * 代理记账公司名称（加密）
     */
    @ExcelVOAttribute(name = "公司名称", column = "D")
    private String name;
    
    /**
     * 代理记账公司税号（用于串联云平台各个系统的唯一标识。）
     */
    @ExcelVOAttribute(name = "公司税号", column = "E")
    private String nsrsbh;
    
    /**
     * 职员代码（员工编号）
     */
    private String zydm;
    
    /**
     * 所在省份
     */
    private String szsf;
    
    /**
     * 所在城市
     */
    private String szcs;
    
    /**
     * 电子邮箱（加密）
     */
    private String email;
    
    /**
     * 备注信息
     */
    private String bzxx;
    
    /**
     * 用户状态（001正常，002注销，003欠费，004坏账）
     */
    private String yhzt_dm;
    
    /**
     * 企业logo（存储企业上传LOGO的路径）
     */
    private String logo;

    /**
     * 营业执照
     */
    private String yyzz;
    
    /**
     * 营业执照数目
     */
    private Integer yyzzNum;

    /**
     * 公司简介
     */
    private String gsjj;

    /**
     * 企业资质
     */
    private String qyzz;

    /**
     * 企业资质数目
     */
    private Integer qyzzNum;
    
    /**
     * 企业业绩
     */
    private String qyyj;

    /**
     * 企业业绩数目
     */
    private Integer qyyjNum;
    
    /**
     * 状态,是否启用
     */
    private Integer state;
    
    /**
     * 0未删除；1删除（员工离职时将该字段设为1）
     */
    private Integer scbz;
    
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
     * 注册日期
     */
    private Date create_date;
    
    /**
     * 审核日期
     */
    private Date sh_date;
    
    /**
     * 更新日期
     */
    private Date gxrq;
    
    /**
     * 删除日期
     */
    private Date scrq;

    /**
     * 省
     */
    private String province;

    /**
     * 市
     */
    private String city;
    
    /**
     * 详细地址
     */
    private String xxdz;
    
    /**
     * 是否启用
     */
    private boolean is_enabled;
    
    private String customerId;
    
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
     * 终审状态
     */
    private String zszt;
    
    /**
     * 终审时间
     */
    private Date zssj;
    
    /**
     * 终审人员代码
     */
    private String zsry_dm;
    
    /**
     * 终审人员名称
     */
    private String zsry_mc;
    
    /**
     * 终审备注
     */
    private String zsry_bz;
    
    /**
     * 是否名称修改
     */
    private String ifChangName;
 
    public String getIfChangName() {
        return ifChangName;
    }

    public void setIfChangName(String ifChangName) {
        this.ifChangName = ifChangName;
    }

    public Date getZssj() {
        return zssj;
    }

    public void setZssj(Date zssj) {
        this.zssj = zssj;
    }

    public String getZsry_dm() {
        return zsry_dm;
    }

    public void setZsry_dm(String zsry_dm) {
        this.zsry_dm = zsry_dm;
    }

    public String getZsry_mc() {
        return zsry_mc;
    }

    public void setZsry_mc(String zsry_mc) {
        this.zsry_mc = zsry_mc;
    }

    public String getZsry_bz() {
        return zsry_bz;
    }

    public void setZsry_bz(String zsry_bz) {
        this.zsry_bz = zsry_bz;
    }

    public String getZszt() {
        return zszt;
    }

    public void setZszt(String zszt) {
        this.zszt = zszt;
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

    public static long getSerialVersionUID() {
        return serialVersionUID;
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

    public String getShyj() {
        return shyj;
    }

    public void setShyj(String shyj) {
        this.shyj = shyj;
    }

    public String getYhzh() {
        return yhzh;
    }

    public void setYhzh(String yhzh) {
        this.yhzh = yhzh;
    }

    public String getYhmm() {
        return yhmm;
    }

    public void setYhmm(String yhmm) {
        this.yhmm = yhmm;
    }

    public Integer getYyzzNum() {
        return yyzzNum;
    }

    public void setYyzzNum(Integer yyzzNum) {
        this.yyzzNum = yyzzNum;
    }

    public Integer getQyzzNum() {
        return qyzzNum;
    }

    public void setQyzzNum(Integer qyzzNum) {
        this.qyzzNum = qyzzNum;
    }

    public Integer getQyyjNum() {
        return qyyjNum;
    }

    public void setQyyjNum(Integer qyyjNum) {
        this.qyyjNum = qyyjNum;
    }

    public Date getSh_date() {
        return sh_date;
    }

    public void setSh_date(Date sh_date) {
        this.sh_date = sh_date;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getXxdz() {
        return xxdz;
    }

    public void setXxdz(String xxdz) {
        this.xxdz = xxdz;
    }

    public boolean isIs_enabled() {
        return is_enabled;
    }

    public void setIs_enabled(boolean is_enabled) {
        this.is_enabled = is_enabled;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public Long getYhid() {
        return yhid;
    }

    public void setYhid(Long yhid) {
        this.yhid = yhid;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getQylx_dm() {
        return qylx_dm;
    }

    public void setQylx_dm(String qylx_dm) {
        this.qylx_dm = qylx_dm;
    }

    public String getSjhm() {
        return sjhm;
    }

    public void setSjhm(String sjhm) {
        this.sjhm = sjhm;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNsrsbh() {
        return nsrsbh;
    }

    public void setNsrsbh(String nsrsbh) {
        this.nsrsbh = nsrsbh;
    }

    public String getZydm() {
        return zydm;
    }

    public void setZydm(String zydm) {
        this.zydm = zydm;
    }

    public String getSzsf() {
        return szsf;
    }

    public void setSzsf(String szsf) {
        this.szsf = szsf;
    }

    public String getSzcs() {
        return szcs;
    }

    public void setSzcs(String szcs) {
        this.szcs = szcs;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

    public String getYhzt_dm() {
        return yhzt_dm;
    }

    public void setYhzt_dm(String yhzt_dm) {
        this.yhzt_dm = yhzt_dm;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getYyzz() {
        return yyzz;
    }

    public void setYyzz(String yyzz) {
        this.yyzz = yyzz;
    }

    public String getGsjj() {
        return gsjj;
    }

    public void setGsjj(String gsjj) {
        this.gsjj = gsjj;
    }

    public String getQyzz() {
        return qyzz;
    }

    public void setQyzz(String qyzz) {
        this.qyzz = qyzz;
    }

    public String getQyyj() {
        return qyyj;
    }

    public void setQyyj(String qyyj) {
        this.qyyj = qyyj;
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public Integer getScbz() {
        return scbz;
    }

    public void setScbz(Integer scbz) {
        this.scbz = scbz;
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

    public Date getCreate_date() {
        return create_date;
    }

    public void setCreate_date(Date create_date) {
        this.create_date = create_date;
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

    @Override
    public String toString() {
        return "CustomerManage{" +
                "yhid=" + yhid +
                ", id='" + id + '\'' +
                ", code='" + code + '\'' +
                ", qylx_dm='" + qylx_dm + '\'' +
                ", sjhm='" + sjhm + '\'' +
                ", name='" + name + '\'' +
                ", nsrsbh='" + nsrsbh + '\'' +
                ", zydm=" + zydm +
                ", szsf='" + szsf + '\'' +
                ", szcs='" + szcs + '\'' +
                ", email='" + email + '\'' +
                ", bzxx='" + bzxx + '\'' +
                ", yhzt_dm='" + yhzt_dm + '\'' +
                ", logo='" + logo + '\'' +
                ", yyzz='" + yyzz + '\'' +
                ", gsjj='" + gsjj + '\'' +
                ", qyzz='" + qyzz + '\'' +
                ", qyyj='" + qyyj + '\'' +
                ", state=" + state +
                ", scbz=" + scbz +
                ", lrry='" + lrry + '\'' +
                ", gxry='" + gxry + '\'' +
                ", scry='" + scry + '\'' +
                ", create_date=" + create_date +
                ", gxrq=" + gxrq +
                ", scrq=" + scrq +
                '}';
    }
}