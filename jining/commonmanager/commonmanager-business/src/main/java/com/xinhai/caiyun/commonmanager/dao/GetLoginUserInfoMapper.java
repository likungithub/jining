package com.xinhai.caiyun.commonmanager.dao;

import org.apache.ibatis.annotations.Param;

import com.xinhai.usermanager.entity.User;

public interface GetLoginUserInfoMapper {
    
    /**
     * 根据用户编号获取登陆用户信息
     * @param id
     *          用户编号
     * @return
     *          用户对象
     */
    User findUserById(@Param("id") String id);
}
