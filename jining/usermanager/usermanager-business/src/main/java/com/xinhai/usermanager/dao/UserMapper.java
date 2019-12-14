package com.xinhai.usermanager.dao;


import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.entity.UserInfoImage;

import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by fanxi on 2016-4-26.
 * @author 李茂飞修改
 */
public interface UserMapper {
    
    /**
     * 获取用户信息
     *
     * @param id
     *            主键
     * @return 用户信息
     */
    User getUser(@Param("id") String id);
    
    /**
     * 获取用户信息
     *
     * @param ygid
     *            员工id
     * @return 用户信息
     */
    User getUserByYgid(@Param("ygid") String ygid);

    User getUserByCustomerId(String customerId);

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
     * 获取具有某个资源节点的全部role
     * 
     * @param resourceId
     *            资源id
     * @return 用户信息
     */
    List<String> getRolesByResourceId1(@Param("resourceId") String resourceId);
    
    /**
     * 获取具有某个资源节点的全部user
     * 
     * @param roleId
     *            资源id
     * @param dljgBm
     *            代理机构编码     
     * @return 用户信息
     */
    List<String> getRolesByResourceId2(@Param("roleId") String roleId, @Param("dljgBm") String dljgBm);
    
    /**
     * 获取全部有权限的 用户
     * @param resourceId
     * @param dljgBm
     * @return
     */
    List<Map<String,String>>getUsersByResourceAllId(@Param("resourceId") String resourceId,@Param("dljgBm") String dljgBm);
    
    
    /**
     * 获取用户信息
     *
     * @param zydm
     *            职员代码
     * @return 用户信息
     */
    User getUserByZydm(@Param("zydm") String zydm);
    
    /**
     * 获取全部用户信息
     * 
     * @param dljgBm
     *            代理机构编码
     *
     * @return 用户信息
     */
    List<User> getUsersByDljgBm(@Param("dljgBm") String dljgBm);

    /**
     * 更新密码
     * @param yhzh 账号
     * @param yhmm 密码
     */
    void updateUserPassword(@Param("yhzh") String yhzh, @Param("yhmm") String yhmm);
    
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
     */
    void deleteList(@Param("ids") List<String> ids, @Param("scry") String scry);
    
    /**
     * 恢复用户
     *
     * @param ids
     *            主键
     */
    void revertList(@Param("ids") List<String> ids);

    /**
     * 根据主键修改用户信息
     * 
     * @param user
     *            用户id
     * @param id
     *            主键
     */
    
    void updateUser(@Param("id") String id, @Param("user") User user);

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
     *            登陆账户
     * @return 是否存在
     */
    Integer hasAccountExist(String account);

    /**
     * 重置密码
     *
     * @param ids
     *            主键
     * @param pwd
     *            默认密码
     */
    void resetUserPwd(@Param("ids") List<String> ids, @Param("pwd") String pwd);

    /**
     * 更改用户启停状态
     *
     * @param id
     *            主键
     * @param status
     *            是否启用
     */
    void setUserStatus(@Param("id") String id, @Param("status") Boolean status);

    /**
     * 删除用户所属角色
     * @param ids 主键List
     */
    void deleteUserRole(@Param("ids") List<String> ids);

    /**
     * 删除用户所属角色
     * @param id 主键
     */
    void deleteUserRoleOne(@Param("id") String id);
    
    /**
     * 删除用户派工角色
     * @param ids 主键
     */
    void deleteKhRoleOne(@Param("ids") List<String> ids);
    
    /**
     * 设置用户所属角色
     *
     * @param id
     *            主键
     * @param roleIds
     *            角色主键集合
     */
   void setUserRole(@Param("id") String id,
            @Param("roleIds") List<String> roleIds);
   
   
    void setUserRole2(@Param("ids") List<String> id,
            @Param("roleId") String roleId);

    /**
     * 删除用户所属功能权限
     * @param id 主键
     */
    void deleteUserAuth(@Param("id") String id);

    /**
     * 设置用户所属功能权限
     *
     * @param id
     *            主键
     * @param authIds
     *            权限主键结合
     */
    void setUserAuth(@Param("id") String id,
            @Param("authIds") List<String> authIds);

    List<String> getUserAuth(String id);

    /**
     * 更改用户所属部门
     *
     * @param ids
     *            主键
     * @param orgId
     *            组织结构主键
     */
    void changeOrg(@Param("ids") List<String> ids, @Param("orgId") String orgId);

    String getUserOrg(String id);

    List<String> getUserRole(String id);

