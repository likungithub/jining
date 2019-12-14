package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface YpjsqrMapper {
    /**
     * 查询所有样品接收确认信息
     * @return
     */
    public  List<Map> findAllYpjsqr(@Param("map") Map map);
    /**
     * 查询所有样品接收确认信息数量
     * @return
     */
    public  Integer findAllYpjsqrNum(@Param("map") Map map);
    /**
     * 接收确认改变状态
     */
    public  void  updateJszt(@Param("id") String id);
}
