package com.xinhai.caiyun.systemmanager.dao;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;
@Repository
public interface BztxglMapper {
    /**
     * 获取标准项目管理所有表数据
     * @return 返会所有数据
     */
    public List<Map> findAllBzxmgl(@Param("map") Map map);

    /**
     * 统计标准项目管理数量
     *
     * @return
     */
    public Integer findBzxmglNum(@Param("map") Map map);
    /**
     * 标准项目管理 增加检测项目信息
     */
    public void addBzxmglJcx(@Param("map") Map map);
    /**
     * 查找ypid 和 jcxmid
     */
    public Map findYJid(@Param("yjid") Integer yjid);
    /**
     * 通过ypid 查找样品信息
     */
    public Map findOneYp(@Param("ypid") Integer ypid);
    /**
     * 通过jcxmid 查找检测项目
     */
    public  Map findOneJcxm(@Param("jcxmid") Integer jcxmid);
    /**
     *更新检测项目
     */
    public void updateJcxm(@Param("map") Map map);
    /**
     *更新样品
     */
    public void updateYp(@Param("map") Map map);
    /**
     * 通过样品id 删除样品
     */
    public void delYpById(@Param("id") Integer id);
}
