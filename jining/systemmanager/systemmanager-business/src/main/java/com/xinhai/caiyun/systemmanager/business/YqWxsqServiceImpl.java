package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.Yqwxcx;
import com.xinhai.caiyun.systemmanager.dao.YqWxsqMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.YqWxsqService;
import com.xinhai.caiyun.systemmanager.api.YqWxsq;

import java.util.Date;
import java.util.List;
@Service
public class YqWxsqServiceImpl implements YqWxsqService {
    @Autowired
    private YqWxsqMapper yqWxsqMapper;
    @Override
    public List<YqWxsq> findAll_YqWxsq() {
        List<YqWxsq> list =yqWxsqMapper.findAll_YqWxsq();
        return list;
    }

    @Override
    public boolean insert_YqWxsq(YqWxsq yqWxsq) {
       boolean flag = yqWxsqMapper.insert_YqWxsq(yqWxsq);
       return flag;
    }

    @Override
    public List<YqWxsq> findsome(Yqwxcx yqwxcx) {
        List<YqWxsq> list=yqWxsqMapper.findsome(yqwxcx);
        return list;
    }

    @Override
    public List<String> findyqsbtz() {
        return yqWxsqMapper.findyqsbtz();
    }
}
