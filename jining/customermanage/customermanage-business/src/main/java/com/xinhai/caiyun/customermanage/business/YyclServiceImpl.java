package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.dao.YyclMapper;
import com.xinhai.caiyun.customermanage.service.YyclService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class YyclServiceImpl implements YyclService {
    @Autowired
    private YyclMapper yyclMapper;
    public List<Map> selectYycl(Map map){
        return yyclMapper.selectYycl(map);
    };
    public Integer selectCount(Map map){
        return yyclMapper.selectCount(map);
    };
    public void destoryYpzt(Map map){
        yyclMapper.destoryYpzt(map);
    };
    public void updateYycl(Map map){
        yyclMapper.updateYycl(map);
    };
    public void updateXhsq(Map map){
        yyclMapper.updateXhsq(map);
    };
    public List<Map> findInd(Map map){
        return yyclMapper.findInd(map);
    };
    public List<Map> findCgsq(Map map){
        return yyclMapper.findCgsq(map);
    };
    public Integer findCount(Map map){
        return yyclMapper.findCount(map);
    };
    /*经办人*/
    public List<Map> findjbCgsq(Map map){
        return yyclMapper.findjbCgsq(map);
    };
    public Integer findjbCount(Map map){
        return yyclMapper.findjbCount(map);
    };
    public void updateJssp(Map map){
        yyclMapper.updateJssp(map);
    };
    public void updateJbr(Map map){
        yyclMapper.updateJbr(map);
    };
    /*技术负责人退回*/
    public void updateJsth(Map map){
        yyclMapper.updateJsth(map);
    };
    /*经办人退回*/
    public void updateJbrth(Map map){
        yyclMapper.updateJbrth(map);
    };
}
