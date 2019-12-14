package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.dao.JcglMapper;
import com.xinhai.caiyun.customermanage.dao.JcxFywhMapper;
import com.xinhai.caiyun.customermanage.service.JcxFywhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class JcxFywhServiceImpl implements JcxFywhService {

    @Autowired
    JcxFywhMapper jcxFywhMapper;

    @Override
    public long findCount(Map cxtj) {
        return jcxFywhMapper.findCount(cxtj);
    }

    @Override
    public List<Map> findAll(Map cxtj) {
        return jcxFywhMapper.findAll(cxtj);
    }

    @Override
    public List<Map> selectLrFykz(Map map) {
        return jcxFywhMapper.selectLrFykz(map);
    }

    @Override
    public Integer selectCountFykz(Map map) {
        return jcxFywhMapper.selectCountFykz(map);
    }

    @Override
    public void insertFYKZ(Map map) {
        jcxFywhMapper.insertFYKZ(map);
    }
}
