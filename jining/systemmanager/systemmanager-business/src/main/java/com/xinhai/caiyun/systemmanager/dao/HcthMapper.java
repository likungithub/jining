package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface HcthMapper {
    /**
     * 得到领用申请的信息
     */
    public List<Map> queryHcthAll(@Param("map") Map map);

    /**
     * 得到领用申请的信息的数量
     */
    public Integer queryHcthAllNum(@Param("map") Map map);

    /**
     * 通过hcbm  在采购入库表中查找信息
     */
    public List<Map> queryCgrkByHcbm(@Param("hcbm") String hcbm);

    /**
     * 将采购入库中的数据放入领用表中  也就是入库表中的id
     */
    public void addHcthFromCgrk(@Param("map") Map map);
    /**
     * 删除退回信息
     */
    public void delHcth(@Param("id") String id);
}
