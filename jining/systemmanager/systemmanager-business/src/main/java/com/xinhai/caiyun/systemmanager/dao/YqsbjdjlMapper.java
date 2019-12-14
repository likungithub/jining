package com.xinhai.caiyun.systemmanager.dao;

import com.xinhai.caiyun.systemmanager.api.Hcjldc;
import com.xinhai.caiyun.systemmanager.api.Whjldc;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;
import com.xinhai.caiyun.systemmanager.api.yqsbjdjldc;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Repository;

@Repository
public interface YqsbjdjlMapper {
    /*查询仪器设备检定记录*/
    public List<Map> selectYqsbjdjl(@Param("map") Map map);
    /*返回条数*/
    public Integer selectJdjlCount(@Param("map") Map map);
    /*检定记录*/
    public void updateJdjl(@Param("map") Map map);
    /*记录检定历史*/
    public void insertJdjllsb(@Param("map") Map map);
    /*维护记录*/
    public void updateWhjl(@Param("map") Map map);
    /*记录维护历史*/
    public void insertWhjllsb(@Param("map") Map map);
    /*核查记录*/
    public void updateHcjl(@Param("map") Map map);
    /*记录核查历史*/
    public void insertHcjllsb(@Param("map") Map map);
    //    根据检定地区导出
    public List<yqsbjdjldc> findOnedqByid(@Param("map")Map map);
    public List<yqsbjdjldc> findOnedqAllByid();
//    检定记录导出
    public yqsbjdjldc findOneByid(@Param("id") Integer id);
    //    维护记录导出
    public Whjldc findOnewhjlByid(@Param("id") Integer id);
    //    核查记录导出
    public Hcjldc findOnehcjlByid(@Param("id") Integer id);

}
