package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.YqsbjdjhMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.YqsbjdjhService;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class YqsbjdjhServiceImpl implements YqsbjdjhService {
    @Autowired
    private YqsbjdjhMapper yqsbjdjhMapper;

    /*查询仪器设备检定计划*/
    public List<Map> selectYqsbjdjh(Map map){
        return yqsbjdjhMapper.selectYqsbjdjh(map);
    };
    /*返回条数*/
    public Integer selectJdjhCount(Map map){
        return yqsbjdjhMapper.selectJdjhCount(map);
    };
    /*制定检定计划*/
    public void updateJdjh(Map map){
        yqsbjdjhMapper.updateJdjh(map);
    };
    /*制定维护计划*/
    public void updateWhjh(Map map){
        yqsbjdjhMapper.updateWhjh(map);
    };
    /*制定核查计划*/
    public void updateHcjh(Map map){
        yqsbjdjhMapper.updateHcjh(map);
    };
}
