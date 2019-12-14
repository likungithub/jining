package com.xinhai.caiyun.systemmanager.dao;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;
@Repository
public interface YqyysyMapper {
    /**
     * 查询仪器所有信息
     */
    public List<Map> findAllYq(@Param("map") Map map);
    /**
     * 查询仪器所有统计数
     */
    public Integer findAllYqNum(@Param("map") Map map);
    /**
     * 查找需要的检测项目信息
     */
    public List<Map> findAllJcxm(@Param("map") Map map);
    /**
     * 查找所有的检测项目数量
     */
    public Integer findAllJcxmNum(@Param("map") Map map);
    /**
     * 更新检测项目的if_yqfp 是否仪器分配
     */
    public void updataJcxm_If_yqfp(@Param("map") Map map);
    /**
     * 更新仪器项目dqzt 当前的状态
     */
    public void updateYq_dqzt(@Param("map") Map map);
    /**
     * 增加检测项和仪器表
     */
    public void addJcxYq(@Param("map") Map map);
}
