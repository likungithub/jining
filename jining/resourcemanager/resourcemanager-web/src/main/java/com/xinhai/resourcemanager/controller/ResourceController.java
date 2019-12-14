package com.xinhai.resourcemanager.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xinhai.Log.api.OperateLog;
import com.xinhai.organization.api.Organization;
import com.xinhai.organization.service.OrganizationService;
import com.xinhai.resourcemanager.entity.Resource;
import com.xinhai.resourcemanager.service.ResourceService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.service.UserService;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Created by fanxi on 2016-5-3.
 */
@Controller
@RequestMapping(value = "/resources")
public class ResourceController {
  @Autowired
  private ResourceService resourceService;

  @Autowired(required = false)
  private OrganizationService organizationService;
  
  @Autowired
  private UserService userService;

  /**
   * 菜单的加载根据当前用户的角色进加载
   * @return
   */
  @RequestMapping(value = "/resource", method = RequestMethod.GET)
  @ResponseBody
  public JSONArray getResources() {
    JSONArray arrayNode = new JSONArray();
    List<Resource> resources = new ArrayList<Resource>();
    
    //根据用户id获取当前用户的信息
    User user = CurrentLoginUser.getUser();
    if (user != null) {
        if (user.getJsdm() != null && user.getJsdm().contains("946bc4ea-e3fd-4c74-b9ca-46fd70d8fad9")) {
            resources = resourceService.getResources(CurrentLoginUser.getCustomerId());
        } else {
            //不为管理员时，仅获取当前用户能操作的所有菜单
            resources = resourceService.getResourcesByUserId(CurrentLoginUser.getId());
        }
    } 
//    Organization org = CurrentLoginUser.getIndependentOrg();
//    List<Resource> resources = resourceService.getResources(customerId);
    
//    if (org != null && organizationService != null) {
//      List<String> orgAuthes = organizationService.getOrgAuth(org.getId());
//      Set<String> finalOrgAuthes = new HashSet<>(orgAuthes);
//      resources = resources.stream()
//              .filter(f -> finalOrgAuthes.contains(f.getId()))
//              .collect(Collectors.toList());
//    }

    List<Resource> rootResource = resources.stream().filter(f -> f.getParentId() == null || f
            .getParentId().isEmpty()).collect(Collectors.toList());
    builderResourceTree(resources, rootResource, arrayNode);

    return arrayNode;
  }

  @RequestMapping(value = "/orgsetresource/{id}", method = RequestMethod.GET)
  @ResponseBody
  public JSONArray getOrgSetResources(@PathVariable("id") String id) {
    String customerId = CurrentLoginUser.getCustomerId();
    JSONArray arrayNode = new JSONArray();
    List<Resource> resources = resourceService.getResources(customerId);
    if (organizationService != null) {
      Organization org = organizationService.getDirectlyIndependentOrgByOrgId(customerId, id);
      if (org != null) {
        List<String> orgAuthes = organizationService.getOrgAuth(org.getId());
        resources = resources.stream()
                .filter(f -> orgAuthes.stream()
                        .anyMatch(q -> StringUtils.equalsIgnoreCase(q, f.getId())))
                .collect(Collectors.toList());
      }
    }

    List<Resource> rootResource = resources.stream().filter(f -> f.getParentId() == null || f
            .getParentId().isEmpty()).collect(Collectors.toList());
    builderResourceTree(resources, rootResource, arrayNode);

    return arrayNode;
  }

  private void builderResourceTree(List<Resource> allResources, List<Resource> currentResource,
                                   JSONArray resourceTree) {
    for (Resource resource : currentResource) {
      JSONObject node = new JSONObject();
      node.put("id", resource.getId());
      node.put("text", resource.getName());

      JSONObject attr = new JSONObject();
      attr.put("funcId", resource.getFuncId());
      attr.put("type", resource.getCategory());
      node.put("li_attr", attr);
      List<Resource> children = allResources.stream().filter(f -> Objects.equals(f.getParentId(),
              resource.getFuncId())).collect(Collectors.toList());
      if (children.size() > 0) {
        JSONArray childrenNode = new JSONArray();
        builderResourceTree(allResources, children, childrenNode);
        node.put("children", childrenNode);
      }

      resourceTree.add(node);
    }
  }

  @RequestMapping(value = "/resource/{id}", method = RequestMethod.GET)
  @ResponseBody
  public Resource getResource(@PathVariable("id") String id) {
    Resource resource = resourceService.getResource(id);
    return resource == null ? new Resource() : resource;
  }

  @RequestMapping(value = "/resource/{id}", method = RequestMethod.DELETE)
  @OperateLog(describe = "删除资源")
  @ResponseBody
  public boolean deleteResource(@PathVariable("id") String id) {
    return resourceService.deleteResource(id);
  }

  @RequestMapping(value = "/resource", method = RequestMethod.POST)
  @OperateLog(describe = "添加资源")
  @ResponseBody
  public JSONObject addResources(@RequestBody Resource resource) {
    String customerId = CurrentLoginUser.getCustomer().getId();
    boolean isExist = resourceService.isExist(customerId, "", resource.getName());
    JSONObject object = new JSONObject();
    if (isExist) {
      object.put("errmsg", "资源名称不能重复！");
      return object;
    }

    String id = UUID.randomUUID().toString();
    resource.setId(id);
    if (resource.getFuncId() == null || resource.getFuncId().isEmpty()) {
      resource.setFuncId(id);
    }
    int order = resourceService.getMaxOrder(customerId, resource.getParentId());
    resource.setOrderNo(order + 1);
    resource.setCustomerId(customerId);
    resourceService.addResource(resource);

    Organization org = CurrentLoginUser.getIndependentOrg();
    if (org != null && organizationService != null) {
      organizationService.addOrgAuth(org.getId(), id);
    }

    object.put("id", resource.getId());
    return object;
  }

  @RequestMapping(value = "/resource/{id}", method = RequestMethod.PUT)
  @OperateLog(describe = "修改资源信息")
  @ResponseBody
  public JSONObject updateResource(@PathVariable("id") String id, @RequestBody Resource resource) {
    String customerId = CurrentLoginUser.getCustomerId();
    boolean isExist = resourceService.isExist(customerId, id, resource.getName());
    JSONObject object = new JSONObject();
    if (isExist) {
      object.put("errmsg", "资源名称不能重复！");
      return object;
    }

    resourceService.updateResource(id, resource);
    object.put("id", id);
    return object;
  }

  @RequestMapping(value = "/move/{id}/{parent}/{order}", method = RequestMethod.PUT)
  @ResponseBody
  public boolean moveResource(@PathVariable("id") String id, @PathVariable("parent") String
          parent, @PathVariable("order") int order) {
    String parentId = "";
    if (!Objects.equals(parent, "#")) {
      Resource resource = resourceService.getResource(parent);
      if (resource == null) {
        return false;
      } else {
        parentId = resource.getFuncId();
      }
    }

    resourceService.moveResource(id, parentId, order);
    return true;
  }

}
