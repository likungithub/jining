package com.xinhai.security.business;

import com.xinhai.organization.api.Organization;
import com.xinhai.resourcemanager.entity.Resource;
import com.xinhai.security.api.Customer;
import com.xinhai.security.api.OrgUrlAuthority;
import com.xinhai.security.api.SecurityService;
import com.xinhai.security.api.ShiroUser;
import com.xinhai.security.dao.SecurityMapper;
import com.xinhai.usermanager.entity.User;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by fanxi on 2016-5-6.
 */
@Service
public class SecurityServiceImpl implements SecurityService {
    @Autowired(required = false)
    private SecurityMapper securityMapper;

    @Override
    public List<Resource> findAllUrlAccessResources(String userAccount) {
        Organization userIndependentOrg = securityMapper
                .findUserIndependentOrg(userAccount);
        List<Resource> authorities = securityMapper.findUserAuth(userAccount,
                "menu");

        if (userIndependentOrg == null) {
        return authorities;
        }

        List<OrgUrlAuthority> orgAuthorities;
        orgAuthorities = securityMapper.findOrgAuthByOrgId(
                userIndependentOrg.getId(), "menu");
        List<Resource> userAuth = new ArrayList<>();
        Set orgAuth = new HashSet<>();
        for (OrgUrlAuthority auth : orgAuthorities) {
        if (!orgAuth.contains(auth.getId())) {
        orgAuth.add(auth.getId());
        }
        }

        for (Resource resource : authorities) {
        if (userIndependentOrg != null && orgAuth.contains(resource.getId())) {
        userAuth.add(resource);
        }
        }

        return userAuth;
    }

    @Override
    public ShiroUser findUserByUserName(String userAccount) {
        User user = securityMapper.findUser(userAccount);
        if (user == null) {
            return null;
        }

        ShiroUser shiroUser = new ShiroUser();
        shiroUser.setId(user.getId());
        shiroUser.setUserName(user.getName());
        shiroUser.setUserAccount(user.getUserAccount());
        shiroUser.setUserPassword(user.getPassword());
        shiroUser.setEmail(user.getEmail());
        shiroUser.setEnabled(user.isEnabled());
        shiroUser.setIsDelete(user.isDelete());
        shiroUser.setSync(user.isSync());
        shiroUser.setUser(user); //用户信息
        Organization org = new Organization();
        org.setId(user.getBmdm()); //部门代码
        shiroUser.setOrganization(org);
        Customer customer = new Customer();
        customer.setId(user.getCustomerId());
        customer = securityMapper.findCustomerByUser(user.getCustomerId());
        shiroUser.setCustomer(customer); //代理记账公司id

        return shiroUser;
    }

    @Override
    public Set<String> findUserOperatorAuth(String userAccount) {
        Organization userIndependentOrg = securityMapper
                .findUserIndependentOrg(userAccount);
        List<Resource> authorities = securityMapper.findUserAuth(userAccount,
                "item");
        Set<String> userAuth = new HashSet<>();
        if (userIndependentOrg == null) {
        for (Resource resource : authorities) {
        userAuth.add(resource.getIdentifier());
        }

        return userAuth;
        }

        List<OrgUrlAuthority> orgAuthorities = new ArrayList<>();
        orgAuthorities = securityMapper.findOrgAuthByOrgId(
                userIndependentOrg.getId(), "item");
        Set orgAuth = new HashSet<>();
        for (OrgUrlAuthority auth : orgAuthorities) {
        if (!orgAuth.contains(auth.getId())) {
        orgAuth.add(auth.getId());
        }
        }

        for (Resource resource : authorities) {
        if (userIndependentOrg != null && orgAuth.contains(resource.getId())) {
        userAuth.add(resource.getIdentifier());
        }
        }

        return userAuth;
    }

    @Override
    public Organization findOrganizationByUser(String orgId) {

        try {
        return securityMapper.findOrganization(orgId);
        } catch (Exception ex) {

        }

        return null;
    }

    @Override
    public Organization findIndependentOrgByUser(String userAccount) {
        return securityMapper.findUserIndependentOrg(userAccount);
    }

    @Override
    public Customer findCustomerByUser(String customerId) {

        try {
        return securityMapper.findCustomerByUser(customerId);
        } catch (Exception ex) {
        }

        return null;
    }

    @Override
    public List<String> findUserRoles(String userAccount) {

        try {
        return securityMapper.findUserRoles(userAccount);
        } catch (Exception ex) {

        }

        return new ArrayList<>();
    }

    @Override
    public void syncAd(List<User> userInfos, List<Organization> organizations) {
        List<String> allUsers = securityMapper.getAllSyncUsers();
        List<String> allOrgs = securityMapper.getAllSyncOrgs();

        for (User user : userInfos) {
        if (allUsers.contains(user.getId())) {
        allUsers.remove(user.getId());
        }
        String id = securityMapper.userIsExist(user.getId());
        if (!StringUtils.isEmpty(id)) {
        securityMapper.updateUser(user);
        } else {
        securityMapper.addUser(user);
        }
        }

        for (Organization org : organizations) {
        if (allOrgs.contains(org.getId())) {
        allOrgs.remove(org.getId());
        }

        String id = securityMapper.orgIsExist(org.getId());
        if (!StringUtils.isEmpty(id)) {
        securityMapper.updateOrg(org);
        } else {
        securityMapper.addOrg(org);
        }
        }

        if (allUsers.size() > 0) {
        securityMapper.deleteSyncUser(allUsers);
        }

        if (allOrgs.size() > 0) {
        securityMapper.deleteSyncOrg(allOrgs);
        }
    }

    /**
     * 通过id获取user信息
     * 
     * @param id 传入id
     * 
     * @return 返回user信息
     */
    @Override
    public User getUserById(String id) {
        // TODO Auto-generated method stub
        return securityMapper.getUserById(id);
    }

    /**
     * 通过bmdm查询Organization信息
     * @param code 传入bmdm
     * @return 返回Organization信息
     */
    @Override
    public Organization selectByCode(String code) {
        // TODO Auto-generated method stub
        return securityMapper.selectByCode(code);
    }
}
