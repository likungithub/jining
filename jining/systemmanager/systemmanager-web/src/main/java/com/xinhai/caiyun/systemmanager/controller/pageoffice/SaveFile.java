package com.xinhai.caiyun.systemmanager.controller.pageoffice;


import javax.servlet.http.HttpServlet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.zhuozhengsoft.pageoffice.FileSaver;

@Controller
public class SaveFile extends HttpServlet{
	@RequestMapping("savefile")
	 public  void  savefile(HttpServletRequest request, HttpServletResponse response){
		FileSaver fs = new FileSaver(request, response);
		fs.saveToFile( "E:/file" + "/" + fs.getFileName());
		fs.close();
	}
}
