package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface HyglMapper {
    public List<Map> selectHyglList(@Param("map") Map map);
    public Integer selectCount(@Param("map") Map map);
    public void updateHygl(@Param("map") Map map);
}
