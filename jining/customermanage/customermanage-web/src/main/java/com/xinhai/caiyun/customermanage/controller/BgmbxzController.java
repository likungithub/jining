package com.xinhai.caiyun.customermanage.controller;


import com.alibaba.fastjson.JSONObject;
import com.deepoove.poi.XWPFTemplate;
import com.deepoove.poi.data.PictureRenderData;
import com.deepoove.poi.util.BytePictureUtils;
import com.xinhai.caiyun.customermanage.dao.BgglMapper;
import com.xinhai.caiyun.customermanage.dao.BgmbxzMapper;
import com.xinhai.caiyun.customermanage.service.BgmbxzService;
import com.xinhai.security.api.CurrentLoginUser;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;
import com.zhuozhengsoft.pageoffice.wordwriter.DataRegion;
import com.zhuozhengsoft.pageoffice.wordwriter.DataRegionInsertType;
import com.zhuozhengsoft.pageoffice.wordwriter.Table;
import com.zhuozhengsoft.pageoffice.wordwriter.WordDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/xzmb")
public class BgmbxzController {
    @Autowired
    private BgmbxzService bgmbxzService;
    @Autowired
    private BgglMapper bgglMapper;
    @Autowired
    private BgmbxzMapper bgmbxzMapper;


    @RequestMapping(value = "/xzmbsc" )
    @ResponseBody
    public JSONObject xzmbsjlx(HttpServletRequest request)throws Exception {
        JSONObject object = new JSONObject();
        Map map= new HashMap();
        String mbid = request.getParameter("mbid");
        String id = request.getParameter("id");
        map.put("mbid",mbid);
        map.put("id",id);
        map.put("zydm", CurrentLoginUser.getUser().getZydm());
        //获取此模板的数据字段
        Map bgsjzd =this.bgmbxzService.mbsjzd(map);
        //获取此模板字段对应的具体的样品的数据
        Map map1= new HashMap();
        map1.put("sjzd",bgsjzd.get("SJZD"));
        map1.put("id",id);
        Map ypsjzd =this.bgmbxzService.ypsjzd(map1);
        System.out.print(ypsjzd);
        System.out.print(ypsjzd);
        List<Map> list = bgmbxzMapper.mbzdlx(map);
        Map<String, Object> zdlxsj = new HashMap<String, Object>();
        for(Map zdlx:list){
            if(zdlx.get("lx").toString().equals("5")){
              zdlxsj.put(zdlx.get("bgmodelzd").toString(),ypsjzd.get(zdlx.get("bgmodelzd").toString()));
            }
            if(zdlx.get("lx").toString().equals("1")){
                byte[] localByteArray = BytePictureUtils.getLocalByteArray(new File(request.getSession().getServletContext().getRealPath("/")+"/"+this.bgglMapper.getDzqz(ypsjzd.get(zdlx.get("bgmodelzd").toString()).toString())));
                zdlxsj.put(zdlx.get("bgmodelzd").toString(),new PictureRenderData(60, 30, ".png",localByteArray));
            }
        }
        try{
            XWPFTemplate template = XWPFTemplate.compile(request.getSession().getServletContext().getRealPath("/")+"/file/"+bgsjzd.get("CCDZ")).render(zdlxsj);
            FileOutputStream out = new FileOutputStream("d:/a.docx");
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



    @RequestMapping(value = "/mbxz")
    @ResponseBody
    public List<Map> mbxz(){
        return bgmbxzService.mbxz();
    }

}
