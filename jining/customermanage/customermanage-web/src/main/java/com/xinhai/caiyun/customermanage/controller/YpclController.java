package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;

import com.xinhai.caiyun.customermanage.api.Ypclxx;
import com.xinhai.caiyun.customermanage.api.ypclsp;
import com.xinhai.caiyun.customermanage.service.YpclService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.service.UserService;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.naming.Name;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("ypclz")
public class YpclController {
    @Autowired
    private YpclService ypclService;

    @Autowired
    private UserService userService;

    /**
     * 获取首页样品接收样品详情列表
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getYpclView")
    @ResponseBody
    @Transactional
    public DatatablesViewPage getYpclView(@RequestParam("start") String start,
                                                 @RequestParam("length") String length,
                                                 @RequestParam(value = "ypmc",required = false) String ypmccx,
                                                 @RequestParam(value = "wtid",required = false) String wtidcx
                                                        ) throws Exception {
        int num = 0;
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        map.put("wtid", wtidcx);
        map.put("ypmc", ypmccx);

        List<Map> list = ypclService.getYpclJsAll(map);
        num = ypclService.getYpclJsNums(map);

        List<Map> listpj = new ArrayList<Map>();
        for (int i = 0; i < list.size(); i++){
            Map map1 = new HashMap();
            String sqsj =list.get(i).get("sqsj").toString().substring(0,10);
            String sqry = ypclService.getCustomerName(list.get(i).get("sqry").toString());
            String clry = ypclService.getCustomerName(list.get(i).get("clry").toString());
            String clyy =list.get(i).get("clyy").toString();
            String ypid =list.get(i).get("ypid").toString();
            String wtidCL =list.get(i).get("wtid").toString();
            String zl =list.get(i).get("zl").toString();
            String ypmcCL =list.get(i).get("ypmc") == null ? "" : list.get(i).get("ypmc").toString();
            String clfs =list.get(i).get("clfs").toString();
            String bz =list.get(i).get("bz").toString();
            String zt =list.get(i).get("zt").toString();
            String ypbm =list.get(i).get("ypbm") == null ? "" : list.get(i).get("ypbm").toString();
            String id =list.get(i).get("id").toString();
            if (list.get(i).get("qrry") != "" && list.get(i).get("qrry") != null){
                String qrry =list.get(i).get("qrry").toString();
                map1.put("qrry",qrry);
            }
            if (list.get(i).get("qrsj") != "" && list.get(i).get("qrsj") != null){
                String qrsj =list.get(i).get("qrsj").toString();
                map1.put("qrsj",qrsj);
            }
            if (list.get(i).get("info") != "" && list.get(i).get("info") != null){
                String info =list.get(i).get("info").toString();
                map1.put("info",info);
            }

            map1.put("sqry",sqry);
            map1.put("clry",clry);
            map1.put("sqsj",sqsj);
            map1.put("clyy",clyy);
            map1.put("ypid",ypid);
            map1.put("wtid",wtidCL);
            map1.put("zl",zl);
            map1.put("ypmc",ypmcCL);
            map1.put("clfs",clfs);
            map1.put("bz",bz);
            map1.put("zt",zt);
            map1.put("ypbm",ypbm);
            map1.put("id",id);
            listpj.add(map1);
        }


        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(listpj);
        return datatablesViewPage;
    }

    /**
     * 样品处理信息选择页面  查询全部样品信息
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/SampleChoiceQuery")
    @ResponseBody
    public DatatablesViewPage SampleChoiceQuery(@RequestParam("start") String start,
                                                @RequestParam("length") String length) throws Exception {
        int num = 0;
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));

        num = ypclService.getSampleChoiceNums(map);
        List<Map> list = ypclService.getSampleChoiceAll(map);

        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(list);
        return datatablesViewPage;
    }

    /**
     * 回显单条样品信息
     */
    @ResponseBody
    @RequestMapping(value = "/AloneSampleChoic")
    public Map AloneSampleChoic(HttpServletRequest request, @RequestBody String[] ids ){
        String id = ids[0];
        Map map = ypclService.getAloneSampleChoice(id);
        return map;
    }

    /**
     * 样品处理详细信息页面  处理人查询，全部
     */
    @ResponseBody
    @RequestMapping(value = "/SampleProcessorPeople")
    public List<Map> SampleProcessorPeople(){
        List<Map>  map = ypclService.getSampleProcessorPeople();
        return map;
    }

