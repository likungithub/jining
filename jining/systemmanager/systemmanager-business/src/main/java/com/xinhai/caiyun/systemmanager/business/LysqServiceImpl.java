package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.LysqMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.LysqService;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class LysqServiceImpl implements LysqService {
    @Autowired
    private LysqMapper lysqMapper;

    /**
     *
     * 得到领用申请的信息
     */
    public List<Map> queryLysqAll(Map map) {
        return lysqMapper.queryLysqAll(map);
    }

    ;

    /**
     *
     * 得到领用申请的信息的数量
     */
    public Integer queryLysqAllNum(Map map) {
        return lysqMapper.queryLysqAllNum(map);
    }

    ;

    /**
     *
     * 通过hcbm  在采购入库表中查找信息
     */
    public List<Map> queryCgrkByHcbm(String hcbm) {
        return lysqMapper.queryCgrkByHcbm(hcbm);
    }

    ;

    /**
     *
     * 将采购入库中的数据放入领用表中  也就是入库表中的id
     */
    public void addHclyFromCgrk(Map map) {
        lysqMapper.addHclyFromCgrk(map);
    }

    ;

    /**
     *
     * 根据耗材编码查找id
     * t_cgrk_jbxx
     */
    public List<String> queryIdByHcbm(String hcbm) {
        return lysqMapper.queryIdByHcbm(hcbm);
    }

    ;

    /**
     *
     * 删除库存信息
     */
    public void delLysq(String id) {
        lysqMapper.delLysq(id);
    }

    ;

    /**
     *
     * 得到库存的数量
     */
    public String queryKcNum(String hcbm) {
        return lysqMapper.queryKcNum(hcbm);
    }

    ;
}
