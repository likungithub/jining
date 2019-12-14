package com.xinhai.caiyun.systemmanager.controller.pageoffice;

import com.xinhai.security.api.CurrentLoginUser;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 *陈
 */
public class WordUtils {

    private static Configuration configuration = null;

    public WordUtils(){
        configuration = new Configuration();
        configuration.setDefaultEncoding("UTF-8");
    }

    public static String createWord(HttpServletRequest request,Map<String,Object> dataMap,String ftlName){
        String fileurl = "";
        String filename = "cgys"+ CurrentLoginUser.getUser().getZydm() +".doc";
        fileurl = "/file/"+filename;
        Template t=null;
        try {

            configuration = new Configuration();
            configuration.setDefaultEncoding("UTF-8");
            // 设置模板加载的方式
            if(request==null) {
                configuration.setDirectoryForTemplateLoading(
                        new File("D:/file"));
                t = configuration.getTemplate(ftlName); //获取模板文件
            }else {
                configuration.setServletContextForTemplateLoading(request.getSession().getServletContext(), "/template");
                t = configuration.getTemplate(ftlName); //获取模板文件
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        File outFile = new File("D:/file/"+filename); //导出文件
        try {
            Writer w = new OutputStreamWriter(new FileOutputStream(outFile), "utf-8");
            t.process(dataMap, w);
            w.close();
        } catch (TemplateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileurl;
    }

}
