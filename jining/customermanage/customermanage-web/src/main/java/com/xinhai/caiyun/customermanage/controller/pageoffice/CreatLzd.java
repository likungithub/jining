package com.xinhai.caiyun.customermanage.controller.pageoffice;

import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.data.PictureRenderData;
import com.deepoove.poi.util.BytePictureUtils;
import com.xinhai.caiyun.customermanage.dao.BgglMapper;
import com.xinhai.caiyun.customermanage.dao.TLZypglMapper;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Controller
@RequestMapping("lzd")
public class CreatLzd {
    @Autowired
    private TLZypglMapper tlZypglMapper;
    @Autowired
    private BgglMapper bgglMapper;
    @ResponseBody
    @RequestMapping(value = "/createLZD")
    public JSONObject createLzd(HttpServletRequest request, HttpServletResponse response) throws Exception{
       String id=request.getParameter("ypid");
        Map map = new HashMap();
        JSONObject object = new JSONObject();
        String ypid = this.bgglMapper.findYpidByWtid(id.split(",")[0]);
        Map map1 = tlZypglMapper.findLZD(ypid);
        String b = map1.get("JYXZ")+"";
        String jylb1 = "";
        switch (b){
            case "lxjc":
                jylb1 = "例行监测";
                break;
            case "jdcc":
                jylb1 = "监督抽查";
                break;
            case "aqcj":
                jylb1 = "安全抽检";
                break;
            case "jdjy":
                jylb1 = "监督检验";
                break;
            case "dbsy":
                jylb1 = "对比实验";
                break;
            case "lyfc":
                jylb1 = "留样复测";
                break;
            case "wtjy":
                jylb1 = "委托检验";
                break;
        }
        map1.put("JYXZ",jylb1);
        Map imageMap = tlZypglMapper.findLzdZydm(ypid);
       try{
           Set imageset = imageMap.keySet();
           for (Object s:imageset){
               String url =this.bgglMapper.getDzqz(imageMap.get(s).toString());
               if (!"".equals(url)&& url!=null && !"null".equals(url)){
               byte[] localByteArray = BytePictureUtils.getLocalByteArray(new File(request.getSession().getServletContext().getRealPath("/")+"/"+this.bgglMapper.getDzqz(imageMap.get(s).toString())));
               map1.put(s,new PictureRenderData(60, 30, ".png",localByteArray));
               }else {
                   map1.put("@"+s,"");
               }
           }
            XWPFTemplate template = XWPFTemplate.compile(request.getSession().getServletContext().getRealPath("/")+"/template/LZCYD.docx").render(map1);
            UUID uuid = UUID.randomUUID();
            FileOutputStream out = new FileOutputStream("D:\\file\\"+uuid+".docx");
            String file = "D:\\file\\"+uuid+".docx";
            this.tlZypglMapper.updateLzd(ypid,file);
            template.write(out);
            out.flush();
            out.close();
            template.close();
            object.put("success", true);
       }catch (Exception e){
            object.put("success", false);
            object.put("message","操作失败！");
        }
        return object;
    }
}
