package com.xinhai.caiyun.systemmanager.dao;
import com.xinhai.caiyun.systemmanager.api.YqWxsq;
import com.xinhai.caiyun.systemmanager.api.Yqwxcx;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
/*
* 仪器维修记录查询
* */
@Repository
public interface YqWxsqMapper {
    /*查询全部*/
    List<YqWxsq> findAll_YqWxsq();
    /*根据仪器名称*/
    List<YqWxsq> find_YqWxsqByName(String name);
    /*根据申请人查询*/
    List<YqWxsq> find_YqWxsqBySqr(String sqr);
    /*根据申请部门查询*/
    List<YqWxsq> find_YqWxsqBySqbm(String sqbm);
    /*新增仪器申请维修*/
    boolean insert_YqWxsq(YqWxsq yqWxsq);
    /*根据三种条件进行查询*/
    List<YqWxsq> findsome(Yqwxcx yqwxcx);
    List<String> findyqsbtz();
}
