package com.xinhai.customer.api;

import java.io.Serializable;
import java.util.Date;

public class Customer implements Serializable {
	
    private static final long serialVersionUID = 1L;

    public String getZszt() {
        return zszt;
    }

    public void setZszt(String zszt) {
        this.zszt = zszt;
    }

    /*
        * 终审状态
        * */
    private String zszt;
   
}