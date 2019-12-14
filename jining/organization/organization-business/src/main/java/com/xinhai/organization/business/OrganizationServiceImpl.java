package com.xinhai.organization.business;

import com.xinhai.organization.api.Organization;
import com.xinhai.organization.api.OrganizationType;
import com.xinhai.organization.dao.OrganizationMapper;
import com.xinhai.organization.service.OrganizationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

/**
 * Created by fanxi on 2016-5-4.
 */
@Service
public class OrganizationServiceImpl implements OrganizationService {
  @Autowired
  private OrganizationMapper organizationMapper;

  @Override
  public List<Organization> getOrgByCustomer(String customerId) {
    return organizationMapper.getOrgByCustomer(customerId);
  }

  @Override
  public Organization getOrg(String id) {
    return organizationMapper.getOrg(id);
  }
  
  @Override
  public Organization selectByCode(String code) {
    return organizationMapper.selectByCode(code);
  }
  

  @Override
  public boolean deleteOrg(String id) {
    organizationMapper.deleteOrg(id);
    organizationMapper.deleteOrgUser(id);
    return true;
  }

  @Override
  public int getMaxOrder(String dljgBm) {
    Integer orderNo = organizationMapper.getMaxOrder(dljgBm);
    return orderNo == null ? 0 : orderNo;
  }

  @Override
  public String addOrg(String customerId, Organization org) {
    org.setId(UUID.randomUUID().toString());
    organizationMapper.addOrg(customerId, org);
    return org.getId();
  }

  @Override
  public void updateOrg(String id, Organization org) {
    organizationMapper.updateOrg(id, org);
  }

  @Override
  public List<String> getOrgAuth(String id) {
    return organizationMapper.getOrgAuth(id);
  }

  @Override
  @Transactional
  public void setOrgAuth(String id, List<String> authIds) {
    organizationMapper.deleteOrgAuth(id);
    if (authIds.size() > 0) {
      organizationMapper.setOrgAuth(id, authIds);
    }
  }

  @Override
  public Organization getIndependentOrgByAccount(String userAccount) {
    return organizationMapper.getIndependentOrgByAccount(userAccount);
  }

  @Override
  public Organization getIndependentOrgByUserId(String userId) {
    return organizationMapper.getIndependentOrgByUserId(userId);
  }

  @Override
  public List<Organization> getOrgByIndependentOrg(String independentOrgId, String customerId) {
    return organizationMapper.getOrgByIndependentOrg(independentOrgId, customerId);
  }

  @Override
  public List<Organization> getOrganization(String independentOrgId, String orgType, String
          customerId) {
    return organizationMapper.getOrganization(independentOrgId, orgType, customerId);
  }

  @Override
  public List<Organization> getDirectlyOrganization(String orgId, String orgType, String
          customerId) {
    return organizationMapper.getDirectlyOrganization(orgId, orgType, customerId);
  }

  @Override
  public void addOrgAuth(String id, String authId) {
    List<String> authIds = new ArrayList<>();
    authIds.add(authId);
    organizationMapper.setOrgAuth(id, authIds);
  }

  @Override
  public boolean hasOrgCodeExist(String name, String customerId) {
      Integer orgCount = organizationMapper.getOrgCount(name, customerId);
    return orgCount != null && orgCount > 0;
  }

  @Override
  public List<OrganizationType> getOrgType() {
    return organizationMapper.getOrgType();
  }

  @Override
  public Organization getDirectlyIndependentOrgByOrgId(String customerId, String orgId) {
    return organizationMapper.getDirectlyIndependentOrgByOrgId(customerId, orgId);
  }

    @Override
    public String findQXBMMC(String code) {
        String[] str = code.split(","); 
        List<String> stringlist = Arrays.asList(str);
        return organizationMapper.findQXBMMC(stringlist);
    }

    @Override
    public String getParentList(String bmdm) {
        return organizationMapper.getParentList(bmdm);
    }
    
    @Override
    public List<Organization> getOrginCode(List<String> bmdms) {
      return organizationMapper.getOrginCode(bmdms);
    }

    @Override
    public void insertUerBmdm(String zydm, List<String> bmdms) {
        organizationMapper.insertUerBmdm(zydm, bmdms);
    }

    @Override
    public List<String> getUserFromBmqx(String zydm) {
        return organizationMapper.getUserFromBmqx(zydm);
    }

    @Override
    public void delUserBmdm(String zydm) {
        organizationMapper.delUserBmdm(zydm);
    }

  @Override
  public Object findByAgencyCodeAndDepartment(String bmdm, String agencyCode) {
    return organizationMapper.findByAgencyCodeAndDepartment(bmdm,agencyCode);
  }

@Override
public Organization getOrganizationByUserId(String id) {
    // TODO Auto-generated method stub
    return organizationMapper.getOrganizationByUserId(id);
}

  @Override
  public List<Organization> getBMMC(String dl) {
    return organizationMapper.getBMMC(dl);
  }

  @Override
  public List<Organization> getBMMCBydl(String dl) {
    return organizationMapper.getgetBMMCBydl(dl);
  }

  @Override
  public Organization findByAgencyCodeAndName(String dl, String str) {
    return organizationMapper.findByAgencyCodeAndName(dl,str);
  }

  @Override
  public List<Organization> getOrgByDljgBm(String dljgBm) {
    return organizationMapper.getOrgByDljgBm(dljgBm);
  }

  @Override
  public String getBmStr(String dljgBm) {
    return organizationMapper.getBmStr(dljgBm);
  }


}
