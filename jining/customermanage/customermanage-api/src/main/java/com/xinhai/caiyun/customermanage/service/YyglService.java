package com.xinhai.caiyun.customermanage.service;


import java.util.List;
import java.util.Map;

public interface YyglService {
    //余样管理查询
    public List<Map> yyglqueryList(Map map);
    //余样管理查询条数
    public Integer yyglCount(Map map);
}
