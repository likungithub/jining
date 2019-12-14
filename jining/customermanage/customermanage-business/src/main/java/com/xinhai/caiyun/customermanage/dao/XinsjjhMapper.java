package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface XinsjjhMapper {
    //查找检测量统计的所有数据
    public List<Map> sjjh_queryList(@Param("map") Map map);
    //得到检测量数据的统计
    public Integer sjjh_findCount(@Param("map") Map map);

    //查找检测量统计的所有数据
    public List<Map> sjfh_queryList(@Param("map") Map map);
    //得到检测量数据的统计
    public Integer sjfh_findCount(@Param("map") Map map);
}
