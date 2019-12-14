package com.xinhai.caiyun.customermanage.controller;


import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.Tqywt;
import com.xinhai.caiyun.customermanage.service.CydxxglService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("cydxxgl")
public class CydxxglController {
    @Autowired
    private CydxxglService cydxxglService;


    /*查询抽样单*/
    @RequestMapping(value = "/selectcyd")
    @ResponseBody
    public DatatablesViewPage vydaochu (@RequestParam("start") String start,
                                        @RequestParam("length") String length,
                                        @RequestParam("wtbm") String wtid
    ){
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("wtid",wtid);
        List<Map> list = cydxxglService.selectCydLong(map);
        int totalCount=0;
        totalCount= cydxxglService.selectCydLogCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();

        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);

        return dv;
    }
    /*导入Excel表中的数据*/
    @RequestMapping(value = "/downloadCydExcel")
    @OperateLog(describe = "loading.....")
    @ResponseBody
    public void downloadExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String importYqcgsq = "/ExcelModels/cydxxglmodal.xlsx";//导入摸板路径
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName="+new String("cydxxglmodal.xlsx".getBytes("GBK"),"ISO-8859-1"));
        //记录已完成下载的数据
        long downloadlength = 0L;
        try{
            /*①PrintWriter out=response.getWriter();
            out对象用于输出字符流数据
            ②ServletOutputStream  os=response.getOutputStream();
            os用于输出字符流数据或者二进制的字节流数据都可以*/
            //打开本地文件流
            InputStream in = this.getClass().getResourceAsStream(importYqcgsq);
            OutputStream os = response.getOutputStream();
            //字节流循环写入
            byte[]b = new byte[2048];
            int length;
            while ((length = in.read(b))>0){
                os.write(b,0,length);
                downloadlength +=b.length;
            }
            //关闭流
            os.close();
            in.close();
        }catch (Exception e){
            throw e;
        }
    }
    @RequestMapping(value = "/importCydExcel")
    @ResponseBody
    public JSONObject importCgsqExcel(HttpServletRequest request, Model model) throws Exception {
        //获取上传的文件
        String wtid = request.getParameter("wtid");
        MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
        MultipartFile file = multipart.getFile("upcydxxglFile");
        InputStream in = file.getInputStream();
        String name=file.getOriginalFilename();
        //存储导入日志
        Map map=new HashMap();
        Map map1 = new HashMap();

        //查询日志表主键插入t_cydgl_jbxx
        map1.put("wtid",wtid);
        String logId = cydxxglService.selectLogid(map1);
        cydxxglService.importcydExcel(in,file,name,wtid,logId);
        map.put("filename",name);
        map.put("wtid",wtid);
        map.put("lrry", CurrentLoginUser.getUser().getName());
        cydxxglService.insertWtLog(map);
        //数据导入
        in.close();
        JSONObject jo=new JSONObject();
        jo.put("success",true);
        return jo;
    }

    /*查询导入数据*/
    @RequestMapping(value = "/selectExcel")
    @ResponseBody
    public DatatablesViewPage selectExcel (@RequestParam("start") String st,
                                        @RequestParam("length") String le,
                                        @RequestParam("logid") String logid
    ){
        Map map=new HashMap();
        map.put("start", Integer.parseInt(st));
        map.put("length",Integer.parseInt(le));
        map.put("logid",logid);
        List<Map> list = cydxxglService.selectExcel(map);
        int totalCount=0;
        totalCount= cydxxglService.selectExcelCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();

        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);

        return dv;
    }
//    导出数据
    @RequestMapping(value = "/cydDc")
    @ResponseBody
    public JSONObject daoChu(HttpServletRequest request,HttpServletResponse response)throws Exception{
        JSONObject jsonObject = new JSONObject();
        String logid = request.getParameter("logid");
        User u = CurrentLoginUser.getUser();
        String zydm = u.getZydm();
        //清除缓存
        response.reset();
        //创建Map
        Map<String,Object>map = new HashMap<>();
        //指定下载的文件名，浏览器gbk编码，需先用iso-8859-1解码，在用gbk编码
        response.setHeader("Content-Disposition","attachment;filename="+new String("市抽报告.xlsx".getBytes("GBK"),"ISO-8859-1"));
        response.setContentType("application/vnd.ms-excel;charset=UTF-8");
        //清除缓存
        response.setHeader("Pragma","no-cache");
        response.setHeader("Cache-Control","no-cache");
        response.setDateHeader("Expires",0);
        //引用XSSWorkbook
        XSSFWorkbook xssfWorkbook = null;
        xssfWorkbook = cydxxglService.exportyqsbExcel(logid,zydm);
        OutputStream outputStream;
        outputStream = response.getOutputStream();
        BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(outputStream);
        bufferedOutputStream.flush();
        xssfWorkbook.write(bufferedOutputStream);
        bufferedOutputStream.close();

        jsonObject.put("success",true);
        return jsonObject;
    }
    //委托列表
    @RequestMapping(value = "/getWtAll")
    @OperateLog(describe = "企业委托列表")
    @ResponseBody
    public DatatablesViewPage<Tqywt> getWtAll(@RequestParam("start") String start,
                                                @RequestParam("length") String length) throws Exception {
        List<Tqywt> list = new ArrayList<Tqywt>();
        int num = 0;

        list = cydxxglService.findWtAll(Integer.parseInt(start), Integer.parseInt(length));
        num = cydxxglService.findWtAllNums(Integer.parseInt(start), Integer.parseInt(length));

        DatatablesViewPage<Tqywt> datatablesViewPage = new DatatablesViewPage<Tqywt>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }
}
