package com.xinhai.organization.service;

import com.xinhai.organization.api.Organization;
import com.xinhai.organization.api.OrganizationType;

import java.util.List;

/**
 * Created by fanxi on 2016-5-4.
 */
public interface OrganizationService {

  /**
   * 获取客户下所有的组织结果
   *
   * @param customerId 客户主键
   * @return 组织结构信息
   */
    List<Organization> getOrgByCustomer(String customerId);

  /**
   * 获取单个组织结构
   *
   * @param id 组织结构主键
   * @return 组织结构
   */
    Organization getOrg(String id);

  /**
   * 通过code获取单个组织结构
   *
   * @param code 部门代码
   * @return 组织结构
   */
    Organization selectByCode(String code);
    
    /**
     * 通过传入的部门编码获取部门名称
     *
     * @param code 部门代码
     * @return 组织结构
     */
    String findQXBMMC(String code);
  
    /**
   * 删除组织结构
   *
   * @param id 组织结构主键
   * @return 是否成功
   */
    boolean deleteOrg(String id);

    
    int getMaxOrder(String dljgBm);

  /**
   * 添加组织结构
   *
   * @param customerId 客户主键
   * @param org        组织结构
   * @return 新增的组织结构主键
   */
    String addOrg(String customerId, Organization org);

  /**
   * 更新组织结构
   *
   * @param id  组织结构主键
   * @param org 组织结构信息
   */
    void updateOrg(String id, Organization org);

  /**
   * 获取组织结构拥有的权限
   *
   * @param id 组织结构主键
   * @return 组织结构拥有的权限
   */
    List<String> getOrgAuth(String id);

  /**
   * 设置组织结构权限
   *
   * @param id      组织结构主键
   * @param authIds 需要设置的组织结构权限
   */
    void setOrgAuth(String id, List<String> authIds);

  /**
   * 获取用户所属的独立应用组织
   *
   * @param userAccount 用户账号
   * @return 独立应用组织结构
   */
    Organization getIndependentOrgByAccount(String userAccount);

  /**
   * 获取用户所属的独立应用组织
   *
   * @param userId 用户主键
   * @return 独立应用组织结构
   */
    Organization getIndependentOrgByUserId(String userId);

  /**
   * 获取独立应用组织之下的所有组织结构
   *
   * @param independentOrgId 独立应用组织结构主键
   * @param customerId       客户主键
   */
    List<Organization> getOrgByIndependentOrg(String independentOrgId, String customerId);

  /**
   * 获取独立应用组织之下的所有组织结构
   *
   * @param independentOrgId 独立应用组织结构主键
   * @param orgType          组织结构类型
   * @param customerId       客户主键
   */
    List<Organization> getOrganization(String independentOrgId, String orgType, String
          customerId);

  /**
   * 获取组织结构直属的组织结构
   *
   * @param orgId      独立应用组织结构主键
   * @param orgType    组织结构类型
   * @param customerId 客户主键
   */
    List<Organization> getDirectlyOrganization(String orgId, String orgType, String
          customerId);

    void addOrgAuth(String id, String authId);

    boolean hasOrgCodeExist(String name, String customerId);

    List<OrganizationType> getOrgType();

  /**
   * 获取组织结构直属的独立应用组织
   *
   * @param customerId 客户主键
   * @param orgId 组织结构主键
   * @return 独立应用组织结构
   */
    Organization getDirectlyIndependentOrgByOrgId(String customerId, String orgId);
    
    /**
     * 根据bmdm查询该部门代码的父级与全部子级
     * @param bmdm 部门编码
     * @return 部门编码集合
     */
      String getParentList(String bmdm);

    List<Organization> getOrginCode(List<String> bmdms);
    
    /**
     * 批量插入员工的部门权限
     * @param zydm
     * @param bmdms
     */
    void insertUerBmdm(String zydm, List<String> bmdms);
    
    /**
     * 根据职员代码查询该员工所有部门权限
     * @param zydm
     * @return
     */
    List<String> getUserFromBmqx(String zydm);
    
    /**
     * 根据职员代码删除该员工所有部门权限
     * @param zydm
     */
    void delUserBmdm(String zydm);


  /**
   * 根据部门编码和代理机构编码查询部门名称
   * @param bmdm
   * @param agencyCode
   * @return
   */
  Object findByAgencyCodeAndDepartment(String bmdm, String agencyCode);

  /**
   * 根据用户编号查询部门信息
   * @param id
   *            userid
   * @return
   */
   Organization getOrganizationByUserId(String id);

  /**
   * 根据代理机构编码查询部门名称
   * @param dl
   * @return
   */
  List<Organization> getBMMC(String dl);

  /**
   * 获取部门名称
   * @param dl
   * @return
   */
    List<Organization> getBMMCBydl(String dl);

  /**
   * 获取部门编码
   * @param dl
   * @param str
   * @return
   */
    Organization findByAgencyCodeAndName(String dl, String str);

    /**
    * 根据代理机构编码获取部门信息
    * @param dljgBm
    * @return
    */
    List<Organization> getOrgByDljgBm(String dljgBm);

  /**
   * 根据代理机构编码获取当前代理机构的全部代码字符串
   * @param dljgBm
   * @return
   */
    String getBmStr(String dljgBm);
}
