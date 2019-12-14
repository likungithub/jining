package com.xinhai.caiyun.customermanage.dao;


import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface PageConfigMapper {

    List<Map> findById(@Param("map") Map map);

    void update(@Param("map") Map map);

    void add(@Param("map") Map map);

    void del(@Param("map") Map map);

}