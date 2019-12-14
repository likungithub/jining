package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.dao.HyglMapper;
import com.xinhai.caiyun.customermanage.service.HyglService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class HyglServiceImpl implements HyglService {
    @Autowired
    private HyglMapper hyglMapper;
    public List<Map> selectHyglList(Map map){
        return hyglMapper.selectHyglList(map);
    };
    public Integer selectCount(Map map){
        return hyglMapper.selectCount(map);
    };
    public void updateHygl(Map map){
        hyglMapper.updateHygl(map);
    };
}
