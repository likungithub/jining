package com.xinhai.caiyun.customermanage.api;

import org.apache.http.cookie.Cookie;

import java.util.Map;

public class Response {

	private Map resultMap;

	private Boolean flag;//接口请求是否成功
	
	private String msg;//接口调用返回消息信息
	
	private String data;//青岛国税局接口返回的数据
	
	public Boolean getFlag() {	return flag;}

	public void setFlag(Boolean flag) {	this.flag = flag;}

	public String getMsg() {return msg;}

	public void setMsg(String msg) {this.msg = msg==null?null:msg.trim();;}

	public String getData() {return data;}

	public void setData(String data) {this.data = data;}

	public Map getResultMap() {
		return resultMap;
	}

	public void setResultMap(Map resultMap) {
		this.resultMap = resultMap;
	}


}