    /**
     * 根据 代理机构uuid和部门编码查找该部门下的用户
     * @param customerId 代理机构uuid
     * @param bmdm 部门编码
     * @return List用户列表
     */
    List<User> getUsersByOrg(@Param("customerId") String customerId, @Param("bmdm") String bmdm);

    /**
     * 查询出该角色对应的未删除的用户
     * 
     * @param ids
     *            传入ids
     * @return 查询数目
     */
    Integer getUsersByIds(@Param("ids") List<String> ids);

    /**
     * 通过customerid和bmdms查询
     * 
     * @param customerId
     *            客户uuid
     * @param bmdms
     *            部门id
     * @return 查询的user集合
     */
    List<User> getUsersByBmdm(@Param("customerId") String customerId,
            @Param("bmdms") List<String> bmdms);
    
    /**
     * 通过customerid和bmdms查询
     * 
     * @param customerId
     *            客户uuid
     * @return 查询的user集合
     */
    List<User> getUsersByBmdmAndSearChText(@Param("dljgBm") String customerId, @Param("zydm") String zydm, @Param("searchText") String searchText,
            @Param("ygssbm") String ygssbm, @Param("ygssjs") String ygssjs, @Param("createTime") Date createTime);
            //@Param("bmdms") List<String> bmdms,

    /**
     * 通过customerid和bmdms查询已经删除的
     * 
     * @param customerId
     *            客户uuid
     * @param zydm
     *            zydm
     * @param searchText searchText
     * @param ygssbm
     *            ygssbm
     * @return 查询的user集合
     */
    List<User> getUsersByBmdmDel(@Param("dljgBm") String customerId, @Param("zydm") String zydm, @Param("searchText") String searchText,
            @Param("ygssbm") String ygssbm, @Param("ygssjs") String ygssjs, @Param("createTime") Date createTime);
            //@Param("bmdms") List<String> bmdms, 
    
    /**
     * 通过customerid和bmdms查询
     * 
     * @param customerId
     *            客户uuid
     * @return 查询的user集合
     */
    List<User> getUsersDel(@Param("customerId") String customerId);

    /**
     * 根据登陆账户获取用户信息
     *
     * @param userAccount
     *            登陆账户
     * @return 用户信息
     */
    User getUserByAccount(String userAccount);

    Integer verifyPwd(@Param("currentAccount") String currentAccount,
            @Param("originPwd") String originPwd);

    /**
     * 查询最大的ygid值
     * @return 最大值
     */
    Integer selectMaxYgid();

    void updateUserPwd(@Param("currentAccount") String currentAccount,
            @Param("newPwd") String newPwd);

    List<User> getUsersByRoleId(String roleId);

    /**
     * 通过多个roleID查询出Role姓名集合，并用，连接起来
     * 
     * @param ids
     *            传入的roleID集合
     * @return 合并后的字符串
     */
    String getRoleNames(@Param("ids") List<String> ids);

    /**
     * 更新user表中的角色代码
     * 
     * @param ids
     *            传入userid
     * @param roleIds
     *            传入roleid
     */
    void updateTole(@Param("ids") List<String> ids,
            @Param("roleIds") String roleIds);

    
    /**
     * 更新user表中的单个角色代码
     * 
     * @param id
     *            传入userid
     * @param roleIds
     *            传入roleid
     */
    void updateToleOne(@Param("id") String id,
            @Param("roleIds") String roleIds);
    
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
    List<User> getUsersByBmdmLikeKey(@Param("customerId") String customerId, @Param("bmdms") List<String> bmdms,
            @Param("key") String key);
    
    /**
     * 添加用户头像
     * @param id
     *          用户编号
     * @param user
     *          用户信息
     */
    void addUserHeadImg(@Param("id") String id, @Param("user") User user);
    
    /**
     * 通过用户名查到用户编码
     * @param xcgjr
     * @return String
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
	 * 判断用户是否第一次登录
	 * @param userZydm
	 */
	void updateByUser(String userZydm);

	void insertUserInfoImage(@Param("userInfoImage") UserInfoImage userInfoImage);

	List<UserInfoImage> findUserImageList(@Param("dljgbm") String dljgbm,
                                          @Param("zydm") String zydm,
                                          @Param("fjlx") String fjlx);

    UserInfoImage findUserInfoImageById(@Param("id") String id);

    void deleteUserImage(@Param("id") String id, @Param("userInfoImage") UserInfoImage userInfoImage);

    void updateFileDownload(@Param("id") String id);

