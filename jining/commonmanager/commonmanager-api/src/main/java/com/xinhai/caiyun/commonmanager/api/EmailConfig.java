package com.xinhai.caiyun.commonmanager.api;

import java.io.Serializable;

import javax.mail.Transport;

/**
 * @description:
 * @version: v1.0
 * @author lixp
 * @date: 2017年8月22日 下午6:47:47
 */
public class EmailConfig implements Serializable {

    private static final long serialVersionUID = 1L;
    
    /**
     * smtp.126.com
     */
    private String mailHost = "";

    /**
     * username
     */
    private String senderUsername = "";

    /**
     * psaaword
     */
    private String senderPassword = "";
    
    /**
     * 模板
     */
    private String mb = "";


    public String getMailHost() {
        return mailHost;
    }

    public void setMailHost(String mailHost) {
        this.mailHost = mailHost;
    }

    public String getSenderUsername() {
        return senderUsername;
    }

    public void setSenderUsername(String senderUsername) {
        this.senderUsername = senderUsername;
    }

    public String getSenderPassword() {
        return senderPassword;
    }

    public void setSenderPassword(String senderPassword) {
        this.senderPassword = senderPassword;
    }

    public String getMb() {
        return mb;
    }

    public void setMb(String mb) {
        this.mb = mb;
    }
    
    
    
}
