package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.Typcb;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface TypcbMapper {
    List<Map> selectAll(@Param("map") Map map);


    List<Map> selectAlll(@Param("map") Map map);
    //评审
    List<Map> selectpsAll(@Param("map") Map map);

    int selectCount(@Param("map") Map map);

    void updateById(Typcb typcb);

    void updateJSR(Typcb typcb);

    void updateAzt(String id);

    void cbsptg(String id);

    void cbspth(String id);

}
