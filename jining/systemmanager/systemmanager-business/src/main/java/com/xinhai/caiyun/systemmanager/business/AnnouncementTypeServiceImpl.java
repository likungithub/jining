package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.AnnouncementType;
import com.xinhai.caiyun.systemmanager.api.AnnouncementTypeService;
import com.xinhai.caiyun.systemmanager.dao.AnnouncementTypeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 公告类型
 * @author huxinquan
 */
@Repository
public class AnnouncementTypeServiceImpl implements AnnouncementTypeService {
    @Autowired
    private AnnouncementTypeMapper announcementTypeMapper;

    @Override
    public List<AnnouncementType> getAllAnnouncementType(String agencyCode) {
        return announcementTypeMapper.getAllAnnouncementType(agencyCode);
    }

    @Override
    public void addAnnouncementType(AnnouncementType announcementType) {
        announcementTypeMapper.addAnnouncementType(announcementType);
    }

    @Override
    public AnnouncementType getAnnouncementTypeById(String id) {
        return announcementTypeMapper.getAnnouncementTypeById(id);
    }

    @Override
    public void updateAnnouncementType(AnnouncementType announcementType) {
        announcementTypeMapper.updateAnnouncementType(announcementType);
    }

    @Override
    public int getUsedAnnouncementType(String id) {
        return announcementTypeMapper.getUsedAnnouncementType(id);
    }

    @Override
    public List<AnnouncementType> searchAnnouncementTypeByText(String agencyCode, String searchText) {
        return announcementTypeMapper.searchAnnouncementTypeByText(agencyCode, "%" + searchText + "%");
    }

    @Override
    public void updateUsedAnnouncementTypeName(String id, String announcementTypeName) {
        announcementTypeMapper.updateUsedAnnouncementTypeName(id, announcementTypeName);
    }

    @Override
    public long getAnnouncementTypeTotalCount(String agencyCode, String searchText) {
        return announcementTypeMapper.getAnnouncementTypeTotalCount(agencyCode, "%" + searchText + "%");
    }

    @Override
    public List<AnnouncementType> getAnnouncementTypeByPaging(String agencyCode, int start, int length, String searchText) {
        return announcementTypeMapper.getAnnouncementTypeByPaging(agencyCode, start, length, "%" + searchText + "%");
    }
}
