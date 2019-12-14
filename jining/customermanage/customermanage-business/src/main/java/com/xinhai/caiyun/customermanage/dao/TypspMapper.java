package com.xinhai.caiyun.customermanage.dao;


import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface TypspMapper {

    //评审
    List<Map> selectspAll(@Param("map") Map map);

   // void updatespById(Typsp typsp);

    int selectspCount(@Param("map") Map map);


    //void updateJSR(Typsp typsp);

    void updatetgAzt(String id);

    void updatethAzt(String id);

    void cbsptg(String id);

    void cbspth(String id);

}
