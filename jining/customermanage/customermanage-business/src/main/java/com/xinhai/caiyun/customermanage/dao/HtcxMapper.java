package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface HtcxMapper {
    /**
     * 查询所有委托信息
     * @return
     */
    public List<Map> findAllWt(@Param("map")Map map);

    /**
     * 查到所有显示数
     * @return
     */
    public int findWtCount(@Param("map")Map map);
    /**
     * 查找对应样品信息
     */
    public List<Map> findYpByWtid(@Param("map")Map map);
    /**
     * 查找对应样品所有数
     */
    public Integer findYpNum(@Param("map")Map map);
}
