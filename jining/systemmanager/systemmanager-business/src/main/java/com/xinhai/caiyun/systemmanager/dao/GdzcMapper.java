package com.xinhai.caiyun.systemmanager.dao;

import com.xinhai.caiyun.systemmanager.api.YqsbXx;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface GdzcMapper {
    //    查看仪器设备台账
    public List<Map> selectYqsbtz(@Param("map") Map map);
    public Integer selectYqtzCount(@Param("map") Map map);
    /*导入操作*/
    public void importyqsbtzExcel(@Param("map") Map map);
    /*导入基本信息*/
    public void importyqsbtzBaseExcel(@Param("map") Map map);
    /*删除台账记录*/
    public void deleteYqsbtz(@Param("map") Map map);
    /*关于受控编号*/
    public List<Map> selectSkbh();
    /*新增仪器设备*/
    public void insertNewYqsb(@Param("map") Map map);
    /*新增基本信息*/
    public void insertBaseYqsb(@Param("map") Map map);
    /*修改基本信息*/
    public void updateBaseYqsb(@Param("map") Map map);
    /*修改仪器设备台账信息*/
    public void updateYqsbtz(@Param("map") Map map);
    /*通过受控编号查找设备信息*/
    public YqsbXx findBySkbh(@Param("map") Map map);
    /*消息提醒*/
    public List<Map> findyqsbjd();
    /*避免消息重复*/
    public Integer yqjdxxXZfs();
    /*检定消息提醒*/
    public List<String> findJD();

    /*消息提醒*/
    public List<Map> findyqsbwh();
    /*避免消息重复*/
    public Integer yqwhxxXZfs();
    /*检定消息提醒*/
    public List<String> findWH();

    /*消息提醒*/
    public List<Map> findyqsbhc();
    /*避免消息重复*/
    public Integer yqhcxxXZfs();
    /*检定消息提醒*/
    public List<String> findHC();
}
