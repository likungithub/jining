package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.api.SystemMessages;
import com.xinhai.caiyun.customermanage.api.SystemMessagesService;
import com.xinhai.security.api.CurrentLoginUser;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import service.GdzcService;
import service.YqsbtzService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.*;

@Controller
@RequestMapping(value = "gdzc")
public class GdzcController {
@Autowired
    private GdzcService yqsbtzService;
//    @Autowired
//    private SystemMessagesService systemMessagesService;

    @RequestMapping(value = "/yqsbtzDT")
    @ResponseBody
    public DatatablesViewPage cgsp_queryList(@RequestParam("start") String start,
                                             @RequestParam("length") String length,
                                             @RequestParam("gdzcbm") String gdzcbm
    ) {
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("gdzcbm",gdzcbm);
        List<Map> list = yqsbtzService.selectYqsbtz(map);
        int totalCount=0;
        totalCount= yqsbtzService.selectYqtzCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();
        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);
        return dv;
    }
//    @RequestMapping(value = "/xxtx")
//    @ResponseBody
//    public JSONObject fsyqxx(){
//        JSONObject jsonObject= new JSONObject();
//        int fsxz =yqsbtzService.yqjdxxXZfs();
//        if (fsxz==0) {
//            //现设置提前90天发送消息
//            List<Map>listjdzq = yqsbtzService.findyqsbjd();
//            for (int i = 0; i < listjdzq.size(); i++) {
//                String li = listjdzq.get(i).get("jdzq").toString();
//                if(Integer.parseInt(listjdzq.get(i).get("jdzq").toString()) >(365-90)){
//                    String lx = "检定";
//                    Txxtx1(lx);
//                    break;
//                }
//            }
//        }
//        int fsxz1 =yqsbtzService.yqwhxxXZfs();
//        if (fsxz1==0) {
//            //现设置提前90天发送消息
//            List<Map>listwhzq = yqsbtzService.findyqsbwh();
//            for (int i = 0; i < listwhzq.size(); i++) {
//                if (Integer.parseInt(listwhzq.get(i).get("whzq").toString()) >(365-90)) {
//                    String lx = "维护";
//                    Txxtx1(lx);
//                    break;
//                }
//            }
//        }
//        int fsxz2 =yqsbtzService.yqhcxxXZfs();
//        if (fsxz2==0) {
//            //现设置提前90天发送消息
//            List<Map>listhczq = yqsbtzService.findyqsbhc();
//            for (int i = 0; i < listhczq.size(); i++) {
//                if (Integer.parseInt(listhczq.get(i).get("hczq").toString()) >(365-90)) {
//                    String lx = "核查";
//                    Txxtx1(lx);
//                    break;
//                }
//            }
//        }
//        jsonObject.put("success",true);
//        return jsonObject;
//    }
//    public void Txxtx1(String lx){
//        /*推送消息,关于仪器维修*/
//        SystemMessages systemMessages = new SystemMessages();
//        systemMessages.setDljg_bm(CurrentLoginUser.getUser().getDljgBm());
//        systemMessages.setFsry_dm(CurrentLoginUser.getUser().getZydm());
//        systemMessages.setFsry_mc(CurrentLoginUser.getUser().getName());
//        systemMessages.setFssj(new Date());
//        List<String>zydmi = new ArrayList<>();
//        zydmi.add("KJ1000000072");
//        zydmi.add("KJ1000000059");
//        zydmi.add("KJ1000000060");
//        List<String>list = new ArrayList<>();
//        if(lx.equals("检定")){
//            list = yqsbtzService.findJD();
//        }
//        if(lx.equals("维护")){
//            list = yqsbtzService.findWH();
//        }
//        if(lx.equals("核查")){
//            list = yqsbtzService.findHC();
//        }
//        try {
//            //消息提醒
//            String txbt = "";
//            String txnr = "";
//            String txlx = "001";
//            //接收状态(205 抽样任务)
//            if(list.size()>0){
//                for(int i = 0;i<list.size();i++){
//                    txbt="仪器消息提醒";
//                    txnr="你好，"+list.get(i)+"号设备需要"+lx+"，请及时处理";
//                    systemMessages.setXxid(UUID.randomUUID().toString());
//                    systemMessages.setTxlx_dm(txlx);
//                    systemMessages.setTxbt(txbt);
//                    systemMessages.setTxnr(txnr);
//                    //将维修消息发送给指定的人员
//                    for(int k = 0;k<zydmi.size();k++){
//                        systemMessages.setJsry_dm(zydmi.get(k));
//                        systemMessagesService.addSystemMessages(systemMessages);
//                    }
//                }
//            }
//        } catch (Exception e) {
//            System.out.println("发送消息提醒错误！");
//            e.printStackTrace();
//        }
//    }
    /*新增仪器设备*/
    @RequestMapping(value = "/addNewGdzc")
    @ResponseBody
    public JSONObject addNew(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map<String, Object> params = request.getParameterMap();
        Map map = new HashMap();
        for(Map.Entry<String, Object> entry : params.entrySet()){
            String mapKey = entry.getKey();
            String mapValue = String.join(",",(String[])entry.getValue());
            map.put(mapKey, mapValue);
        }
        yqsbtzService.insertNewYqsb(map);
        jsonObject.put("success",true);
        return jsonObject;
    }
    /*修改仪器设备信息*/
    @RequestMapping(value = "/updateGdzc")
    @ResponseBody
    public JSONObject updateYqsb(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map<String, Object> params = request.getParameterMap();
        Map map = new HashMap();
        for(Map.Entry<String, Object> entry : params.entrySet()){
            String mapKey = entry.getKey();
            String mapValue = String.join(",",(String[])entry.getValue());
            map.put(mapKey, mapValue);
        }
        yqsbtzService.updateYqsbtz(map);
        jsonObject.put("success",true);
        return jsonObject;
    }
