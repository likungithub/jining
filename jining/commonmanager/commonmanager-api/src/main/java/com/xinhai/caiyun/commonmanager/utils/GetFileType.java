package com.xinhai.caiyun.commonmanager.utils;
import java.awt.image.BufferedImage;  
import java.io.FileNotFoundException;
import java.io.IOException;  
import java.io.InputStream;  
import java.util.HashMap;  
import java.util.Iterator;  
import java.util.Map;  
import java.util.Map.Entry;  

import javax.imageio.ImageIO;  
import javax.imageio.ImageReader;  
import javax.imageio.stream.ImageInputStream;

/**
 * 获取判断文件类型
 */
public class GetFileType {
	public final static Map<String, String> FILE_TYPE_MAP = new HashMap<String, String>();    
	 public GetFileType(){}    
	    static{    
	        getAllFileType();  //��ʼ���ļ�������Ϣ    
	    }    
        
    /**  
     * Created on 2017-7-1   
     * 获取文件类型 
     * @author:[shixing_11@sina.com]  
     */    
    private static void getAllFileType()    
    {    
        FILE_TYPE_MAP.put("jpg", "FFD8FF"); //JPEG (jpg)    
        FILE_TYPE_MAP.put("png", "89504E47");  //PNG (png)    
        FILE_TYPE_MAP.put("gif", "47494638");  //GIF (gif)    
        FILE_TYPE_MAP.put("tif", "49492A00");  //TIFF (tif)    
        FILE_TYPE_MAP.put("bmp", "424D"); //Windows Bitmap (bmp)    
        FILE_TYPE_MAP.put("psd", "38425053");  //Photoshop (psd)
        FILE_TYPE_MAP.put("xml", "3C3F786D6C");
        FILE_TYPE_MAP.put("doc", "D0CF11E0");  //MS word
        FILE_TYPE_MAP.put("xls", "D0CF11E0");  //MS Word
        FILE_TYPE_MAP.put("pdf", "255044462D312E");  //Adobe Acrobat (pdf)
        FILE_TYPE_MAP.put("docx", "504B0304");
        FILE_TYPE_MAP.put("xlsx", "504B0304");
        FILE_TYPE_MAP.put("rar", "52617221");
        FILE_TYPE_MAP.put("zip", "504B0304");
        FILE_TYPE_MAP.put("rtf", "7B5C727466");  //Rich Text Format (rtf)
//以下为不特别需要
//        FILE_TYPE_MAP.put("dwg", "41433130"); //CAD (dwg)
//        FILE_TYPE_MAP.put("eml", "44656C69766572792D646174653A");  //Email [thorough only] (eml)
//        FILE_TYPE_MAP.put("mdb", "5374616E64617264204A");  //MS Access (mdb)
//        FILE_TYPE_MAP.put("ps", "252150532D41646F6265");
//        FILE_TYPE_MAP.put("avi", "41564920");
//        FILE_TYPE_MAP.put("wav", "57415645");  //Wave (wav)
//        FILE_TYPE_MAP.put("html", "68746D6C3E");  //HTML (html)
//        FILE_TYPE_MAP.put("dbx", "CFAD12FEC5FD746F");  //Outlook Express (dbx)
//        FILE_TYPE_MAP.put("pst", "2142444E");  //Outlook (pst)
//        FILE_TYPE_MAP.put("wpd", "FF575043"); //WordPerfect (wpd)
//        FILE_TYPE_MAP.put("eps", "252150532D41646F6265");
//        FILE_TYPE_MAP.put("qdf", "AC9EBD8F");  //Quicken (qdf)
//        FILE_TYPE_MAP.put("pwl", "E3828596");  //Windows Password (pwl)
//        FILE_TYPE_MAP.put("ram", "2E7261FD");  //Real Audio (ram)
//        FILE_TYPE_MAP.put("rm", "2E524D46");  //Real Media (rm)
//        FILE_TYPE_MAP.put("mpg", "000001BA");  //
//        FILE_TYPE_MAP.put("mov", "6D6F6F76");  //Quicktime (mov)
//        FILE_TYPE_MAP.put("asf", "3026B2758E66CF11"); //Windows Media (asf)
//        FILE_TYPE_MAP.put("mid", "4D546864");  //MIDI (mid)
    }    


    /**  
     * Created on 2010-7-1   
     * 通过文件头判断图片类型
     * @param File  
     * @return fileType  
     * @author:[shixing_11@sina.com]  
     */    

    public final static String getImageFileType(InputStream f)    
    {    
        if (isImage(f))  
        {  
            try  
            {  
                ImageInputStream iis = ImageIO.createImageInputStream(f);  
                Iterator<ImageReader> iter = ImageIO.getImageReaders(iis);  
                if (!iter.hasNext())  
                {  
                    return null;  
                }  
                ImageReader reader = iter.next();  
                return reader.getFormatName();  
            }  
            catch (IOException e)  
            {  
                return null;  
            }  
            catch (Exception e)  
            {  
                return null;  
            }  
        }  
        return null;  
    }    
    
