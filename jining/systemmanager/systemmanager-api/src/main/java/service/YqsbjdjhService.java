package service;

import java.util.List;
import java.util.Map;

public interface YqsbjdjhService {
    /*查询仪器设备检定计划*/
    public List<Map> selectYqsbjdjh(Map map);
    /*返回条数*/
    public Integer selectJdjhCount(Map map);
    /*制定检定计划*/
    public void updateJdjh(Map map);
    /*制定维护计划*/
    public void updateWhjh(Map map);
    /*制定核查计划*/
    public void updateHcjh(Map map);
}
