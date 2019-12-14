package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface BgmodelMapper {
    List<Map> getAll(@Param("BGNAME") String bgname, @Param("start") Integer start, @Param("length") Integer length);
    Integer getCount(@Param("BGNAME") String bgname, @Param("start") Integer start, @Param("length") Integer length);
    //新增报告模板
    void addBgmodel(@Param("BGNAME") String BGNAME, @Param("BBH") String BBH, @Param("SC_RYDM") String SC_RYDM, @Param("CCDZ") String CCDZ, @Param("SJZD") String SJZD,@Param("ID")String ID);
    //根据ID获取路径
    String getCcdzById(@Param("ID") String id);
    //更新字段
    void updateZD(@Param("SJZD") String SJZD, @Param("ID") String ID);
    //删除报告
    void scbgmodel(@Param("data") List mapList);
    //获取id
    Integer findBgModelId();
    //删除
    void SCZD(@Param("BGMODELID") String BGMODELID,@Param("data")List<Map> list);
}
