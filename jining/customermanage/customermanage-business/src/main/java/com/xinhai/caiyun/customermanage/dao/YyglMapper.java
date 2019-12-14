package com.xinhai.caiyun.customermanage.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface YyglMapper {
    //余样管理查询
    public List<Map> yyglqueryList(@Param("map") Map map);
    //余样管理查询条数
    public Integer yyglCount(@Param("map") Map map);
}
