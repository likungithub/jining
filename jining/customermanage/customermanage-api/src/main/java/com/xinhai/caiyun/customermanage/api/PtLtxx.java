package com.xinhai.caiyun.customermanage.api;

import java.io.Serializable;

import javax.persistence.Id;
import javax.persistence.Table;

import java.security.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * Auto Generated Entity
 * 
 * @author Xinhai auto generated
 * 
 */
public class PtLtxx implements Serializable {

    private static final long serialVersionUID = 1L;
    private String  userId;
    
    List<PtLtxxMx> messages;
    
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public List<PtLtxxMx> getMessages() {
        return messages;
    }
    public void setMessages(List<PtLtxxMx> messages) {
        this.messages = messages;
    }
}