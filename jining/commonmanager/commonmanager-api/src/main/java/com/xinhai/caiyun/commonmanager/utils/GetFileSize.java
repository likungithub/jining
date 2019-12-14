package com.xinhai.caiyun.commonmanager.utils;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.text.DecimalFormat;
/**
 * 获取文件的大小
 * @author wangshuo
 *
 */
public class GetFileSize {
    
    /**
     * 图片最大字节
     */
    BigDecimal imgMaxSize = new BigDecimal(2097152);
    
    /**
     * 文件最大字节
     */
    BigDecimal fileMaxSize = new BigDecimal(5242880);
    
    BigDecimal helpMaxSize = new BigDecimal(20485760);
	/**
	 * 判断文件是否大于10m
	 * @param fileS
	 * @return
	 * @throws IOException 
	 */
	public boolean FormetFileSize(File file,String plate) throws IOException {
	    //获取文件大小
	    FileInputStream fis = new FileInputStream(file);
	    FormetFileSize(fis, plate);
	    return true;
	}
	
	/**
	 * 文件流判断文件大小
	 * @param is
	 * @return
	 * @throws IOException
	 */
	public boolean FormetFileSize(InputStream is,String plate) throws IOException{
	    BigDecimal fileSize = new BigDecimal(0);
	    fileSize = fileSize.add(new BigDecimal(is.available()));
	    //文件大小大于文件可上传最大值
	    if (plate.indexOf("product") != -1 || plate.indexOf("avatar") != -1) {
	        if (fileSize.compareTo(imgMaxSize) >= 0) {
	            return false;
	        }
	    } else if (plate.indexOf("help/home")!=-1) {
	    	if (fileSize.compareTo(helpMaxSize) >= 0){
	    		return false;
	    	}
	    } else {
	        if (fileSize.compareTo(fileMaxSize) >= 0) {
	            return false;
	        }
	    }
	    return true;
	}
}
