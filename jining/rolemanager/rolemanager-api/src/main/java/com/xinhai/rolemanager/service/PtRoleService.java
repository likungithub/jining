package com.xinhai.rolemanager.service;

import com.xinhai.rolemanager.entity.PtRole;
import jdk.nashorn.internal.runtime.FindProperty;

import java.util.List;

/**
 * 代理菜单接口
 * Created by Administrator on 2018/3/21 0021.
 */
public interface PtRoleService {

    List<PtRole> findAll();

    void insert(PtRole role);

    void update(PtRole role);

    void delete(PtRole role);


}
