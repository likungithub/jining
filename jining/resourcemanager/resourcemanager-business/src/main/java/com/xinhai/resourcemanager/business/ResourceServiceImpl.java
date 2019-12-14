package com.xinhai.resourcemanager.business;

import com.xinhai.organization.service.OrganizationService;
import com.xinhai.resourcemanager.dao.ResourceMapper;
import com.xinhai.resourcemanager.entity.Resource;
import com.xinhai.resourcemanager.service.ResourceService;
import com.xinhai.rolemanager.service.RoleService;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Created by fanxi on 2016-5-3.
 */
@Service
public class ResourceServiceImpl implements ResourceService {
  @Autowired
  private ResourceMapper resourceMapper;

  @Autowired
  private RoleService roleService;

  @Autowired
  private OrganizationService organizationService;

  @Override
  public List<Resource> getResources(String customerId) {
    return resourceMapper.getResources(customerId);
  }
  
  /**
   * 根据当前用户id查询
   */
  public List<Resource> getResourcesByUserId(String id) {
    return resourceMapper.getResourcesByUserId(id);
  }

  @Override
  public Resource getResource(String id) {
    return resourceMapper.getResource(id);
  }

  @Override
  public Boolean deleteResource(String id) {
    resourceMapper.deleteResource(id);
    return true;
  }

  @Override
  public void addResource(Resource resource) {
    resourceMapper.addResource(resource);
  }

  @Override
  public void updateResource(String id, Resource resource) {
    resourceMapper.updateResource(id, resource);
  }

  @Override
  public void moveResource(String id, String parentId, int order) {
    resourceMapper.moveResource(id, parentId, order);
  }

  @Override
  public int getMaxOrder(String customerId, String parentId) {
    Integer order = resourceMapper.getMaxOrder(customerId, parentId);
    return order == null ? 0 : order;
  }

  @Override
  @Transactional
  public void addResources(String customerId, String roleId, String orgId, List<Resource>
          resources) {
    List<Resource> currentResources = getResources(customerId);
    for (int i = currentResources.size() - 1; i >= 0; i--) {
      Resource current = currentResources.get(i);
      Optional<Resource> resource = resources.stream()
              .filter(f -> StringUtils.equalsIgnoreCase(f.getFuncId(), current.getFuncId()))
              .findAny();

      if (resource.isPresent()) {
        currentResources.remove(i);
        resources.remove(resource.get());
      }
    }

    List<String> deleteRoleAuthIds = new ArrayList<>();
    if (currentResources.size() > 0) {
      deleteRoleAuthIds.addAll(currentResources.stream().map(Resource::getFuncId).collect
              (Collectors.toList()));
    }

    if (resources.size() > 0) {
      for (Resource resource : resources) {
        resource.setCustomerId(customerId);
        resource.setId(UUID.randomUUID().toString());
        addResource(resource);
      }
    }

    if (deleteRoleAuthIds.size() > 0) {
      resourceMapper.deleteResources(customerId, deleteRoleAuthIds);
    }

    List<Resource> allResources = getResources(customerId);
    if (allResources.size() > 0) {
      List<String> authIds = allResources.stream().map(Resource::getId).collect(Collectors.toList
              ());
      roleService.setRoleAuth(roleId, authIds, "001");
      organizationService.setOrgAuth(orgId, authIds);
    }
  }

  @Override
  public boolean isExist(String customerId, String id, String resourceName) {
    Integer count = resourceMapper.isExist(customerId, id, resourceName);
    return count != null && count > 0;
  }
}
