package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ScxtdjMapper {
    /**
     * 查询导入日志
     * @param map
     * @return
     */
    public List<Map> selectRzAll(@Param("map") Map map);
    public Integer selectRzCount(@Param("map") Map map);
    //查询导入日志表主键
    public String selectLogid(@Param("map") Map map);
    /*导入操作*/
    public void importcydExcelSc(@Param("map")Map map);
    //存储导入日志
    public void insertScdjLog(@Param("map") Map map);
    //查询导入Excel详情
    public List<Map> selectExcel(@Param("map") Map map);
    public Integer selectExcelCount(@Param("map") Map map);

}
