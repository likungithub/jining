package com.xinhai.caiyun.customermanage.controller.pageoffice;

import com.xinhai.caiyun.customermanage.dao.BgmodelMapper;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("openBgmodel")
public class OpenBgmodel extends HttpServlet {
    @Autowired
    private BgmodelMapper bgmodelMapper;
    //查看报告模板定制
    @RequestMapping(value = "/openbgmpdel")
    public String opnenworld8(HttpServletRequest request){
        String ID = request.getParameter("ID");
        String path = this.bgmodelMapper.getCcdzById(ID);
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
        poCtrl.setSaveFilePage("savefile1?ID="+ID);
        //打开word
        poCtrl.webOpen(request.getContextPath()+"/file/"+path, OpenModeType.docAdmin,"张三");
        poCtrl.setTagId("PageOfficeCtrl1"); // 此行必须
        return "pageoffice/Word";
    }
}
