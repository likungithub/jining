package com.xinhai.resourcemanager.service;

import com.xinhai.resourcemanager.entity.Resource;

import java.util.List;

/**
 * Created by fanxi on 2016-5-3.
 */
public interface ResourceService {

  /**
   * 根据客户主键获取资源信息
   */
  List<Resource> getResources(String customerId);
  
  /**
   * 根据当前用户id查询
   */
  List<Resource> getResourcesByUserId(String id);

  /**
   * 获取资源信息
   * @param id 资源主键
   * @return 资源信息
   */
  Resource getResource(String id);

  /**
   * 删除资源信息
   * @param id 资源主键
   * @return 是否成功
   */
  Boolean deleteResource(String id);

  /**
   * 添加资源
   * @param resource 资源信息
   */
  void addResource(Resource resource);

  /**
   * 更新资源信息
   * @param id 资源主键
   * @param resource 资源信息
   */
  void updateResource(String id, Resource resource);

  void moveResource(String id, String customerId, int order);

  int getMaxOrder(String customerId, String parentId);

  void addResources(String customerId, String roleId, String orgId, List<Resource> resources);

  boolean isExist(String customerId, String id, String resourceName);
}
