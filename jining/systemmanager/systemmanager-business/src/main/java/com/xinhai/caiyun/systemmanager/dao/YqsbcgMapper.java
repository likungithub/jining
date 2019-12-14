package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface YqsbcgMapper {
    /*打印采购单*/
    public List<Map> selectDY(@Param("map") Map map);
    /*查看仪器设备采购申请*/
    public List<Map> selectYqsbcg(@Param("map") Map map);
    public Integer selectYqCount(@Param("map") Map map);
    /*查询申请人所在部门*/
    public List<Map> selectBmdm(@Param("map") Map map);
    /*新增采购申请*/
    public void insertYqsbcg(@Param("map") Map map);
    /*删除仪器设备采购申请*/
    public void deleteYqsbcgsq(@Param("map") Map map);
    /*修改仪器设备采购申请*/
    public void updateYqsbcgsq(@Param("map") Map map);
    /*提交采购申请*/
    public void submitCgsq(@Param("map") Map map);
    /*判断身份*/
    public List<Map> findInd(@Param("map") Map map);
    /*实验室主管查询采购申请信息*/
    public List<Map> findYqcgsqsys(@Param("map") Map map);
    public Integer findCountsys(@Param("map") Map map);
    /*分管主任查询采购申请信息*/
    public List<Map> findYqcgsqfg(@Param("map") Map map);
    public Integer findCountfg(@Param("map") Map map);
    /*单位负责人查询采购申请信息*/
    public List<Map> findYqcgsqdw(@Param("map") Map map);
    public Integer findCountdw(@Param("map") Map map);
    /*实验室主管审批*/
    public void syszgSP(@Param("map") Map map);
    /*分管主任审批*/
    public void fggrSP(@Param("map") Map map);
    /*单位负责人审批*/
    public void dwfzrSP(@Param("map") Map map);
    /*退回*/
    public void syszgTH(@Param("map") Map map);
    public void fggrTH(@Param("map") Map map);
    public void dwfzrTH(@Param("map") Map map);
    /*导入*/
    public void importCgsqExcel(@Param("map") Map map);
}
