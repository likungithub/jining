package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.Gqyptz;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface GqyptzMapper {
    //查询过期样品列表
    public List<Map> selectGqypAll(@Param("map") Map map);
    public Integer selectGqypCount(@Param("map") Map map);
    /*通过样品编码查找过期样品信息*/
    public Gqyptz findByYpbm(@Param("map")Map map);
}
