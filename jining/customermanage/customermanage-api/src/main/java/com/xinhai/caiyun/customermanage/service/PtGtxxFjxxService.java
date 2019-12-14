package com.xinhai.caiyun.customermanage.service;

import com.xinhai.caiyun.customermanage.api.PtGtxxFjxx;

import java.util.List;

public interface PtGtxxFjxxService {

    /**
     * 通过id获取数据
     * @param id
     * @return
     */
    PtGtxxFjxx findPtGtxxFjxx(Long id);

    /**
     * 单条插入数据
     * @param PtGtxxFjxx
     */
    void createPtGtxxFjxx(PtGtxxFjxx PtGtxxFjxx);

    /**
     * 批量插入数据
     * @param PtGtxxFjxx
     */
    void createPtGtxxFjxxList(List<PtGtxxFjxx> PtGtxxFjxx);

    /**
     * 通过khbm删除
     * @param id
     */
    void deletePtGtxxFjxxbyId(List<String> ids);

    /**
     * 通过gtid获取数据
     * @param gtid
     * @return
     */
    List<PtGtxxFjxx> getListbygtid(String gtid, String fj_type);
}
