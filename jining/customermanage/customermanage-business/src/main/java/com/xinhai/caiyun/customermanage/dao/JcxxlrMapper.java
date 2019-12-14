package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface JcxxlrMapper {
    //开始获得温度湿度
    public List<Map> startWsd();

    //结束获取温湿度
    public List<Map> endWsd();
    //将温度湿度保存到数据库中
    public void saveWsd(@Param("map") Map map);
}
