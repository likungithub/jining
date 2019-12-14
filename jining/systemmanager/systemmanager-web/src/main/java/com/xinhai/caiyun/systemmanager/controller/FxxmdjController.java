package com.xinhai.caiyun.systemmanager.controller;

import com.xinhai.caiyun.commonmanager.api.DatatablesViewPage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.FxxmdjService;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/bztxgl")
public class FxxmdjController {
    @Autowired
    private FxxmdjService fxxmdjService;

    /**
     * 获取标准项目管理所有表数据
     *
     * @return 返会所有数据
     */
    @RequestMapping("/findAllFxxmdj")
    @ResponseBody
    public DatatablesViewPage<Map> findAllBzxmgl(@RequestParam("start") String start,
                                                 @RequestParam("length") String length,
                                                 @RequestParam("jcxmc") String jcxmc
    ) {
        DatatablesViewPage<Map> datatablesViewPage = new DatatablesViewPage<Map>();
        Map map = new HashMap();
        map.put("start", Integer.parseInt(start));
        map.put("length", Integer.parseInt(length));
        map.put("jcxmc", jcxmc);
        List<Map> list = fxxmdjService.findAllFxxmdj(map);
        Integer num = fxxmdjService.findAllFxxmdjNum(map);
        datatablesViewPage.setAaData(list);
        datatablesViewPage.setiTotalRecords(num);
        datatablesViewPage.setiTotalDisplayRecords(num);
        return datatablesViewPage;
    }

    /**
     * 单条删除
     * @param id
     * @return
     */
    @RequestMapping("/deleteFxxmdjById")
    @ResponseBody
    public Map deleteFxxmdjById(String id) {
        fxxmdjService.deleteFxxmdjById(Integer.parseInt(id));
        Map map = new HashMap();
        map.put("success", "删除成功");
        return map;
    }

    /**
     * 批量删除
     */
    @RequestMapping("/pldeleteFxxmdjById")
    @ResponseBody
    public Map pldeleteFxxmdjById(String[] ids) {
        for(int i=0;i<ids.length;i++){
            fxxmdjService.deleteFxxmdjById(Integer.parseInt(ids[i]));
        }
        Map map = new HashMap();
        map.put("success", "删除成功");
        return map;
    }
    @RequestMapping("/addFxxmdj")
    @ResponseBody
    public Map addFxxmdj(String zwmc_bm, String ywmc, String pdnh, String if_pd, String yyckjz, String bl, String jcff,
                        String jcyj, String wswmz, String xlz, String xlzmrz, String bzffjcxdw,
                        String jcyjmc, String pdyj, String pdyjmc, String wswnz, String wswcz,
                        String bzzxyxx, String bzzxyxxdw, String bzzdyxx, String bzzdyxxdw, String if_xtpd,
                        String if_bzff, String if_cma, String if_cmaf, String if_cnas,
                        String if_catl, String zbzl, String zbzldw, String bz
    ) {
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        Map map = new HashMap();
        Map find = new HashMap();
        map.put("zwmc_bm", zwmc_bm);
        map.put("ywmc", ywmc);
        map.put("pdnh", pdnh);
        if ("".equals(if_pd) || if_pd == null) {
            if_pd = "0";
        }
        if (if_pd.equals("true") || if_pd.equals("是")) {
            if_pd = "1";
        }
        if (if_pd.equals("false") || if_pd.equals("否")) {
            if_pd = "0";
        }
        map.put("if_pd", if_pd);
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
        map.put("bzzxyxxdw", bzzxyxxdw);
        map.put("bzzdyxx", bzzdyxx);
        map.put("bzzdyxxdw", bzzdyxxdw);
        if ("".equals(if_xtpd) || if_xtpd == null) {
            if_xtpd = "0";
        }
        if (if_xtpd.equals("true") || if_xtpd.equals("是")) {
            if_xtpd = "1";
        }
        if (if_xtpd.equals("false") || if_xtpd.equals("否")) {
            if_xtpd = "0";
        }
        map.put("if_xtpd", if_xtpd);
        if ("".equals(if_bzff) || if_bzff == null) {
            if_bzff = "0";
        }
        if (if_bzff.equals("true") || if_bzff.equals("是")) {
            if_bzff = "1";
        }
        if (if_bzff.equals("false") || if_bzff.equals("否")) {
            if_bzff = "0";
        }
        map.put("if_bzff", if_bzff);
        if ("".equals(if_cma) || if_cma == null) {
            if_cma = "0";
        }
        if (if_cma.equals("true") || if_cma.equals("是")) {
            if_cma = "1";
        }
        if (if_cma.equals("false") || if_cma.equals("否")) {
            if_cma = "0";
        }
        map.put("if_cma", if_cma);
        if ("".equals(if_cmaf) || if_cmaf == null) {
            if_cmaf = "0";
        }
        if (if_cmaf.equals("true") || if_cmaf.equals("是")) {
            if_cmaf = "1";
        }
        if (if_cmaf.equals("false") || if_cmaf.equals("否")) {
            if_cmaf = "0";
        }
        map.put("if_cmaf", if_cmaf);
        if ("".equals(if_cnas) || if_cnas == null) {
            if_cnas = "0";
        }
        if (if_cnas.equals("true") || if_cnas.equals("是")) {
            if_cnas = "1";
        }
        if (if_cnas.equals("false") || if_cnas.equals("否")) {
            if_cnas = "0";
        }
        map.put("if_cnas", if_cnas);
        if ("".equals(if_catl) || if_catl == null) {
            if_catl = "0";
        }
        if (if_catl.equals("true") || if_catl.equals("是")) {
            if_catl = "1";
        }
        if (if_catl.equals("false") || if_catl.equals("否")) {
            if_catl = "0";
        }
        map.put("if_catl", if_catl);
        map.put("zbzl", zbzl);
        map.put("zbzldw", zbzldw);
        map.put(" bz", bz);
        fxxmdjService.addFxxmdj(map);
        Map mao = new HashMap();
        mao.put("info", "增加成功");
        return mao;
    }

