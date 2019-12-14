package com.xinhai.caiyun.customermanage.controller.pageoffice;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;
@Controller
public class OpenExcel extends HttpServlet{
	private static final long serialVersionUID = -758686623642845302L;
	@RequestMapping("openexcel")  
    public String openexcel(HttpServletRequest request, HttpServletResponse response){
		PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
		request.setAttribute("poCtrl", poCtrl);
		//设置服务页面
		poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
		//添加保存按钮
		poCtrl.addCustomToolButton("保存并关闭","Save",1);
		//设置保存页面
		poCtrl.setSaveFilePage("savefile.do");
		//打开excel
		poCtrl.webOpen("/customermanage/doc/test.xls",OpenModeType.xlsNormalEdit,"张三");
        return "pageoffice/Excel";
    } 
	

}
