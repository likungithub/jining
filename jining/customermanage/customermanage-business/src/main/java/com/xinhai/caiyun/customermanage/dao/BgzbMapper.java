package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface BgzbMapper {
    /**
     * 获取制表检测项信息
     */
    public Map findJcxInfo(@Param("id")String id);
    /**
     * 获取检测值与样品名称
     */
    public List<Map> findJczInfo(@Param("id")String id);
    /**
     * 获取检测项名称
     */
    public String JcxName(@Param("id")String id);
    public List<Boolean> findJcjg(@Param("id")String id);
}
