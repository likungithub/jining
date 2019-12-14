package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.AppSystemInformation;
import com.xinhai.caiyun.systemmanager.api.AppSystemInformationService;
import com.xinhai.caiyun.systemmanager.dao.AppSystemInformationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * App系统消息
 * @author huxinquan
 */
@Repository
public class AppSystemInformationSerivceImpl implements AppSystemInformationService{
    @Autowired
    private AppSystemInformationMapper appSystemInformationMapper;

    @Override
    public List<AppSystemInformation> getAllAppSystemInformation(String begin, String end, Integer startA, Integer lengthA) {
        return appSystemInformationMapper.getAllAppSystemInformation(begin,end,startA,lengthA);
    }

    @Override
    public AppSystemInformation getAppSystemInformationById(String id) {
        return appSystemInformationMapper.getAppSystemInformationById(id);
    }

    @Override
    public List<AppSystemInformation> searchAppSystemInformationByText(String searchText) {
        return appSystemInformationMapper.searchAppSystemInformationByText("%" + searchText + "%");
    }

    @Override
    public List<AppSystemInformation> getAppSystemInformationByDate(String beginTime, String endTime) {
        return appSystemInformationMapper.getAppSystemInformationByDate(beginTime + "-01", endTime + "-31");
    }

    @Override
    public void addAppSystemInformation(AppSystemInformation appSystemInformation) {
        appSystemInformationMapper.addAppSystemInformation(appSystemInformation);
    }

    @Override
    public void updateAppSystemInformation(AppSystemInformation appSystemInformation) {
        appSystemInformationMapper.updateAppSystemInformation(appSystemInformation);
    }

    @Override
    public Long getAllAppSystemInformationLen(String begin, String end) {
        return appSystemInformationMapper.getAllAppSystemInformationLen(begin,end);
    }
}
