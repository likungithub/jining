package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.dao.BgmbxzMapper;
import com.xinhai.caiyun.customermanage.service.BgmbxzService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class BgmbxzServiceImpl implements BgmbxzService {

    @Autowired
    BgmbxzMapper bgmbxzMapper;

    @Override
    public Map mbsjzd(Map map) {
        return bgmbxzMapper.mbsjzd(map);
    }
    @Override
    public Map ypsjzd(Map map) {
        return bgmbxzMapper.ypsjzd(map);
    }


    public List<Map> mbxz(){
        return bgmbxzMapper.mbxz();
    };
}