    /**
     * 样品处理信息添加
     * @param khxx
     * @return
     */
    @RequestMapping(value = "/saveYpclxx")
    @ResponseBody
    public JSONObject saveYpclxx(@RequestBody String khxx) {
        Ypclxx ypclxx = JSON.parseObject(khxx, Ypclxx.class);
        ypclxx.setZt("0");
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        ypclxx.setSqsj(df.format(new Date()));
        User user = userService.getUser(CurrentLoginUser.getUser().getId());//获取当前登录用户信息
        ypclxx.setSqry(user.getId());

        ypclService.setCreateYpclxx(ypclxx);

        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }


    //样品处理审批界面

    /**
     * 获取首页样品处理审批详情列表
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getYpclSPView")
    @ResponseBody
    public DatatablesViewPage getYpclSPView(@RequestParam("start") String start,
                                          @RequestParam("length") String length,
                                          @RequestParam(value = "ypmc",required = false) String ypmccx,
                                          @RequestParam(value = "wtid",required = false) String wtidcx
    ) throws Exception {
        int num = 0;
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        map.put("wtid", wtidcx);
        map.put("ypmc", ypmccx);
        List<Map> list = ypclService.getYpclSPAll(map);
        num = ypclService.getYpclSPNums(map);

        List<Map> listpj = new ArrayList<Map>();
        for (int i = 0; i < list.size(); i++){
            Map map1 = new HashMap();
            String sqsj =list.get(i).get("sqsj").toString().substring(0,10);
            String sqry = ypclService.getCustomerName(list.get(i).get("sqry").toString());
            String clry = ypclService.getCustomerName(list.get(i).get("clry").toString());
            String clyy =list.get(i).get("clyy").toString();
            String ypid =list.get(i).get("ypid").toString();
            String wtidCL =list.get(i).get("wtid").toString();
            String zl =list.get(i).get("zl").toString();
            String ypmcCL =list.get(i).get("ypmc") == null ? "" : list.get(i).get("ypmc").toString();
            String clfs =list.get(i).get("clfs").toString();
            String bz =list.get(i).get("bz").toString();
            String zt =list.get(i).get("zt").toString();
            String ypbm =list.get(i).get("ypbm") == null ? "" : list.get(i).get("ypbm").toString();
            String id =list.get(i).get("id").toString();
            if (list.get(i).get("qrry") != "" && list.get(i).get("qrry") != null){
                String qrry =list.get(i).get("qrry").toString();
                map1.put("qrry",qrry);
            }
            if (list.get(i).get("qrsj") != "" && list.get(i).get("qrsj") != null){
                String qrsj =list.get(i).get("qrsj").toString();
                map1.put("qrsj",qrsj);
            }
            if (list.get(i).get("info") != "" && list.get(i).get("info") != null){
                String info =list.get(i).get("info").toString();
                map1.put("info",info);
            }

            map1.put("sqry",sqry);
            map1.put("clry",clry);
            map1.put("sqsj",sqsj);
            map1.put("clyy",clyy);
            map1.put("ypid",ypid);
            map1.put("wtid",wtidCL);
            map1.put("zl",zl);
            map1.put("ypmc",ypmcCL);
            map1.put("clfs",clfs);
            map1.put("bz",bz);
            map1.put("zt",zt);
            map1.put("ypbm",ypbm);
            map1.put("id",id);
            listpj.add(map1);
        }
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(listpj);
        return datatablesViewPage;
    }

    /**
     * 样品审批信息  通过
     * @param ids
     * @return
     */
    @RequestMapping(value = "/savaYpclSPAdopt")
    @ResponseBody
    @Transactional
    public JSONObject savaYpclSPAdopt(@RequestBody int[] ids) { //参数id 是样品处理信息表的id
        int id = ids[0];
        String zt ="1";
        Ypclxx ypclxx2 = new Ypclxx();
        ypclxx2.setId(id);
        ypclxx2.setZt(zt);
        ypclService.getSampleApprovalUpdateZT(ypclxx2);//根据样品处理信息表id，修改状态

        ypclsp ypclsp = new ypclsp();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        ypclsp.setSpsj(df.format(new Date()));
        User user = userService.getUser(CurrentLoginUser.getUser().getId());//获取当前登录用户信息
        ypclsp.setSpry(user.getName());
        ypclsp.setYpclid(id);
        ypclsp.setSpjg("1");
        ypclService.getCreateYpclSP(ypclsp);

        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }

