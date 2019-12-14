package com.xinhai.caiyun.systemmanager.api;

import javax.persistence.Table;
import java.util.Date;

/**
 * 客户给员工评价
 * @author pusilin
 */
@Table(name = "PT_YGPJ_KHPJ")
public class EvaluateUserStaff {


	/**
     * 主键
     */
    private String id;
    
    /**
     * 客户编码
     */
    private String khbm;
    
    /**
     * 职员代码
     */
    private String zydm;
    
    /**
     * 服务态度
     */
    private int fwtd;
    
    /**
     * 专业水准
     */
    private int zysz;
    
    /**
     * 及时性
     */
    private int jsx;
    
    /**
     * 评论信息
     */
    private String plxx;
    
    /**
     * 客户评价时间
     */
    private Date khpjsj;
    
    /**
     * 客户评价修改时间
     */
    private String khpjxgsj;
    
    /**
     * 纳税人识别号
     */
    private String nsrsbh;
    
    /**
     * 
     * 代理机构编码
     */
    private String dljg_bm;
    
    /**
     * 客户名称
     */
    private String khmc;
    
    /**
     * 员工姓名
     */
    private String ygxm;
    
    /**
     * 公司名称
     */
    private String gsmc;
    
    /**
     * 员工头像
     */
    private String ygtx;

	public String getYgtx() {
		return ygtx;
	}

	public void setYgtx(String ygtx) {
		this.ygtx = ygtx;
	}

	public String getKhmc() {
		return khmc;
	}

	public void setKhmc(String khmc) {
		this.khmc = khmc;
	}

	public String getYgxm() {
		return ygxm;
	}

	public void setYgxm(String ygxm) {
		this.ygxm = ygxm;
	}

	public String getGsmc() {
		return gsmc;
	}

	public void setGsmc(String gsmc) {
		this.gsmc = gsmc;
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

	public String getZydm() {
		return zydm;
	}

	public void setZydm(String zydm) {
		this.zydm = zydm;
	}

	public int getFwtd() {
		return fwtd;
	}

	public void setFwtd(int fwtd) {
		this.fwtd = fwtd;
	}

	public int getZysz() {
		return zysz;
	}

	public void setZysz(int zysz) {
		this.zysz = zysz;
	}

	public int getJsx() {
		return jsx;
	}

	public void setJsx(int jsx) {
		this.jsx = jsx;
	}

	public String getPlxx() {
		return plxx;
	}

	public void setPlxx(String plxx) {
		this.plxx = plxx;
	}

	public Date getKhpjsj() {
		return khpjsj;
	}

	public void setKhpjsj(Date khpjsj) {
		this.khpjsj = khpjsj;
	}

	public String getKhpjxgsj() {
		return khpjxgsj;
	}

	public void setKhpjxgsj(String khpjxgsj) {
		this.khpjxgsj = khpjxgsj;
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



}
