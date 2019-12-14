package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface YqsbjdjhMapper {
    /*查询仪器设备检定计划*/
    public List<Map> selectYqsbjdjh(@Param("map") Map map);
    /*返回条数*/
    public Integer selectJdjhCount(@Param("map") Map map);
    /*制定检定计划*/
    public void updateJdjh(@Param("map") Map map);
    /*制定维护计划*/
    public void updateWhjh(@Param("map") Map map);
    /*制定核查计划*/
    public void updateHcjh(@Param("map") Map map);
}