    /**
     * 样品审批信息  退回
     * @param
     * @return
     */
    @RequestMapping(value = "/savaYpclSReturn")
    @ResponseBody
    @Transactional
    public JSONObject savaYpclSReturn(@RequestBody String khxx) {
        ypclsp ypclsp = JSON.parseObject(khxx,ypclsp.class);

        Ypclxx ypclxx = new Ypclxx();
        ypclxx.setId(ypclsp.getId());
        ypclxx.setZt("2");
        ypclService.getSampleApprovalUpdateZT(ypclxx);//根据样品处理信息表id，修改状态

        ypclsp ypclsp2 = new ypclsp();
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        ypclsp2.setSpsj(df.format(new Date()));
        User user = userService.getUser(CurrentLoginUser.getUser().getId());//获取当前登录用户信息
        ypclsp2.setSpry(user.getName());
        ypclsp2.setYpclid(ypclsp.getId());
        ypclsp2.setInfo(ypclsp.getInfo());
        ypclsp2.setSpjg("0");
        ypclService.getCreateYpclSP(ypclsp2);

        JSONObject object = new JSONObject();
        object.put("success", true);
        return object;
    }


    //样品处理确认界面

    /**
     * 获取首页样品处理确认详情列表
     * @return 客户信息
     * @throws Exception 抛出异常
     */
    @RequestMapping(value = "/getYpclQRView")
    @ResponseBody
    public DatatablesViewPage getYpclQRView(@RequestParam("start") String start,
                                            @RequestParam("length") String length,
                                            @RequestParam(value = "ypmc",required = false) String ypmccx,
                                            @RequestParam(value = "wtid",required = false) String wtidcx
    ) throws Exception {
        int num = 0;
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        map.put("wtid", wtidcx);
        map.put("ypmc", ypmccx);
        List<Map> list = ypclService.getYpclQRAll(map);
        num = ypclService.getYpclQRNums(map);

        List<Map> listpj = new ArrayList<Map>();
        for (int i = 0; i < list.size(); i++){
            Map map1 = new HashMap();
            String sqsj =list.get(i).get("sqsj").toString().substring(0,10);
            String sqry = ypclService.getCustomerName(list.get(i).get("sqry").toString());
            String clry = ypclService.getCustomerName(list.get(i).get("clry").toString());
            String clyy =list.get(i).get("clyy").toString();
            String ypid =list.get(i).get("ypid").toString();
            String wtidCL =list.get(i).get("wtid").toString();
            String zl =list.get(i).get("zl").toString();
            String ypmcCL =list.get(i).get("ypmc") == null ? "":list.get(i).get("ypmc").toString();
            String clfs =list.get(i).get("clfs").toString();
            String bz =list.get(i).get("bz").toString();
            String zt =list.get(i).get("zt").toString();
            String ypbm =list.get(i).get("ypbm")== null ? "":list.get(i).get("ypbm").toString();
            String id =list.get(i).get("id").toString();
            if (list.get(i).get("qrry") != "" && list.get(i).get("qrry") != null){
                String qrry =list.get(i).get("qrry").toString();
                map1.put("qrry",qrry);
            }
            if (list.get(i).get("qrsj") != "" && list.get(i).get("qrsj") != null){
                String qrsj =list.get(i).get("qrsj").toString();
                map1.put("qrsj",qrsj);
            }
            if (list.get(i).get("info") != "" && list.get(i).get("info") != null){
                String info =list.get(i).get("info").toString();
                map1.put("info",info);
            }

            map1.put("sqry",sqry);
            map1.put("clry",clry);
            map1.put("sqsj",sqsj);
            map1.put("clyy",clyy);
            map1.put("ypid",ypid);
            map1.put("wtid",wtidCL);
            map1.put("zl",zl);
            map1.put("ypmc",ypmcCL);
            map1.put("clfs",clfs);
            map1.put("bz",bz);
            map1.put("zt",zt);
            map1.put("ypbm",ypbm);
            map1.put("id",id);
            listpj.add(map1);
        }
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setAaData(listpj);
        return datatablesViewPage;
    }

    //补 样品处理申请界面  修改操作
    /**
     * 回显单条样品处理详细信息
     */
    @ResponseBody
    @RequestMapping(value = "/AloneSampleprocessInformation")
    public Map AloneSampleprocessInformation(@RequestBody String[] xgids ){
        String ids = xgids[0];
        Map map = ypclService.getAloneSampleHandleChoice(ids);
        return map;
    }

