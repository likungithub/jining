package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface Cgck2Mapper {
    //查找检测量统计的所有数据
    public List<Map> cgck2_queryList(@Param("map") Map map);
    //得到检测量数据的统计
    public Integer cgck2_findCount(@Param("map") Map map);
    /*查询库存信息*/
    public String cgck(@Param("map") Map map);
    /*更新数量*/
    public void updateKc(@Param("map") Map map);
    public void updatesqKc(@Param("map") Map map);
    /*更新状态*/
    public void updateZt(@Param("map") Map map);
}
