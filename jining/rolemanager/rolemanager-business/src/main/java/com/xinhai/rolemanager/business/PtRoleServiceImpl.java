package com.xinhai.rolemanager.business;

import com.xinhai.rolemanager.dao.PtRoleMapper;
import com.xinhai.rolemanager.entity.PtRole;
import com.xinhai.rolemanager.service.PtRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2018/3/21 0021.
 */
@Service
public class PtRoleServiceImpl implements PtRoleService {

    @Autowired
    private PtRoleMapper ptRoleMapper;

    @Override
    public List<PtRole> findAll() {
        return ptRoleMapper.findAll();
    }

    @Override
    public void insert(PtRole role) {
        ptRoleMapper.insert(role);
    }

    @Override
    public void update(PtRole role) {
        ptRoleMapper.update(role);
    }

    @Override
    public void delete(PtRole role) {
        ptRoleMapper.delete(role);
    }
}
