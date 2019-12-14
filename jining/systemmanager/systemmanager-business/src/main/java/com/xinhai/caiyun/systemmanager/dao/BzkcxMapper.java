package com.xinhai.caiyun.systemmanager.dao;

import com.xinhai.caiyun.systemmanager.api.Bzkcx;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface BzkcxMapper {
    /**
     * c查找所有的检测项目信息
     * @return
     */
    public List<Map> findAllBzkcx(@Param("map") Map map);
    /**
     * c查找所有的检测项数量
     * @return
     */
    public Integer findAllBzkcxNum(@Param("map") Map map);
    /**
     * 通过id删除一条数据
     */
    public void deleteBzkcxById(@Param("id") Integer id);
    /**
     * 增加标准库查询的信息
     */
    public void addBzkcx(@Param("map") Map map);
    /**
     * 通过id获得单个值
     */
    public Map findBzkcxById(@Param("id") Integer id);

    /**
     * 更新数据
     * @param map
     */
    public void updateBzkcx(@Param("map") Map map);
    /**
     * Excel插入数据
     */
    public void addExcelBzkcx(@Param("list") List<Map> list);
    /**
     * 导出Excel数据
     */
    public Bzkcx findExcelBzkcxById(@Param("id") Integer id);
}
