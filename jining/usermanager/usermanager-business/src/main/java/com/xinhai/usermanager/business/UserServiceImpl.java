package com.xinhai.usermanager.business;

import com.xinhai.usermanager.dao.UserMapper;
import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.entity.UserInfoImage;
import com.xinhai.usermanager.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by fanxi on 2016-4-26.
 * @author 李茂飞修改
 */
@Service
public class UserServiceImpl implements UserService {

    /**
     * 引用userMapper
     */
    @Autowired
    private UserMapper userMapper;

    /**
     * 获取用户信息
     *
     * @param id
     *            主键
     * @return 用户信息
     */
    @Override
    public User getUser(String id) {
        return userMapper.getUser(id);
    }
    
    /**
     * 获取用户信息
     *
     * @param ygid
     *            员工id
     * @return 用户信息
     */
    @Override
    public User getUserByYgid(String ygid) {
        return userMapper.getUserByYgid(ygid);
    }

    /**
     * 根据登陆账户获取用户信息
     *
     * @param userAccount
     *            登陆账户
     * @return 用户信息
     */
    @Override
    public User getUserByAccount(String userAccount) {
        return userMapper.getUserByAccount(userAccount);
    }
    
    /**
     * 获取用户信息
     *
     * @param zydm
     *            职员代码
     * @return 用户信息
     */
    @Override
    public User getUserByZydm(String zydm) {
        return userMapper.getUserByZydm(zydm);
    }

    /**
     * 获取全部用户信息
     * 
     * @param customerId
     *            客户id
     *
     * @return 用户信息
     */
    @Override
    public List<User> getUsers(String customerId) {
        return userMapper.getUsers(customerId);
    }
    
    /**
     * 获取具有某个资源节点的全部用户信息
     * 
     * @param ResourceId
     *            资源id
     * @param dljgBm 代理机构编码
     *
     * @return 用户信息
     */
    public List<String> getUsersByResourceId(String ResourceId, String dljgBm) {
        List<String> list = new ArrayList<String>();
        List<String> roleList = userMapper.getRolesByResourceId1(ResourceId); //查出有该资源节点的全部角色id
        for (String roleId : roleList) {
            List<String> list1 = userMapper.getRolesByResourceId2(roleId, dljgBm); //查出有该角色的所有用户，本机构中
            if (list1 != null && list1.size() > 0) {
                list.addAll(list1);
            }
        }
        //去重
        Set set = new  HashSet(); 
        List newList = new  ArrayList(); 
        set.addAll(list);
        newList.addAll(set);
        return newList;
    }

    /**
     * 获取具有某个资源节点的全部用户信息
     * 
     * @param ResourceId
     *            资源id
     * @param dljgBm 代理机构编码
     * @return 用户信息
     */
    public List<Map<String,String>> getUsersByResourceAllId(String ResourceId, String dljgBm){
        return  userMapper.getUsersByResourceAllId(ResourceId,dljgBm);
    }
    
    /**
     * 删除用户
     *
     * @param id
     *            主键
     */
    @Override
    public void deleteUser(String id) {
        userMapper.deleteUser(id);
    }

    @Override
    public void deleteUserbyzydm(String zydm){
        userMapper.deleteUserbyzydm(zydm);
    }
    
    /**
     * 删除用户
     *
     * @param ids
     *            主键
     */
    @Override
    public void deleteList(List<String> ids, String scry) {
        userMapper.deleteList(ids, scry);
    }

    /**
     * 根据主键修改用户信息
     * 
     * @param user
     *            用户id
     * @param id
     *            主键
     */
    @Override
    public void updateUser(String id, User user) {
        userMapper.updateUser(id, user);
    }

    /**
     * 更新密码
     * 
     * @param yhzh
     *            账号
     * @param yhmm
     *            密码
     */
    @Override
    public void updateUserPassword(String yhzh, String yhmm) {
        userMapper.updateUserPassword(yhzh, yhmm);
    }

    /**
     * 添加用户
     *
     * @param user
     *            用户信息
     */
    @Override
    public void addUser(User user) {
//        String id = UUID.randomUUID().toString();
//        user.setId(id);
        userMapper.addUser(user);
    }

    /**
     * 用户登录账户是否已经存在
     *
     * @param account
     *            登陆账户
     * @return 是否存在
     */
    @Override
    public boolean hasAccountExist(String account) {
        Integer id = userMapper.hasAccountExist(account);
        return id != null && id != 0;
    }

    /**
     * 重置密码
     *
     * @param ids
     *            主键
     * @param pwd
     *            默认密码
     */
    @Override
    public void resetUserPwd(List<String> ids, String pwd) {
        userMapper.resetUserPwd(ids, pwd);
    }