    /**  
     * Created on 2010-7-1   
     * <p>Discription:[getFileByFile]</p> 获取到文件类型 
     * @param file  
     * @return fileType  
     * @author:[shixing_11@sina.com]  
     */    

    public static String getFileByFile(InputStream file)    
    {    
        String filetype = null;    
        byte[] b = new byte[50];    
        try    
        {    
        	file.read(b);    
            filetype = getFileTypeByStream(b);    
 
        }    
        catch (FileNotFoundException e)    
        {    
            e.printStackTrace();    
        }    
        catch (IOException e)    
        {    
            e.printStackTrace();    
        }    
        return filetype;    
    }    
        
    /**  
     * Created on 2010-7-1   
     * <p>Discription:[getFileTypeByStream]</p>  
     * @param b  
     * @return fileType  
     * @author:[shixing_11@sina.com]  
     */    
    public static String getFileTypeByStream(byte[] b){    
        String filetypeHex = String.valueOf(getFileHexString(b));    
        Iterator<Entry<String, String>> entryiterator = FILE_TYPE_MAP.entrySet().iterator();    
        while (entryiterator.hasNext()) {    
            Entry<String,String> entry =  entryiterator.next();    
            String fileTypeHexValue = entry.getValue();    
            if (filetypeHex.toUpperCase().startsWith(fileTypeHexValue)) {    
                return entry.getKey();    
            }    
        }    
        return null;    
    }    
        
    /** 
     * Created on 2010-7-2  
     * 判断是不是图片类型
     * @param file 
     * @return true 是| false 否 
     * @author:[shixing_11@sina.com] 
     */  
    public final static boolean isImage(InputStream f){  
        boolean flag = false;  
        try  
        {  
            BufferedImage bufreader = ImageIO.read(f);  
            int width = bufreader.getWidth();  
            int height = bufreader.getHeight();  
            if(width==0 || height==0){  
                flag = false;  
            }else {  
                flag = true;  
            }  
        }  
        catch (IOException e)  
        {  
            flag = false;  
        }catch (Exception e) {  
            flag = false;  
        }  
        return flag;  
    }  
      
    /**  
     * Created on 2010-7-1   
     * <p>Discription:[getFileHexString]</p>  
     * @param b  
     * @return fileTypeHex  
     * @author:[shixing_11@sina.com]  
     */    
    public final static String getFileHexString(byte[] b)    
    {    
        StringBuilder stringBuilder = new StringBuilder();    
        if (b == null || b.length <= 0)    
        {    
            return null;    
        }    
        for (int i = 0; i < b.length; i++)    
        {    
            int v = b[i] & 0xFF;    
            String hv = Integer.toHexString(v);    
            if (hv.length() < 2)    
            {    
                stringBuilder.append(0);    
            }    
            stringBuilder.append(hv);    
        }    
        return stringBuilder.toString();    
    }   
    
    /** 
     * 判断文件类型 
     *  
     * @param filePath 文件路径 
     * @return 文件类型 
     */  
    public static FileType getType(InputStream is) throws IOException {
    	 byte[] src = new byte[28];
         is.read(src, 0, 28);
         StringBuilder stringBuilder = new StringBuilder("");
         if (src == null || src.length <= 0) {
             return null;
         }
         for (int i = 0; i < src.length; i++) {
             int v = src[i] & 0xFF;
             String hv = Integer.toHexString(v).toUpperCase();
             if (hv.length() < 2) {
                 stringBuilder.append(0);
             }
             stringBuilder.append(hv);
         }
         FileType[] fileTypes = FileType.values();
         for (FileType fileType : fileTypes) {
             if (stringBuilder.toString().startsWith(fileType.getValue())) {
                 return fileType;
             }
         }
         return null;
    }
    
    /** 
     * 得到文件头 
     *  
     * @param filePath 文件路径 
     * @return 文件头 
     * @throws IOException 
     */  
    private static String getFileContent(InputStream is) throws IOException {  
        byte[] b = new byte[28];  
        InputStream inputStream = null;  
        try {  
            inputStream = is;  
            inputStream.read(b, 0, 28);  
        } catch (IOException e) {  
            e.printStackTrace();  
            throw e;  
        } finally {  
            if (inputStream != null) {  
            }  
        }  
        return bytesToHexString(b);  
    }
    
    /** 
     * 将文件头转换成16进制字符串 
     *  
     * @param 原生byte 
     * @return 16进制字符串 
     */  
    private static String bytesToHexString(byte[] src){  
          
        StringBuilder stringBuilder = new StringBuilder();     
        if (src == null || src.length <= 0) {     
            return null;     
        }     
        for (int i = 0; i < src.length; i++) {     
            int v = src[i] & 0xFF;     
            String hv = Integer.toHexString(v);     
            if (hv.length() < 2) {     
                stringBuilder.append(0);     
            }     
            stringBuilder.append(hv);     
        }     
        return stringBuilder.toString();     
    } 
}  

