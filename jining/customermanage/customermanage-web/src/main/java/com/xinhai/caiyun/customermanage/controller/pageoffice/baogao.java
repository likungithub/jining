package com.xinhai.caiyun.customermanage.controller.pageoffice;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @Author
 * @Description：
 * @Date: ${DATE} ${TIME}
 * @Modified By:
 */
public class baogao {

    private static Configuration configuration = null;

    public baogao(){
        configuration = new Configuration();
        configuration.setDefaultEncoding("UTF-8");
    }

    public static void main(String[] args) {
        baogao test = new baogao();
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
                t = configuration.getTemplate("bgmodel.ftl"); //获取模板文件
            }else {
                configuration.setServletContextForTemplateLoading(request.getSession().getServletContext(), "/template");
                t = configuration.getTemplate("bgmodel.ftl"); //获取模板文件
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
        SimpleDateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm");
        String gzrq = ""+format.format(new Date());//NO.

        String  xh  = "1";//序号
        String  jyxm = "铅（以Pb计）/（mg/kg）";//检验项目
        String  dw = "g";//单位
        String  bzyq = "≤0.5";//标准（技术）要求
        String  jyjg = "＜0.4 ";//检验结果
        String  d = "合格";//单项判定

        String ypmc = "123456";
        String xhgg = "123456";
        String ssjdw = "123456";
        String jylb = "123456";
        String wtdwr = "张三";
        String scdw = "123456";
        String zcsb = "123456";
        String ypdj = "123456";
        String scrq = "123456";
        String cydd = "123456";
        String csyrq = "123456";
        String cyjs = "123456";
        String csyz = "123456";
        String ypsl = "123456";
        String ypxt = "123456";
        String cpbz = "123456";
        String jyhj = "123456";
        String jyyq = "123456";
        String ffbz = "123456";
        String jyyqq = "123456";
        String bz = "123456";
        String pz = "123456";
        String sh = "123456";
        String bzz = "123456";
        String jyjl = "123456";

        dataMap.put("ypmc",ypmc);
        dataMap.put("xhgg",xhgg);
        dataMap.put("ssjdw",ssjdw);
        dataMap.put("jylb",jylb);
        dataMap.put("wtdwr",wtdwr);
        dataMap.put("scdw",scdw);
        dataMap.put("zcsb",zcsb);
        dataMap.put("ypdj",ypdj);
        dataMap.put("scrq",scrq);
        dataMap.put("cydd",cydd);
        dataMap.put("csyrq",csyrq);
        dataMap.put("cyjs",cyjs);
        dataMap.put("csyz",csyz);
        dataMap.put("ypsl",ypsl);
        dataMap.put("ypxt",ypxt);
        dataMap.put("cpbz",cpbz);
        dataMap.put("jyhj",jyhj);
        dataMap.put("jyyq",jyyq);
        dataMap.put("ffbz",ffbz);
        dataMap.put("jyyqq",jyyqq);
        dataMap.put("bz",bz);
        dataMap.put("pz",pz);
        dataMap.put("sh",sh);
        dataMap.put("bzz",bzz);
        dataMap.put("pzrq",gzrq);
        dataMap.put("shrq",gzrq);
        dataMap.put("bzrq",gzrq);
        dataMap.put("jyjl",jyjl);

        List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
        for (int i = 0; i < 5; i++) {
            Map<String,Object> map = new HashMap<String,Object>();
//            map.put("xh", xh);
//            map.put("jyxm", jyxm);
//            map.put("dw", dw);
//            map.put("bzyq", bzyq);
//            map.put("jyjg", jyjg);
//            map.put("d",d);
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
