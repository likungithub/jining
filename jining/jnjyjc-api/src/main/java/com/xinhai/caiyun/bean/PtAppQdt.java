package com.xinhai.caiyun.bean;

import java.io.Serializable;
import javax.persistence.Id;
import javax.persistence.Table;
import java.security.Timestamp;
import java.util.Date;
import java.util.List;

/**
 * Auto Generated Entity
 * 
 * @author Xinhai auto generated
 * 
 */
@Table(name="pt_app_qdt")
public class PtAppQdt implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
      	@Id
    private Long id;
   
		private String tpbh;
		private String tplj;
		private String tpmc;
		private String tpms; 
		private String bzxx;
		private String qdtzt;
		private String xzqhDm;
		private Date yxqq;
		private Date yxqz;
		private String scbz;
		private String lrry;
		private String gxry;
		private String scry;
		private Date lrrq;
		private Date gxrq;
		private Date scrq;
        public Long getId() {
            return id;
        }
        public void setId(Long id) {
            this.id = id;
        }
        public String getTpbh() {
            return tpbh;
        }
        public void setTpbh(String tpbh) {
            this.tpbh = tpbh;
        }
        public String getTplj() {
            return tplj;
        }
        public void setTplj(String tplj) {
            this.tplj = tplj;
        }
        public String getTpmc() {
            return tpmc;
        }
        public void setTpmc(String tpmc) {
            this.tpmc = tpmc;
        }
        public String getTpms() {
            return tpms;
        }
        public void setTpms(String tpms) {
            this.tpms = tpms;
        }
        public String getBzxx() {
            return bzxx;
        }
        public void setBzxx(String bzxx) {
            this.bzxx = bzxx;
        }
        public String getQdtzt() {
            return qdtzt;
        }
        public void setQdtzt(String qdtzt) {
            this.qdtzt = qdtzt;
        }
        public String getXzqhDm() {
            return xzqhDm;
        }
        public void setXzqhDm(String xzqhDm) {
            this.xzqhDm = xzqhDm;
        }
        public Date getYxqq() {
            return yxqq;
        }
        public void setYxqq(Date yxqq) {
            this.yxqq = yxqq;
        }
        public Date getYxqz() {
            return yxqz;
        }
        public void setYxqz(Date yxqz) {
            this.yxqz = yxqz;
        }
        public String getScbz() {
            return scbz;
        }
        public void setScbz(String scbz) {
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
}