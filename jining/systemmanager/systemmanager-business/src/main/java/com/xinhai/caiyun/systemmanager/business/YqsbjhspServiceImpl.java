package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.YqsbjhspMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.YqsbjhspService;

import java.util.List;
import java.util.Map;
@Service
@Transactional
public class YqsbjhspServiceImpl implements YqsbjhspService {
    @Autowired
    private YqsbjhspMapper yqsbjhspMapper;
    /*查询仪器设备检定计划*/
    public List<Map> selectYqsbjdjh(Map map){
        return yqsbjhspMapper.selectYqsbjdjh(map);
    };
    /*返回条数*/
    public Integer selectJdjhCount(Map map){
        return yqsbjhspMapper.selectJdjhCount(map);
    };
    /*查询角色*/
    public List<Map> selectInd(Map map){
        return yqsbjhspMapper.selectInd(map);
    };
    /*批准人界面显示*/
    public List<Map> selectJdpz(Map map){
        return yqsbjhspMapper.selectJdpz(map);
    };
    public Integer selectJdpzCount(Map map){
        return yqsbjhspMapper.selectJdpzCount(map);
    };
    /*审核人审批*/
    public void shrsp(Map map){
        yqsbjhspMapper.shrsp(map);
    };
    /*审核人退回*/
    public void shrth(Map map){
        yqsbjhspMapper.shrth(map);
    };
    /*批准人审批*/
    public void pzrsp(Map map){
        yqsbjhspMapper.pzrsp(map);
    };
    /*批准人退回*/
    public void pzrth(Map map){
        yqsbjhspMapper.pzrth(map);
    };

    /*查询仪器设备检定计划*/
    public List<Map> selectYqsbwhjh(Map map){
        return yqsbjhspMapper.selectYqsbwhjh(map);
    };
    /*返回条数*/
    public Integer selectWhjhCount(Map map){
        return yqsbjhspMapper.selectWhjhCount(map);
    };
    /*批准人界面显示*/
    public List<Map> selectWhpz(Map map){
        return yqsbjhspMapper.selectWhpz(map);
    };
    public Integer selectWhpzCount(Map map){
        return yqsbjhspMapper.selectWhpzCount(map);
    };
    /*审核人审批*/
    public void whshrsp(Map map){
        yqsbjhspMapper.whshrsp(map);
    };
    /*审核人退回*/
    public void whshrth(Map map){
        yqsbjhspMapper.whshrth(map);
    };
    /*批准人审批*/
    public void whpzrsp(Map map){
        yqsbjhspMapper.whpzrsp(map);
    };
    /*批准人退回*/
    public void whpzrth(Map map){
        yqsbjhspMapper.whpzrth(map);
    };
    /*查询仪器设备检定计划*/
    public List<Map> selectYqsbhcjh(Map map){
        return yqsbjhspMapper.selectYqsbhcjh(map);
    };
    /*返回条数*/
    public Integer selectHcjhCount(Map map){
        return yqsbjhspMapper.selectHcjhCount(map);
    };
    /*批准人界面显示*/
    public List<Map> selectHcpz(Map map){
        return yqsbjhspMapper.selectHcpz(map);
    };
    public Integer selectHcpzCount(Map map){
        return yqsbjhspMapper.selectHcpzCount(map);
    };
    /*审核人审批*/
    public void hcshrsp(Map map){
        yqsbjhspMapper.hcshrsp(map);
    };
    /*审核人退回*/
    public void hcshrth(Map map){
        yqsbjhspMapper.hcshrth(map);
    };
    /*批准人审批*/
    public void hcpzrsp(Map map){
        yqsbjhspMapper.hcpzrsp(map);
    };
    /*批准人退回*/
    public void hcpzrth(Map map){
        yqsbjhspMapper.hcpzrth(map);
    };
}
