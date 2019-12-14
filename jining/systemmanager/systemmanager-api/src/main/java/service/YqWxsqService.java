package service;

import com.xinhai.caiyun.systemmanager.api.YqWxsq;
import com.xinhai.caiyun.systemmanager.api.Yqwxcx;

import java.util.Date;
import java.util.List;

public interface YqWxsqService {
    /*查询所有*/
    public List<YqWxsq> findAll_YqWxsq();
    /*新增维修申请*/
    boolean insert_YqWxsq(YqWxsq yqWxsq);
    /*条件查询*/
    List<YqWxsq> findsome(Yqwxcx yqwxcx);
    List<String> findyqsbtz();
}
