package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.dao.HtcxMapper;
import com.xinhai.caiyun.customermanage.service.HtcxService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Service
public class HtcxServiceImpl implements HtcxService {
    @Autowired
 private HtcxMapper htcxMapper;
    /**
     * 查询所有委托信息
     * @return
     */
    @Override
    public List<Map> findAllWt(Map map) {
        return htcxMapper.findAllWt(map);
    }
    /**
     * 查到所有显示数
     * @return
     */
    public int findWtCount(Map map){
        return htcxMapper.findWtCount(map);
    };
    /**
     * 查找对应样品信息
     */
    public List<Map> findYpByWtid(Map map){
        return  htcxMapper.findYpByWtid(map);
    };
    /**
     * 查找对应样品所有数
     */
    public Integer findYpNum(Map map){
        return htcxMapper.findYpNum(map);
    };
}
