package com.xinhai.caiyun.systemmanager.dao;

import com.xinhai.caiyun.systemmanager.api.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 超时提醒
 */
@Repository
public interface OverdueReminderMapper {
    /**
     * 样品收样 超时提醒
     */
     List<YPSYOverdueReminder> getQuerySampleCollection();

    /**
     * 样品拆分 超时提醒
     */
    List<YPCFOverdueReminder> getQuerySampleSplit();

    /**
     * 任务分配非制备 超时提醒
     */
    List<RWFPOverdueReminder> getQueryDistribution();

    /**
     * 任务分配制备 超时提醒
     */
    List<RWFPOverdueReminder> getQueryDistributionPreparation();

    /**
     * 样品制备 超时提醒
     */
    List<YPZBOverdueReminder> getQueryPreparation();


    /**
     * 检测 超时提醒
     */
    List<JCOverdueReminder> getQueryTesting();

    /**
     * 报告编制 超时提醒
     */
    List<BGBZOverdueReminder> getQueryPresentationEdit();

    /**
     * 报告审核 超时提醒
     */
    List<BGSHOverdueReminder> getQueryPresentationExamine(String zxry_dm);

    /**
     * 报告批准 超时提醒
     */
    List<BGPZOverdueReminder> getQueryPresentationApproval(String zxry_dm);

    /**
     * 报告打印 超时提醒
     */
    List<BGDYOverdueReminder> getQueryPresentationPrinting();


    /**
     * 报告打印 超时提醒
     */
    List<Map> getfindAll();

}
