package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface JcxFywhMapper {

    long findCount(@Param("cxtj") Map cxtj);

    List<Map> findAll(@Param("cxtj") Map cxtj);

    List<Map> selectLrFykz(@Param("map") Map map);

    Integer selectCountFykz(@Param("map") Map map);

    void insertFYKZ(@Param("map") Map map);
}
