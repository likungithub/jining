package com.xinhai.caiyun.systemmanager.api;

import java.util.Date;

/**
 * 沟通反馈
 * @author pusilin
 *
 */
public class Feedback {
	
	/**
	 * 反馈意见ID
	 */
	private String id;
	
	/**
	 * 手机类型
	 */
	private String sjlx;
	
	/**
	 * 纳税人识别号
	 */
	private String nsrsbh;
	
	/**
	 * 代理机构编码
	 */
	private String dljg_bm;
	
	/**
	 * 客户编码（反馈人员）
	 */
	private String khbm;

	/**
	 * 公司名称
	 */
	private String gsmc;
	/**
	 * 用户电话
	 */
	private  String yhdh;
	
	/**
	 * 反馈信息
	 */
	private String fkxx;
	
	/**
	 * 答复标志
	 */
	private int dfbz;
	
	/**
	 * 删除标志
	 */
	private int scbz;
	
	/**
	 * 反馈日期（客户反馈时间）
	 */
	private Date fkrq;
	
	/**
	 * 录入人员（答复人员）
	 */
	private String lrry;
	
	/**
	 * 更新人员（答复人员）
	 */
	private String gxry;
	
	/**
	 * 删除人员（答复人员）
	 */
	private String scry;
	
	/**
	 * 录入日期（答复时间）
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

	/**
	 * 反馈类型
	 */
	private String fklx;

	/**
	 * 反馈标志
	 */
	private String fkbz;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSjlx() {
		return sjlx;
	}

	public void setSjlx(String sjlx) {
		this.sjlx = sjlx;
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

	public String getKhbm() {
		return khbm;
	}

	public void setKhbm(String khbm) {
		this.khbm = khbm;
	}

	public String getFkxx() {
		return fkxx;
	}

	public void setFkxx(String fkxx) {
		this.fkxx = fkxx;
	}

	public int getDfbz() {
		return dfbz;
	}

	public void setDfbz(int dfbz) {
		this.dfbz = dfbz;
	}

	public int getScbz() {
		return scbz;
	}

	public void setScbz(int scbz) {
		this.scbz = scbz;
	}

	public Date getFkrq() {
		return fkrq;
	}

	public void setFkrq(Date fkrq) {
		this.fkrq = fkrq;
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

	public String getFklx() {
		return fklx;
	}

	public void setFklx(String fklx) {
		this.fklx = fklx;
	}

	public String getFkbz() {
		return fkbz;
	}

	public void setFkbz(String fkbz) {
		this.fkbz = fkbz;
	}
	public String getGsmc() {
		return gsmc;
	}

	public void setGsmc(String gsmc) {
		this.gsmc = gsmc;
	}

	public String getYhdh() {
		return yhdh;
	}

	public void setYhdh(String yhdh) {
		this.yhdh = yhdh;
	}
}
