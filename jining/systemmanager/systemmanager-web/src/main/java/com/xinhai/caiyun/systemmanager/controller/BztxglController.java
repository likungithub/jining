package com.xinhai.caiyun.systemmanager.controller;
import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.BztxglService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/bztxgl")
public class BztxglController {
    @Autowired
    private BztxglService bztxglService;

    /**
     * 获取标准项目管理所有表数据
     *
     * @return 返会所有数据
     */
    @RequestMapping("/findAllBzxmgl")
    @ResponseBody
    public DatatablesViewPage<Map> findAllBzxmgl(@RequestParam("start") String start,
                                                 @RequestParam("length") String length,
                                                 @RequestParam("htmc") String htmc,
                                                 @RequestParam("ypmc") String ypmc,
                                                 @RequestParam("startDate") String startDate,
                                                 @RequestParam("endDate") String endDate
    ) {
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        map.put("htmc", htmc);
        map.put("ypmc", ypmc);
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        if (startDate != null && !"".equals(startDate)) {
            try {
                map.put("startDate", sf.parse(startDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        if (endDate != null && !"".equals(endDate)) {
            try {
                map.put("endDate", sf.parse(endDate));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        List<Map> list = bztxglService.findAllBzxmgl(map);
        Integer num = bztxglService.findBzxmglNum(map);
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setiTotalDisplayRecords(num);
        return datatablesViewPage;
    }

    /**
     * 回显标准项目管理信息
     *
     * @return 项目信息
     */
    @RequestMapping("/showBzxmgl")
    @ResponseBody
    public Map showBzxmgl(Integer yjid) {
        Map yj = bztxglService.findYJid(yjid);
        String ypid = (String) yj.get("ypid");
        String jcxmid = (String) yj.get("jcxmid");
        Map yp = bztxglService.findOneYp(Integer.parseInt(ypid));
        Map jcxx = bztxglService.findOneJcxm(Integer.parseInt(jcxmid));
        jcxx.put("YPMC", yp.get("YPMC"));
        jcxx.put("YPBM", yp.get("YPBM"));
        jcxx.put("RQ", yp.get("RQ"));
        jcxx.put("YJID",yjid);
        return jcxx;
    }

    /**
     *更新数据
     */
    @RequestMapping("/updateBzxmgl")
    @ResponseBody
    public Map updateBzxmgl(String ypmc, String ypbm, String zwmc_bm, String rq, String ywmc,
                               String pdnh, String if_pd, String yyckjz, String bl, String jcff,
                               String jcyj, String wswmz, String xlz, String xlzmrz, String bzffjcxdw,
                               String jcyjmc, String pdyj, String pdyjmc, String wswnz, String wswcz,
                               String bzzxyxx, String bzzxyxxdw, String bzzdyxx, String bzzdyxxdw, String if_xtpd,
                               String if_bzff, String if_cma, String if_cmaf, String if_cnas,
                               String if_catl, String zbzl, String zbzldw, String bz, String yjid
    ) {
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        Map map = new HashMap();
        Map find = new HashMap();
        map.put("ypmc", ypmc);
        map.put("ypbm", ypbm);
        map.put("zwmc_bm", zwmc_bm);
       if (rq != null && !"".equals(rq)) {
            try {
                map.put("rq", sf.parse(rq));
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        map.put("ywmc", ywmc);
        map.put("pdnh", pdnh);
        if ("".equals(if_pd)||if_pd==null){
            if_pd="0";
        }
        if(if_pd.equals("true")||if_pd.equals("是")){
            if_pd="1";
        }
        if(if_pd.equals("false")||if_pd.equals("否")){
            if_pd="0";
        }

        map.put("if_pd",if_pd);
        map.put("yyckjz", yyckjz);
        map.put("bl", bl);
        map.put("jcff", jcff);
        map.put("jcyj", jcyj);
        map.put("wswmz", wswmz);
        map.put("xlz", xlz);
        map.put("xlzmrz", xlzmrz);
        map.put("bzffjcxdw", bzffjcxdw);
        map.put("jcyjmc", jcyjmc);
        map.put("pdyj", pdyj);
        map.put("pdyjmc", pdyjmc);
        map.put("wswnz", wswnz);
        map.put("wswcz", wswcz);
        map.put("bzzxyxx", bzzxyxx);
        map.put("bzzxyxxdw",bzzxyxxdw);
        map.put("bzzdyxx", bzzdyxx);
        map.put("bzzdyxxdw", bzzdyxxdw);
        if ("".equals(if_xtpd)||if_xtpd==null){
            if_xtpd="0";
        }
        if(if_xtpd.equals("true")||if_xtpd.equals("是")){
            if_xtpd="1";
        }
        if(if_xtpd.equals("false")||if_xtpd.equals("否")){
            if_xtpd="0";
        }
        map.put("if_xtpd",if_xtpd);
        if ("".equals(if_bzff)||if_bzff==null){
            if_bzff="0";
        }
        if(if_bzff.equals("true")||if_bzff.equals("是")){
            if_bzff="1";
        }
        if(if_bzff.equals("false")||if_bzff.equals("否")){
            if_bzff="0";
        }
        map.put("if_bzff",if_bzff);
        if ("".equals(if_cma)||if_cma==null){
            if_cma="0";
        }
        if(if_cma.equals("true")||if_cma.equals("是")){
            if_cma="1";
        }
        if(if_cma.equals("false")||if_cma.equals("否")){
            if_cma="0";
        }
        map.put("if_cma",if_cma);
        if ("".equals(if_cmaf)||if_cmaf==null){
            if_cmaf="0";
        }
        if(if_cmaf.equals("true")||if_cmaf.equals("是")){
            if_cmaf="1";
        }
        if(if_cmaf.equals("false")||if_cmaf.equals("否")){
            if_cmaf="0";
        }
        map.put("if_cmaf",if_cmaf);
        if ("".equals(if_cnas)||if_cnas==null){
            if_cnas="0";
        }
        if(if_cnas.equals("true")||if_cnas.equals("是")){
            if_cnas="1";
        }
        if(if_cnas.equals("false")||if_cnas.equals("否")){
            if_cnas="0";
        }
        map.put("if_cnas",if_cnas);
        if ("".equals(if_catl)||if_catl==null){
            if_catl="0";
        }
        if(if_catl.equals("true")||if_catl.equals("是")){
            if_catl="1";
        }
        if(if_catl.equals("false")||if_catl.equals("否")){
            if_catl="0";
        }
        map.put("if_catl",if_catl);
        map.put("zbzl", zbzl);
        map.put("zbzldw", zbzldw);
        map.put(" bz",bz);
        Map yj = bztxglService.findYJid(Integer.parseInt(yjid));
        String ypid = (String) yj.get("ypid");
        String jcxmid = (String) yj.get("jcxmid");
        map.put("ypid",Integer.parseInt(ypid));
        map.put("jcxmid",Integer.parseInt(jcxmid));
        bztxglService.updateJcxm(map);
        bztxglService.updateYp(map);
       Map map1=new HashMap();
       map1.put("sucess","更新成功");
       return map1;
    }

}
