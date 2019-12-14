package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.LyspMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.LyspService;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class LyspServiceImpl implements LyspService {
    @Autowired
    private LyspMapper lyspMapper;

    /**
     * 陈
     * 得到一级审批的信息
     */
    public List<Map> queryLysp1All(Map map) {
        return lyspMapper.queryLysp1All(map);
    }

    ;

    /**
     * 陈
     * 得到一级审批的信息的数量
     */
    public Integer queryLysp1AllNum(Map map) {
        return lyspMapper.queryLysp1AllNum(map);
    }

    ;

    /**
     * 陈
     * 一级审批通过和退回操作
     */
    public void saveZt1(Map map) {
        lyspMapper.saveZt1(map);
    }

    ;

    /**
     * 陈
     * 获得耗材的类型
     */
    public String queryHclxById(String id) {
        return lyspMapper.queryHclxById(id);
    }

    ;

    /**
     * 陈
     * 获得领用申请人
     */
    public String queryLyrById(String id) {
        return lyspMapper.queryLyrById(id);
    }

    ;
    /**
     * 陈
     * 得到二级审批的信息
     */
    public List<Map> queryLysp2All(Map map){
        return lyspMapper.queryLysp2All(map);
    };

    /**
     * 陈
     * 得到二级审批的信息的数量
     */
    public Integer queryLysp2AllNum(Map map){
        return lyspMapper.queryLysp2AllNum(map);
    };
    /**
     * 陈
     * 二级审批通过和退回操作
     */
    public void saveZt2(Map map){
        lyspMapper.saveZt2(map);
    };

}
