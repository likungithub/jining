package com.xinhai.caiyun.statisticalanalysis.api;

import java.util.Date;

/**
 * 催费统计
 * @author pusilin
 *
 */

public class Arrears {
	
	/**
	 * 
	 */
	private String id;
	
	/**
	 * 客户编码
	 */
	private String khbm;

	/**
	 * 合同编码
	 */
	private String htbm;

	/**
	 * 用户名称
	 */
	private String yhmc;

	/**
	 * 收费项目代码
	 */
	private String sfxm_dm;

	/**
	 * 收费项目名称
	 */
	private String sfxm_mc;

	/**
	 * 催费状态（001催费 002已交费 003欠费）
	 */
	private String cfzt;

	/**
	 * 实际收款
	 */
	private double sjsk;

	/**
	 * 催费金额
	 */
	private double cfje;

	/**
	 * 客户主管
	 */
	private String zydm;

	/**
	 * 客户主管姓名
	 */
	private String zyxm;

	/**
	 * 纳税人识别号
	 */
	private String nsrsbh;

	/**
	 * 代理机构编码
	 */
	private String dljg_bm;

	/**
	 * 收费时间
	 */
	private Date sfsj;

	/**
	 * 收费月份
	 */
	private int sfyf;

	/**
	 * 收费年份
	 */
	private int sfnf;

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

	public String getHtbm() {
		return htbm;
	}

	public void setHtbm(String htbm) {
		this.htbm = htbm;
	}

	public String getYhmc() {
		return yhmc;
	}

	public void setYhmc(String yhmc) {
		this.yhmc = yhmc;
	}

	public String getSfxm_dm() {
		return sfxm_dm;
	}

	public void setSfxm_dm(String sfxm_dm) {
		this.sfxm_dm = sfxm_dm;
	}

	public String getSfxm_mc() {
		return sfxm_mc;
	}

	public void setSfxm_mc(String sfxm_mc) {
		this.sfxm_mc = sfxm_mc;
	}

	public String getCfzt() {
		return cfzt;
	}

	public void setCfzt(String cfzt) {
		this.cfzt = cfzt;
	}

	public double getSjsk() {
		return sjsk;
	}

	public void setSjsk(double sjsk) {
		this.sjsk = sjsk;
	}

	public double getCfje() {
		return cfje;
	}

	public void setCfje(double cfje) {
		this.cfje = cfje;
	}

	public String getZydm() {
		return zydm;
	}

	public void setZydm(String zydm) {
		this.zydm = zydm;
	}

	public String getZyxm() {
		return zyxm;
	}

	public void setZyxm(String zyxm) {
		this.zyxm = zyxm;
	}

	public String getNsrsbh() {
		return nsrsbh;
	}

	public void setNsrsbh(String nsrsbh) {
		this.nsrsbh = nsrsbh;
	}

	public String getDljg_bm() {
		return dljg_bm;
	}

	public void setDljg_bm(String dljg_bm) {
		this.dljg_bm = dljg_bm;
	}

	public Date getSfsj() {
		return sfsj;
	}

	public void setSfsj(Date sfsj) {
		this.sfsj = sfsj;
	}

	public int getSfyf() {
		return sfyf;
	}

	public void setSfyf(int sfyf) {
		this.sfyf = sfyf;
	}

	public int getSfnf() {
		return sfnf;
	}

	public void setSfnf(int sfnf) {
		this.sfnf = sfnf;
	}
	
}
