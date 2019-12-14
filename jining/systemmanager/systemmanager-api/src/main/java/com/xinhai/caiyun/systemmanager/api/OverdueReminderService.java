package com.xinhai.caiyun.systemmanager.api;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface OverdueReminderService {

    /**
     * 样品收样 超时提醒
     */
    List<YPSYOverdueReminder> querySampleCollection();

    /**
     * 样品拆分 超时提醒
     */
    List<YPCFOverdueReminder> querySampleSplit();

    /**
     * 任务分配非制备 超时提醒
     */
    List<RWFPOverdueReminder> queryDistribution();

    /**
     * 任务分配制备 超时提醒
     */
    List<RWFPOverdueReminder> queryDistributionPreparation();
    /**
     * 样品制备 超时提醒
     */
    List<YPZBOverdueReminder> queryPreparation();

    /**
     * 检测 超时提醒
     */
    List<JCOverdueReminder> queryTesting();

    /**
     * 报告编制 超时提醒
     */
    List<BGBZOverdueReminder> queryPresentationEdit();

    /**
     * 报告审核 超时提醒
     */
    List<BGSHOverdueReminder> queryPresentationExamine(String zxry_dm);

    /**
     * 报告批准 超时提醒
     */
    List<BGPZOverdueReminder> queryPresentationApproval(String zxry_dm);

    /**
     * 报告打印 超时提醒
     */
    List<BGDYOverdueReminder> queryPresentationPrinting();


    /**
     * 报告打印 超时提醒
     */
    List<Map> findAll();
}
