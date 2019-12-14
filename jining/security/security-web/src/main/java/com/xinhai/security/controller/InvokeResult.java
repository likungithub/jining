package com.xinhai.security.controller;

/**
 * Created by fanxi on 2016-5-7.
 */
public class InvokeResult {
	private boolean failed;
	private String msg;

	public boolean isFailed() {
		return failed;
	}

	public void setFailed(boolean failed) {
		this.failed = failed;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
}
