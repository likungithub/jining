package com.xinhai.caiyun.statisticalanalysis.dao;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface TjcxMapper {
    //查找检测量统计的所有数据
    public List<Map> jcltj_queryList(@Param("map") Map map);
    //得到检测量数据的统计
    public Integer jcltj_findCount(@Param("map") Map map);

    //科室查找检测量统计的所有数据
    public List<Map> ksjcl_queryList(@Param("map") Map map);
    //得到检测量数据的统计
    public Integer ksjcl_findCount(@Param("map") Map map);

    //查找检测量统计的所有数据
    public List<Map> bgfftj_queryList(@Param("map") Map map);
    //得到检测量数据的统计
    public Integer bgfftj_findCount(@Param("map") Map map);
    public void updateBgff(@Param("map") Map map);
    //通过id的集合 获取报告领数据
    public List<Map> bgfftj_getData(@Param("ids") List ids);
}
