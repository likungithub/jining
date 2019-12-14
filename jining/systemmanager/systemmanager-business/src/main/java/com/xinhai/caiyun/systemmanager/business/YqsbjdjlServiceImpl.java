package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.*;
import com.xinhai.caiyun.systemmanager.dao.YqsbjdjlMapper;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.YqsbjdjlService;

import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class YqsbjdjlServiceImpl implements YqsbjdjlService {
    @Autowired
    private YqsbjdjlMapper yqsbjdjlMapper;
    /*查询仪器设备检定记录*/
    public List<Map> selectYqsbjdjl(Map map){
        return yqsbjdjlMapper.selectYqsbjdjl(map);
    };
    /*返回条数*/
    public Integer selectJdjlCount(Map map){
        return yqsbjdjlMapper.selectJdjlCount(map);
    };
    /*检定记录*/
    public void updateJdjl(Map map){
        yqsbjdjlMapper.updateJdjl(map);
    };
    /*记录检定历史*/
    public void insertJdjllsb(Map map){
        yqsbjdjlMapper.insertJdjllsb(map);
    };
    /*维护记录*/
    public void updateWhjl(Map map){
        yqsbjdjlMapper.updateWhjl(map);
    };
    /*记录维护历史*/
    public void insertWhjllsb(Map map){
        yqsbjdjlMapper.insertWhjllsb(map);
    };
    /*核查记录*/
    public void updateHcjl(Map map){
        yqsbjdjlMapper.updateHcjl(map);
    };
    /*记录核查历史*/
    public void insertHcjllsb(Map map){
        yqsbjdjlMapper.insertHcjllsb(map);
    };
    //    根据检定地区导出
    public XSSFWorkbook exportdqExcel(Map map1) throws Exception{
        List<yqsbjdjldc> list=new ArrayList<yqsbjdjldc>();
//        yqsbjdjldc yqsbjdjldc=null;
//        for (int i=0;i<ids.length;i++){
//            yqsbjdjldc=yqsbjdjlMapper.findOneByid(Integer.parseInt(ids[i]));
//            list.add(yqsbjdjldc);
//        }
        list = yqsbjdjlMapper.findOnedqByid(map1);
        List<ExcelBean> excel=new ArrayList<ExcelBean>();
        Map<Integer,List<ExcelBean>> map=new LinkedHashMap<>();
        XSSFWorkbook xssfWorkbook=null;
        //设置标题栏
        excel.add(new ExcelBean("受控编号","skbh",0));
        excel.add(new ExcelBean("设备名称","sbmc",0));
        excel.add(new ExcelBean("规格型号","ggxh",0));
        excel.add(new ExcelBean("检定日期","jdrq",0));
        excel.add(new ExcelBean("检定机构","jdjg",0));
        excel.add(new ExcelBean("检定依据","jdyj",0));
        excel.add(new ExcelBean("检定记录","jdjl",0));
        excel.add(new ExcelBean("确认依据","qryj",0));
        excel.add(new ExcelBean("检定结果","jdjig",0));
        excel.add(new ExcelBean("检定备注","jdbz",0));
        map.put(0, excel);
        String sheetName = "检定记录";
        //调用ExcelUtil的方法
        xssfWorkbook = ExcelUtil.createExcelFile(yqsbjdjldc.class, list, map, sheetName);
        return xssfWorkbook;
    };
    public XSSFWorkbook exportdqAllExcel() throws Exception{
        List<yqsbjdjldc> list=new ArrayList<yqsbjdjldc>();
//        yqsbjdjldc yqsbjdjldc=null;
//        for (int i=0;i<ids.length;i++){
//            yqsbjdjldc=yqsbjdjlMapper.findOneByid(Integer.parseInt(ids[i]));
//            list.add(yqsbjdjldc);
//        }
        list = yqsbjdjlMapper.findOnedqAllByid();
        List<ExcelBean> excel=new ArrayList<ExcelBean>();
        Map<Integer,List<ExcelBean>> map=new LinkedHashMap<>();
        XSSFWorkbook xssfWorkbook=null;
        //设置标题栏
        excel.add(new ExcelBean("受控编号","skbh",0));
        excel.add(new ExcelBean("设备名称","sbmc",0));
        excel.add(new ExcelBean("规格型号","ggxh",0));
        excel.add(new ExcelBean("检定日期","jdrq",0));
        excel.add(new ExcelBean("检定机构","jdjg",0));
        excel.add(new ExcelBean("检定依据","jdyj",0));
        excel.add(new ExcelBean("检定记录","jdjl",0));
        excel.add(new ExcelBean("确认依据","qryj",0));
        excel.add(new ExcelBean("检定结果","jdjig",0));
        excel.add(new ExcelBean("检定备注","jdbz",0));
        map.put(0, excel);
        String sheetName = "检定记录";
        //调用ExcelUtil的方法
        xssfWorkbook = ExcelUtil.createExcelFile(yqsbjdjldc.class, list, map, sheetName);
        return xssfWorkbook;
    };
//    检定记录导出
    public XSSFWorkbook exportExcel(String[] ids) throws Exception {
        List<yqsbjdjldc> list=new ArrayList<yqsbjdjldc>();
        yqsbjdjldc yqsbjdjldc=null;
        for (int i=0;i<ids.length;i++){
            yqsbjdjldc=yqsbjdjlMapper.findOneByid(Integer.parseInt(ids[i]));
            list.add(yqsbjdjldc);
        }
        List<ExcelBean> excel=new ArrayList<ExcelBean>();
        Map<Integer,List<ExcelBean>> map=new LinkedHashMap<>();
        XSSFWorkbook xssfWorkbook=null;
        //设置标题栏
        excel.add(new ExcelBean("受控编号","skbh",0));
        excel.add(new ExcelBean("设备名称","sbmc",0));
        excel.add(new ExcelBean("规格型号","ggxh",0));
        excel.add(new ExcelBean("检定日期","jdrq",0));
        excel.add(new ExcelBean("检定机构","jdjg",0));
        excel.add(new ExcelBean("检定依据","jdyj",0));
        excel.add(new ExcelBean("检定记录","jdjl",0));
        excel.add(new ExcelBean("确认依据","qryj",0));
        excel.add(new ExcelBean("检定结果","jdjig",0));
        excel.add(new ExcelBean("检定备注","jdbz",0));
        map.put(0, excel);
        String sheetName = "检定记录";
        //调用ExcelUtil的方法
        xssfWorkbook = ExcelUtil.createExcelFile(yqsbjdjldc.class, list, map, sheetName);
        return xssfWorkbook;
    };
    //    导出维护记录
    public XSSFWorkbook exportwhjlExcel(String[] ids) throws Exception{
        List<Whjldc> list=new ArrayList<Whjldc>();
        Whjldc whjldc=null;
        for (int i=0;i<ids.length;i++){
            whjldc=yqsbjdjlMapper.findOnewhjlByid(Integer.parseInt(ids[i]));
            list.add(whjldc);
        }
        List<ExcelBean> excel=new ArrayList<ExcelBean>();
        Map<Integer,List<ExcelBean>> map=new LinkedHashMap<>();
        XSSFWorkbook xssfWorkbook=null;
        //设置标题栏
        excel.add(new ExcelBean("受控编号","skbh",0));
        excel.add(new ExcelBean("设备名称","sbmc",0));
        excel.add(new ExcelBean("规格型号","ggxh",0));
        excel.add(new ExcelBean("维护日期","whrq",0));
        excel.add(new ExcelBean("维护记录","whjl",0));
        excel.add(new ExcelBean("维护人","whr",0));
        excel.add(new ExcelBean("维护备注","whbz",0));
        map.put(0, excel);
        String sheetName = "维护记录";
        //调用ExcelUtil的方法
        xssfWorkbook = ExcelUtil.createExcelFile(Whjldc.class, list, map, sheetName);
        return xssfWorkbook;
    };
    //    导出核查记录
    public XSSFWorkbook exporthcjlExcel(String[] ids) throws Exception{
        List<Hcjldc> list=new ArrayList<Hcjldc>();
        Hcjldc hcjldc=null;
        for (int i=0;i<ids.length;i++){
            hcjldc=yqsbjdjlMapper.findOnehcjlByid(Integer.parseInt(ids[i]));
            list.add(hcjldc);
        }
        List<ExcelBean> excel=new ArrayList<ExcelBean>();
        Map<Integer,List<ExcelBean>> map=new LinkedHashMap<>();
        XSSFWorkbook xssfWorkbook=null;
        //设置标题栏
        excel.add(new ExcelBean("受控编号","skbh",0));
        excel.add(new ExcelBean("设备名称","sbmc",0));
        excel.add(new ExcelBean("规格型号","ggxh",0));
        excel.add(new ExcelBean("核查日期","hcrq",0));
        excel.add(new ExcelBean("核查依据","hcyj",0));
        excel.add(new ExcelBean("核查记录","hcjl",0));
        excel.add(new ExcelBean("核查结果","hcjg",0));
        excel.add(new ExcelBean("核查人","hcr",0));
        excel.add(new ExcelBean("核查备注","hcbz",0));
        map.put(0, excel);
        String sheetName = "核查记录";
        //调用ExcelUtil的方法
        xssfWorkbook = ExcelUtil.createExcelFile(Hcjldc.class, list, map, sheetName);
        return xssfWorkbook;
    };
}
