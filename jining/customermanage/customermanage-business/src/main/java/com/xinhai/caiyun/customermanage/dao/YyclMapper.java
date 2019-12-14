package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface YyclMapper {
    public List<Map> selectYycl(@Param("map") Map map);
    public Integer selectCount(@Param("map") Map map);
    public void destoryYpzt(@Param("map") Map map);
    public void updateYycl(@Param("map") Map map);
    public void updateXhsq(@Param("map") Map map);
    public List<Map> findInd(@Param("map") Map map);
    /*技术负责人*/
    public List<Map> findCgsq(@Param("map") Map map);
    public Integer findCount(@Param("map") Map map);
    /*经办人*/
    public List<Map> findjbCgsq(@Param("map") Map map);
    public Integer findjbCount(@Param("map") Map map);
    /*技术负责人审批*/
    public void updateJssp(@Param("map") Map map);
    /*经办人审批*/
    public void updateJbr(@Param("map") Map map);
    /*技术负责人退回*/
    public void updateJsth(@Param("map") Map map);
    /*经办人退回*/
    public void updateJbrth(@Param("map") Map map);
}
