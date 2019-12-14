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
@Table(name="pt_app_icon")
public class PtAppIcon implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
    //  	@Id
   // private Long id;
   
	//	private String tbbh;
		private String tblj;
		private String tbmc;
		//private String tbms;
		private String tblx;
		//private String bzxx;
		//private String tbzt;
		//private String xzqhDm;
		//private Date yxqq;
		//private Date yxqz;
		//private String scbz;
		//private String lrry;
		//private String gxry;
		//private String scry;
		//private Date lrrq;
		//private Date gxrq;
		//private Date scrq;
        public String getTblj() {
            return tblj;
        }
        public void setTblj(String tblj) {
            this.tblj = tblj;
        }
        public String getTbmc() {
            return tbmc;
        }
        public void setTbmc(String tbmc) {
            this.tbmc = tbmc;
        }
        public String getTblx() {
            return tblx;
        }
        public void setTblx(String tblx) {
            this.tblx = tblx;
        }
     
	 
}