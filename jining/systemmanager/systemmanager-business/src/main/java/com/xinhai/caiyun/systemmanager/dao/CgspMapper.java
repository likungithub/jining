package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface CgspMapper {
    /**陈
     *获得审批的数据
     */
    public List<Map> queryCgspXx(@Param("map") Map map);
    /**陈
     *获得审批的数据的数量
     */
    public Integer queryCgspXxNum(@Param("map") Map map);
    /**陈
     * 审批成功和退回操作
     */
    public void  saveSqzt(@Param("map") Map map);
    /**陈
     * 得到退回的消息内容
     */
    public List<Map> queryMess(@Param("ids") List<String> ids);
}
