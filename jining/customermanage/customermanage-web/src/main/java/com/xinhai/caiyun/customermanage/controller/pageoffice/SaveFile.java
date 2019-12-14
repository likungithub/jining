package com.xinhai.caiyun.customermanage.controller.pageoffice;


import javax.servlet.http.HttpServlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zhuozhengsoft.pageoffice.FileSaver;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;

@Controller
public class SaveFile extends HttpServlet{
	private static final long serialVersionUID = -758686623642845302L;
	@RequestMapping("savefile")
	 public  void  savefile(HttpServletRequest request, HttpServletResponse response){
		FileSaver fs = new FileSaver(request, response);
		fs.saveToFile( "D:/file" + "/" + fs.getFileName());
		fs.close();
	}
}
