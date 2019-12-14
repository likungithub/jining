package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.YzdthMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.YzdthService;

import java.util.List;
import java.util.Map;

@Service
public class YzdthServiceImpl implements YzdthService {
    @Autowired
    private YzdthMapper yzdthMapper;
    //检测量统计所有信息
    @Override
    public List<Map> yzdth_queryList(Map map) {
        return yzdthMapper.yzdth_queryList(map);
    }
    //检测量统计计数
    @Override
    public Integer yzdth_findCount(Map map) {
        return yzdthMapper.yzdth_findCount(map);
    }
    /*查询库存信息*/
    public String cgck(Map map){
        return yzdthMapper.cgck(map);
    };
    /*更新数量*/
    public void updateKc(Map map){
        yzdthMapper.updateKc(map);
    };
    /*更新状态*/
    public void updateZt(Map map){
        yzdthMapper.updateZt(map);
    };

    /*归还数量*/
    public void ghsl(Map map){
        yzdthMapper.ghsl(map);
    };
}
