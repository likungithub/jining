package com.xinhai.caiyun.systemmanager.business;
import com.xinhai.caiyun.systemmanager.api.YqWxsq;
import com.xinhai.caiyun.systemmanager.dao.YqWhjlMapper;
import com.xinhai.caiyun.systemmanager.dao.YqWxsqMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.YqWhjlService;

import java.util.List;
@Service
public class YqWhjlServiceImpl implements YqWhjlService {
    @Autowired
    private YqWhjlMapper yqWhjlMapper;
    @Override
    public List<YqWxsq> findAll() {
        List<YqWxsq> list = yqWhjlMapper.findAll();
        return list;
    }

    @Override
    public void deleteOne(String mc) {
        yqWhjlMapper.deleteYqwhjl(mc);
    }

    @Override
    public YqWxsq findOne(String id) {
        YqWxsq yqWxsq = yqWhjlMapper.findYqWhjlById(id);
        return yqWxsq;
    }

    @Override
    public void update(YqWxsq yqWxsq) {
        this.yqWhjlMapper.updateYqWhjl(yqWxsq);
    }
}
