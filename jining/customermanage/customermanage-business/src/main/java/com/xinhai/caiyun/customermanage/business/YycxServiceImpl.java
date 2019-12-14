package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.dao.YycxMapper;
import com.xinhai.caiyun.customermanage.dao.YyglMapper;
import com.xinhai.caiyun.customermanage.service.YycxService;
import com.xinhai.caiyun.customermanage.service.YyglService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
@Service
@Transactional
public class YycxServiceImpl implements YycxService {
    @Autowired
    private YycxMapper yycxMapper;
    public List<Map> findYycx(Map map){
        return yycxMapper.findYycx(map);
    };
    public Integer findCount(Map map){
        return yycxMapper.findCount(map);
    };
}
