package com.xinhai.caiyun.bean;

import com.alibaba.fastjson.JSON;

/**
 * 返回值
 * 
 * @author Administrator
 * 
 */
public class ReturnObj {

	public final static String _State_code_Sucess = "1";
	public final static String _State_code_Error = "0";
	private String code = "1";// success or error
	private String message = "成功";// 成功 或失败
	private Object data;
	private String errorMsg;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMsg() {
		if (code == ReturnObj._State_code_Error) {
		    message = "失败";
		}
		return message;
	}

	
	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}


    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    @Override
	public String toString() {
		// TODO Auto-generated method stub
		return JSON.toJSONString(this);
	}

}
