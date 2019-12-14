package com.xinhai.caiyun.customermanage.api;

import java.math.BigDecimal;
import java.util.Date;

/**
 * app客户信息实体类
 * @author pusilin
 *
 */
public class Appcustomerinfo {

	/**
	 * 客户渠道类型
	 */
	private String khqdlx;

	/**
	 * 意向客户id
	 */
	private String yxkhId;
	private String khjldm;
	private String khjlmc;
	/**
	 * 报价金额
	 */
	private BigDecimal bjje;


	public String getKhjldm() {
		return khjldm;
	}

	public void setKhjldm(String khjldm) {
		this.khjldm = khjldm;
	}

	public String getKhjlmc() {
		return khjlmc;
	}

	public void setKhjlmc(String khjlmc) {
		this.khjlmc = khjlmc;
	}

	private String yxkhbm;

	public String getYxkhbm() {
		return yxkhbm;
	}

	public void setYxkhbm(String yxkhbm) {
		this.yxkhbm = yxkhbm;
	}

	private String sjzclx;

	private String wbtjrmc;

	public String getWbtjrmc() {
		return wbtjrmc;
	}

	public void setWbtjrmc(String wbtjrmc) {
		this.wbtjrmc = wbtjrmc;
	}

	public String getSjzclx() {
		return sjzclx;
	}

	public void setSjzclx(String sjzclx) {
		this.sjzclx = sjzclx;
	}

	private String lrry;
	private Date lrrq;
	private String gxry;
	private Date gxrq;
	private String scry;
	private Date scrq;

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

	public String getGxry() {
		return gxry;
	}

	public void setGxry(String gxry) {
		this.gxry = gxry;
	}

	public Date getGxrq() {
		return gxrq;
	}

	public void setGxrq(Date gxrq) {
		this.gxrq = gxrq;
	}

	public String getScry() {
		return scry;
	}

	public void setScry(String scry) {
		this.scry = scry;
	}

	public Date getScrq() {
		return scrq;
	}

	public void setScrq(Date scrq) {
		this.scrq = scrq;
	}

	private String tjrdmm;

	public String getTjrdmm() {
		return tjrdmm;
	}

	public void setTjrdmm(String tjrdmm) {
		this.tjrdmm = tjrdmm;
	}

	private  String sjzt;

	public String getSjzt() {
		return sjzt;
	}

	public void setSjzt(String sjzt) {
		this.sjzt = sjzt;
	}

	/**
	 * ID
	 */
	private String id;
	
	/**
	 * 客户编码
	 */
	private String khbm;
	
	/**
	 * 登陆账号
	 */
	private String dlzh;
	
	/**
	 * 登陆密码
	 */
	private String dlmm;
	
	/**
	 * 用户名称
	 */
	private String yhmc;
	
	/**
	 * 公司名称
	 */
	private String gsmc;
	
	/**
	 * 纳税人识别号(税务登记号)
	 */
	private String nsrsbh;
	
	/**
	 * 法人代表
	 */
	private String frdb;
	
	/**
	 * 身份证号码
	 */
	private String sfzhm;
	
	/**
	 * 个人头像
	 */
	private String grtx;
	
	/**
	 * 联系人名称
	 */
	private String lxrmc;
	
	/**
	 * 办公电话
	 */
	private String bgdh;
	
	/**
	 * 手机号码
	 */
	private String sjhm;
	
	/**
	 * 传真号码
	 */
	private String czhm;
	
	/**
	 * 营业执照
	 */
	private String yyzz;
	
	/**
	 * QQ号
	 */
	private String qq;
	
	/**
	 * 邮箱
	 */
	private String email;
	
	/**
	 * 详细地址
	 */
	private String xxdz;
	
	/**
	 * 所在行业
	 */
	private String hydm;
	
	/**
	 * 行业名称
	 */
	private String hymc;
	
	/**
	 * 省份代码
	 */
	private int sfdm;
	
	/**
	 * 省份名称
	 */
	private String sfmc;
	
	/**
	 * 
	 */
	private int scbz;
	
	/**
	 * 推荐人代码
	 */
	private String tjrdm;

	/**
	 * 注册日期
	 */
	private String zcrq;


