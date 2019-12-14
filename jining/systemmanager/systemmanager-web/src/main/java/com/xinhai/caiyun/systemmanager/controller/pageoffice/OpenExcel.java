package com.xinhai.caiyun.systemmanager.controller.pageoffice;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.baidu.disconf.core.common.utils.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;
import service.BzwjglService;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@Controller
@RequestMapping("bzwjgl")
public class OpenExcel extends HttpServlet{
	@Autowired
	private BzwjglService bzwjglService;
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
		String pathid=request.getParameter("pathid");//获取源文件的id
		Map map=bzwjglService.findOneBzwjgl(Integer.parseInt(pathid));
		String sourePath= (String) map.get("FILE_PATH");//通过id获取源文件的路径
		File source=new File(sourePath);
		String sourceName =source.getName();//获得文件的名称
		String  targetPath= request.getSession().getServletContext().getRealPath("/doc");//获取目标文件路径
		File target=new File(targetPath);//目标文件夹
		if(!target.exists()){//如果文件夹不存在就生成文件夹
			target.mkdir();
		}
		try {
			FileUtils.copyFileToDirectory(source,target);//将源文件拷贝到目标文件夹中
		} catch (IOException e) {
			e.printStackTrace();
		}
		//打开excel
		poCtrl.webOpen("/"+request.getContextPath()+"/doc/"+sourceName,OpenModeType.xlsReadOnly,"张三");
        return "pageoffice/Excel";
    } 
	

}
