package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface GztzMapper {
    /**
     * 根据人员 获取 工作量统计信息
     */
    public List<Map> getGzltjByRy(@Param("map") Map map);

    /**
     * 根据人员 获取 工作量统计信息的数量
     */
    public long getGzltjByRyNum(@Param("map") Map map);    /**

     * 根据人员 获取 工作量统计信息 明细
     */
    public List<Map> getGzltjByRyMx(@Param("map") Map map);

    /**
     * 根据人员 获取 工作量统计信息的数量 明细
     */
    public long getGzltjByRyMxNum(@Param("map") Map map);
}
