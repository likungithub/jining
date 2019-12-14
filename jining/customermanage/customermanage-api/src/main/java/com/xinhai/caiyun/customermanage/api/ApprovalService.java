package com.xinhai.caiyun.customermanage.api;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2018/3/22 0022.
 */
@Service
public interface ApprovalService {

    /**
     * 获取历史数量
     * @param id
     *          关联编号
     * @param type
     *          审批类型
     * @return
     *          返回数量
     */
    long getHistorySize(long id, String type);

    /**
     * 获取历史审批列表
     * @param start
     *          开始条数
     * @param length
     *          每页条数
     * @param id
     *          关联编号
     * @param type
     *          审批类型
     * @return
     *          返回审批列表
     */
    List<Approval> getHistoryList(int start, int length, long id, String type);
}
