package com.xinhai.caiyun.customermanage.api;

import java.util.Date;
import java.util.List;

public interface CfjlService {
    
    /**
     * 根据代理机构编码获取催费记录
     * @param dljgbm
     *              代理机构编码list
     * @return
     */
    List<Cfjl> findCfjlByDljgbm(List<String> dljgbm);

    /**
     * 新增提醒
     * @param dljgbm
     *          代理机构编码
     * @param cfsj
     *          催费时间
     * @param txfs
     *          提醒方式
     * @param txnr
     *          提醒内容
     */
    void insertRemind(Cfjl cfjl);
}
