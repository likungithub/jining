package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.Cgck2Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.Cgck2Service;

import java.util.List;
import java.util.Map;

@Service
public class Cgck2ServiceImpl implements Cgck2Service {
    @Autowired
    private Cgck2Mapper cgck2Mapper;
    //检测量统计所有信息
    @Override
    public List<Map> cgck2_queryList(Map map) {
        return cgck2Mapper.cgck2_queryList(map);
    }
    //检测量统计计数
    @Override
    public Integer cgck2_findCount(Map map) {
        return cgck2Mapper.cgck2_findCount(map);
    }
    /*查询库存信息*/
    public String cgck(Map map){
        return cgck2Mapper.cgck(map);
    };
    /*更新数量*/
    public void updateKc(Map map){
        cgck2Mapper.updateKc(map);
    };
    public void updatesqKc(Map map){
        cgck2Mapper.updatesqKc(map);
    };
    /*更新状态*/
    public void updateZt(Map map){
        cgck2Mapper.updateZt(map);
    };
}
