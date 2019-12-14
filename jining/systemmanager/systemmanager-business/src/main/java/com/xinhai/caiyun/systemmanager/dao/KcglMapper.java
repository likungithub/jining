package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface KcglMapper {
    /**
     * 陈
     * 查找库存管理的的信息
     */
    public List<Map> selectKcgl(@Param("map") Map map);

    /**
     * 陈
     * 查找库存管理的信息的数量
     */
    public Integer selectKcglNum(@Param("map") Map map);

    /**
     * 陈
     * 删除库存信息
     */
    public void delKcgl(@Param("id") String id);

    /**
     * 陈
     * 通过id查找耗材信息
     */
    public List<Map> findById(@Param("id") String id);

    /**
     * 陈
     * 更新耗材的信息
     */
    public void updateKcgl(@Param("map") Map map);

    /**
     * 陈
     * 设置库存的用库存数量
     */
    public void setCyKcsl(@Param("map") Map map);

    /**
     * 陈
     * 获得所有的检测库存的信息
     */
    public List<Map> queryAllKcglByCheck();

    /**
     * 获得职员代码的信息
     */
    public List<String> queryZydm(@Param("bmmc") String bmmc);

    /**
     * 将excel解析的数据放入数据库中
     */
    public void saveExcelData(@Param("list") List list);
}
