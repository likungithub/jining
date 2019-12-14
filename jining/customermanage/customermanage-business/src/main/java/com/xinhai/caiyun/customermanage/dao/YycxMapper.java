package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface YycxMapper {
    public List<Map> findYycx(@Param("map") Map map);
    public Integer findCount(@Param("map") Map map);
}
