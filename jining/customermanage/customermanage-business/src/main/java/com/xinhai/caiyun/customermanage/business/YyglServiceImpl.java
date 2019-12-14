package com.xinhai.caiyun.customermanage.business;


import com.xinhai.caiyun.customermanage.dao.YyglMapper;
import com.xinhai.caiyun.customermanage.service.YyglService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
public class YyglServiceImpl implements YyglService {
    @Autowired
    private YyglMapper yyglMapper;

    //余样管理查询
    public List<Map> yyglqueryList(Map map){
        return yyglMapper.yyglqueryList(map);
    };
    //余样管理查询条数
    public Integer yyglCount(Map map){
        return yyglMapper.yyglCount(map);
    };
}