	/**
	 * 客户状态
	 */
	private String khzt;


	private String tjrdljg;
	
	private String bzxx;

	public String getTjrdljg() {
		return tjrdljg;
	}

	public void setTjrdljg(String tjrdljg) {
		this.tjrdljg = tjrdljg;
	}

	public String getKhzt() {
		return khzt;
	}

	public void setKhzt(String khzt) {
		this.khzt = khzt;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getKhbm() {
		return khbm;
	}

	public void setKhbm(String khbm) {
		this.khbm = khbm;
	}

	public String getDlzh() {
		return dlzh;
	}

	public void setDlzh(String dlzh) {
		this.dlzh = dlzh;
	}

	public String getDlmm() {
		return dlmm;
	}

	public void setDlmm(String dlmm) {
		this.dlmm = dlmm;
	}

	public String getYhmc() {
		return yhmc;
	}

	public void setYhmc(String yhmc) {
		this.yhmc = yhmc;
	}

	public String getGsmc() {
		return gsmc;
	}

	public void setGsmc(String gsmc) {
		this.gsmc = gsmc;
	}

	public String getNsrsbh() {
		return nsrsbh;
	}

	public void setNsrsbh(String nsrsbh) {
		this.nsrsbh = nsrsbh;
	}

	public String getFrdb() {
		return frdb;
	}

	public void setFrdb(String frdb) {
		this.frdb = frdb;
	}

	public String getSfzhm() {
		return sfzhm;
	}

	public void setSfzhm(String sfzhm) {
		this.sfzhm = sfzhm;
	}

	public String getGrtx() {
		return grtx;
	}

	public void setGrtx(String grtx) {
		this.grtx = grtx;
	}

	public String getLxrmc() {
		return lxrmc;
	}

	public void setLxrmc(String lxrmc) {
		this.lxrmc = lxrmc;
	}

	public String getBgdh() {
		return bgdh;
	}

	public void setBgdh(String bgdh) {
		this.bgdh = bgdh;
	}

	public String getSjhm() {
		return sjhm;
	}

	public void setSjhm(String sjhm) {
		this.sjhm = sjhm;
	}

	public String getCzhm() {
		return czhm;
	}

	public void setCzhm(String czhm) {
		this.czhm = czhm;
	}

	public String getYyzz() {
		return yyzz;
	}

	public void setYyzz(String yyzz) {
		this.yyzz = yyzz;
	}

	public String getQq() {
		return qq;
	}

	public void setQq(String qq) {
		this.qq = qq;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getXxdz() {
		return xxdz;
	}

	public void setXxdz(String xxdz) {
		this.xxdz = xxdz;
	}

	public String getHydm() {
		return hydm;
	}

	public void setHydm(String hydm) {
		this.hydm = hydm;
	}

	public String getHymc() {
		return hymc;
	}

	public void setHymc(String hymc) {
		this.hymc = hymc;
	}

	public int getSfdm() {
		return sfdm;
	}

	public void setSfdm(int sfdm) {
		this.sfdm = sfdm;
	}

	public String getSfmc() {
		return sfmc;
	}

	public void setSfmc(String sfmc) {
		this.sfmc = sfmc;
	}

	public int getScbz() {
		return scbz;
	}

	public void setScbz(int scbz) {
		this.scbz = scbz;
	}

	public String getTjrdm() {
		return tjrdm;
	}

	public void setTjrdm(String tjrdm) {
		this.tjrdm = tjrdm;
	}

	public String getZcrq() {
		return zcrq;
	}

	public void setZcrq(String zcrq) {
		this.zcrq = zcrq;
	}

    public String getBzxx() {
        return bzxx;
    }

    public void setBzxx(String bzxx) {
        this.bzxx = bzxx;
    }

	public String getYxkhId() {
		return yxkhId;
	}

	public void setYxkhId(String yxkhId) {
		this.yxkhId = yxkhId;
	}

	public BigDecimal getBjje() {
		return bjje;
	}

	public void setBjje(BigDecimal bjje) {
		this.bjje = bjje;
	}

	public String getKhqdlx() {
		return khqdlx;
	}

	public void setKhqdlx(String khqdlx) {
		this.khqdlx = khqdlx;
	}
}
