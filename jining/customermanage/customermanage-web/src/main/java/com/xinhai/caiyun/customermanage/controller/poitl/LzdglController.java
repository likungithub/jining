package com.xinhai.caiyun.customermanage.controller.poitl;

import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.config.Configure;
import com.deepoove.poi.data.PictureRenderData;
import com.deepoove.poi.data.RowRenderData;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;

@Controller
@RequestMapping("lzd")
public class LzdglController {
    private static Configuration configuration = null;
    HttpServletRequest request;
    public static void main(String args[]) throws Exception{
        Map map = new HashMap();
        map.put("JSRY", new PictureRenderData(60, 40, "D://file/image/朱晓飞.png"));
        List<RowRenderData> dataList = new ArrayList();
        for (int i=0;i<5;i++){
            RowRenderData rowRenderData = RowRenderData.build(i+1+"","{{@PZRY}}");
            dataList.add(rowRenderData);
        }
        map.put("dataList",dataList);
        map.put("YPMC","西红柿");
        map.put("YPSL","3kg");
        map.put("YPZT","完好");
        map.put("YPBM","N2018-C-0228");
        map.put("SYRQ","2018-07-26");
        map.put("GGXH","");
        map.put("SCRQHPH","2018-07-26");
        map.put("YPDJ","");
        map.put("JYLB","抽样检验");
        map.put("BZQ","");
        map.put("JYYJ","GB 2763-2016");
        map.put("IF_LY","不留样");
        map.put("CYSL","3kg");
        map.put("CYRQ","2018-07-26");
        map.put("CYRY","李崤翡 董忠");
        map.put("YPSL","3kg");
        map.put("JSRQ","2018-11-17");;
        map.put("ZBSL","3件");
        map.put("ZBRQ","2018-11-20");
        map.put("ZBRY",new PictureRenderData(60,40,"D://file/image/李茂峰.png"));
        LzdglController lzdglController = new LzdglController();
       String lj= lzdglController.createDocx(map,dataList,"",null);
       Map imageMap = new HashMap();
       imageMap.put("PZRY",new PictureRenderData(60,40,"D://file/image/李茂峰.png"));
       lzdglController.createImage(lj,imageMap);
    }

    public String createDocx(Map map,List<RowRenderData> dataList,String type,HttpServletRequest request)throws Exception{
        String fileurl = "";
        String filename = "Wtbg"+UUID.randomUUID()+".doc";
        fileurl = "/file/"+filename;
        /*try {*/
            Configure config = Configure.newBuilder().customPolicy("TABLE", new DetailTablePolicy(dataList,type)).build();
            XWPFTemplate template = XWPFTemplate.compile("D://file/LINZICYBG.docx", config).render(map);
            FileOutputStream out = new FileOutputStream(request.getSession().getServletContext().getRealPath("/")+fileurl);
            template.write(out);
            out.flush();
            out.close();
            template.close();
      /*  }catch (Exception e){
            e.printStackTrace();
        }*/
        return fileurl;
    }

    public String createDocx1ton(Map map,HttpServletRequest request){
        String fileurl = "";
        try {
            String filename = "CYbg1-n" + UUID.randomUUID() + ".docx";
            fileurl = "/file/" + filename;
            /*try {*/
            List<RowRenderData> dataList = new ArrayList<>();
         //   Configure config = Configure.newBuilder().customPolicy("TABLE", new DetailTablePolicy(dataList,"")).build();
            XWPFTemplate template = XWPFTemplate.compile("d:/file/linzi1-n.docx").render(map);
            FileOutputStream out = new FileOutputStream(request.getSession().getServletContext().getRealPath("/") + fileurl);
            template.write(out);
            out.flush();
            out.close();
            template.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return fileurl;
    }

    public String createYPDJBDocx(Map map, List<RowRenderData> dataList, String type, HttpServletRequest request, HttpServletResponse response){
        String fileurl = "";
        String filename = "Wtbg"+UUID.randomUUID()+".docx";
        fileurl = "/file/"+filename;
        try {
            Configure config = Configure.newBuilder().customPolicy("TABLE", new DetailTablePolicy(dataList,type)).build();
            XWPFTemplate template = XWPFTemplate.compile("D://file/YANGPINDENGJIBU.docx", config).render(map);
            FileOutputStream out = new FileOutputStream("D://"+fileurl);
            template.write(out);
            out.flush();
            out.close();
            template.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return "D://"+fileurl;
    }
    public String createYPCLJL(Map map, List<RowRenderData> dataList, String type, HttpServletRequest request, HttpServletResponse response){
        String fileurl = "";
        String filename = "Wtbg"+UUID.randomUUID()+".docx";
        fileurl = "/file/"+filename;
        try {
            Configure config = Configure.newBuilder().customPolicy("TABLE", new DetailTablePolicy(dataList,type)).build();
            XWPFTemplate template = XWPFTemplate.compile("D://file/linzi/YANGPINCHULIJILU.docx", config).render(map);
            FileOutputStream out = new FileOutputStream("D://"+fileurl);
            template.write(out);
            out.flush();
            out.close();
            template.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return "D://"+fileurl;
    }
    public String createImage(String url,Map imageMap){
        try {
        XWPFTemplate template = XWPFTemplate.compile(url).render(imageMap);
        FileOutputStream out = new FileOutputStream(url);
        template.write(out);
        out.flush();
        out.close();
        template.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return url;
    }
    /**
     * 文件下载
     */
    public static HttpServletResponse  exportMillCertificateWord(HttpServletRequest request, HttpServletResponse response,String title, String File) throws IOException {
        File file = null;
        InputStream fin = null;
        ServletOutputStream out = null;
        try {
            // 调用工具类的createDoc方法生成Word文档
            file = new File(File);
            fin = new FileInputStream(file);

            response.setCharacterEncoding("utf-8");
            response.setContentType("application/octet-stream"); //设置内容类型为下
            // 设置浏览器以下载的方式处理该文件名
            String fileName = title+".docx";
            response.setHeader("Content-Disposition", "attachment;filename="+new String(fileName.getBytes(),"ISO8859-1"));

            out = response.getOutputStream();
            byte[] buffer = new byte[512];  // 缓冲区
            int bytesToRead = -1;
            // 通过循环将读入的Word文件的内容输出到浏览器中
            while((bytesToRead = fin.read(buffer)) != -1) {
                out.write(buffer, 0, bytesToRead);
            }

        } finally {
            if(fin != null) fin.close();
            if(out != null) out.close();
            if(file != null) file.delete(); // 删除临时文件
        }
        return  response;
    }
}