    /**
     * 更改用户启停状态
     *
     * @param id
     *            主键
     * @param status
     *            是否启用
     */
    @Override
    public void setUserStatus(String id, Boolean status) {
        userMapper.setUserStatus(id, status);
    }

    /**
     * 设置用户所属角色
     *
     * @param ids
     *            userid集合主键
     * @param roleIds
     *            角色主键集合
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void setUserRole(List<String> ids, List<String> roleIds) {
        userMapper.deleteUserRole(ids);
        if (roleIds.size() > 0) {
            userMapper.setUserRole2(ids, roleIds.get(0));
//            for (String id : ids) {
//                userMapper.setUserRole(id, roleIds);
//            } 
        }
    }
    
    /**
     * 设置单个用户所属角色
     *
     * @param id
     *            userid
     * @param roleIds
     *            角色主键集合
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void setUserRoleOne(String id, List<String> roleIds) {
        userMapper.deleteUserRoleOne(id);
        if (roleIds.size() > 0) {
            userMapper.setUserRole(id, roleIds);
        }
    }

    /**
     * 设置用户所属功能权限
     *
     * @param id
     *            主键
     * @param authIds
     *            权限主键结合
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void setUserAuth(String id, List<String> authIds) {
        userMapper.deleteUserAuth(id);
        if (authIds.size() > 0) {
            userMapper.setUserAuth(id, authIds);
        }
    }

    /**
     * 更改用户所属部门
     *
     * @param ids
     *            主键
     * @param orgId
     *            组织结构主键
     */
    @Override
    public void changeOrg(List<String> ids, String orgId) {
        userMapper.changeOrg(ids, orgId);
    }

    @Override
    public List<String> getUserAuth(String id) {
        return userMapper.getUserAuth(id);
    }

    @Override
    public String getUserOrg(String id) {
        return userMapper.getUserOrg(id);
    }

    @Override
    public List<String> getUserRole(String id) {
        return userMapper.getUserRole(id);
    }

    /**
     * 根据 代理机构uuid和部门编码查找该部门下的用户
     * @param customerId 代理机构uuid
     * @param bmdm 部门编码
     * @return List用户列表
     */
    @Override
    public List<User> getUsersByOrg(String customerId, String bmdm) {
        return userMapper.getUsersByOrg(customerId, bmdm);
    }
    
    /**
     * 通过customerid和bmdms查询
     * 
     * @param customerId
     *            客户uuid
     * @param bmdms
     *            部门id
     * @return 查询的user集合
     */
    @Override
    public List<User> getUsersByBmdm(String customerId, List<String> bmdms) {
        return userMapper.getUsersByBmdm(customerId, bmdms);
    }

    @Override
    public boolean verifyPwd(String currentAccount, String originPwd) {
        Integer userCount = userMapper.verifyPwd(currentAccount, originPwd);

        return userCount != null && userCount == 1;
    }

    @Override
    public void updateUserPwd(String currentAccount, String newPwd) {
        userMapper.updateUserPwd(currentAccount, newPwd);
    }

    @Override
    public List<User> getUsersByRoleId(String roleId) {
        return userMapper.getUsersByRoleId(roleId);
    }

    /**
     * 查询最大的ygid值
     * 
     * @return 最大值
     */
    @Override
    public Integer selectMaxYgid() {
        return userMapper.selectMaxYgid();
    }

    /**
     * 获取用户信息
     *
     * @param customerId
     *            主键
     * @return 用户信息
     */
    @Override
    public User getUserByCustomerId(String customerId) {
        return userMapper.getUserByCustomerId(customerId);
    }
    
    /**
     * 查询出该角色对应的未删除的用户
     * @param ids 传入ids
     * @return 查询数目
     */
    @Override
    public Integer getUsersByIds(List<String> ids) {
        return userMapper.getUsersByIds(ids);
    }
    
    /**
     * 通过多个roleID查询出Role姓名集合，并用，连接起来
     * @param ids 传入的roleID集合
     * @return 合并后的字符串
     */
    @Override
    public String getRoleNames(List<String> ids) {
        return userMapper.getRoleNames(ids);
    }
    
    /**
     * 更新user表中的角色代码
     * @param ids 传入useridList
     * @param roleIds 传入roleid
     */
    @Override
    public void updateTole(List<String> ids, String roleIds) {
        userMapper.updateTole(ids, roleIds);
    }

    /**
     * 更新user表中的单个角色代码
     * @param id 传入userid
     * @param roleIds 传入roleid
     */
    @Override
    public void updateToleOne(String id, String roleIds) {
        userMapper.updateToleOne(id, roleIds);
    }
    
