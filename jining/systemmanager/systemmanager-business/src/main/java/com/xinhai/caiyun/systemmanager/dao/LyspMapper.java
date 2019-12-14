package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface LyspMapper {
    /**
     * 陈
     * 得到一级审批的信息
     */
    public List<Map> queryLysp1All(@Param("map") Map map);

    /**
     * 陈
     * 得到一级审批的信息的数量
     */
    public Integer queryLysp1AllNum(@Param("map") Map map);

    /**
     * 陈
     * 一级审批通过和退回操作
     */
    public void saveZt1(@Param("map") Map map);

    /**
     * 陈
     * 获得耗材的类型
     */
    public String queryHclxById(@Param("id") String id);

    /**
     * 陈
     * 获得领用申请人
     */
    public String queryLyrById(@Param("id") String id);
    /**
     * 陈
     * 得到二级审批的信息
     */
    public List<Map> queryLysp2All(@Param("map") Map map);

    /**
     * 陈
     * 得到二级审批的信息的数量
     */
    public Integer queryLysp2AllNum(@Param("map") Map map);
    /**
     * 陈
     * 二级审批通过和退回操作
     */
    public void saveZt2(@Param("map") Map map);

}
