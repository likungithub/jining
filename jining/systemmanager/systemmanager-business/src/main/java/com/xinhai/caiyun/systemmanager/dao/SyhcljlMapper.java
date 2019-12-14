package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface SyhcljlMapper {
    /*
     * 获得剩余耗材量
     */
    public List<Map> findByNaTy(@Param("map") Map map);

    /*
     * 获得剩余耗材量数量
     */
    public Integer findByNaTyNum(@Param("map")Map map);

    /*
     * 增加剩余耗材量信息
     */
    public void addCgsq(@Param("map")Map map);

    /*
     *批量删除信息
     */
    public void deleteCgsq(@Param("ids")List<String> ids);

    /*
     *打印
     */
    List<Map> yp(@Param("dy") List dy);
}