//    /*导入Excel表中的数据*/
//    @RequestMapping(value = "/downloadYqtzExcel")
//    @OperateLog(describe = "loading.....")
//    @ResponseBody
//    public void downloadExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
//        String importYqcgsq = "/ExcelModel/yasbtzmodal2.xlsx";//导入摸板路径
//        //设置响应头和客户端保存文件名
//        response.setCharacterEncoding("utf-8");
//        response.setContentType("multipart/form-data");
//        response.setHeader("Content-Disposition", "attachment;fileName="+new String("yqsbtzmodal.xlsx".getBytes("GBK"),"ISO-8859-1"));
//        //记录已完成下载的数据
//        long downloadlength = 0L;
//        try{
//            /*①PrintWriter out=response.getWriter();
//            out对象用于输出字符流数据
//            ②ServletOutputStream  os=response.getOutputStream();
//            os用于输出字符流数据或者二进制的字节流数据都可以*/
//            //打开本地文件流
//            InputStream in = this.getClass().getResourceAsStream(importYqcgsq);
//            OutputStream os = response.getOutputStream();
//            //字节流循环写入
//            byte[]b = new byte[2048];
//            int length;
//            while ((length = in.read(b))>0){
//                os.write(b,0,length);
//                downloadlength +=b.length;
//            }
//            //关闭流
//            os.close();
//            in.close();
//        }catch (Exception e){
//            throw e;
//        }
//    }
//    @RequestMapping(value = "/importYqsbtzExcel")
//    @ResponseBody
//    public JSONObject importCgsqExcel(HttpServletRequest request, Model model) throws Exception {
//        //获取上传的文件
//        MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
//        MultipartFile file = multipart.getFile("upYqcgtzFile");
//        InputStream in = file.getInputStream();
//        String name=file.getOriginalFilename();
//        yqsbtzService.importyqsbtzExcel(in,file,name);
//        //数据导入
//        in.close();
//        JSONObject jo=new JSONObject();
//        jo.put("success",true);
//        return jo;
//    }
    @RequestMapping(value = "/deleteGdzc")
    @ResponseBody
    public JSONObject delYq(Integer []yqtzche){
        JSONObject jsonObject = new JSONObject();
        Map map = new HashMap();
        for(Integer ch:yqtzche){
            map.put("id",ch);
            yqsbtzService.deleteYqsbtz(map);
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
//    /*导出数据*/
//    @RequestMapping(value = "/tzxxDc")
//    @ResponseBody
//    public JSONObject daoChu(HttpServletRequest request,HttpServletResponse response)throws Exception{
//        JSONObject jsonObject = new JSONObject();
//        String skbhs = request.getParameter("skbhs");
//        String[]skbhs1 = skbhs.split(",");
//        if (skbhs1.length>0){
//            //清除缓存
//            response.reset();
//            //创建Map
//            Map<String,Object>map = new HashMap<>();
//            //指定下载的文件名，浏览器gbk编码，需先用iso-8859-1解码，在用gbk编码
//            response.setHeader("Content-Disposition","attachment;filename="+new String("仪器设备台账.xlsx".getBytes("GBK"),"ISO-8859-1"));
//            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
//            //清除缓存
//            response.setHeader("Pragma","no-cache");
//            response.setHeader("Cache-Control","no-cache");
//            response.setDateHeader("Expires",0);
//            //引用XSSWorkbook
//            XSSFWorkbook xssfWorkbook = null;
//            xssfWorkbook = yqsbtzService.exportyqsbExcel(skbhs1);
//            OutputStream outputStream;
//            outputStream = response.getOutputStream();
//            BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(outputStream);
//            bufferedOutputStream.flush();
//            xssfWorkbook.write(bufferedOutputStream);
//            bufferedOutputStream.close();
//        }
//        jsonObject.put("success",true);
//        return jsonObject;
//    }
}
