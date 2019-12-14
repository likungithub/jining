package com.xinhai.resourcemanager.dao;

import com.xinhai.resourcemanager.entity.Resource;

import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by fanxi on 2016-5-3.
 */
public interface ResourceMapper {
  List<Resource> getResources(String customerId);
  
  /**
   * 根据当前用户id查询
   */
  List<Resource> getResourcesByUserId(String id);

  Resource getResource(@Param("id") String id);

  void deleteResource(@Param("id") String id);

  void addResource(@Param("resource") Resource resource);

  void updateResource(@Param("id") String id, @Param("resource") Resource resource);

  void moveResource(@Param("id") String id, @Param("parentId") String parentId, @Param("order")
          int order);

  Integer getMaxOrder(@Param("customerId") String customerId, @Param("parentId") String parentId);

  void deleteResources(@Param("customerId") String customerId, @Param("authIds") List<String>
          deleteRoleAuthIds);

  Integer isExist(@Param("customerId") String customerId,
                  @Param("id") String id,
                  @Param("name") String name);
}
