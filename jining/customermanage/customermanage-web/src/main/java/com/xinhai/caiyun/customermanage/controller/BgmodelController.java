package com.xinhai.caiyun.customermanage.controller;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import com.xinhai.caiyun.customermanage.controller.pageoffice.ReadWord;
import com.xinhai.caiyun.customermanage.dao.BgmodelMapper;
import com.xinhai.security.api.CurrentLoginUser;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.*;

@Controller
@RequestMapping("bgmodel")
public class BgmodelController {
    @Autowired
    private BgmodelMapper bgmodelMapper;
    @RequestMapping(value = "/getAll")
    @ResponseBody
    public DatatablesViewPage gtBgModel(@RequestParam("BGNAME") String bgname,
                                        @RequestParam("start") Integer start,
                                        @RequestParam("length")Integer length){
        List<Map> list=bgmodelMapper.getAll(bgname,start,length);
        Integer count = bgmodelMapper.getCount(bgname,start,length);
        DatatablesViewPage datatablesViewPage = new DatatablesViewPage();
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalDisplayRecords(count);
        datatablesViewPage.setiTotalRecords(count);
        return datatablesViewPage;
    }
    //模板上传
    @ResponseBody
    @RequestMapping(value = "importBgmodel")
    public JSONObject doFirst( HttpServletRequest request, HttpServletResponse response)throws Exception{
        JSONObject jsonObject = new JSONObject();
        //获取当前职员代码
        String fileurl = UUID.randomUUID()+".docx";
        String zydm = CurrentLoginUser.getUser().getZydm();
        //将当前上下文初始化给  CommonsMutipartResolver （多部分解析器）
        CommonsMultipartResolver multipartResolver=new CommonsMultipartResolver(
                request.getSession().getServletContext());
        //检查form中是否有enctype="multipart/form-data"
        if(multipartResolver.isMultipart(request))
        {
            //将request变成多部分request
            MultipartHttpServletRequest multiRequest=(MultipartHttpServletRequest)request;
            //获取multiRequest 中所有的文件名
            String BBH =multiRequest.getParameter("BBH");
            String BGNAME = multiRequest.getParameter("BGNAME");
            Iterator iter=multiRequest.getFileNames();

            while(iter.hasNext())
            {
                //一次遍历所有文件
                MultipartFile file=multiRequest.getFile(iter.next().toString());
                if(file!=null)
                {
                    String path = request.getSession().getServletContext().getRealPath("/")+"/file/"+fileurl;
                   /* String path=request.getSession().getServletContext().getRealPath("/")+"file/"+uuid+file.getOriginalFilename();*/
                    //上传
                    /*UUID bgid = this.bgmodelMapper.findBgModelId();*/
                    UUID bgid = UUID.randomUUID();
                    file.transferTo(new File(path));
                    String s = new ReadWord().readword(path,bgid+"",bgmodelMapper);
                    if ("".equals(s)||null==s){
                        this.bgmodelMapper.addBgmodel(BGNAME,BBH,zydm,fileurl,null,bgid+"");
                    }else {
                        this.bgmodelMapper.addBgmodel(BGNAME,BBH,zydm,fileurl,s.substring(0,s.length()-1),bgid+"");
                    }
                }
            }
        }
        jsonObject.put("success",true);
        return jsonObject;
    }
    //删除模板
    @RequestMapping(value = "/scbgfmodel")
    @ResponseBody
    public String ScBgmodel(@RequestBody JSONObject obj){
        JSONArray jcxmIds = obj.getJSONArray("jcxmId");
        List<String> list = new ArrayList<String>();
        for (Object jcxmId : jcxmIds) {
            JSONObject o = (JSONObject) jcxmId;
            list.add(o.getString("jcxmId"));
        }
        this.bgmodelMapper.scbgmodel(list);
        System.out.print(list);
        return "1312";
    }
}
