package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.Lygl;
import com.xinhai.caiyun.customermanage.api.Ypzbwc;
import com.xinhai.caiyun.customermanage.dao.LyglMapper;
import com.xinhai.caiyun.customermanage.service.LyglService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class LyglServiceImpl implements LyglService {
    @Autowired
    private LyglMapper lyglMapper;

    public List<Map> findAll(Map map) {
        return lyglMapper.findAll(map);
    }

    ;

    public Integer findCount(Map map) {
        return lyglMapper.findCount(map);
    }

    ;

    public void updatelqzt(Map map) {
        lyglMapper.updatelqzt(map);
    }

    ;

    public List<Ypzbwc> findYpzb(Lygl lygl) {
        return lyglMapper.findYpzb(lygl);
    }

    ;

    /*检测项关联制备样*/
    public void updatejcYp(Map map) {
        lyglMapper.updatejcYp(map);
    }

    ;

    /**
     * 陈
     * 通过样品id  得到样品的制备剩余量
     */
    public Integer queryYpNumByYpid(String ypid) {
        return lyglMapper.queryYpNumByYpid(ypid);
    }

    @Override
    public void deletedlqzt(Map map) {
        lyglMapper.deletedlqzt(map);
    }

    //20190923添加检测领样退回操作
    @Override
    public void thUpdate(Map map) {

        lyglMapper.thUpdate(map);
    }

    //20190923添加校验是否存在已检测检测项
    @Override
    public Integer checkJcCount(Map map) {
        return lyglMapper.checkJcCount(map);
//        return null;
    }

}
