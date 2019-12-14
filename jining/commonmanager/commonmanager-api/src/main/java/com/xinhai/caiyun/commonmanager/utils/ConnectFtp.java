package com.xinhai.caiyun.commonmanager.utils;

import java.io.IOException;
import java.net.SocketException;
import java.util.Properties;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.xinhai.caiyun.commonmanager.api.FtpConnect;
/**
 * ftp连接池
 * @author wangshuo
 *
 */
public class ConnectFtp {
/**
 * 使用ftpclient插件连接到ftp
 * @return
 * @throws IOException
 */
	public FTPClient getFTP() throws IOException {
		FTPClient ftpClient = new FTPClient();
		ftpClient.setControlEncoding("utf-8");
		try {
			
			if (!FTPReply.isPositiveCompletion(ftpClient.getReplyCode())) {
				System.out.println("未连接到FTP，用户名或密码错误。");
				ftpClient.disconnect();
			} else {
				System.out.println("FTP连接成功。");
			}
		} catch (SocketException e) {
			e.printStackTrace();
			System.out.println("FTP的IP地址可能错误，请正确配置。");
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("FTP的端口错误,请正确配置。");
		}
		return ftpClient;
	}

/*public static void main(String[] agrs){
		try {
			new ConnectFtp().getFTP();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	*/
}
