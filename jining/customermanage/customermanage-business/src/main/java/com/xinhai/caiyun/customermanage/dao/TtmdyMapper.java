package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.Typcb;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface TtmdyMapper {
    List<Map> tmdySelect(@Param("map") Map map);

    int tmdyCount(@Param("map") Map map);

    Typcb tmsmSelect(String ypbm);
}
