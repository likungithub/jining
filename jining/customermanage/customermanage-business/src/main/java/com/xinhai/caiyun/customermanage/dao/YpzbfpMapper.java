package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface YpzbfpMapper {
    /**
     * 获得制备分配的信息
     */
   public List<Map> queryAll(@Param("map") Map map);
    /**
     * 获得制备分配的信息的数量
     */
    public Integer queryAllNum(@Param("map") Map map);
    /**
     * 保存任务分配的数据
     */
    public void saveFp(@Param("map") Map map);
    /**
     * 通过职员代码获得
     */
    public String getUserName(@Param("zydm") String zydm);
    /**
     * 分配任务退回
     */
    public void saveBack(@Param("map") Map map);
}