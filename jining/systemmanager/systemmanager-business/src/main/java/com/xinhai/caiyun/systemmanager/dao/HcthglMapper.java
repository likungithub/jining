package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface HcthglMapper {
    /**
     * 得到领用申请的信息
     */
    public List<Map> queryHcthglAll(@Param("map") Map map);

    /**
     * 得到领用申请的信息的数量
     */
    public Integer queryHcthglAllNum(@Param("map") Map map);
    /**
     *得到报告的数据  通过id的集合
     */
    public  List<Map> getReportData(@Param("ids") List ids);
    /**
     * 删除耗材领用管理的数据  通过id的集合
     */
    public void  delThgl(@Param("ids") List ids);

}
