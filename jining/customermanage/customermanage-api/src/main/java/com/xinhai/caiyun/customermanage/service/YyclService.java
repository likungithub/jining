package com.xinhai.caiyun.customermanage.service;

import java.util.List;
import java.util.Map;

public interface YyclService {
    public List<Map> selectYycl(Map map);
    public Integer selectCount(Map map);
    public void destoryYpzt(Map map);
    public void updateYycl(Map map);
    public void updateXhsq(Map map);
    public List<Map> findInd(Map map);
    /*技术负责人显示数据*/
    public List<Map> findCgsq(Map map);
    public Integer findCount(Map map);
    /*经办人*/
    public List<Map> findjbCgsq(Map map);
    public Integer findjbCount(Map map);
    /*技术负责人审批*/
    public void updateJssp(Map map);
    /*经办人审批*/
    public void updateJbr(Map map);
    /*技术负责人退回*/
    public void updateJsth(Map map);
    /*经办人退回*/
    public void updateJbrth(Map map);
}
