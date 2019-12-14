package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.AnnouncementType;
import com.xinhai.caiyun.systemmanager.api.SystemAnnouncement;
import com.xinhai.caiyun.systemmanager.api.SystemAnnouncementRead;
import com.xinhai.caiyun.systemmanager.api.SystemAnnouncementService;
import com.xinhai.caiyun.systemmanager.dao.SystemAnnouncementMapper;
import com.xinhai.usermanager.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * 系统公告
 * @author huxinquan
 */
@Repository
public class SystemAnnouncementServiceImpl implements SystemAnnouncementService {

    @Autowired
    private SystemAnnouncementMapper systemAnnouncementMapper;

    @Override
    public List<SystemAnnouncement> getAllSystemAnnouncement(String tzNumber) {
        return systemAnnouncementMapper.getAllSystemAnnouncement(tzNumber);
    }



    @Override
    public List<SystemAnnouncementRead> getAllSystemAnnouncementRead(String agencyCode, String staffNumber) {
        return systemAnnouncementMapper.getAllSystemAnnouncementRead(agencyCode, staffNumber);
    }

    @Override
    public List<SystemAnnouncementRead> getAllSystemAnnouncementUnread(String agencyCode, String staffNumber) {
        return systemAnnouncementMapper.getAllSystemAnnouncementUnread(agencyCode, staffNumber);
    }

    @Override
    public List<SystemAnnouncementRead> searchSystemAnnouncementReadByText(String searchText, String agencyCode, String staffNumber) {
        return systemAnnouncementMapper.searchSystemAnnouncementReadByText("%" + searchText + "%", agencyCode, staffNumber);
    }

    @Override
    public SystemAnnouncementRead getSystemAnnouncementReadById(String id) {
        return systemAnnouncementMapper.getSystemAnnouncementReadById(id);
    }

    @Override
    public SystemAnnouncement getSystemAnnouncementById(String id) {
        return systemAnnouncementMapper.getSystemAnnouncementById(id);
    }

    @Override
    public SystemAnnouncement getSystemAnnouncementBySystemAnnouncementId(String id) {
        return systemAnnouncementMapper.getSystemAnnouncementBySystemAnnouncementId(id);
    }

    @Override
    public SystemAnnouncementRead getReadBySystemAnnouncementId(String id) {
        return systemAnnouncementMapper.getReadBySystemAnnouncementId(id);
    }

    @Override
    public void addSystemAnnouncement(SystemAnnouncement systemAnnouncement) {
        systemAnnouncementMapper.addSystemAnnouncement(systemAnnouncement);
    }

    @Override
    public void addSystemAnnouncementRead(SystemAnnouncementRead systemAnnouncementRead) {
        systemAnnouncementMapper.addSystemAnnouncementRead(systemAnnouncementRead);
    }

    @Override
    public void updateSystemAnnouncement(SystemAnnouncement systemAnnouncement) {
        systemAnnouncementMapper.updateSystemAnnouncement(systemAnnouncement);
    }

    @Override
    public void updateSystemAnnouncementRead(SystemAnnouncementRead systemAnnouncementRead) {
        systemAnnouncementMapper.updateSystemAnnouncementRead(systemAnnouncementRead);
    }

    @Override
    public void readSystemAnnouncement(SystemAnnouncementRead systemAnnouncementRead) {
        systemAnnouncementMapper.readSystemAnnouncement(systemAnnouncementRead);
    }

    @Override
    public List<AnnouncementType> getAllAnnouncementType(String agencyCode) {
        return systemAnnouncementMapper.getAllAnnouncementType(agencyCode);
    }

    @Override
    public AnnouncementType getAnnouncementTypeById(String id) {
        return systemAnnouncementMapper.getAnnouncementTypeById(id);
    }

    @Override
    public int getAnnouncementTypeByName(String name,String dljgbm,String dm) {
        return systemAnnouncementMapper.getAnnouncementTypeByName(name,dljgbm,dm);
    }

    @Override
    public List<Map> getKhxxByAgencyCode(String agencyCode,String khfldm) {
        return systemAnnouncementMapper.getKhxxByAgencyCode(agencyCode,khfldm);
    }

    @Override
    public List<User> getUserByAgencyCode(String agencyCode) {
        return systemAnnouncementMapper.getUserByAgencyCode(agencyCode);
    }

    @Override
    public long getSystemAnnouncementTotalCount(Map cxtj) {
        return systemAnnouncementMapper.getSystemAnnouncementTotalCount(cxtj);
    }

    @Override
    public void updateydzt(Map cxtj) {
         systemAnnouncementMapper.updateydzt(cxtj);
    }



    @Override
    public List<Map> getSystemAnnouncementByPaging(Map cxtj) {
        return systemAnnouncementMapper.getSystemAnnouncementByPaging(cxtj);
    }
}
