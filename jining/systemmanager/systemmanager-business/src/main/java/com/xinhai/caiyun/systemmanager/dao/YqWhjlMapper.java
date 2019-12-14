package com.xinhai.caiyun.systemmanager.dao;

import com.xinhai.caiyun.systemmanager.api.YqWhjl;
import com.xinhai.caiyun.systemmanager.api.YqWxsq;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface YqWhjlMapper {
    //查询所有
     List<YqWxsq> findAll();
     //查询一个
    YqWxsq findYqWhjlById(String id);
    //修改数据
    void updateYqWhjl(YqWxsq yqWxsq);
    //删除记录
    void deleteYqwhjl(String mc);
}
