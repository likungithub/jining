package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface TzbfsMapper {
    /**
     * 获取所有元素
     */
    List<Map<String,String>> findAll(@Param("lx") String lx);
}