    /**
     * 样品处理信息修改
     * @param
     * @return
     */
    @RequestMapping(value = "/updateYpclxx")
    @ResponseBody
    public JSONObject updateYpclxx(HttpServletRequest request){
        JSONObject jsonObject = new JSONObject();
        Map map = request.getParameterMap();
        Map map2 = new HashMap();
        map2.put("id",((String[])map.get("id"))[0]);
        map2.put("ypid",((String[])map.get("ypid"))[0]);
        map2.put("wtid",((String[])map.get("wtid"))[0]);
        map2.put("zl",((String[])map.get("zl"))[0]);
        map2.put("clyy",((String[])map.get("clyy"))[0]);
        map2.put("clfs",((String[])map.get("clfs"))[0]);
        map2.put("clry",((String[])map.get("clry"))[0]);
        map2.put("bz",((String[])map.get("bz"))[0]);

        map2.put("zt","0");
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        map2.put("sqsj",df.format(new Date()));
        User user = userService.getUser(CurrentLoginUser.getUser().getId());//获取当前登录用户信息
        map2.put("sqry",user.getId());
        ypclService.getSampleInformationAllUpdateZT(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }

    /*导入Excel表中的数据*/
    @RequestMapping(value = "/downloadYpclExcel")
    @OperateLog(describe = "loading.....")
    @ResponseBody
    public void downloadExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String importYqcgsq = "/ExcelModels/ypclmodel.xlsx";//导入摸板路径
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName="+new String("ypclmodel.xlsx".getBytes("GBK"),"ISO-8859-1"));
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
    @RequestMapping(value = "/importYpclExcel")
    @ResponseBody
    public JSONObject importCgsqExcel(HttpServletRequest request, Model model) throws Exception {
        //获取上传的文件
        MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
        MultipartFile file = multipart.getFile("ypclFile");
        InputStream in = file.getInputStream();
        String name=file.getOriginalFilename();
        //yprkService.importYprkExcel(in,file,name);
        ypclService.importYpclExcel(in,file,name);
        //数据导入
        in.close();
        JSONObject jo=new JSONObject();
        jo.put("success",true);
        return jo;
    }

    /*导出数据*/
    @RequestMapping(value = "/ypclDc")
    @ResponseBody
    public JSONObject daoChu(HttpServletRequest request, HttpServletResponse response)throws Exception{
        JSONObject jsonObject = new JSONObject();
        String ids = request.getParameter("id");
        String[]ids1 = ids.split(",");
        if (ids1.length>0){
            //清除缓存
            response.reset();
            //创建Map
            Map<String,Object>map = new HashMap<>();
            //指定下载的文件名，浏览器gbk编码，需先用iso-8859-1解码，在用gbk编码
            response.setHeader("Content-Disposition","attachment;filename="+new String("入库样品详情.xlsx".getBytes("GBK"),"ISO-8859-1"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            //清除缓存
            response.setHeader("Pragma","no-cache");
            response.setHeader("Cache-Control","no-cache");
            response.setDateHeader("Expires",0);
            //引用XSSWorkbook
            XSSFWorkbook xssfWorkbook = null;
            xssfWorkbook = ypclService.exportYpclExcel(ids1);
            OutputStream outputStream;
            outputStream = response.getOutputStream();
            BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(outputStream);
            bufferedOutputStream.flush();
            xssfWorkbook.write(bufferedOutputStream);
            bufferedOutputStream.close();
        }
        jsonObject.put("success",true);
        return jsonObject;
    }

    /**
     * 样品处理确认页面  确认操作
     * @param
     * @return
     */
    @RequestMapping(value = "/SampleInfoConfirm")
    @ResponseBody
    public JSONObject SampleInfoConfirm(@RequestBody String[] ids){
        Map map2 = new HashMap();
        String id = ids[0];
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        map2.put("qrsj",df.format(new Date()));
        User user = userService.getUser(CurrentLoginUser.getUser().getId());//获取当前登录用户信息
        map2.put("qrry",user.getName());
        map2.put("zt","3");
        map2.put("id",id);

        JSONObject jsonObject = new JSONObject();
        ypclService.getSampleInfoConfirm(map2);
        jsonObject.put("success",true);
        return jsonObject;
    }
}
