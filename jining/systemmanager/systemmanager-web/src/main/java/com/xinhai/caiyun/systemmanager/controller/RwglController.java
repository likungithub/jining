package com.xinhai.caiyun.systemmanager.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.systemmanager.api.Scgl;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import service.RwglService;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

;

/**
 * 省抽管理中的任务管理
 */
@Controller
@RequestMapping("/rwgl")
public class RwglController {
    @Autowired
    private RwglService rwglService;

    /**
     * 查找所有任务管理的的数量
     * @return
     */
    @RequestMapping(value = "/findAllRwgl",method = RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage<Map> findAllRwgl(@RequestParam("start") String start,
                                               @RequestParam("length") String length,
                                               @RequestParam("ypmc") String ypmc,
                                               @RequestParam("rwlx") String rwlx,
                                               @RequestParam("startDate") String startDate,
                                               @RequestParam("endDate") String endDate
                                                ){
        DatatablesViewPage<Map> datatablesViewPage=new DatatablesViewPage<Map>();
        SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd");
        Map map=new HashMap();
        map.put("start",Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("ypmc",ypmc);
        map.put("rwlx",rwlx);
        if(startDate!=null && !"".equals(startDate)){
            try {
                map.put("startDate",sf.parse(startDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if(endDate!=null && !"".equals(endDate)){
            try {
                map.put("endDate",sf.parse(endDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        List<Map> list=rwglService.findAllRwgl(map);
        Integer num=rwglService.findAllRwglNum(map);
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalDisplayRecords(num);
        datatablesViewPage.setiTotalRecords(num);
        return datatablesViewPage;
    }
/**
 * 接收json串信息
 */
@RequestMapping(value = "/jieshouJson",method = RequestMethod.POST)
@ResponseBody
public JSONObject jieshouJson(String  info){
    JSONObject data=JSONObject.parseObject(info);
    List<Scgl> list=new ArrayList<Scgl>();
    Scgl scgl=null;
    JSONArray array=data.getJSONArray("itemsInfo");
    for(int i=0;i<array.size();i++){
        scgl=new Scgl();
        JSONObject jcxm=array.getJSONObject(i);
        scgl.setJyxm(String.valueOf(jcxm.get("inspectionItemName")));//检验项目
        scgl.setJyxmid(String.valueOf(jcxm.get("id")));//检验项目id
        scgl.setJyyj(String.valueOf(jcxm.get("byLaw")));//检验依据
        scgl.setPdyj(String.valueOf(jcxm.get("inspectionMethod")));//判定依据
        scgl.setFfjcx(String.valueOf(jcxm.get("methodDetectionLimit")));//方法检出限
        scgl.setFfjcxdw(String.valueOf(jcxm.get("methodDetectionLimitUnit")));//方法检出限单位
        scgl.setBzffjcx(String.valueOf(jcxm.get("limitAmount")));//标准方法检出限
        scgl.setBzffjcxdw(String.valueOf(jcxm.get("unitOfMesurement")));//标准方法检出限单位
        scgl.setBzzxyxx(String.valueOf(jcxm.get("standardMinAllowLimit")));//标准最小允许限
        scgl.setBzzxyxxdw(String.valueOf(jcxm.get("standardMinAllowLimitUnit")));//标准最小允许限单位
        scgl.setBzzdyxx(String.valueOf(jcxm.get("standardMaxAllowLimit")));// 标准最大允许限
        scgl.setBzzdyxxdw(String.valueOf(jcxm.get("standardMaxAllowLimitUnit")));//标准最大允许限单位
        scgl.setZxyxx(String.valueOf(jcxm.get("minAllowLimit")));//最小允许限
        scgl.setZxyxxdw(String.valueOf(jcxm.get("minAllowLimitUnit")));//最小允许限单位
        scgl.setZdyxx(String.valueOf(jcxm.get("maxAllowLimit")));//最大允许限
        scgl.setZdyxxdw(String.valueOf(jcxm.get("maxAllowLimitUnit")));//最大允许限单位
        scgl.setJgpd(String.valueOf(jcxm.get("problemItemConclusion")));//问题产品检验结论
        scgl.setSpflid(String.valueOf(jcxm.get("foodCategoryId")));//食品分类id
        list.add(scgl);
    }
    rwglService.addInterfaceJson(list);
    JSONObject callback=new JSONObject();
    callback.put("flag",true);
    return callback;
}
    /**
     * 导入Excel
     * @param request
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/importRwglExcel",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject importRwglExcel(HttpServletRequest request, Model model) throws Exception {
        //获取上传的文件
        MultipartHttpServletRequest multipart = (MultipartHttpServletRequest) request;
        MultipartFile file = multipart.getFile("upfile");
        InputStream in = file.getInputStream();
        rwglService.importRwglExcel(in,file);
        //数据导入
        in.close();
        JSONObject jo=new JSONObject();
        jo.put("info","导入成功");
        return jo;
    }
    @RequestMapping(value = "/downRwglExcel", method = RequestMethod.GET)
    @OperateLog(describe = "下载导入模板")
    @ResponseBody
    public void downRwglExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String importUrl ="/ExcelModel/rwglExcel.xls";//导入模板的路径
        //设置响应头和客户端保存文件名
        response.setCharacterEncoding("utf-8");
        response.setContentType("multipart/form-data");
        response.setHeader("Content-Disposition", "attachment;fileName="+new String("抽样单信息模板.xls".getBytes("GBK"),"ISO-8859-1"));
        //用于记录以完成的下载的数据量，单位是byte
        long downloadedLength = 0L;
        try {
            //打开本地文件流
            InputStream inputStream = this.getClass().getResourceAsStream(importUrl);
            //激活下载操作
            OutputStream os = response.getOutputStream();
            //循环写入输出流
            byte[] b = new byte[2048];
            int length;
            while ((length = inputStream.read(b)) > 0) {
                os.write(b, 0, length);
                downloadedLength += b.length;
            }
            // 这里主要关闭。
            os.close();
            inputStream.close();
        } catch (Exception e) {
            throw e;
        }
    }

    /**
     * 食品抽检检验报告
     * @param request
     * @param response
     * @throws Exception
     */
    @RequestMapping("/exportRwglExcel")
    @ResponseBody
    public  void exportRwglExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String tempids=request.getParameter("ids");
        String[] ids=tempids.split(",");
        if(ids.length>0){
            response.reset(); //清除buffer缓存
            Map<String,Object> map=new HashMap<String,Object>();
            // 指定下载的文件名，浏览器都会使用本地编码，即GBK，浏览器收到这个文件名后，用ISO-8859-1来解码，然后用GBK来显示
            // 所以我们用GBK解码，ISO-8859-1来编码，在浏览器那边会反过来执行。
            response.setHeader("Content-Disposition", "attachment;filename=" + new String("食品抽检检验报告.xlsx".getBytes("GBK"),"ISO-8859-1"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", new Date().getTime());
            XSSFWorkbook workbook=null;
            workbook =rwglService.exportRwglExcel(ids);
            OutputStream output;
            try {
                output = response.getOutputStream();
                BufferedOutputStream bufferedOutPut = new BufferedOutputStream(output);
                bufferedOutPut.flush();
                workbook.write(bufferedOutPut);
                bufferedOutPut.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    /**
    * 查找样品id对应的食品分类id
    */
    @RequestMapping(value = "/spflid",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject spflid(String ids){
        String[] cydbhs=ids.split(",");
        JSONObject json=new JSONObject();
        Set<String> spflid=new HashSet<String>();
        List<String> idlist=new ArrayList<String>();
        for(int i=0;i<cydbhs.length;i++){
        spflid.addAll(rwglService.findSpflidByCydbh(cydbhs[i])) ;
         }
        for(String spfl:spflid){
            idlist.add(spfl);
        }
        json.put("spflids",idlist);
        return json;
    }
    /**
     * 清空检省抽测项目临时表的信息
     */
    @RequestMapping(value = "/cleanTempScJcxm",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject cleanTempScJcxm(){
        JSONObject json=new JSONObject();
        rwglService.cleanTempScJcxm();
        json.put("info","清空成功");
        return json;
    };
    /**
     *批量删除
     */
    @RequestMapping(value = "/deleteRwglExcel",method = RequestMethod.POST)
    @ResponseBody
    public JSONObject deleteRwglExcel(String ids){
        String[] cydbhs=ids.split(",");
        JSONObject json=new JSONObject();
        for(int i=0;i<cydbhs.length;i++){
            rwglService.deleteRwglExcel(cydbhs[i]);//删除省抽表信息
            rwglService.deleteWtExcel(cydbhs[i]);//删除委托表信息
            rwglService.deleteYpglExcel(cydbhs[i]);//删除样品表信息
        }
        json.put("info","删除成功");
        return json;
    }

}
