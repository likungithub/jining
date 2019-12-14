package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface YqsbwxbfMapper {
    //查看仪器设备
    public List<Map> selectYqsbtzwxbf(@Param("map") Map map);
    public Integer selectYqtzCountwxbf(@Param("map") Map map);
    /*保存维修原因*/
    public void updateWxyy(@Param("map") Map map);
    /*保存报废原因*/
    public void updateBfyy(@Param("map") Map map);
    //查看仪器设备维修报废审批信息
    public List<Map> selectYqsbtzwxbfsp(@Param("map") Map map);
    public Integer selectYqtzCountwxbfsp(@Param("map") Map map);
    //审批维修报废申请
    public void updateWbSpzt(@Param("map") Map map);
    //审批退回
    public void updateWbSpztTh(@Param("map") Map map);
    //查看需要维修设备
    public List<Map> selectYqsbtzwxbfWx(@Param("map") Map map);
    public Integer selectYqtzCountwxbfWx(@Param("map") Map map);
    //维修记录
    public void updateSbWx(@Param("map") Map map);

    //一级维修审批信息
    public List<Map> selectYqsbtzwxspyj(@Param("map") Map map);
    public Integer selectYqtzCountwxspyj(@Param("map") Map map);
    //审批维修申请
    public void updateWxSpztyj(@Param("map") Map map);
    //审批退回
    public void updateWxSpztThyj(@Param("map") Map map);

    //二级维修审批信息
    public List<Map> selectYqsbtzwxspej(@Param("map") Map map);
    public Integer selectYqtzCountwxspej(@Param("map") Map map);
    //审批维修申请
    public void updateWxSpztej(@Param("map") Map map);
    //审批退回
    public void updateWxSpztThej(@Param("map") Map map);

    //三级维修审批信息
    public List<Map> selectYqsbtzwxspsj(@Param("map") Map map);
    public Integer selectYqtzCountwxspsj(@Param("map") Map map);
    //审批维修申请
    public void updateWxSpztsj(@Param("map") Map map);
    //审批退回
    public void updateWxSpztThsj(@Param("map") Map map);

    //四级维修审批信息
    public List<Map> selectYqsbtzwxspsij(@Param("map") Map map);
    public Integer selectYqtzCountwxspsij(@Param("map") Map map);
    //审批维修申请
    public void updateWxSpztsij(@Param("map") Map map);
    //审批退回
    public void updateWxSpztThsij(@Param("map") Map map);
}
