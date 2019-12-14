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
public class OpenWord extends HttpServlet{
	@Autowired
	private BzwjglService bzwjglService;
	@RequestMapping("openword")
	public String openword(HttpServletRequest request, HttpServletResponse response){
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
		poCtrl.setSaveFilePage("savefile.do");
        String pathid=request.getParameter("pathid");//获取源文件路径
		Map map=bzwjglService.findOneBzwjgl(Integer.parseInt(pathid));
		String sourePath= (String) map.get("FILE_PATH");
        File source=new File(sourePath);
        String sourceName =source.getName();
		String  targetPath= request.getSession().getServletContext().getRealPath("/doc");//获取目标文件路径
        File target=new File(targetPath);
        if(!target.exists()){
            target.mkdir();
        }
        try {
            FileUtils.copyFileToDirectory(source,target);
        } catch (IOException e) {
            e.printStackTrace();
        }
        //打开word
        poCtrl.webOpen("/"+request.getContextPath()+"/doc/"+sourceName, OpenModeType.docReadOnly, "张三");
        return "pageoffice/Word";
    }

}
