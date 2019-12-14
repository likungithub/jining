package service;

import java.util.List;
import java.util.Map;

public interface YqsbjhspService {
    /*查询仪器设备检定计划*/
    public List<Map> selectYqsbjdjh(Map map);
    /*返回条数*/
    public Integer selectJdjhCount(Map map);
    /*查询角色*/
    public List<Map> selectInd(Map map);
    /*批准人界面显示*/
    public List<Map> selectJdpz(Map map);
    public Integer selectJdpzCount(Map map);
    /*审核人审批*/
    public void shrsp(Map map);
    /*审核人退回*/
    public void shrth(Map map);
    /*批准人审批*/
    public void pzrsp(Map map);
    /*批准人退回*/
    public void pzrth(Map map);
    /*查询仪器设备检定计划*/
    public List<Map> selectYqsbwhjh(Map map);
    /*返回条数*/
    public Integer selectWhjhCount(Map map);
    /*批准人界面显示*/
    public List<Map> selectWhpz(Map map);
    public Integer selectWhpzCount(Map map);
    /*审核人审批*/
    public void whshrsp(Map map);
    /*审核人退回*/
    public void whshrth(Map map);
    /*批准人审批*/
    public void whpzrsp(Map map);
    /*批准人退回*/
    public void whpzrth(Map map);

    /*查询仪器设备检定计划*/
    public List<Map> selectYqsbhcjh( Map map);
    /*返回条数*/
    public Integer selectHcjhCount(Map map);
    /*批准人界面显示*/
    public List<Map> selectHcpz(Map map);
    public Integer selectHcpzCount(Map map);
    /*审核人审批*/
    public void hcshrsp(Map map);
    /*审核人退回*/
    public void hcshrth(Map map);
    /*批准人审批*/
    public void hcpzrsp(Map map);
    /*批准人退回*/
    public void hcpzrth(Map map);
}
