package com.xinhai.caiyun.customermanage.controller;

import com.alibaba.fastjson.JSONObject;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.service.GqyptzService;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedOutputStream;
import java.io.OutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("gqyptz")
public class GqyptzController {
    @Autowired
    private GqyptzService gqyptzService;

    /*查询过期样品*/
    @RequestMapping(value = "/selectgqyp")
    @ResponseBody
    public DatatablesViewPage vydaochu (@RequestParam("start") String start,
                                        @RequestParam("length") String length,
                                        @RequestParam("ypmc") String ypmc
    ){
        Map map=new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length",Integer.parseInt(length));
        map.put("ypmc",ypmc);
        List<Map> list = gqyptzService.selectGqypAll(map);
        int totalCount=0;
        totalCount= gqyptzService.selectGqypCount(map);
        DatatablesViewPage<Map> dv=new DatatablesViewPage<Map>();

        dv.setAaData(list);
        dv.setiTotalDisplayRecords(totalCount);
        dv.setiTotalRecords(totalCount);

        return dv;
    }

    /*导出数据*/
    @RequestMapping(value = "/gqypDc")
    @ResponseBody
    public JSONObject daoChu(HttpServletRequest request, HttpServletResponse response)throws Exception{
        JSONObject jsonObject = new JSONObject();
        String ypid = request.getParameter("ypid");
        String[]ypid1 = ypid.split(",");
        if (ypid1.length>0){
            //清除缓存
            response.reset();
            //创建Map
            Map<String,Object>map = new HashMap<>();
            //指定下载的文件名，浏览器gbk编码，需先用iso-8859-1解码，在用gbk编码
            response.setHeader("Content-Disposition","attachment;filename="+new String("过期样品台账.xlsx".getBytes("GBK"),"ISO-8859-1"));
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            //清除缓存
            response.setHeader("Pragma","no-cache");
            response.setHeader("Cache-Control","no-cache");
            response.setDateHeader("Expires",0);
            //引用XSSWorkbook
            XSSFWorkbook xssfWorkbook = null;
            xssfWorkbook = gqyptzService.exportgqypExcel(ypid1);
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
}
