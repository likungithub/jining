package com.xinhai.caiyun.customermanage.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public interface BgglService {

    long findCount(Map cxtj);

    List<Map> findAll(Map cxtj);

    void insert(List<Map> mapList);

    void updatezt(List<Map> data);

    void updatebg(List<Map> data);

    List<Map> sjxg_queryList(Map cxtj);

    void sjxg_update(List<Map> cxtj);
    HashMap<String,Object> getYplzd(String ypbm);
    List<Map> findById(String id);

    List<Map> findJcx(String id);

    List<Map> findFfbz(String id);

    List<Map> getjcyj(String id);

    List<Map> findjcz(String id);

    List<Map> findjcrq(String id);

    List<Map> findjyyq(String id);

    void bgshAutomaticPassing(String ypid,String shry);
    void bgspAutomaticPassing(String ypid,String spry);

    List<Map> findAllJjd(Map cxtj);
    //20190917添加跳过批准
    void updateztNew(List<Map> data);

}