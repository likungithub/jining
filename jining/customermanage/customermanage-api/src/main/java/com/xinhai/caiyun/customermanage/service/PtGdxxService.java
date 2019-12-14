package com.xinhai.caiyun.customermanage.service;

import com.xinhai.caiyun.customermanage.api.PtGdxx;

import java.util.List;

public interface PtGdxxService {

    /**
     * 通过id获取数据
     * @param id
     * @return
     */
    PtGdxx findPtGdxx(Long id);

    /**
     * 单条插入数据
     * @param PtGdxx
     */
    void createPtGdxx(PtGdxx PtGdxx);

    /**
     * 通过khbm删除
     * @param khbm
     */
    void deletePtGdxxbykhbm(String khbm);

    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertList(List<PtGdxx> list);

    /**
     * 通过khbm获取数据
     * @param khbm
     * @return
     */
    List<PtGdxx> getListbykhbm(String khbm);
}
