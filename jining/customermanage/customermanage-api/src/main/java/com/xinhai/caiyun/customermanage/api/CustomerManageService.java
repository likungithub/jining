package com.xinhai.caiyun.customermanage.api;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.xinhai.customer.api.Customer;
import com.xinhai.usermanager.entity.User;

/**
 * 对代理记账公司的客户管理信息的接口操作
 * @author 李茂飞
 *
 */
public interface CustomerManageService {



    /**
     * @Author: shanliang
     * @Description:执行sql返回查询的列表
     * @Date:2017-11-28 14:13
     **/
    List<Map> query(Map sql);


    /**
     * @Author: shanliang
     * @Description:执行更新语句
     * @Date:2017-11-28 14:14
     **/
    void update(Map sql);


    //审核营业执照
    void shyyzz(Map tj);

    /**
     * 根据用户id查询单个数据
     * @param yhid 用户id
     * @return 返回单个数据
     */
    CustomerManage findCustomer(java.lang.Long yhid);
    
    /**
     * 根据id查询单个数据
     * @param id id
     * @return 返回单个数据
     */
    CustomerManage selectCustomerById(String id);
    
    /**
     * 根据代理机构编码查询代理机构数据
     * @param dljgbm dljgbm
     * @return 返回单个数据
     */
    CustomerManage getCustomerByUser(String dljgbm);
    
    /**
     * 根据dljgbm和附件类型获取对应附件数目
     * @param nsrsbh 纳税人识别号
     * @param fjlx 附件类型
     * @return int 附件数目
     */
    int getFJNum(String dljg_bm, String fjlx);

    /**
     * 插入操作
     * @param customer 插入内容
     */
    void createCustomer(CustomerManage customer);
    
    /**
     * 查询所有数据实现
     * @return list集合
     */
    List<CustomerManage> getSearchCustomerList(Date starDate, Date endDate, String jd);
    
    /**
     * 根据id更新操作
     * @param yhid 用户id
     * @param customer 插入内容
     */
    void updateCustomer(java.lang.Long yhid, CustomerManage customer);
    
    /**
     * 审核通过更新员工列表信息
     * @param yhids 员工id
     * @param user 信息
     */
    void updateUsers(List<String> yhids, User user);
    
    /**
     * 根据yhid更新
     * @param customer
     */
    void updateCustomerByYhid(CustomerManage customer);
    
    /**
     * 审核通过更新代理机构信息
     * @param yhids 员工id
     * @param Customer 信息
     */
    void updateSh(List<String> yhids, CustomerManage Customer);
    
    /**
     * 根据id删除操作
     * @param yhid 用户id
     */
    void deleteCustomer(java.lang.Long yhid);
    
    /**
     * 批量删除操作
     * @param yhids 用户id
     */
    void deleteCustomer(List<java.lang.Long> yhids);
    
    /**
     * 查询所有数据
     * @return list集合
     */
    List<CustomerManage> findAllCustomer();

    /**
     * 添加公司logo
     * @param code
     *          代理记账公司代码
     * @param customer
     *          公司对象
     */
    void addLogo(String code, Customer customer);

    void insertCompanyInfoImage(CompanyInfoImage companyInfoImage);

    List<CompanyInfoImage> findCompanyImageList(String dljg_bm, String fjlx);

    CompanyInfoImage findCompanyInfoImageById(String id);

    void deleteCompanyImage(String id, CompanyInfoImage companyInfoImage);

    void updateFileDownload(String id);

    int countImageSize(String dljg_bm, String fjlx);
    
    /**
     * 判断账号是否存在.
     *
     * @param zh 账号
     * @return true/false
     */
    Boolean hasExistByZh(String zh);
    
    CustomerManage getCustomerById(String id);
    
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
     * @param txtorgName
     *          审核状态
     * @param khbm
     *          纳税人识别号、姓名
     * @return
     */
    long findAllSize(Date ssDate, Date seDate, Date zsDate, Date zeDate, String khbm);

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
     * @param txtorgName
     *          审核状态
     * @param khbm
     *          纳税人识别号，姓名
     * @return
     */
    List<CustomerManage> getAgentByPage(int start, int length,
            Date ssDate, Date seDate, Date zsDate, Date zeDate, String khbm);

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
    long findTodayCustomerSize(Date sDate, Date eDate);

    /**
     * 查询出所有欠费代理机构
     * @param khbm
     *          客户名称
     * @return
     */
    long findAllArrears(String khbm, Date ssDate, Date seDate);

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
    List<CustomerManage> getArrearsByPage(int start, int length, String khbm, Date ssDate, Date seDate);

    /**
     * 获取到今天的所有到期试用代理
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
     * @param txtorgName
     *              状态
     * @param khbm
     *              名称
     * @return
     */
    long findAllTryoutSize(Date ssDate, Date seDate, Date zsDate, Date zeDate, String khbm);

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
     * @param txtorgName
     *              催费状态
     * @param khbm
     *              名称
     * @return
     */
    List<CustomerManage> getTryoutByPage(int start, int length,
            Date ssDate, Date seDate, Date zsDate, Date zeDate, String khbm);

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
}

