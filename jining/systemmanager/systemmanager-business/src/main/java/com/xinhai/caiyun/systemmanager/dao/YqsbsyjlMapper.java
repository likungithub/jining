package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface YqsbsyjlMapper {
    //查询受控编号
    public List<Map> selectSKbh(@Param("map")Map map);
    //展示关联仪器样品
    public List<Map> selectSyjl(@Param("map") Map map);
    public Integer selectSyjlCount(@Param("map")Map map);
    //查询全部仪器
    public List<Map> selectYqsb(@Param("map")Map map);
    //查询全部样品
    public List<Map> selectYpxx(@Param("map")Map map);
    //查询相关样品检测项
    public List<Map> selectYqjcx(@Param("map")Map map);
    //添加仪器使用记录
    public void addYqsyjl(@Param("map") Map map);
    //查找重复
    public Integer selectcfwt(@Param("map") Map map);
    //一起使用完毕
    public void finishYqsy(@Param("map") Map map);
}
