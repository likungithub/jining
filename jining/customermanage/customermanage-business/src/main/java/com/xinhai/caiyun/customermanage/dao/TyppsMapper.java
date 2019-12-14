package com.xinhai.caiyun.customermanage.dao;

import com.xinhai.caiyun.customermanage.api.Typps;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Repository
public interface TyppsMapper {

    //评审
    List<Map> selectpsAll(@Param("map") Map map);

    void updatepsById(Typps typps);

    void up(Typps typps);

    int selectCount(@Param("map") Map map);


    void updateJSR(Typps typps);


    void updateAzt(String id);

    void cbsptg(String id);

    void cbspth(String id);

}
