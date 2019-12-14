package com.xinhai.caiyun.statisticalanalysis.controller;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.statisticalanalysis.api.NdhtService;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Controller
@Transactional
@RequestMapping("/ndht")
public class NdhtController {
    @Autowired
    private NdhtService ndhtService;

    /**
     *年度合同的所有数据
     * @param start
     * @param length
     * @return
     */
    @RequestMapping(value = "/findAllNdht",method =RequestMethod.POST)
    @ResponseBody
    public DatatablesViewPage<Map> findAllNdht(@RequestParam("start") String start,
                                               @RequestParam("length") String length,
                                               @RequestParam("startDate") String startDate,
                                               @RequestParam("endDate") String endDate
                                               ){
        DatatablesViewPage<Map> datatablesViewPage=new DatatablesViewPage<Map>();
        Map map=new HashMap();
        SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd");
        map.put("start",Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
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
        List<Map> list=ndhtService.findAllNndht(map);
        Integer num=ndhtService.findAllNdhtNum(map);
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setiTotalDisplayRecords(num);
        return datatablesViewPage;
    }
    //导出excel表
    @RequestMapping("/exportNdhtExcel")
    @ResponseBody
    public  void exportNdhtExcel(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String tempids=request.getParameter("ids");
        String[] ids=tempids.split(",");
        if(ids.length>0){
            response.reset(); //清除buffer缓存
            Map<String,Object> map=new HashMap<String,Object>();
            // 指定下载的文件名，浏览器都会使用本地编码，即GBK，浏览器收到这个文件名后，用ISO-8859-1来解码，然后用GBK来显示
            // 所以我们用GBK解码，ISO-8859-1来编码，在浏览器那边会反过来执行。
            response.setHeader("Content-Disposition", "attachment;filename=" + new String("年度合同表.xlsx".getBytes("GBK"),"ISO-8859-1"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setHeader("Pragma", "no-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expires", 0);
            XSSFWorkbook workbook=null;
            workbook =ndhtService.exportNdhtExcel(ids);
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
}
