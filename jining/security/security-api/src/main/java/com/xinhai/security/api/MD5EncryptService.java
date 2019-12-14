package com.xinhai.security.api;

import org.apache.shiro.crypto.hash.Md5Hash;

/**
 * Shiro 默认是16进制加密
 *
 * @author lucas
 */
public class MD5EncryptService { 

	private int hashIterations = 1;

	private boolean saltDisabled = true;

	public String encryptPassword(String password, String salt) throws IllegalArgumentException {
		if (saltDisabled) {
			salt = null;
		}
		return new Md5Hash(password, salt, hashIterations).toHex();
	}

	public String getCredentialsStrategy() {
		return Md5Hash.ALGORITHM_NAME;
	}

	public int getHashIterations() {
		return hashIterations;
	}

	public boolean saltDisabled() {
		return saltDisabled;
	}

    /*-------------- provide setter methods  ------------------*/

	public void setSaltDisabled(boolean disabled) {
		this.saltDisabled = disabled;
	}

	public void setHashIterations(int hashIterations) {
		this.hashIterations = hashIterations;
	}
}
