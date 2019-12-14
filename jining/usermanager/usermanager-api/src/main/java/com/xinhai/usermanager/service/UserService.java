package com.xinhai.usermanager.service;

import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.entity.UserInfoImage;

import java.util.List;
import java.util.Map;

/**
 * 用户信息服务接口 Created by fanxi on 2016-4-26.
 * 
 * @author 李茂飞修改
 */
public interface UserService {
    /**
     * 获取用户信息
     *
     * @param id
     *            主键
     * @return 用户信息
     */
    User getUser(String id);
    
    /**
     * 获取用户信息
     *
     * @param ygid
     *            员工id
     * @return 用户信息
     */
    User getUserByYgid(String ygid);
    
    /**
     * 获取用户信息
     *
     * @param zydm
     *            职员代码
     * @return 用户信息
     */
    User getUserByZydm(String zydm);

    /**
     * 获取用户信息
     *
     * @param customerId
     *            主键
     * @return 用户信息
     */
    User getUserByCustomerId(String customerId);

    /**
     * 根据登录账户获取用户信息
     *
     * @param userAccount
     *            登录账户
     * @return 用户信息
     */
    User getUserByAccount(String userAccount);

    /**
     * 获取全部用户信息
     * 
     * @param customerId
     *            客户id
     *
     * @return 用户信息
     */
    List<User> getUsers(String customerId);

    /**
     * 获取具有某个资源节点的全部用户信息
     * 
     * @param ResourceId
     *            资源id
     * @param dljgBm 代理机构编码
     * @return 用户信息
     */
    List<String> getUsersByResourceId(String ResourceId, String dljgBm);
    
    /**
     * 获取具有某个资源节点的全部用户信息
     * 
     * @param ResourceId
     *            资源id
     * @param dljgBm 代理机构编码
     * @return 用户信息
     */
    List<Map<String,String>> getUsersByResourceAllId(String ResourceId, String dljgBm);
    
    /**
     * 获取全部用户信息
     * 
     * @param dljgBm
     *            代理机构编码
     *
     * @return 用户信息
     */
    List<User> getUsersByDljgBm(String dljgBm);

    /**
     * 删除用户
     *
     * @param id
     *            主键
     */
    void deleteUser(String id);

    void deleteUserbyzydm(String zydm);

    /**
     * 删除用户
     *
     * @param ids
     *            主键
     * @param scry
     *            删除人员
     */
    void deleteList(List<String> ids, String scry);
    
    /**
     * 根据主键修改用户信息
     * 
     * @param user
     *            用户id
     * @param id
     *            主键
     */
    void updateUser(String id, User user);

    /**
     * 更新密码
     * 
     * @param yhzh
     *            账号
     * @param yhmm
     *            密码
     */
    void updateUserPassword(String yhzh, String yhmm);

    /**
     * 添加用户
     *
     * @param user
     *            用户信息
     */
    void addUser(User user);

    /**
     * 用户登录账户是否已经存在
     *
     * @param account
     *            登录账户
     * @return 是否存在
     */
    boolean hasAccountExist(String account);

    /**
     * 重置密码
     *
     * @param ids
     *            主键
     * @param pwd
     *            默认密码
     */
    void resetUserPwd(List<String> ids, String pwd);

    /**
     * 更改用户启停状态
     *
     * @param id
     *            主键
     * @param status
     *            是否启用
     */
    void setUserStatus(String id, Boolean status);

    /**
     * 设置用户所属角色
     *
     * @param ids
     *            主键list
     * @param roleIds
     *            角色主键集合
     */
    void setUserRole(List<String> ids, List<String> roleIds);

    /**
     * 设置单个用户所属角色
     *
     * @param id
     *            主键
     * @param roleIds
     *            角色主键集合
     */
    void setUserRoleOne(String id, List<String> roleIds);
    
    /**
     * 设置用户所属功能权限
     *
     * @param id
     *            主键
     * @param authIds
     *            权限主键结合
     */
    void setUserAuth(String id, List<String> authIds);

    /**
     * 更改用户所属部门
     *
     * @param ids
     *            主键
     * @param orgId
     *            组织结构主键
     */
    void changeOrg(List<String> ids, String orgId);

    List<String> getUserAuth(String id);

    String getUserOrg(String id);

    List<String> getUserRole(String id);

    /**
     * 根据 代理机构uuid和部门编码查找该部门下的用户
     * @param customerId 代理机构uuid
     * @param bmdm 部门编码
     * @return List用户列表
     */
    List<User> getUsersByOrg(String customerId, String bmdm);

    /**
     * 通过customerid和bmdms查询
     * 
     * @param customerId
     *            客户uuid
     * @param bmdms
     *            部门id
     * @return 查询的user集合
     */
    List<User> getUsersByBmdm(String customerId, List<String> bmdms);

    boolean verifyPwd(String currentAccount, String originPwd);

    void updateUserPwd(String currentAccount, String newPwd);

