package com.xinhai.caiyun.customermanage.controller.pageoffice;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.*;

/**
 * @Author 单亮
 * @Description：
 * @Date: ${DATE} ${TIME}
 * @Modified By:
 */
public class weituodan {

    private static Configuration configuration = null;

    public weituodan(){
        configuration = new Configuration();
        configuration.setDefaultEncoding("UTF-8");
    }

    public static void main(String[] args) {
        weituodan test = new weituodan();
        Map<String,Object> dataMap = getData();
        String fileurl =  test.createWord(null,dataMap);
        System.out.println(fileurl);
    }

    public static String createWord(HttpServletRequest request,Map<String,Object> dataMap){
        String fileurl = "";
        String filename = "BG"+UUID.randomUUID()+".doc";
        fileurl = "/file/"+filename;
        Template t=null;
        try {

            configuration = new Configuration();
            configuration.setDefaultEncoding("UTF-8");
            // 设置模板加载的方式
            if(request==null) {
                configuration.setDirectoryForTemplateLoading(
                        new File("D:/file"));
                t = configuration.getTemplate("weituodan.ftl"); //获取模板文件
            }else {
                configuration.setServletContextForTemplateLoading(request.getSession().getServletContext(), "/template");
                t = configuration.getTemplate("weituodan.ftl"); //获取模板文件
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

    public static Map  getData() {
        Map<String, Object> dataMap = new HashMap<>();
//        SimpleDateFormat format=new SimpleDateFormat("yyyyMMdd");
//        String BGBH = "F"+format.format(new Date());//NO.

        String wtbh = "123456";
        String wtdwmc = "123456";
        String lxdh = "123456";
        String wtdwxxdz = "123456";
        String yzbm = "张三";
        String ypmc = "123456";
        String sb = "123456";
        String ggxh = "123456";
        String ypdj = "123456";
        String scdw = "123456";
        String jylb = "123456";
        String ypsl = "123456";
        String scrq = "123456";
        String ypphhbh = "123456";
        String bzq = "123456";
        String bz = "123456";
        String ypzt = "123456";
        String yshwt = "123456";
        String jyyjbz = "123456";
        String jyxm = "123456";
        String qtydsm = "123456";

        dataMap.put("wtbh",wtbh);
        dataMap.put("wtdwmc",wtdwmc);
        dataMap.put("lxdh",lxdh);
        dataMap.put("wtdwxxdz",wtdwxxdz);
        dataMap.put("yzbm",yzbm);
        dataMap.put("ypmc",ypmc);
        dataMap.put("sb",sb);
        dataMap.put("ggxh",ggxh);
        dataMap.put("ypdj",ypdj);
        dataMap.put("scdw",scdw);
        dataMap.put("jylb",jylb);
        dataMap.put("ypsl",ypsl);
        dataMap.put("scrq",scrq);
        dataMap.put("ypphhbh",ypphhbh);
        dataMap.put("bzq",bzq);
        dataMap.put("bz",bz);
        dataMap.put("ypzt",ypzt);
        dataMap.put("yshwt",yshwt);
        dataMap.put("jyyjbz",jyyjbz);
        dataMap.put("jyxm",jyxm);
        dataMap.put("qtydsm",qtydsm);

        List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
        for (int i = 0; i < 5; i++) {
            Map<String,Object> map = new HashMap<String,Object>();
            //map.put("XH", i+1);
//            map.put("JYXM", JYXM);
//            map.put("BZYQ", BZYQ);
//            map.put("JYJG", JYJG);
//            map.put("DXPD", DXPD);
            list.add(map);
        }

        dataMap.put("list", list);
        return dataMap;
    }



    private void getData1(Map<String, Object> dataMap) {
        dataMap.put("title", "标题");
        List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
        for (int i = 0; i < 10; i++) {
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("name", "name"+i);
            map.put("age", "age"+i);
            list.add(map);
        }

        dataMap.put("list", list);
    }
}
