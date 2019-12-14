package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSONObject;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.dao.BgglMapper;
import com.xinhai.caiyun.customermanage.dao.BgmbxzMapper;
import com.xinhai.caiyun.customermanage.service.BgmbxzService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;
import com.zhuozhengsoft.pageoffice.wordwriter.DataRegionInsertType;
import com.zhuozhengsoft.pageoffice.wordwriter.WordDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FilenameFilter;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;

@Controller
@RequestMapping("/pdfqz")
public class PDFqzController {
    @Autowired
    private BgmbxzService bgmbxzService;
    @Autowired
    private BgglMapper bgglMapper;
    @Autowired
    private BgmbxzMapper bgmbxzMapper;

    public boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }
    //组装通用查询条件
    public Map getQueryTj(HttpServletRequest request) {
        String start = request.getParameter("start");
        String length = request.getParameter("length");
        Map cxtj = new HashMap();
        if (notNULL(start)) {
            cxtj.put("start", start);
        }
        if (notNULL(length)) {
            cxtj.put("length", length);
        }
        User u = CurrentLoginUser.getUser();
        String zydm = u.getZydm();
        cxtj.put("zydm",zydm);
        return cxtj;
    }

    public Map getMap(Map map) {
        Map mm = new HashMap();
        map.forEach((k, v) -> {
            if (v instanceof String) {
                v = ((String) v).trim();
                mm.put(k, v);
            }
            if (v instanceof String[]) {
                mm.put(k, ((String[]) v)[0].trim());
            }
        });
        return mm;
    }

    static class MyExtFilter implements FilenameFilter {
        private String ext;
        MyExtFilter(String ext){
            this.ext=ext;
        }
        public boolean accept(File dir, String name){
            return name.endsWith(ext);
        }
    }


    //获取文件名称
    @RequestMapping(value = "/wjmc", method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage pdfqz_querylist(HttpServletRequest request) {

        Map cxtj = getQueryTj(request);
        String ypmc = request.getParameter("ypmc");
        if(notNULL(ypmc)){
            cxtj.put("ypmc",ypmc);
        }

        //获取指定文件夹下的所有PDF文件
        String path="E:\\pdfceshi";
        String[] pdfFile=(new File(path)).list(new MyExtFilter("pdf"));
        String[] pdfFile1=(new File(path)).list(new MyExtFilter("PDF"));
        ArrayList<String> fileNameList = new ArrayList<>();
        for(String filename:pdfFile){
            fileNameList.add(filename);
        }
        for(String filename:pdfFile1){
            fileNameList.add(filename);
        }

        //与数据库现存在的所有数据进行比较添加
            List<Map> list = bgmbxzMapper.pdfqzfindAll2(cxtj);
            Map mapList = new HashMap();
            boolean b = true;
            for (int i = 0; i < fileNameList.size(); i++) {
                for (Map map1 : list) {
                    if (fileNameList.get(i).equals(map1.get("pdfname"))) {
                        b = false;
                        continue;
                    }
                }
                if (b) {
                    mapList.put("pdfname", fileNameList.get(i));
                    bgmbxzMapper.addpdfname(mapList);
                }
                b = true;
            }

            //数据返回显示
        List<Map> list1 = bgmbxzMapper.pdfqzfindAll(cxtj);
        long totalCount = bgmbxzMapper.pdfqzfindCount(cxtj);
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(totalCount);
        datatablesViewPage.setiTotalRecords(totalCount);
        datatablesViewPage.setAaData(list1);
        return datatablesViewPage;
    }


    //检测结果签字人员
    @RequestMapping(value = "/rydm",method = RequestMethod.POST)
    @ResponseBody
    public List<Map> zjrydm(){
        return bgglMapper.zjrydm();
    }

    //选择人员批量签字
    @RequestMapping(value = "/xzry", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject savexzry(HttpServletRequest request) {
        JSONObject json=new JSONObject();
        //try {
           // Map data = getQueryTj(request);
            Map data = new HashMap();
            Map params = getMap(request.getParameterMap());
            String zydm = CurrentLoginUser.getUser().getZydm();
            data.putAll(params);
            String id = data.get("pdfids")+"";
            String ids[] = id.split(",");

            String bzr=(String)data.get("bzr");//检验人
            String shr=(String)data.get("shr");//校核人

            List<Map> mapList1 = new ArrayList<>();
            for(int i=0;i<ids.length;i++){
                Map m = new HashMap();
                m.put("id",ids[i]);
                m.put("zydm",zydm);
                m.put("jyry",bzr);
                m.put("jhry",shr);
                mapList1.add(m);
            }

            bgmbxzMapper.updatepdfsj(mapList1);

        String pdfname = data.get("pdfnames")+"";
        String pdfnames[] = pdfname.split(",");

        //检验校核人员签字，并在指定文件夹生成新的图片
        if(bzr!=null && !"".equals(bzr) && shr!=null && !"".equals(shr)){
            for(int i=0;i<pdfnames.length;i++) {
                try {
                    PdfReader reader = new PdfReader("E:\\pdfceshi\\" + pdfnames[i]);//指定将和 图片拼接的 PDF
                    PdfReader reader1 = new PdfReader("E:\\pdfceshi\\" + pdfnames[i]);//指定将和 图片拼接的 PDF
                    PdfStamper stamper = new PdfStamper(reader, new FileOutputStream("E:\\pdfceshi\\qzjg1\\" + pdfnames[i]));//生成的PDF 路径
                    PdfStamper stamper1 = new PdfStamper(reader1, new FileOutputStream(request.getSession().getServletContext().getRealPath("/") + "/" + "pdfwj/" + pdfnames[i]));//生成的PDF 路径


                    //获取操作的PDF 的最后一页的页数
                    int pages = reader.getNumberOfPages();
                    //PdfContentByte overContent = stamper.getOverContent(1);
                    PdfContentByte overContent = stamper.getOverContent(pages);
                    PdfContentByte overContent1 = stamper1.getOverContent(pages);


                    //添加图片
                    Image jy = Image.getInstance(request.getSession().getServletContext().getRealPath("/") + "/" + this.bgglMapper.getDzqz(bzr));//检验人员
                    Image jh = Image.getInstance(request.getSession().getServletContext().getRealPath("/") + "/" + this.bgglMapper.getDzqz(shr));//校核人员
                    Image image2 = Image.getInstance(request.getSession().getServletContext().getRealPath("/") + "/" + "image/检验.png");//图片名称
                    Image image3 = Image.getInstance(request.getSession().getServletContext().getRealPath("/") + "/" + "image/校核.png");//图片名称

                    //设置图片比例
                    jy.scalePercent(66);
                    jh.scalePercent(66);
                    image2.scalePercent(66);
                    image3.scalePercent(66);

                    jy.setAbsolutePosition(500, 110);//左边距、底边距
                    jh.setAbsolutePosition(500, 60);//左边距、底边距
                    image2.setAbsolutePosition(450, 110);//左边距、底边距
                    image3.setAbsolutePosition(450, 60);//左边距、底边距
                    overContent.addImage(jy);
                    overContent.addImage(jh);
                    overContent.addImage(image2);
                    overContent.addImage(image3);
                    overContent.stroke();
                    overContent1.addImage(jy);
                    overContent1.addImage(jh);
                    overContent1.addImage(image2);
                    overContent1.addImage(image3);
                    overContent1.stroke();
                    stamper.close();
                    stamper1.close();
                    reader.close();
                    reader1.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        json.put("success",true);
        return json;
    }


    //选择人员批量签字
    @RequestMapping(value = "/jyqz", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject savejyqz(HttpServletRequest request) {
        JSONObject json=new JSONObject();
        //try {
        // Map data = getQueryTj(request);
        Map data = new HashMap();
        Map params = getMap(request.getParameterMap());
        String zydm = CurrentLoginUser.getUser().getZydm();
        data.putAll(params);
        String id = data.get("pdfids")+"";
        String ids[] = id.split(",");

        List<Map> mapList1 = new ArrayList<>();
        for(int i=0;i<ids.length;i++){
            Map m = new HashMap();
            m.put("id",ids[i]);
            m.put("zydm",zydm);
            mapList1.add(m);
        }
        bgmbxzMapper.updatepdfjy(mapList1);

        String pdfname = data.get("pdfnames")+"";
        String pdfnames[] = pdfname.split(",");

        //检验人员签字，并在指定文件夹生成新的图片
        if(zydm!=null && !"".equals(zydm)){
            for(int i=0;i<pdfnames.length;i++) {
                try {
                    PdfReader reader = new PdfReader("E:\\pdfceshi\\" + pdfnames[i]);//指定将和 图片拼接的 PDF
                    PdfReader reader1 = new PdfReader("E:\\pdfceshi\\" + pdfnames[i]);//指定将和 图片拼接的 PDF
                    PdfStamper stamper = new PdfStamper(reader, new FileOutputStream("E:\\pdfceshi\\qzjg1\\" + pdfnames[i]));//生成的PDF 路径
                    PdfStamper stamper1 = new PdfStamper(reader1, new FileOutputStream(request.getSession().getServletContext().getRealPath("/") + "/" + "pdfwj/" + pdfnames[i]));//生成的PDF 路径


                    //获取操作的PDF 的最后一页的页数
                    int pages = reader.getNumberOfPages();
                    //PdfContentByte overContent = stamper.getOverContent(1);
                    PdfContentByte overContent = stamper.getOverContent(pages);
                    PdfContentByte overContent1 = stamper1.getOverContent(pages);


                    //添加图片
                    Image jy = Image.getInstance(request.getSession().getServletContext().getRealPath("/") + "/" + this.bgglMapper.getDzqz(zydm));//检验人员
                    //Image jh = Image.getInstance(request.getSession().getServletContext().getRealPath("/") + "/" + this.bgglMapper.getDzqz(shr));//校核人员
                    Image image2 = Image.getInstance(request.getSession().getServletContext().getRealPath("/") + "/" + "image/检验.png");//图片名称
                    //Image image3 = Image.getInstance(request.getSession().getServletContext().getRealPath("/") + "/" + "image/校核.png");//图片名称

                    //设置图片比例
                    jy.scalePercent(66);
                    //jh.scalePercent(66);
                    image2.scalePercent(66);
                    //image3.scalePercent(66);

                    jy.setAbsolutePosition(500, 110);//左边距、底边距
                    //jh.setAbsolutePosition(500, 60);//左边距、底边距
                    image2.setAbsolutePosition(450, 110);//左边距、底边距
                    //image3.setAbsolutePosition(450, 60);//左边距、底边距
                    overContent.addImage(jy);
                   // overContent.addImage(jh);
                    overContent.addImage(image2);
                    //overContent.addImage(image3);
                    overContent.stroke();
                    overContent1.addImage(jy);
                   // overContent1.addImage(jh);
                    overContent1.addImage(image2);
                    //overContent1.addImage(image3);
                    overContent1.stroke();
                    stamper.close();
                    stamper1.close();
                    reader.close();
                    reader1.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        json.put("success",true);
        return json;
    }


    //选择人员批量签字
    @RequestMapping(value = "/jhqz", method = RequestMethod.POST)
    @ResponseBody
    public JSONObject savejhqz(HttpServletRequest request) {
        JSONObject json=new JSONObject();
        //try {
        // Map data = getQueryTj(request);
        Map data = new HashMap();
        Map params = getMap(request.getParameterMap());
        String zydm = CurrentLoginUser.getUser().getZydm();
        data.putAll(params);
        String id = data.get("pdfids")+"";
        String ids[] = id.split(",");

        List<Map> mapList1 = new ArrayList<>();
        for(int i=0;i<ids.length;i++){
            Map m = new HashMap();
            m.put("id",ids[i]);
            m.put("zydm",zydm);
            mapList1.add(m);
        }
        bgmbxzMapper.updatepdfjh(mapList1);

        String pdfname = data.get("pdfnames")+"";
        String pdfnames[] = pdfname.split(",");

        //检验人员签字，并在指定文件夹生成新的图片
        if(zydm!=null && !"".equals(zydm)){
            for(int i=0;i<pdfnames.length;i++) {
                try {
                    PdfReader reader = new PdfReader("E:\\pdfceshi\\qzjg1\\" + pdfnames[i]);//指定将和 图片拼接的 PDF
                    PdfReader reader1 = new PdfReader("E:\\pdfceshi\\qzjg1\\" + pdfnames[i]);//指定将和 图片拼接的 PDF
                    PdfStamper stamper = new PdfStamper(reader, new FileOutputStream("E:\\pdfceshi\\qzjg2\\" + pdfnames[i]));//生成的PDF 路径
                    PdfStamper stamper1 = new PdfStamper(reader1, new FileOutputStream(request.getSession().getServletContext().getRealPath("/") + "/" + "pdfwj/" + pdfnames[i]));//生成的PDF 路径


                    //获取操作的PDF 的最后一页的页数
                    int pages = reader.getNumberOfPages();
                    //PdfContentByte overContent = stamper.getOverContent(1);
                    PdfContentByte overContent = stamper.getOverContent(pages);
                    PdfContentByte overContent1 = stamper1.getOverContent(pages);


                    //添加图片
                   // Image jy = Image.getInstance(request.getSession().getServletContext().getRealPath("/") + "/" + this.bgglMapper.getDzqz(zydm));//检验人员
                    Image jh = Image.getInstance(request.getSession().getServletContext().getRealPath("/") + "/" + this.bgglMapper.getDzqz(zydm));//校核人员
                   // Image image2 = Image.getInstance(request.getSession().getServletContext().getRealPath("/") + "/" + "image/检验.png");//图片名称
                    Image image3 = Image.getInstance(request.getSession().getServletContext().getRealPath("/") + "/" + "image/校核.png");//图片名称

                    //设置图片比例
                   // jy.scalePercent(66);
                    jh.scalePercent(66);
                    //image2.scalePercent(66);
                    image3.scalePercent(66);

                    //jy.setAbsolutePosition(500, 110);//左边距、底边距
                    jh.setAbsolutePosition(500, 60);//左边距、底边距
                    //image2.setAbsolutePosition(450, 110);//左边距、底边距
                    image3.setAbsolutePosition(450, 60);//左边距、底边距
                    //overContent.addImage(jy);
                     overContent.addImage(jh);
                    //overContent.addImage(image2);
                    overContent.addImage(image3);
                    overContent.stroke();
                    //overContent1.addImage(jy);
                     overContent1.addImage(jh);
                    //overContent1.addImage(image2);
                    overContent1.addImage(image3);
                    overContent1.stroke();
                    stamper.close();
                    stamper1.close();
                    reader.close();
                    reader1.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
        json.put("success",true);
        return json;
    }


}
