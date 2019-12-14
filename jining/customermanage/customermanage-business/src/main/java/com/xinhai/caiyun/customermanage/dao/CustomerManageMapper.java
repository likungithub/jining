package com.xinhai.caiyun.customermanage.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.xinhai.caiyun.customermanage.api.CompanyInfoImage;

import org.apache.ibatis.annotations.Param;

import com.xinhai.caiyun.customermanage.api.CustomerManage;
import com.xinhai.customer.api.Customer;
import com.xinhai.usermanager.entity.User;

/**
 * Mapper接口
 * @author 李茂飞
 *
 * @version
 */
public interface CustomerManageMapper {


    /**
     * @Author: shanliang
     * @Description:执行sql返回查询的列表
     * @Date:2017-11-28 14:13
     **/
    List<Map> query(@Param("str") Map sql);


    /**
     * @Author: shanliang
     * @Description:执行更新语句
     * @Date:2017-11-28 14:14
     **/
    void update(@Param("str") Map sql);


    //审核营业执照
    void shyyzz(@Param("tj") Map tj);

    /**
     * 插入操作
     * @param customer 插入内容
     */
    void createCustomer(CustomerManage customer);
    
     /**
     * 根据id更新操作
     * @param yhid 用户id
     * @param customer 插入内容
     */
    void updateCustomer(@Param("id") java.lang.Long yhid, @Param("customer") CustomerManage customer);
    
    /**
     * 审核通过更新员工列表信息
     * @param yhids 员工id
     * @param user 信息
     */
    void updateUsers(@Param("yhids") List<String> yhids, @Param("user") User user);
    
    /**
     * 审核通过更新代理机构信息
     * @param yhids 员工id
     * @param Customer 信息
     */
    void updateSh(@Param("ids") List<String> yhids, @Param("customer") CustomerManage Customer);
    
    /**
     * 批量删除操作
     * @param yhid 用户id
     */
    void deleteCustomerList(List<java.lang.Long> yhid);
    
    /**
     * 根据id删除
     * @param id
     */
    void deleteSHCustomer(String id);
    
    /**
     * 查询所有数据
     * @return list集合
     */
    List<CustomerManage> getSearchCustomerList(@Param("starDate") Date starDate, @Param("endDate") Date endDate, @Param("jd") String jd);
    
    /**
     * 根据id删除
     * @param yhid
     */
    void deleteSHUser(java.lang.Long yhid);
    
    /**
     * 根据id删除操作
     * @param yhid 用户id
     */
    void deleteCustomer(java.lang.Long yhid);
    
    /**
     * 根据id获取单条数据
     * @param yhid 用户id
     * @return 单个数据
     */
    CustomerManage getCustomer(java.lang.Long yhid);
    
    /**
     * 查询所有数据
     * @return list集合
     */
    List<CustomerManage> getCustomerList();
    
    /**
     * 通过kyyword查询集合
     * @param keyword
     * @return list集合
     */
    List<CustomerManage> getCustomerListByKeyword(@Param("keyword") String keyword);
    
    /**
     * 查询所有数据
     * @return list集合
     */
    List<CustomerManage> getCustomerAll();
    
    /**
     * 根据id获取代理机构数据
     * @param id id
     * @return CustomerManage 代理机构数据
     */
    CustomerManage selectCustomerById(@Param("id") String id);
    
    /**
     * 根据id获取代理机构数据
     * @param id id
     * @return CustomerManage 代理机构数据
     */
    CustomerManage selectCustomerByYhid(@Param("id") String id);
    
    /**
     * 根据代理机构编码查询代理机构数据
     * @param dljgbm dljgbm
     * @return 返回单个数据
     */
    CustomerManage getCustomerByUser(@Param("dljgbm") String dljgbm);
	
    /**
     * 根据dljgbm和附件类型获取对应附件数目
     * @param fjlx 附件类型
     * @return int 附件数目
     */
    int getFJNum(@Param("dljg_bm") String dljg_bm, @Param("fjlx") String fjlx);
    
    /**
     * 检查代理机构的公司名称数量
     * @param gsmc
     * @return
     */
    int getNameExist(@Param("gsmc") String gsmc);
    
    /**
     * 添加公司logo
     * @param code
     *          代理记账公司代码
     * @param customer
     *          公司对象
     */
    void addLogo(@Param("code") String code, @Param("customer") Customer customer);
    
    void addLogo(@Param("code") String code, @Param("logo") String logo);

    void insertCompanyInfoImage(@Param("companyInfoImage")CompanyInfoImage companyInfoImage);

    List<CompanyInfoImage> findCompanyImageList(@Param("dljg_bm") String dljg_bm,@Param("fjlx") String fjlx);

     CompanyInfoImage findCompanyInfoImageById(@Param("id") String id);

     void deleteCompanyImage(@Param("id") String id, @Param("companyInfoImage") CompanyInfoImage companyInfoImage);

     void updateFileDownload(@Param("id") String id);

