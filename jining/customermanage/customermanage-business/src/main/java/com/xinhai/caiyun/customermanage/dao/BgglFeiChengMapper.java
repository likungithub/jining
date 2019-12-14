package com.xinhai.caiyun.customermanage.dao;


import com.xinhai.caiyun.customermanage.api.Jcx;
import com.xinhai.caiyun.customermanage.api.Tqywt;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public interface BgglFeiChengMapper {

    //获取 肥城抽样汇总表
    List<Map> getCyhzb(@Param("cxtj") Map cxtj);

    List<Map> getZfCyWtdList(@Param("map") Map map);


    List<Map> getZfDcCydList(@Param("map") Map map);
}