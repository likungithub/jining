package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.Ypqcl;
import com.xinhai.caiyun.customermanage.dao.YpqclMapper;
import com.xinhai.caiyun.customermanage.service.YpqclService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class YpqclServiceImpl implements YpqclService {
    @Autowired
    private YpqclMapper ypqclMapper;


    @Override
    public List<Map> queryYPqclAll(Map map) {
        return ypqclMapper.queryYPqclAllM(map);
    }

    @Override
    public Integer queryYPqclCount(Map map) {
        return ypqclMapper.queryYPqclCountM(map);
    }

    @Override
    public List<Map> queryYPqclSGR(Map map) {
        return ypqclMapper.queryYPqclSGRM(map);
    }

    @Override
    public Integer queryYPqclSGRCount(Map map) {
        return ypqclMapper.queryYPqclSGRCountM(map);
    }

    @Override
    public Map queryYPqclSGRAloneChoice(String id) {
        return ypqclMapper.queryYPqclSGRAloneChoiceM(id);
    }

    @Override
    public void addCreateYpqcl(Ypqcl ypqcl) {
        this.ypqclMapper.addCreateYpqclM(ypqcl);
    }

    @Override
    public void deleteYpqcl(String id) {
       ypqclMapper.deleteYpqclM(id);
    }

    @Override
    public void updateYpqcllingqu(Map map) {
        ypqclMapper.updateYpqcllingquM(map);
    }

    @Override
    public void updateYpqclchuli(Map map) {
        ypqclMapper.updateYpqclchuliM(map);
    }

    @Override
    public void updateYpqcltuihuan(Map map) {
        ypqclMapper.updateYpqcltuihuanM(map);
    }

}
