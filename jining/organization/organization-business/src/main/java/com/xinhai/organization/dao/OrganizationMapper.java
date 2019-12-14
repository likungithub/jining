package com.xinhai.organization.dao;

import com.xinhai.organization.api.Nums;
import com.xinhai.organization.api.Organization;
import com.xinhai.organization.api.OrganizationType;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

/**
 * Created by fanxi on 2016-5-4.
 */
public interface OrganizationMapper {
  List<Organization> getOrgByCustomer(String customerId);

  Organization getOrg(String id);
  
  Organization selectByCode(String code);

  void deleteOrg(String id);

  Integer getMaxOrder(@Param("dljgBm") String dljgBm);

  void addOrg(@Param("customerId") String customerId, @Param("org") Organization org);

  void updateOrg(@Param("code") String code, @Param("org") Organization org);

  List<String> getOrgAuth(String id);

  void deleteOrgAuth(String id);

  void setOrgAuth(@Param("id") String id, @Param("authIds") List<String> authIds);

  Organization getIndependentOrgByAccount(String userAccount);

  Organization getIndependentOrgByUserId(String userId);

  List<Organization> getOrgByIndependentOrg(@Param("independentOrgId") String independentOrgId,
                                            @Param("customerId") String customerId);

  Integer getOrgCount(@Param("name") String code, @Param("customerId") String customerId);

  List<Organization> getOrganization(
          @Param("independentOrgId") String independentOrgId,
          @Param("orgType") String orgType,
          @Param("customerId") String customerId);

  List<OrganizationType> getOrgType();

  void deleteOrgUser(String id);

  List<Organization> getDirectlyOrganization(
          @Param("orgId") String orgId,
          @Param("orgType") String orgType,
          @Param("customerId") String customerId);

  Organization getDirectlyIndependentOrgByOrgId(@Param("customerId") String customerId,
                                                @Param("orgId") String orgId);
  
  String findQXBMMC( @Param("bmdms") List<String> bmdms);
  
  /**
   * 
   * @param bmdms
   * @return
   */
  List<Organization> getOrginCode( @Param("bmdms") List<String> bmdms);
  
  /**
   * 根据bmdm查询该部门代码的父级与全部子级
   * @param bmdm 部门编码
   * @return 部门编码集合
   */
    String getParentList(@Param("bmdm") String bmdm);
    
    /**
     * 批量插入员工的部门权限
     * @param zydm
     * @param bmdms
     */
    void insertUerBmdm(@Param("zydm") String zydm, @Param("bmdms") List<String> bmdms);
    
    List<String> getUserFromBmqx(@Param("zydm") String zydm);
    
    void delUserBmdm(@Param("zydm") String zydm);


  /**
   * 通过部门编码和代理机构编码查询部门名称
   * @param bmdm
   * @param agencyCode
   * @return
   */
  Object findByAgencyCodeAndDepartment(@Param("bmdm") String bmdm, @Param("agencyCode") String agencyCode);
  
  /**
   * 根据用户编号查询部门信息
   * @param id
   * @return
   */
  Organization getOrganizationByUserId(String id);

  List<Organization> getBMMC(String dl);
  
  /**
   * 新增部门时查询某代理机构，某部门下的下一个最大的部门编码
   * @param bmdm
   * @param agencyCode
   * @return
   */
  String getMaxBmdm(@Param("bmdm") String bmdm, @Param("agencyCode") String agencyCode);
  
  /**
   * 根据代理机构编码获取所有部门信息
   * @param dljgBm
   * @return
   */
  List<Organization> getOrgByDljgBm(@Param("dljgBm") String dljgBm);
  
  /**
   * 查询具有该部门权限的职员代码
   * @param bmdm
   * @return
   */
  List<String> getZydmFromBmqx(@Param("bmdm") String bmdm);
  
  /**
   * 根据父节点的部门编码和代理机构编码查询该节点的子节点数目
   * @param bmdm
   * @param dljgBm
   * @return
   */
  int getSonNum(@Param("bmdm") String bmdm, @Param("dljgBm") String dljgBm);
  
  
  /**
   * 根据部门编码和代理机构编码查询该部门的员工，客户，任务数目
   * @param bmdm
   * @param dljgBm
   * @return
   */
  Nums getSomeNumUnderOrg(@Param("bmdm") String bmdm, @Param("dljgBm") String dljgBm);
  
  String getUserFromBmqxString(@Param("zydm") String zydm);
  
  /**
   * 根据部门编码和员工id查询员工所属部门是否还存在，是否有了下一级部门
   * @param dljgBm
   * @param ids
   * @return
   */
  Nums getBmNum(@Param("dljgBm") String dljgBm, @Param("ids") List<String> ids);
  
  /**
   * 批量更新部门名称
   * @param bmdm
   * @param bmmc
   */
  void changName(@Param("bmdm") String bmdm, @Param("bmmc") String bmmc);

  /**
   * 获取当前部门的名称
   * @param dl
   * @return
   */
    List<Organization> getgetBMMCBydl(String dl);

  /**
   * 获取部门代码
   * @param dl
   * @param str
   * @return
   */
    Organization findByAgencyCodeAndName(@Param("dl") String dl, @Param("str") String str);

  /**
   * 查询某部门下的所有一级子部门加管理员
   * @param bmdm bmdm
   * @param dljgBm dljgbm
   * @return
   */
  List<Map<String,Object>> findNextBmdm(@Param("bmdm") String bmdm, @Param("dljgBm") String dljgBm);

  List<Organization> getSons(@Param("bmdm") String bmdm);

  /**
   * 根据代理机构编码获取当前代理机构的全部代码字符串
   * @param dljgBm
   * @return
   */
  String getBmStr(@Param("dljgBm") String dljgBm);
}
