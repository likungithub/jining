package com.xinhai.caiyun.commonmanager.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;

public class DownLoad {

	/**
	 * �����ļ�
	 * 
	 * @param hostname
	 *            FTP的ip地址ַ
	 * @param port
	 *            FTP端口号
	 * @param username
	 *            FTP账号
	 * @param password
	 *            FTP密码
	 * @param pathname
	 *            FTP上的文件路径
	 * @param filename
	 *           文件名
	 * @param localpath
	 *            要下载到的本地路径
	 * @return
	 * @throws IOException 
	 */
	public static boolean downloadFile(String pathname, String filename,
			String localpath) throws IOException {
		boolean flag = false;
		ConnectFtp cf=new ConnectFtp();
		FTPClient ftpClient = cf.getFTP();
		try {	
			cf.getFTP();
			int replyCode = ftpClient.getReplyCode();
			if (!FTPReply.isPositiveCompletion(replyCode)) {
				return flag;
			}
			// �л�FTPĿ¼
			ftpClient.changeWorkingDirectory(pathname);
			FTPFile[] ftpFiles = ftpClient.listFiles();
			for (FTPFile file : ftpFiles) {
				if (filename.equalsIgnoreCase(file.getName())) {
					File localFile = new File(localpath + "/" + file.getName());
					OutputStream os = new FileOutputStream(localFile);
					ftpClient.retrieveFile(file.getName(), os);
					os.close();
				}
			}
			ftpClient.logout();
			flag = true;
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (ftpClient.isConnected()) {
				try {
					ftpClient.logout();
				} catch (IOException e) {

				}
			}
		}
		return flag;
	}
//	public static void main(String[] args){
//		downloadFile("/doc/xsrm", "text1.txt", "D:/");
//	}

}