    List<User> getUsersByRoleId(String roleId);

    /**
     * 查询最大的ygid值
     * 
     * @return 最大值
     */
    Integer selectMaxYgid();

    /**
     * 查询出该角色对应的未删除的用户
     * 
     * @param ids
     *            传入ids
     * @return 查询数目
     */
    Integer getUsersByIds(List<String> ids);

    /**
     * 通过多个roleID查询出Role姓名集合，并用，连接起来
     * 
     * @param ids
     *            传入的roleID集合
     * @return 合并后的字符串
     */
    String getRoleNames(List<String> ids);

    /**
     * 更新user表中的角色代码
     * 
     * @param ids
     *            传入useridList
     * @param roleIds
     *            传入roleid
     */
    void updateTole(List<String> ids, String roleIds);
 
    /**
     * 更新user表中的角色代码
     * 
     * @param id
     *            传入userid
     * @param roleIds
     *            传入roleid
     */
    void updateToleOne(String id, String roleIds);

    List<User> findUser(String dl);

    /**
     * 模糊查询
     * @param customerId
     *          客户编码 
     * @param bmdms
     *          部门代码
     * @param key
     *          关键字
     * @return
     *          返回用户
     */
    List<User> getUsersByBmdmLikeKey(String customerId, List<String> bmdms,
            String key);

    /**
     * 添加用户头像
     * @param id
     *          用户编号
     * @param user
     *          用户信息
     */
    void addUserHeadImg(String id, User user);
   
	 /**
     * 根据用户姓名查到用户的职员编码
     * @param xcgjr
     * @return
     */

	String findUserByname(String xcgjr);
	
	/**
     * 获取全部用户信息（具有某项权限的）
     * 
     * @param resourceId
     *            资源id
     *
     * @return 用户信息
     */
    List<User> getUsersWithAuth(String resourceId);

    /**
     * 查询有跟进权限的员工
     * @param dl
     * @return
     */
	List<User> findUserBydlByresource(String dl);

	/**
	 * 修改user的登录状态(是否为第一次登录)
	 * @param userZydm zydm
	 */
	void updateByUser(String userZydm);

	void insertUserInfoImage(UserInfoImage userInfoImage);

	List<UserInfoImage> findUserImageList(String dljgbm, String zydm, String fjlx);

    UserInfoImage findUserInfoImageById(String id);

    void deleteUserImage(String id, UserInfoImage userInfoImage);

    void updateFileDownload(String id);

    int countImageSize(String dljgbm, String zydm, String fjlx);

    /**
     * 修改上传的职员代码
     * @param zydmuuid
     * @param zydm
     */
    void updateFileInfo(String zydmuuid, String zydm);

    /**
     * 修改公司评价职员信息
     * @param dljgBm
     *          代理机构编码
     * @param zydm
     *          职员代码
     * @param name
     *          职员姓名
     * @param grtx
     *          个人头像
     */
    void updateGSPJ(String dljgBm, String zydm, String name, String grtx);
    void updateKHPJ(String dljgBm, String zydm, String name, String grtx);

    /**
     * 查询本日新增代理记账公司的数量
     * @param end 
     * @param begin 
     * @return
     */
	int findAlldlByOneDay(String begin, String end);

	/**
	 * 查询本月新增代理记账公司数量
	 * @param end 
	 * @param begin 
	 * @return
	 */
	int findAlldlByOneMonth(String begin, String end);

	/**
	 * 查询所有已审核代理记账公司数量
	 * @return
	 */
	int findAllApprovedl();

	/**
	 * 查询已审核代理记账公司占比情况
	 * @return
	 */
	List<Map<String, String>> approveProportion();

	/**
	 * 查询近一周新增客户
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String, Object>> searchCountByMonth(String begin, String end);


    /**
     * 获取一级部门的所有员工
     * @param dl
     * @param other
     * @return
     */
    List<User> getUsersByDljgBmWithOneBm(String dl, String other);
    
    
    /**
     * 根据zydm或者用户ID获取 用户账号 
     * 
     * @param ids
     *        
     * @return 
     */
    List<String> getUserAccount(List<String> ids, List<String> zydms);

    /**
     * 获取对某一客户有权限的所有的员工
     * @param zydm
     * @param dljgbm
     * @return
     */
    List<User> booleanUserZydm(String zydm, String dljgbm);

    /**
     * 通过代理机构编码与职员代码获取员工信息
     * @param dljgBm
     * @param zydm
     * @return
     */
    User findByAgencyAndEmployeeCode(String dljgBm, String zydm);

    /**
     * 查询所有作为客户主管的员工
     * @param dljgBm 代理机构编码
     * @param zydm 职员代码
     * @return List List
     */
    List<User> getAllKhzg(String dljgBm, String zydm);

    /**
     * 根据代理机构编码获取当前代理机构的管理员信息
     * @param dljgBm
     * @return
     */
    User getMananger(String dljgBm);
}
