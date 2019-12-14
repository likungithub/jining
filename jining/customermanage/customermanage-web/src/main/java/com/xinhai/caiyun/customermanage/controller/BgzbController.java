package com.xinhai.caiyun.customermanage.controller;

import com.xinhai.caiyun.customermanage.controller.pageoffice.ExportZhiBiaoUtils;
import com.xinhai.caiyun.customermanage.dao.BgzbMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping(value = "/bgzb")
public class BgzbController {
    @Autowired
    private BgzbMapper bgzbMapper;
    @RequestMapping(value = "/test")
    public void test(HttpServletRequest request, HttpServletResponse response)throws Exception{
        String id = request.getParameter("ID");
        Map JcxMap = this.bgzbMapper.findJcxInfo(id);
        String jcx = (String) JcxMap.get("JCXMID");
        String [] rowName = (jcx+",结论").split(",");
        for (int i=0;i<rowName.length-1;i++){
            String jcxName = this.bgzbMapper.JcxName(rowName[i]);
            rowName[i] = jcxName;
        }
        List<Object[]> dataList = new ArrayList();
        List<Map> jczInfo  = this.bgzbMapper.findJczInfo(id);
        for (int i=0;i<jczInfo.size();i++){
            Map jczMap = jczInfo.get(i);
            //获取受检单位名称
            String sjdwmc = (String) jczMap.get("SJDW");
            //获取样品名称
            String ypmc = (String) jczMap.get("YPMC");
            //获取样品编码
            String ypbm = (String) jczMap.get("YPBM");
            //获取检测值
            String jcz = (String) jczMap.get("JCZ");
            boolean flag = true;
            //获取样品ID
            String ypid = (String) jczMap.get("YPID");
            String jg = "不合格";
            List<Boolean> booleanList = this.bgzbMapper.findJcjg(ypid);
            for (int j=0;j<booleanList.size();j++){
                if (booleanList.get(j)){
                    flag = false;
                    break;
                }
            }
            if (flag){
                jg="所检项目符合要求";
            }
            //判定结论
            String info [] = (sjdwmc+","+ypmc+","+ypbm+","+jcz+","+jg).split(",");
            dataList.add(info);
        }
        String name = UUID.randomUUID()+"";
        String headStr = "attachment; filename=\""
                + new String(("报告样品制表.xls").getBytes("gb2312"), "ISO8859-1") + "\"";
        response.setContentType("octets/stream");
        response.setContentType("APPLICATION/OCTET-STREAM");
        response.setHeader("Content-Disposition", headStr);
        ExportZhiBiaoUtils exportZhiBiaoUtils = new ExportZhiBiaoUtils("制表",rowName,dataList,"2018-LZNC-01");
        exportZhiBiaoUtils.export(response.getOutputStream());
    }
}
