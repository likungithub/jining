package com.xinhai.rolemanager.dao;

import com.xinhai.rolemanager.entity.PtRole;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Administrator on 2018/3/21 0021.
 */
@Repository
public interface PtRoleMapper {


    List<PtRole> findAll();

    void insert( PtRole role);

    void update(PtRole role);

    void delete(PtRole role);

    /**
     * 根据上级代码查询生成最新的子代码
     * @param sjdm
     * @return
     */
    String getSonMenuDm(String sjdm);

    /**
     * 根据上级代码查询生成最新的子代码
     * @param sjdm
     * @return
     */
    String getBtnMenuDm(String sjdm);

    /**
     * 生成最新的模块代码
     * @return
     */
    String getPMenuDm();

    List<PtRole> getPMenu(String sjdm);
}
