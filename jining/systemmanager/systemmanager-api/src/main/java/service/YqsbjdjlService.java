package service;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.util.List;
import java.util.Map;

public interface YqsbjdjlService {
    /*查询仪器设备检定记录*/
    public List<Map> selectYqsbjdjl(Map map);
    /*返回条数*/
    public Integer selectJdjlCount(Map map);
    /*检定记录*/
    public void updateJdjl(Map map);
    /*记录检定历史*/
    public void insertJdjllsb(Map map);
    /*维护记录*/
    public void updateWhjl(Map map);
    /*记录维护历史*/
    public void insertWhjllsb(Map map);
    /*核查记录*/
    public void updateHcjl(Map map);
    /*记录核查历史*/
    public void insertHcjllsb(Map map);
//    根据检定地区导出
    public XSSFWorkbook exportdqExcel(Map map) throws Exception;
    public XSSFWorkbook exportdqAllExcel() throws Exception;
//    导出检定记录
    public XSSFWorkbook exportExcel(String[] ids) throws Exception;
    //    导出维护记录
    public XSSFWorkbook exportwhjlExcel(String[] ids) throws Exception;
    //    导出核查记录
    public XSSFWorkbook exporthcjlExcel(String[] ids) throws Exception;
}
