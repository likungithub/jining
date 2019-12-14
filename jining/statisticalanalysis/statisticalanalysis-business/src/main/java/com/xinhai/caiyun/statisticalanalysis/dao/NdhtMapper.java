package com.xinhai.caiyun.statisticalanalysis.dao;

import com.xinhai.caiyun.statisticalanalysis.api.Ndht;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface NdhtMapper {
    /**
     * 查询年度合同的所有信息
     */
    public List<Map> findAllNndht(@Param("map") Map map);
    /**
     *得到所有年度的统计数
     */
    public Integer findAllNdhtNum(@Param("map") Map map);
    /**
     * 通过样品id查找信息
     */
    public Ndht findOneNdhtByid(@Param("id") Integer id);
}
