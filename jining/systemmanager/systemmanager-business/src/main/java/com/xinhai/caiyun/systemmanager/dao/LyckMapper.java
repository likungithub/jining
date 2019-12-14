package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface LyckMapper {
    /**
     *
     * 得到领用出库的信息
     */
    public List<Map> queryLyckAll(@Param("map") Map map);

    /**
     *
     * 得到领用出库的信息的数量
     */
    public Integer queryLyckAllNum(@Param("map") Map map);
    /**
     * 保存出库状态
     */
    public void saveCkzt(@Param("map") Map map);
    /**
     * 得到库存数量
     */
    public String queryKcNum(@Param("id") String id);
    /**
     * 得到领用数量
     */
    public String queryLyNum(@Param("id") String id);

}