	@Override
	public List<User> findUser(String dl) {
		// TODO Auto-generated method stub
		return userMapper.findUser(dl);
	}

	
	/**
     * 获取全部用户信息
     * 
     * @param dljgBm
     *            代理机构编码
     *
     * @return 用户信息
     */
    @Override
    public List<User> getUsersByDljgBm(String dljgBm) {
        List<User> list = userMapper.getUsersByDljgBm(dljgBm);
        return list;
    }

    @Override
    public List<User> getUsersByBmdmLikeKey(String customerId,
            List<String> bmdms, String key) {
        // TODO Auto-generated method stub
        return userMapper.getUsersByBmdmLikeKey(customerId, bmdms, key);
    }

    @Override
    public void addUserHeadImg(String id, User user) {
        // TODO Auto-generated method stub
        userMapper.addUserHeadImg(id, user);
    }

	@Override
	public String findUserByname(String xcgjr) {
		// TODO Auto-generated method stub
		return userMapper.findUserByname(xcgjr);
	}
	
	/**
     * 获取全部用户信息（具有某项权限的）
     * 
     * @param resourceId
     *            资源id
     *
     * @return 用户信息
     */
    public List<User> getUsersWithAuth(String resourceId){
        return userMapper.getUsersWithAuth(resourceId);
    }

	@Override
	public List<User> findUserBydlByresource(String dl) {
		// TODO Auto-generated method stub
		return userMapper.findUserBydlByresource(dl);
	}

	@Override
	public void updateByUser(String userZydm) {
		// TODO Auto-generated method stub
		userMapper.updateByUser(userZydm);
	}

    @Override
    public void insertUserInfoImage(UserInfoImage userInfoImage) {
        userMapper.insertUserInfoImage(userInfoImage);
    }

    @Override
    public List<UserInfoImage> findUserImageList(String dljgbm, String zydm, String fjlx) {
        return userMapper.findUserImageList(dljgbm, zydm, fjlx);
    }

    @Override
    public UserInfoImage findUserInfoImageById(String id) {
        return userMapper.findUserInfoImageById(id);
    }

    @Override
    public void deleteUserImage(String id, UserInfoImage userInfoImage) {
        userMapper.deleteUserImage(id, userInfoImage);
    }

    @Override
    public void updateFileDownload(String id) {
        userMapper.updateFileDownload(id);
    }

    @Override
    public int countImageSize(String dljgbm, String zydm, String fjlx) {
        return userMapper.countImageSize(dljgbm, zydm, fjlx);
    }

    @Override
    public void updateFileInfo(String zydmuuid, String zydm) {
        userMapper.updateFileInfo(zydmuuid,zydm);
    }

    @Override
    public void updateGSPJ(String dljgBm, String zydm, String name, String grtx) {
        userMapper.updateGSPJ(dljgBm,zydm,name,grtx);
    }

    @Override
    public void updateKHPJ(String dljgBm, String zydm, String name, String grtx) {
        userMapper.updateKHPJ(dljgBm,zydm,name,grtx);
    }

	@Override
	public int findAlldlByOneDay(String begin,String end) {
		// TODO Auto-generated method stub
		return userMapper.findAlldlByOneDay(begin,end);
	}

	@Override
	public int findAlldlByOneMonth(String begin,String end) {
		// TODO Auto-generated method stub
		return userMapper.findAlldlByOneMonth(begin,end);
	}

	@Override
	public int findAllApprovedl() {
		// TODO Auto-generated method stub
		return userMapper.findAllApprovedl();
	}

	@Override
	public List<Map<String, String>> approveProportion() {
		// TODO Auto-generated method stub
		return userMapper.approveProportion();
	}

	@Override
	public List<Map<String, Object>> searchCountByMonth(String begin, String end) {
		// TODO Auto-generated method stub
		return userMapper.searchCountByMonth(begin,end);
	}

    @Override
    public List<User> getUsersByDljgBmWithOneBm(String dl, String other) {
        return userMapper.getUsersByDljgBmWithOneBm(dl,other);
    }
    
    @Override
    public List<String> getUserAccount(List<String> ids, List<String> zydms) {
        // TODO Auto-generated method stub
        return userMapper.getUserAccount(ids, zydms);
    }

    @Override
    public List<User> booleanUserZydm(String zydm, String dljgbm) {
        return userMapper.booleanUserZydm(zydm,dljgbm);
    }

    @Override
    public User findByAgencyAndEmployeeCode(String dljgBm, String zydm) {
        return userMapper.findByAgencyAndEmployeeCode(dljgBm,zydm);
    }

    /**
     * 查询所有作为客户主管的员工
     * @param dljgBm 代理机构编码
     * @param zydm 职员代码
     * @return List List
     */
    @Override
    public List<User> getAllKhzg(String dljgBm, String zydm) {
        return userMapper.getAllKhzg(dljgBm,zydm);
    }

    @Override
    public User getMananger(String dljgBm) {
        return userMapper.getMananger(dljgBm);
    }
}

