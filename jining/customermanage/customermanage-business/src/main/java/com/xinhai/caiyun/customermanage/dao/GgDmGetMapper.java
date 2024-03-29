package com.xinhai.caiyun.customermanage.dao;


import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface GgDmGetMapper {

    /**
     * 获取所有的有效制备方式
     * @return
     */
    public List<Map> getZbfsList();

    /**
     * 根据条件获取  检验类别  ，没有条件 则获取所有检验类别
     * @return
     */
    public List<Map> getJylbList(@Param("map") Map map);
}