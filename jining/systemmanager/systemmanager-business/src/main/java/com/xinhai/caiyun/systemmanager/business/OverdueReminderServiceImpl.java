package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.*;
import com.xinhai.caiyun.systemmanager.dao.OverdueReminderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class OverdueReminderServiceImpl implements OverdueReminderService {

    @Autowired
    private OverdueReminderMapper overdueReminderMapper;

    @Override
    public List<YPSYOverdueReminder> querySampleCollection() {
        return overdueReminderMapper.getQuerySampleCollection();
    }

    @Override
    public List<YPCFOverdueReminder> querySampleSplit() {
        return overdueReminderMapper.getQuerySampleSplit();
    }

    @Override
    public List<RWFPOverdueReminder> queryDistribution() {
        return overdueReminderMapper.getQueryDistribution();
    }

    @Override
    public List<RWFPOverdueReminder> queryDistributionPreparation() {
        return overdueReminderMapper.getQueryDistributionPreparation();
    }

    @Override
    public List<YPZBOverdueReminder> queryPreparation() {
        return overdueReminderMapper.getQueryPreparation();
    }

    @Override
    public List<JCOverdueReminder> queryTesting() {
        return overdueReminderMapper.getQueryTesting();
    }

    @Override
    public List<BGBZOverdueReminder> queryPresentationEdit() {
        return overdueReminderMapper.getQueryPresentationEdit();
    }

    @Override
    public List<BGSHOverdueReminder> queryPresentationExamine(String zxry_dm) {
        return overdueReminderMapper.getQueryPresentationExamine(zxry_dm);
    }

    @Override
    public List<BGPZOverdueReminder> queryPresentationApproval(String zxry_dm) {
        return overdueReminderMapper.getQueryPresentationApproval(zxry_dm);
    }

    @Override
    public List<BGDYOverdueReminder> queryPresentationPrinting() {
        return overdueReminderMapper.getQueryPresentationPrinting();
    }

    @Override
    public List<Map> findAll() {
        return overdueReminderMapper.getfindAll();
    }


}
