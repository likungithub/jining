package com.xinhai.caiyun.customermanage.api;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.Table;

@Table(name = "pt_xxtx")
public class SystemMessages {


	private String xxid;

	public String getXxid() {
		return xxid;
	}

	public void setXxid(String xxid) {
		this.xxid = xxid;
	}

	/**
	 * id
	 */
	private String id;
	
	/**
	 * 代理机构编码
	 */
	private String dljg_bm;
	
	/**
	 * 提醒类型代码
	 */
	private String txlx_dm;
	
	/**
	 * 提醒标题
	 */
	private String txbt;
	
	/**
	 * 提醒内容
	 */
	private String txnr;
	
	/**
	 * 发送人员代码
	 */
	private String fsry_dm;
	
	/**
	 * 发送人员名称
	 */
	private String fsry_mc;
	
	/**
	 * 接收人员代码
	 */
	private String jsry_dm;
	
	private List<Map<String,String>> jsry_dms;
	
	/**
	 * 接收人员名称
	 */
	private String jsry_mc;
	
	/**
	 * 发送时间
	 */
	private Date fssj;
	
	/**
	 * 阅读时间
	 */
	private Date ydsj;
	
	/**
	 * 阅读状态
	 */
	private int ydzt_dm;
	/*private String ydzt_dm;*/
	
	/**
	 * 删除人员代码
	 */
	private String scry_dm;
	
	/**
	 * 删除人员名称
	 * 
	 */
	private String scry_mc;
	
	/**
	 * 删除标志
	 */
	private int scbz;
	
	/**
	 * 删除日期
	 */
	private Date scrq;
	
	/**
	 * 关联编码（包含收据编码）
	 */
	private String glbm;
	
	/**
	 * 关联编码（包含合同编码）
	 */
	private String glbm_cy;
	
	/**
	 * 失败次数
	 */
	private String errorCount;
	
	/**
	 * 提醒方式
	 */
	private String txfs;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDljg_bm() {
		return dljg_bm;
	}

	public void setDljg_bm(String dljg_bm) {
		this.dljg_bm = dljg_bm;
	}

	public String getTxlx_dm() {
		return txlx_dm;
	}

	public void setTxlx_dm(String txlx_dm) {
		this.txlx_dm = txlx_dm;
	}

	public String getTxbt() {
		return txbt;
	}

	public void setTxbt(String txbt) {
		this.txbt = txbt;
	}

	public String getTxnr() {
		return txnr;
	}

	public void setTxnr(String txnr) {
		this.txnr = txnr;
	}

	public String getFsry_dm() {
		return fsry_dm;
	}

	public void setFsry_dm(String fsry_dm) {
		this.fsry_dm = fsry_dm;
	}

	public String getFsry_mc() {
		return fsry_mc;
	}

	public void setFsry_mc(String fsry_mc) {
		this.fsry_mc = fsry_mc;
	}

	public String getJsry_dm() {
		return jsry_dm;
	}

	public void setJsry_dm(String jsry_dm) {
		this.jsry_dm = jsry_dm;
	}

	public String getJsry_mc() {
		return jsry_mc;
	}

	public void setJsry_mc(String jsry_mc) {
		this.jsry_mc = jsry_mc;
	}

	public Date getFssj() {
		return fssj;
	}

	public void setFssj(Date fssj) {
		this.fssj = fssj;
	}

	public Date getYdsj() {
		return ydsj;
	}

	public void setYdsj(Date ydsj) {
		this.ydsj = ydsj;
	}

	

	public String getScry_dm() {
		return scry_dm;
	}

	public void setScry_dm(String scry_dm) {
		this.scry_dm = scry_dm;
	}

	public String getScry_mc() {
		return scry_mc;
	}

	public void setScry_mc(String scry_mc) {
		this.scry_mc = scry_mc;
	}

	public int getScbz() {
		return scbz;
	}

	public void setScbz(int scbz) {
		this.scbz = scbz;
	}

	public Date getScrq() {
		return scrq;
	}

	public void setScrq(Date scrq) {
		this.scrq = scrq;
	}

	public int getYdzt_dm() {
		return ydzt_dm;
	}

	public void setYdzt_dm(int ydzt_dm) {
		this.ydzt_dm = ydzt_dm;
	}

    public String getGlbm() {
        return glbm;
    }

    public void setGlbm(String glbm) {
        this.glbm = glbm;
    }

    public String getGlbm_cy() {
        return glbm_cy;
    }

    public void setGlbm_cy(String glbm_cy) {
        this.glbm_cy = glbm_cy;
    }

    public String getTxfs() {
        return txfs;
    }

    public void setTxfs(String txfs) {
        this.txfs = txfs;
    }

    public String getErrorCount() {
        return errorCount;
    }

    public void setErrorCount(String errorCount) {
        this.errorCount = errorCount;
    }

    public List<Map<String, String>> getJsry_dms() {
        return jsry_dms;
    }

    public void setJsry_dms(List<Map<String, String>> jsry_dms) {
        this.jsry_dms = jsry_dms;
    }
    
    

}
