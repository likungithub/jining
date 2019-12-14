package com.xinhai.caiyun.systemmanager.dao;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;
@Repository
public interface FxxmdjMapper {
    /**
     * c查找所有的检测项目信息
     * @return
     */
    public List<Map> findAllFxxmdj(@Param("map") Map map);
    /**
     * c查找所有的检测项数量
     * @return
     */
    public Integer findAllFxxmdjNum(@Param("map") Map map);
    /**
     * 通过id删除一条数据
     */
    public void deleteFxxmdjById(@Param("id") Integer id);
    /**
     * 增加标准库查询的信息
     */
    public void addFxxmdj(@Param("map") Map map);
    /**
     * 通过id获得单个值
     */
    public Map findFxxmdjById(@Param("id") Integer id);

    /**
     * 更新数据
     * @param map
     */
    public void updateFxxmdj(@Param("map") Map map);
}
