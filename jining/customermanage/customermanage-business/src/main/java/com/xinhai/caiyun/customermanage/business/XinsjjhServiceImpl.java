package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.dao.XinsjjhMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.xinhai.caiyun.customermanage.api.XinsjjhService;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class XinsjjhServiceImpl implements XinsjjhService {
    @Autowired
    private XinsjjhMapper xinsjjhMapper;
    //检测量统计所有信息
    @Override
    public List<Map> sjjh_queryList(Map map) {
        return xinsjjhMapper.sjjh_queryList(map);
    }
    //检测量统计计数
    @Override
    public Integer sjjh_findCount(Map map) {
        return xinsjjhMapper.sjjh_findCount(map);
    }

    //检测量统计所有信息
    @Override
    public List<Map> sjfh_queryList(Map map) {
        return xinsjjhMapper.sjfh_queryList(map);
    }
    //检测量统计计数
    @Override
    public Integer sjfh_findCount(Map map) {
        return xinsjjhMapper.sjfh_findCount(map);
    }
}
