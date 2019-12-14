package com.xinhai.caiyun.systemmanager.api;

public class ShortMessageLog {

	private String id;
	/**
	 * 代理记账编码
	 */
	private String dljg_bm;
	/**
	 * 纳税人识别号
	 */
	private String nsrsbh;
	/**
	 * 接收人名称
	 */
	private String jsr_dm;
	/**
	 * 发送人名称
	 */
	private String fsr_dm;
	/**
	 * 被发送人电话
	 */
	private String bfsr;
	/**
	 * 短信类型
	 */
	private String dxlx;
	/**
	 * 短信内容
	 */
	private String dxnr;
	/**
	 * 删除标志
	 */
	private String scbz;
	/**
	 * 发送时间
	 */
	private String  fssj;
	/**
	 * 发送标志
	 */
	private String fszt;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getNsrsbh() {
		return nsrsbh;
	}
	public void setNsrsbh(String nsrsbh) {
		this.nsrsbh = nsrsbh;
	}
	
	public String getDxnr() {
		return dxnr;
	}
	public void setDxnr(String dxnr) {
		this.dxnr = dxnr;
	}
	public String getScbz() {
		return scbz;
	}
	public void setScbz(String scbz) {
		this.scbz = scbz;
	}
	public String getFssj() {
		return fssj;
	}
	public void setFssj(String fssj) {
		this.fssj = fssj;
	}
	public String getDljg_bm() {
		return dljg_bm;
	}
	public void setDljg_bm(String dljg_bm) {
		this.dljg_bm = dljg_bm;
	}
	public String getDxlx() {
		return dxlx;
	}
	public void setDxlx(String dxlx) {
		this.dxlx = dxlx;
	}
	public String getFszt() {
		return fszt;
	}
	public void setFszt(String fszt) {
		this.fszt = fszt;
	}
	public String getJsr_dm() {
		return jsr_dm;
	}
	public void setJsr_dm(String jsr_dm) {
		this.jsr_dm = jsr_dm;
	}
	public String getFsr_dm() {
		return fsr_dm;
	}
	public void setFsr_dm(String fsr_dm) {
		this.fsr_dm = fsr_dm;
	}
	public String getBfsr() {
		return bfsr;
	}
	public void setBfsr(String bfsr) {
		this.bfsr = bfsr;
	}
}
