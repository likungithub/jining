package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface CgshMapper {
    /**
     *获得审批的数据
     */
    public List<Map> queryCgshXx(@Param("map") Map map);
    /**
     *获得审批的数据的数量
     */
    public Integer queryCgshXxNum(@Param("map") Map map);
    /**
     * 审批成功和退回操作
     */
    public void  saveShzt(@Param("map") Map map);
    /**
     * 得到退回的消息内容
     */
    public List<Map> queryMess(@Param("ids") List<String> ids);
}