     int countImageSize(@Param("dljg_bm") String dljg_bm,@Param("fjlx") String fjlx);
     
     /**
      * 根据yhid更新
      * @param customer 更新内容
      */
     void  updateCustomerByYhid(CustomerManage customer);
     
     /**
      * user表更新
      * @param email 邮箱
      * @param sjhm  手机
      * @param userId id
      */
     void  updateUserByYhid(@Param("email") String email, @Param("sjhm") String sjhm, @Param("userId") String userId);
     
     /**
      * 判断账号是否存在.
      *
      * @param zh 账号
      * @return true/false
      */
     Integer hasExistByZh(@Param("zh") String zh);
     
     CustomerManage getCustomerById(@Param("id") String id);
    /**
     * 按照条件查询出所有客户信息
     * @param ssDate
     *          审核开始时间
     * @param seDate
     *          审核结束时间
     * @param zsDate
     *          注册开始时间
     * @param zeDate
     *          注册结束时间
     * @param khbm
     *          纳税人识别号、姓名
     * @return
     */
    long findAllSize(@Param("ssDate") Date ssDate, @Param("seDate") Date seDate, @Param("zsDate") Date zsDate,
            @Param("zeDate") Date zeDate, @Param("khbm") String khbm);
    
    /**
     * 分页查询客户信息
     * @param start
     *          开始数
     * @param length
     *          每页数
     * @param ssDate
     *          审核开始时间
     * @param seDate
     *          审核结束时间
     * @param zsDate
     *          注册开始时间
     * @param zeDate
     *          注册结束时间
     * @param khbm
     *          纳税人识别号，姓名
     * @return
     */
    List<CustomerManage> getAgentByPage(@Param("start") int start,@Param("length") int length,
            @Param("ssDate") Date ssDate, @Param("seDate") Date seDate, @Param("zsDate") Date zsDate,
            @Param("zeDate") Date zeDate, @Param("khbm") String khbm);
    
    /**
     * 查询出所有的代理机构
     * @return
     */
    long findAllCustomerSize();
    
    /**
     * 查询出今天通过审核的代理记账公司
     * @param sDate
     *              开始时间
     * @param eDate
     *              结束时间
     * @return
     */
    long findTodayCustomerSize(@Param("sDate") Date sDate, @Param("eDate") Date eDate);
    
    /**
     * 查询出所有欠费代理机构
     * @param khbm
     *          客户名称
     * @return
     */
    long findAllArrears(@Param("khbm") String khbm, @Param("ssDate") Date ssDate, @Param("seDate") Date seDate);
    
    /**
     * 分页获取欠费代理机构信息
     * @param start
     *          开始条数
     * @param length
     *          每页条数
     * @param khbm
     *          客户名
     * @return
     */
    List<CustomerManage> getArrearsByPage(@Param("start") int start, @Param("length") int length, @Param("khbm") String khbm, @Param("ssDate") Date ssDate, @Param("seDate") Date seDate);
    
    /**
     * 获取今天的到期试用代理
     * @return
     */
    long findTryoutSize();
    
    /**
     * 查询出所有到期试用数量
     * @param ssDate
     *              审核开始时间
     * @param seDate
     *              审核结束时间
     * @param zsDate
     *              注册开始时间
     * @param zeDate
     *              注册结束时间
     * @param khbm
     *              名称
     * @return
     */
    long findAllTryoutSize(@Param("ssDate") Date ssDate, @Param("seDate") Date seDate, @Param("zsDate") Date zsDate,
            @Param("zeDate") Date zeDate, @Param("khbm") String khbm);
    
    /**
     * 获取所有快到期的试用客户数量
     * @param start
     *              开始条数
     * @param length
     *              每页条数
     * @param ssDate
     *              审核开始时间
     * @param seDate
     *              审核结束时间
     * @param zsDate
     *              注册开始时间
     * @param zeDate
     *              注册结束时间
     * @param khbm
     *              名称
     * @return
     */
    List<CustomerManage> getTryoutByPage(@Param("start") int start, @Param("length") int length,
            @Param("ssDate") Date ssDate, @Param("seDate") Date seDate, @Param("zsDate") Date zsDate,
            @Param("zeDate") Date zeDate, @Param("khbm") String khbm);
    
    /**
     * 获取所有正式用户数量
     * @return
     */
    long findPayCustomerSize();
    
    /**
     * 获取所有未审核客户数量
     * @return
     */
    long findWshSize();
    
    /**
     * 更新终审状态
     * @param customer
     */
    void zssh(@Param("tj") CustomerManage customer);
    
    /**
     * 审核界面详情页中的修改
     * @param yhids 员工id
     * @param Customer 信息
     */
    void updateBzxx(@Param("ids") List<String> yhids, @Param("customer") CustomerManage Customer);
    
    /**
     * 撤回终审状态
     * @param customer
     */
    void zscx(@Param("tj") CustomerManage customer);

    /**
     * 通过过程批量删除
     * @param customer_id
     */
    void delDL(@Param("customer_id") String customer_id);
}