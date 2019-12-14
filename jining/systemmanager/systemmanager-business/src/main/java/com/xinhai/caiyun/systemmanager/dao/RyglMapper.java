package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface RyglMapper {
    /**
     * 查询人员的基本信息
     * */
    public List<Map> selectRygl(@Param("map") Map map);
    public Integer selectRyglCount(@Param("map")Map map);
    /**
     * 新增人员信息
     */
    public void addRygl(@Param("map")Map map);
    /**
     * 删除人员信息
     */
    public void deleteRygl(@Param("map")Map map);
    /**
     * 修改人员基本
     */
    public void updateRygl(@Param("map")Map map);
}
