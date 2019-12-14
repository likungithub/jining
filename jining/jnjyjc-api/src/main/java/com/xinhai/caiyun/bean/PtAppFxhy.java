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
@Table(name = "pt_app_fxhy")
public class PtAppFxhy implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private Long id;
    private String yhlx;
    private String tjrdm;
    private String fxsj;  
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
  
    public String getYhlx() {
        return yhlx;
    }
    public void setYhlx(String yhlx) {
        this.yhlx = yhlx;
    }
    public String getTjrdm() {
        return tjrdm;
    }
    public void setTjrdm(String tjrdm) {
        this.tjrdm = tjrdm;
    }
    public String getFxsj() {
        return fxsj;
    }
    public void setFxsj(String fxsj) {
        this.fxsj = fxsj;
    }

}