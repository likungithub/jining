package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface YpzbinfoMapper {
    //获取制备信息
    List<Map> getAll(@Param("map") Map map);
    //获取总数
     Integer getCount(@Param("map") Map map);
     void insert(@Param("data") List<Map> list);
     void updateYpzbInfo(@Param("map") Map map);
     /*更新接收信息*/
    void updateYpzbTjInfo(@Param("map") Map map);
    /*制备信息导出*/
    List<Map> zbInfoDaochu(@Param("map") Map map);
    //出入库信息导出
    List<Map> findCrkInfo(@Param("map") Map map);
}
