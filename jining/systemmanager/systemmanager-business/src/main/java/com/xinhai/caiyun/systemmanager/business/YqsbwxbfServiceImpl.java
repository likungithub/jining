package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.YqsbwxbfMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.YqsbwxbfService;

import java.util.List;
import java.util.Map;
@Service
@Transactional
public class YqsbwxbfServiceImpl implements YqsbwxbfService {
    @Autowired
    private YqsbwxbfMapper yqsbwxbfMapper;
    //查看仪器设备
    public List<Map> selectYqsbtzwxbf(Map map){
        return yqsbwxbfMapper.selectYqsbtzwxbf(map);
    };
    public Integer selectYqtzCountwxbf(Map map){
        return yqsbwxbfMapper.selectYqtzCountwxbf(map);
    };
    /*保存维修原因*/
    public void updateWxyy(Map map){
        yqsbwxbfMapper.updateWxyy(map);
    };
    /*保存报废原因*/
    public void updateBfyy(Map map){
        yqsbwxbfMapper.updateBfyy(map);
    };
    //查看仪器设备维修报废审批信息
    public List<Map> selectYqsbtzwxbfsp(Map map){
        return yqsbwxbfMapper.selectYqsbtzwxbfsp(map);
    };
    public Integer selectYqtzCountwxbfsp(Map map){
        return yqsbwxbfMapper.selectYqtzCountwxbfsp(map);
    };
    //审批维修报废申请
    public void updateWbSpzt(Map map){
        yqsbwxbfMapper.updateWbSpzt(map);
    };
    //审批退回
    public void updateWbSpztTh(Map map){
        yqsbwxbfMapper.updateWbSpztTh(map);
    };
    //查看需要维修设备
    public List<Map> selectYqsbtzwxbfWx(Map map){
        return yqsbwxbfMapper.selectYqsbtzwxbfWx(map);
    };
    public Integer selectYqtzCountwxbfWx(Map map){
        return yqsbwxbfMapper.selectYqtzCountwxbfWx(map);
    };
    //维修记录
    public void updateSbWx(Map map){
        yqsbwxbfMapper.updateSbWx(map);
    };

    //一级维修审批信息
    public List<Map> selectYqsbtzwxspyj(Map map){
        return yqsbwxbfMapper.selectYqsbtzwxspyj(map);
    };
    public Integer selectYqtzCountwxspyj(Map map){
        return yqsbwxbfMapper.selectYqtzCountwxspyj(map);
    };
    //审批维修申请
    public void updateWxSpztyj(Map map){
        yqsbwxbfMapper.updateWxSpztyj(map);
    };
    //审批退回
    public void updateWxSpztThyj(Map map){
        yqsbwxbfMapper.updateWxSpztThyj(map);
    };

    //二级维修审批信息
    public List<Map> selectYqsbtzwxspej(Map map){
        return yqsbwxbfMapper.selectYqsbtzwxspej(map);
    };
    public Integer selectYqtzCountwxspej(Map map){
        return yqsbwxbfMapper.selectYqtzCountwxspej(map);
    };
    //审批维修申请
    public void updateWxSpztej(Map map){
        yqsbwxbfMapper.updateWxSpztej(map);
    };
    //审批退回
    public void updateWxSpztThej(Map map){
        yqsbwxbfMapper.updateWxSpztThej(map);
    };

    //三级维修审批信息
    public List<Map> selectYqsbtzwxspsj(Map map){
        return yqsbwxbfMapper.selectYqsbtzwxspsj(map);
    };
    public Integer selectYqtzCountwxspsj(Map map){
        return yqsbwxbfMapper.selectYqtzCountwxspsj(map);
    };
    //审批维修申请
    public void updateWxSpztsj(Map map){
        yqsbwxbfMapper.updateWxSpztsj(map);
    };
    //审批退回
    public void updateWxSpztThsj(Map map){
        yqsbwxbfMapper.updateWxSpztThsj(map);
    };

    //四级维修审批信息
    public List<Map> selectYqsbtzwxspsij(Map map){
        return yqsbwxbfMapper.selectYqsbtzwxspsij(map);
    };
    public Integer selectYqtzCountwxspsij(Map map){
        return yqsbwxbfMapper.selectYqtzCountwxspsij(map);
    };
    //审批维修申请
    public void updateWxSpztsij(Map map){
        yqsbwxbfMapper.updateWxSpztsij(map);
    };
    //审批退回
    public void updateWxSpztThsij(Map map){
        yqsbwxbfMapper.updateWxSpztThsij(map);
    };
}
