package com.xinhai.caiyun.customermanage.service;

import com.xinhai.caiyun.customermanage.api.PtKhxxGtxx;

import java.util.List;

public interface PtKhxxGtxxService {

    /**
     * 通过id获取数据
     * @param id
     * @return
     */
    PtKhxxGtxx findPtKhxxGtxx(Long id);

    /**
     * 单条插入数据
     * @param PtKhxxGtxx
     */
    void createPtKhxxGtxx(PtKhxxGtxx PtKhxxGtxx);

    /**
     * 通过khbm删除
     * @param id
     */
    void deletePtKhxxGtxxbykhbm(String id);

    /**
     * 更新回复状态
     * @param id
     */
    void updateHF(String id);

    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertList(List<PtKhxxGtxx> list);

    /**
     * 通过khbm获取数据
     * @param khbm
     * @return
     */
    List<PtKhxxGtxx> getListbykhbm(String khbm);
}
