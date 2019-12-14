package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.HcthMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.HcthService;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class HcthServiceImpl implements HcthService {
    @Autowired
    private HcthMapper hcthMapper;

    /**
     * 得到领用申请的信息
     */
    public List<Map> queryHcthAll(Map map){
        return hcthMapper.queryHcthAll(map);
    };

    /**
     * 得到领用申请的信息的数量
     */
    public Integer queryHcthAllNum(Map map){
        return hcthMapper.queryHcthAllNum(map);
    };
    /**
     * 通过hcbm  在采购入库表中查找信息
     */
    public List<Map> queryCgrkByHcbm(String hcbm){
        return hcthMapper.queryCgrkByHcbm(hcbm);
    };

    /**
     * 将采购入库中的数据放入领用表中  也就是入库表中的id
     */
    public void addHcthFromCgrk(Map map){
        hcthMapper.addHcthFromCgrk(map);
    };
    /**
     * 删除退回信息
     */
    public void delHcth(String id){
        hcthMapper.delHcth(id);
    };

}
