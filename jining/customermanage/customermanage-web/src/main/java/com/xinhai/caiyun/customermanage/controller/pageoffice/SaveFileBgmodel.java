package com.xinhai.caiyun.customermanage.controller.pageoffice;

import com.xinhai.caiyun.customermanage.dao.BgmodelMapper;
import com.zhuozhengsoft.pageoffice.FileSaver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("openBgmodel")
public class SaveFileBgmodel extends HttpServlet {
    private static final long serialVersionUID = -758686623642845302L;
    @Autowired
    private BgmodelMapper bgmodelMapper;
    @RequestMapping(value = "/savefile1")
    public  void  savefile(HttpServletRequest request, HttpServletResponse response) throws Exception{
        FileSaver fs = new FileSaver(request, response);
        String ID = request.getParameter("ID");
       String path = request.getSession().getServletContext().getRealPath("/")+"/file/"+this.bgmodelMapper.getCcdzById(ID);
        fs.saveToFile( request.getSession().getServletContext().getRealPath("/")+"/file/"+fs.getFileName());
        fs.close();
       String sjzd = new ReadWord().readword(path,ID,bgmodelMapper);
        //更新字段
      this.bgmodelMapper.updateZD(sjzd.substring(0,sjzd.length()-1),ID);
    }

    @RequestMapping(value = "/bggl/savebgfile")
    public  void  savebgfile(HttpServletRequest request, HttpServletResponse response) throws Exception{
        FileSaver fs = new FileSaver(request, response);
//        String ID = request.getParameter("ID");
//        String path = request.getSession().getServletContext().getRealPath("/")+"/file/"+this.bgmodelMapper.getCcdzById(ID);
        fs.saveToFile( request.getSession().getServletContext().getRealPath("/")+"/file/"+fs.getFileName());
        fs.close();
//        String sjzd = new ReadWord().readword(path,ID,bgmodelMapper);
        //更新字段
//        this.bgmodelMapper.updateZD(sjzd.substring(0,sjzd.length()-1),ID);
    }
}
