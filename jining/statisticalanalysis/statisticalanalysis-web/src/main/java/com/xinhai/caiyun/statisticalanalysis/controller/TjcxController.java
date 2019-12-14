package com.xinhai.caiyun.statisticalanalysis.controller;
import com.alibaba.fastjson.JSONObject;
import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.config.Configure;
import com.deepoove.poi.data.PictureRenderData;
import com.deepoove.poi.data.RowRenderData;
import com.deepoove.poi.data.TextRenderData;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.statisticalanalysis.api.TjcxService;
import com.xinhai.security.api.CurrentLoginUser;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class TjcxController {
    @Autowired
    private TjcxService tjcxService;

    //检测量统计
    @RequestMapping(value = "/jcltj/queryList" ,method = RequestMethod.POST)
    @ResponseBody
    //查找所有的检测量统计数据
    public DatatablesViewPage jcltj_queryList(@RequestParam("start") String start,
                                              @RequestParam("length") String length,
                                              @RequestParam("jcry") String jcry,
                                              @RequestParam("jcks") String jcks,
                                              @RequestParam("jclbdm") String jclbdm,
                                              @RequestParam("startDate") String startDate,
                                              @RequestParam("endDate") String endDate
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("jcry",jcry);
        map.put("jcks",jcks);
        map.put("jclbdm",jclbdm);
        SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd");
        if(startDate!=null && startDate!=""){
            try {
                map.put("startDate",sf.parse(startDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if(endDate!=null && endDate!=""){
            try {
                map.put("endDate",sf.parse(endDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        List<Map> list=tjcxService.jcltj_queryList(map);
        int totalCount=0;
        totalCount=tjcxService.jcltj_findCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }

    //科室检测量统计
    @RequestMapping(value = "/ksjcl/queryList" ,method = RequestMethod.POST)
    @ResponseBody
    //查找所有的检测量统计数据
    public DatatablesViewPage ksjcl_queryList(@RequestParam("start") String start,
                                              @RequestParam("length") String length,
                                              @RequestParam("jcry") String jcry,
                                              @RequestParam("jcks") String jcks,
                                              @RequestParam("jclbdm") String jclbdm,
                                              @RequestParam("startDate") String startDate,
                                              @RequestParam("endDate") String endDate
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("jcry",jcry);
        map.put("jcks",jcks);
        map.put("jclbdm",jclbdm);
        SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd");
        if(startDate!=null && startDate!=""){
            try {
                map.put("startDate",sf.parse(startDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if(endDate!=null && endDate!=""){
            try {
                map.put("endDate",sf.parse(endDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        List<Map> list=tjcxService.ksjcl_queryList(map);
        int totalCount=0;
        totalCount=tjcxService.ksjcl_findCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }


    //报告发放统计
    @RequestMapping(value = "/bgfftj/queryList" ,method = RequestMethod.POST)
    @ResponseBody
    //查找所有的检测量统计数据
    public DatatablesViewPage bgfftj_queryList(@RequestParam("start") String start,
                                               @RequestParam("length") String length,
                                               @RequestParam("wtid") String wtid,
                                               @RequestParam("ypmc") String ypmc,
                                               @RequestParam("startDate") String startDate,
                                               @RequestParam("endDate") String endDate

    ) {
        Map map=new HashMap();
        SimpleDateFormat smf=new SimpleDateFormat("yyyy-MM-dd");
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        if(notNULL(wtid)){
            map.put("wtid",wtid);
        }
        if(notNULL(ypmc)){
            map.put("ypmc",ypmc);
        }
        if (notNULL(startDate)){
            try {
                map.put("startDate",smf.parse(startDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if(notNULL(endDate)){
            try {
                map.put("endDate",smf.parse(endDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        List<Map> list=tjcxService.bgfftj_queryList(map);
        int totalCount=0;
        totalCount=tjcxService.bgfftj_findCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
    /**
     *
     * 不为空的检测
     */
    public boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }

    @RequestMapping(value = "/bgfftj/bgff",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject queryListbgff(HttpServletRequest request) {
        JSONObject json=new JSONObject();
        try {
            Map map=new HashMap();
            SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
            String[] arr_ids=request.getParameter("ids").split(",");
            List list_ids=new ArrayList();
            for(int i=0;i<arr_ids.length;i++){
                list_ids.add(arr_ids[i]);
            }
            String bgffrq=sf.format(new Date());//报告发放日期
            map.put("ids",list_ids);//委托的id集合
            map.put("bgffrq",bgffrq);
            map.put("bgffr",CurrentLoginUser.getUser().getZydm());//报告发放人员代码
            map.put("bgffzt","002");//报告发放状态
            tjcxService.updateBgff(map);
            json.put("success",true);
        }catch (Exception e){
            json.put("success",false);
        }
        return json;
    }
    /**
     *
     * 采购验收 打印验收单
     */
    @RequestMapping(value = "/bgfftj/printReport")
    public String printReport(HttpServletRequest  request) {
        PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("保存并关闭","Save",1);
        poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        //设置保存的action
        poCtrl.setSaveFilePage("savefile.do");
        String[] idsArry = request.getParameter("ids").split(",");
        List ids = new ArrayList();
        for (int i = 0; i < idsArry.length; i++) {
            ids.add(idsArry[i]);
        }
        List<Map> list = tjcxService.bgfftj_getData(ids);
        String sourceUrl=request.getSession().getServletContext().getRealPath("/template/bgffjlModel.docx");//模板路径
        Map map = new HashMap();
        Map photoMap=new HashMap();
        List<RowRenderData> dataList = new ArrayList();
        List<RowRenderData> photoList = new ArrayList();
        List<TextRenderData> data = null;
        for(int i=0;i<list.size();i++){
            Map map1 = list.get(i);
            String wtid = map1.get("wtid") + "";//报告编号
            String dwmc= map1.get("dwmc") + "";//.单位名称
            String ypmc= map1.get("ypmc") + "";//产品名称
            String bgffrq= map1.get("bgffrq") + "";//发放日期
            String bglqr=map1.get("bglqr") + "";//报告领取人的图片路径
            String bz=map1.get("bz") + "";//备注
            data = new ArrayList<>();
            data.add(0, new TextRenderData(isNull(wtid)));
            data.add(1, new TextRenderData(isNull(dwmc)));
            data.add(2, new TextRenderData(isNull(ypmc)));
            data.add(3, new TextRenderData(isNull(bgffrq)));
            data.add(4, new TextRenderData("{{@photo"+i+"}}"));
            data.add(5, new TextRenderData(isNull(bz)));
            dataList.add(new RowRenderData(data));
            photoMap.put("photo"+i, new PictureRenderData(60,40,bglqr));
        }
        String  tempPath = createDocx(map, dataList,request,sourceUrl);//暂时获得没有图片的路径
        String path= createDocx(photoMap, photoList,request,tempPath);//得到文件的存放路径
        String realpath = path.replace("/", "\\\\");
        //打开word
        poCtrl.webOpen( realpath, OpenModeType.docReadOnly, "张三");
        return "pageoffice/Word";
    }
    /**
     *如果是空值  就返会字符串
     */
    public String isNull(String str) {
        if (str == null || "null".equals(str)) {
            str = "";
        }
        return str;
    }
    /**
     *创建world文件 并且返会文件路径
     */
    public String createDocx(Map map, List<RowRenderData> dataList,HttpServletRequest request,String sourceUrl) {
        String tartPath="";
        try {
            Configure config = Configure.newBuilder().customPolicy("bglqjl_table", new DetailTablePolicy1(dataList)).build();
            XWPFTemplate template = XWPFTemplate.compile(sourceUrl, config).render(map);
            String director =request.getSession().getServletContext().getRealPath("/doc");
            File file =new File(director);
            if(!file.exists()){//如果该文件不存在就创建
                file.mkdir();
            }
            tartPath=director+"/bglqjl1.docx";
            FileOutputStream out = new FileOutputStream(tartPath);
            template.write(out);
            out.flush();
            out.close();
            template.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tartPath;
    }

}
