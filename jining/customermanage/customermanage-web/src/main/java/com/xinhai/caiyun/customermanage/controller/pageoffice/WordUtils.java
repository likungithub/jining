 package com.xinhai.caiyun.customermanage.controller.pageoffice;

import freemarker.template.Configuration;
import freemarker.template.Template;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Map;
import java.util.UUID;

public class WordUtils {
    //配置信息,代码本身写的还是很可读的,就不过多注解了
    private static Configuration configuration = null;
    //这里注意的是利用WordUtils的类加载器动态获得模板文件的位置
   /*  private static final String templateFolder = WordUtils.class.getClassLoader().getResource("\\").getPath()+"/template";*/
/*   private static final String templateFolder = "D:/file";
    static {
        configuration = new Configuration();
        configuration.setDefaultEncoding("utf-8");
        try {
            configuration.setDirectoryForTemplateLoading(new File(templateFolder));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }*/

    private WordUtils() {
        throw new AssertionError();
    }

    public static HttpServletResponse  exportMillCertificateWord(HttpServletRequest request, HttpServletResponse response, Map map, String title, String ftlFile) throws IOException {
        configuration = new Configuration();
        configuration.setDefaultEncoding("utf-8");
        configuration.setServletContextForTemplateLoading(request.getSession().getServletContext(), "/template");
        Template freemarkerTemplate = configuration.getTemplate(ftlFile); //获取模板文件
        System.out.print(freemarkerTemplate);
        File file = null;
        InputStream fin = null;
        ServletOutputStream out = null;
        try {
            // 调用工具类的createDoc方法生成Word文档
           file = createDoc(map,freemarkerTemplate);
            /*file = new File(request.getSession().getServletContext().getRealPath("/")+"/"+ftlFile);*/
            fin = new FileInputStream(file);

            response.setCharacterEncoding("utf-8");
            response.setContentType("application/octet-stream"); //设置内容类型为下
            // 设置浏览器以下载的方式处理该文件名
            String fileName = title+UUID.randomUUID()+".doc";
            response.setHeader("Content-Disposition", "attachment;filename="+fileName);

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

    private static File createDoc(Map<?, ?> dataMap, Template template) {
        String name =  "sellPlan.doc";
        File f = new File(name);
        Template t = template;
        try {
            // 这个地方不能使用FileWriter因为需要指定编码类型否则生成的Word文档会因为有无法识别的编码而无法打开
            Writer w = new OutputStreamWriter(new FileOutputStream(f), "utf-8");
            t.process(dataMap, w);
            w.close();
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
        return f;
    }
}