    @RequestMapping("/findFxxmdjById")
    @ResponseBody
    public Map findFxxmdjById(String id) {
        return fxxmdjService.findFxxmdjById(Integer.parseInt(id));
    }

    @RequestMapping("/updateFxxmdj")
    @ResponseBody
    public Map updateFxxmdj(String zwmc_bm, String ywmc, String pdnh, String if_pd, String yyckjz, String bl, String jcff,
                           String jcyj, String wswmz, String xlz, String xlzmrz, String bzffjcxdw,
                           String jcyjmc, String pdyj, String pdyjmc, String wswnz, String wswcz,
                           String bzzxyxx, String bzzxyxxdw, String bzzdyxx, String bzzdyxxdw, String if_xtpd,
                           String if_bzff, String if_cma, String if_cmaf, String if_cnas,
                           String if_catl, String zbzl, String zbzldw, String bz, String id
    ) {
        Map map = new HashMap();
        map.put("zwmc_bm", zwmc_bm);
        map.put("ywmc", ywmc);
        map.put("pdnh", pdnh);
        if ("".equals(if_pd) || if_pd == null) {
            if_pd = "0";
        }
        if (if_pd.equals("true") || if_pd.equals("是")) {
            if_pd = "1";
        }
        if (if_pd.equals("false") || if_pd.equals("否")) {
            if_pd = "0";
        }
        map.put("if_pd", if_pd);
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
        map.put("bzzxyxxdw", bzzxyxxdw);
        map.put("bzzdyxx", bzzdyxx);
        map.put("bzzdyxxdw", bzzdyxxdw);
        if ("".equals(if_xtpd) || if_xtpd == null) {
            if_xtpd = "0";
        }
        if (if_xtpd.equals("true") || if_xtpd.equals("是")) {
            if_xtpd = "1";
        }
        if (if_xtpd.equals("false") || if_xtpd.equals("否")) {
            if_xtpd = "0";
        }
        map.put("if_xtpd", if_xtpd);
        if ("".equals(if_bzff) || if_bzff == null) {
            if_bzff = "0";
        }
        if (if_bzff.equals("true") || if_bzff.equals("是")) {
            if_bzff = "1";
        }
        if (if_bzff.equals("false") || if_bzff.equals("否")) {
            if_bzff = "0";
        }
        map.put("if_bzff", if_bzff);
        if ("".equals(if_cma) || if_cma == null) {
            if_cma = "0";
        }
        if (if_cma.equals("true") || if_cma.equals("是")) {
            if_cma = "1";
        }
        if (if_cma.equals("false") || if_cma.equals("否")) {
            if_cma = "0";
        }
        map.put("if_cma", if_cma);
        if ("".equals(if_cmaf) || if_cmaf == null) {
            if_cmaf = "0";
        }
        if (if_cmaf.equals("true") || if_cmaf.equals("是")) {
            if_cmaf = "1";
        }
        if (if_cmaf.equals("false") || if_cmaf.equals("否")) {
            if_cmaf = "0";
        }
        map.put("if_cmaf", if_cmaf);
        if ("".equals(if_cnas) || if_cnas == null) {
            if_cnas = "0";
        }
        if (if_cnas.equals("true") || if_cnas.equals("是")) {
            if_cnas = "1";
        }
        if (if_cnas.equals("false") || if_cnas.equals("否")) {
            if_cnas = "0";
        }
        map.put("if_cnas", if_cnas);
        if ("".equals(if_catl) || if_catl == null) {
            if_catl = "0";
        }
        if (if_catl.equals("true") || if_catl.equals("是")) {
            if_catl = "1";
        }
        if (if_catl.equals("false") || if_catl.equals("否")) {
            if_catl = "0";
        }
        map.put("if_catl", if_catl);
        map.put("zbzl", zbzl);
        map.put("zbzldw", zbzldw);
        map.put("bz",bz);
        map.put("id",Integer.parseInt(id));
        fxxmdjService.updateFxxmdj(map);
        Map mao = new HashMap();
        mao.put("info", "更新成功");
        return mao;
    }
}