    int countImageSize(@Param("dljgbm") String dljgbm,
                       @Param("zydm") String zydm,
                       @Param("fjlx") String fjlx);
    
    /**
     * 修改上传的职员代码
     * @param zydmuuid
     * @param zydm
     */
    void updateFileInfo(@Param("zydmuuid") String zydmuuid, @Param("zydm") String zydm);
    
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
    void updateGSPJ(@Param("dljgBm") String dljgBm, @Param("zydm") String zydm, @Param("name") String name, @Param("grtx") String grtx);
    void updateKHPJ(@Param("dljgBm") String dljgBm, @Param("zydm") String zydm, @Param("name") String name, @Param("grtx") String grtx);

    /**
     * 查询本日新增代理记账公司的数量
     * @param end 
     * @param begin 
     * @return
     */
	int findAlldlByOneDay(@Param("begin")String begin, @Param("end")String end);

	/**
	 * 查询本月新增代理记账公司数量
	 * @param end 
	 * @param begin 
	 * @return
	 */
	int findAlldlByOneMonth(@Param("begin")String begin, @Param("end")String end);

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
	 * 查询近一周新增客户的数量
	 * @param begin
	 * @param end
	 * @return
	 */
	List<Map<String, Object>> searchCountByMonth(@Param("begin")String begin, @Param("end")String end);
	
	/**
	 * 只查找具有本人权限的数据
	 * @param searchText
	 * @param zydm
	 * @return
	 */
	List<User> findOnlySelf(@Param("searchText") String searchText, @Param("zydm") String zydm);
	
	/**
     * 员工360展示员工信息
     * 
     * @param dljgBm
     *            客户id
     *
     * @return 用户信息
     */
    List<User> getAllUsers(@Param("dljgBm") String dljgBm, @Param("zydm") String zydm);

    /**
     * 员工360使用(平台管理员)
     * @param dljgBm
     * @return
     */
    List<User> getAllUsersByPt(@Param("dljgBm") String dljgBm);
    
    /**
     * 批量更新职员姓名
     * @param zydm
     * @param zymc
     */
    void changName(@Param("zydm") String zydm, @Param("zymc") String zymc);
    
    /**
     * 根据员工id查出员工职员代码
     * 
     * @param ids
     *            传入ids
     * @return 查询数目
     */
    List<String> getZydmsByIds(@Param("ids") List<String> ids);

    /**
     * 获取一级部门下的所有员工
     *
     * @param dl
     * @param other
     * @return
     */
    List<User> getUsersByDljgBmWithOneBm(@Param("dl") String dl,@Param("other") String other);
    
    /**
     * 查询该机构所有的人员所在部门
     * 
     * @param dljgBm
     *            客户id
     *
     * @return 用户信息
     */
    List<User> getAllZydmBm(@Param("dljgBm") String dljgBm);
    
    /**
     * 查询该机构所有的人员所属角色
     * 
     * @param dljgBm
     *            客户id
     *
     * @return 用户信息
     */
    List<User> getAllZydmJs(@Param("dljgBm") String dljgBm);

    /**
     * 根据账号查询人员手机号
     * @param account 账号
     * @return 手机号
     */
    List<Map> getPhone(@Param("account") String account);
    
    /**
     * 根据zydm或者用户ID获取 用户账号 
     * 
     * @param ids
     *        
     * @return 
     */
    List<String> getUserAccount(@Param("ids") List<String> ids,@Param("zydms") List<String> zydms);

    /**
     *
     * @param zydm
     * @param dljgbm
     * @return
     */
    List<User> booleanUserZydm(@Param("zydm") String zydm, @Param("dl") String dljgbm);

    /**
     * 通过代理机构编码与职员代码获取员工信息
     * @param dljgBm
     * @param zydm
     * @return
     */
    User findByAgencyAndEmployeeCode(@Param("dl") String dljgBm,@Param("zydm") String zydm);

    /**
     * 查询所有作为客户主管的员工
     * @param dljgBm 代理机构编码
     * @param zydm 职员代码
     * @return List List
     */
    List<User> getAllKhzg(@Param("dljgBm") String dljgBm, @Param("zydm") String zydm);

    /**
     * 根据老账号修改新账号
     * @param newZh
     * @param oldZh
     */
    void updateZh(@Param("newZh") String newZh, @Param("oldZh") String oldZh);

    List<User> getZyByBmdm(@Param("bmdm") String bmdm);

    /**
     * 根据代理机构编码获取当前代理机构的管理员信息
     * @param dljgBm
     * @return
     */
    User getMananger(String dljgBm);
}
