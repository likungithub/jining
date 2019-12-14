package com.xinhai.caiyun.systemmanager.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface YqsbjhspMapper {
    /*查询仪器设备检定计划*/
    public List<Map> selectYqsbjdjh(@Param("map") Map map);
    /*返回条数*/
    public Integer selectJdjhCount(@Param("map") Map map);
    /*查询角色*/
    public List<Map> selectInd(@Param("map")Map map);
    /*批准人界面显示*/
    public List<Map> selectJdpz(@Param("map")Map map);
    public Integer selectJdpzCount(@Param("map")Map map);
    /*审核人审批*/
    public void shrsp(@Param("map")Map map);
    /*审核人退回*/
    public void shrth(@Param("map")Map map);
    /*批准人审批*/
    public void pzrsp(@Param("map")Map map);
    /*批准人退回*/
    public void pzrth(@Param("map")Map map);

    /*查询仪器设备检定计划*/
    public List<Map> selectYqsbwhjh(@Param("map") Map map);
    /*返回条数*/
    public Integer selectWhjhCount(@Param("map") Map map);
    /*批准人界面显示*/
    public List<Map> selectWhpz(@Param("map")Map map);
    public Integer selectWhpzCount(@Param("map")Map map);
    /*审核人审批*/
    public void whshrsp(@Param("map")Map map);
    /*审核人退回*/
    public void whshrth(@Param("map")Map map);
    /*批准人审批*/
    public void whpzrsp(@Param("map")Map map);
    /*批准人退回*/
    public void whpzrth(@Param("map")Map map);

    /*查询仪器设备检定计划*/
    public List<Map> selectYqsbhcjh(@Param("map") Map map);
    /*返回条数*/
    public Integer selectHcjhCount(@Param("map") Map map);
    /*批准人界面显示*/
    public List<Map> selectHcpz(@Param("map")Map map);
    public Integer selectHcpzCount(@Param("map")Map map);
    /*审核人审批*/
    public void hcshrsp(@Param("map")Map map);
    /*审核人退回*/
    public void hcshrth(@Param("map")Map map);
    /*批准人审批*/
    public void hcpzrsp(@Param("map")Map map);
    /*批准人退回*/
    public void hcpzrth(@Param("map")Map map);

}
