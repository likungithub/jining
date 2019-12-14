package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.HcthMapper;
import com.xinhai.caiyun.systemmanager.dao.HcthglMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.HcthService;
import service.HcthglService;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class HcthglServiceImpl implements HcthglService {
    @Autowired
    private HcthglMapper hcthglMapper;

    /**
     * 得到领用申请的信息
     */
    public List<Map> queryHcthglAll(Map map){
        return hcthglMapper.queryHcthglAll(map);
    };

    /**
     * 得到领用申请的信息的数量
     */
    public Integer queryHcthglAllNum(Map map){
        return hcthglMapper.queryHcthglAllNum(map);
    };
    /**
     *得到报告的数据  通过id的集合
     */
    public  List<Map> getReportData(List ids){
        return hcthglMapper.getReportData(ids);
    };
    /**
     * 删除耗材领用管理的数据  通过id的集合
     */
    public void  delThgl(List ids){
        hcthglMapper.delThgl(ids);
    };
}
