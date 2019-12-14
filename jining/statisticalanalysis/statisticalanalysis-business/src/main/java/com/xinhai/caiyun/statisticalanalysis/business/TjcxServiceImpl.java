package com.xinhai.caiyun.statisticalanalysis.business;

import com.xinhai.caiyun.statisticalanalysis.api.TjcxService;
import com.xinhai.caiyun.statisticalanalysis.dao.TjcxMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class TjcxServiceImpl implements TjcxService {
    @Autowired
    private TjcxMapper tjcxMapper;
    //检测量统计所有信息
    @Override
    public List<Map> jcltj_queryList(Map map) {
        return tjcxMapper.jcltj_queryList(map);
    }
    //检测量统计计数
    @Override
    public Integer jcltj_findCount(Map map) {
        return tjcxMapper.jcltj_findCount(map);
    }

    //科室检测量统计所有信息
    @Override
    public List<Map> ksjcl_queryList(Map map) {
        return tjcxMapper.ksjcl_queryList(map);
    }
    //检测量统计计数
    @Override
    public Integer ksjcl_findCount(Map map) {
        return tjcxMapper.ksjcl_findCount(map);
    }


    //报告发放统计所有信息
    @Override
    public List<Map> bgfftj_queryList(Map map) {
        return tjcxMapper.bgfftj_queryList(map);
    }
    //检测量统计计数
    @Override
    public Integer bgfftj_findCount(Map map) {
        return tjcxMapper.bgfftj_findCount(map);
    }

    @Override
    public void updateBgff(Map map){
        tjcxMapper.updateBgff(map);
    };
    //通过id的集合 获取报告领数据
    public List<Map> bgfftj_getData(List ids){
        return tjcxMapper.bgfftj_getData(ids);
    };

}
