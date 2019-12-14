package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.Typcb;
import com.xinhai.caiyun.customermanage.api.Typcf;
import com.xinhai.caiyun.customermanage.api.Typgl;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface TypcfMapper {
    List<Map> selectAll(@Param("map") Map map);

    int selectCount(@Param("map") Map map);

    void updateById(Typcb typcb);

    void updateJSR(Typcb typcb);

    void updateAzt(String id);

    void cbsptg(String id);

    void cbspth(String id);

}
