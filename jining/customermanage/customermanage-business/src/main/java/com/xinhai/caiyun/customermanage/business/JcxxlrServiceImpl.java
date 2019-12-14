package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.dao.HtcxMapper;
import com.xinhai.caiyun.customermanage.dao.JcxxlrMapper;
import com.xinhai.caiyun.customermanage.service.JcxxlrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class JcxxlrServiceImpl implements JcxxlrService {
    @Autowired
 private JcxxlrMapper jcxxlrMapper;
    //开始获得温度湿度
    public List<Map> startWsd(){
        return jcxxlrMapper.startWsd();
    };

    //结束获取温湿度
    public List<Map> endWsd(){
        return jcxxlrMapper.endWsd();
    };
    //将温度湿度保存到数据库中
    public void saveWsd(Map map){
        jcxxlrMapper.saveWsd(map);
    };
}
