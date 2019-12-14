package com.xinhai.caiyun.customermanage.controller.pageoffice;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.crypto.Data;

import com.xinhai.caiyun.customermanage.api.Jcx;
import com.xinhai.caiyun.customermanage.dao.*;
import com.xinhai.caiyun.systemmanager.dao.YqsbcgMapper;
import com.zhuozhengsoft.pageoffice.wordwriter.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;

import java.text.ParseException;
import java.util.*;
import  java.text.SimpleDateFormat;
@Controller
@RequestMapping(value = "dy")
public class OpenWordyqcgsq extends HttpServlet{
    @Autowired
    private YqsbcgMapper yqsbcgMapper;
    @RequestMapping(value = "/openwordhkcgsqd")
    public String OpenWordhkhxply(HttpServletRequest request) throws ParseException {
        //获取数据
        String id = request.getParameter("dd");
        String[]ids = id.split(",");
        List<Map>list1 = new ArrayList<>();
        for (String id1:ids) {
            Map map=new HashMap();
            map.put("id",id1);
            List<Map>list2 = yqsbcgMapper.selectDY(map);
            list1.add(list2.get(0));
        }
        //时间转换
        //SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
        request.setAttribute("poCtrl", poCtrl);
        //设置服务页面
        poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
        //添加保存按钮
        poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
        poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
        //设置保存的action
        poCtrl.setSaveFilePage("savefile.do");
        //给标签赋值
        WordDocument doc = new WordDocument();
        //创建表格区域
        DataRegion datatableRegion = doc.openDataRegion("PO_LZYQSB");
        Table table =  datatableRegion.openTable(1);
        int i = 0;
        /*id,cgmc,pp,sl,bj,zl,xh,(select name from user where zydm = sqr)as sqr,(select name from organization where code = sqbm) as sqbm,sqrq,yt,bzxx,tjbz*/
        for (Map map1:list1){
            table.openCellRC(2+i,1).setValue(map1.get("cgmc").toString());
            table.openCellRC(2+i,2).setValue(map1.get("pp").toString());
            table.openCellRC(2+i,3).setValue(map1.get("sl").toString());
            table.openCellRC(2+i,4).setValue(map1.get("bj").toString());
            table.openCellRC(2+i,5).setValue(map1.get("zl").toString());
            table.openCellRC(2+i,6).setValue(map1.get("xh").toString());
            table.openCellRC(2+i,7).setValue(map1.get("sqrq").toString());
            table.openCellRC(2+i,8).setValue(map1.get("sqr").toString());
            table.openCellRC(2+i,9).setValue(map1.get("sqr").toString());
            table.openCellRC(2+i,10).setValue(map1.get("yt").toString());
            table.openCellRC(2+i,11).setValue(map1.get("bzxx").toString());
            if (i!=list1.size()-1){
                table.insertRowAfter(table.openCellRC(2+i, 2));
                i++;
            }
        }
        datatableRegion.setEditing(true);

        //以下必须
        poCtrl.setWriter(doc);
        //打开word
        poCtrl.webOpen(request.getContextPath()+"/template/lzcgsqd.doc",OpenModeType.docAdmin,"张三");
        poCtrl.setTagId("PageOfficeCtrl1"); // 此行必须
        return "pageoffice/Word";

        //样品编码
        //doc.createDataRegion("PO_YPBH1",DataRegionInsertType.After,"PO_YPBH2").setValue(lzdbt.get("ypbm"));
        //样品领用执行人
        //doc.createDataRegion("PO_LYZXR1",DataRegionInsertType.After,"PO_LYZXR2").setValue("[image]"+this.bgglMapper.getDzqz(yply.get("lrry").toString())+"[/image]");
        //样品领用执行时间
        //Date lysj = new SimpleDateFormat("yyyy-MM-dd").parse(yply.get("lrrq").toString());
        //doc.createDataRegion("PO_LYZXRQ1",DataRegionInsertType.After,"PO_LYZXRQ2").setValue(simpleDateFormat.format(lysj));
    }
}
