package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.YqsbsyjlMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.YqsbsyjlService;

import java.util.List;
import java.util.Map;
@Service
@Transactional
public class YqsbsyjlServiceImpl implements YqsbsyjlService {
    @Autowired
    private YqsbsyjlMapper yqsbsyjlMapper;
    //查询受控编号
    public List<Map> selectSKbh(Map map){
        return yqsbsyjlMapper.selectSKbh(map);
    };
    //展示关联仪器样品
    public List<Map> selectSyjl(Map map){
        return yqsbsyjlMapper.selectSyjl(map);
    };
    public Integer selectSyjlCount(Map map){
        return yqsbsyjlMapper.selectSyjlCount(map);
    };
    //查询全部仪器
    public List<Map> selectYqsb(Map map){
        return yqsbsyjlMapper.selectYqsb(map);
    };
    //查询全部样品
    public List<Map> selectYpxx(Map map){
        return yqsbsyjlMapper.selectYpxx(map);
    };
    //查询相关样品检测项
    public List<Map> selectYqjcx(Map map){
        return yqsbsyjlMapper.selectYqjcx(map);
    };
    //添加仪器使用记录
    public void addYqsyjl(Map map){
        yqsbsyjlMapper.addYqsyjl(map);
    };
    //查找重复
    public Integer selectcfwt(Map map){
        return yqsbsyjlMapper.selectcfwt(map);
    };
    //一起使用完毕
    public void finishYqsy(Map map){
        yqsbsyjlMapper.finishYqsy(map);
    };
}
