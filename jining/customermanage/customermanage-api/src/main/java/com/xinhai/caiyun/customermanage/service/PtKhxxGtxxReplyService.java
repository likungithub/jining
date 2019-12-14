package com.xinhai.caiyun.customermanage.service;

import com.xinhai.caiyun.customermanage.api.PtKhxxGtxxReply;

import java.util.List;

public interface PtKhxxGtxxReplyService {

    /**
     * 通过id获取数据
     * @param id
     * @return
     */
    PtKhxxGtxxReply findPtKhxxGtxxReply(Long id);

    /**
     * 单条插入数据
     * @param PtKhxxGtxxReply
     */
    void createPtKhxxGtxxReply(PtKhxxGtxxReply PtKhxxGtxxReply);

    /**
     * 通过khbm删除
     * @param id
     */
    void deletePtKhxxGtxxReplybykhbm(String id);

    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertList(List<PtKhxxGtxxReply> list);

    /**
     * 通过ssid获取数据
     * @param ssid
     * @return
     */
    List<PtKhxxGtxxReply> getListbyssid(String ssid);
}
