package com.xinhai.security.controller;

/**
 * Created by fanxi on 2016-5-6.
 */
public class LoginCommand {
	private String username;
	private String password;
	private boolean remember;
	private String jCaptchaCode;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean getRemember() {
		return remember;
	}

	public void setRemember(boolean remember) {
		this.remember = remember;
	}

	public String getjCaptchaCode() {
		return jCaptchaCode;
	}

	public void setjCaptchaCode(String jCaptchaCode) {
		this.jCaptchaCode = jCaptchaCode;
	}
}
