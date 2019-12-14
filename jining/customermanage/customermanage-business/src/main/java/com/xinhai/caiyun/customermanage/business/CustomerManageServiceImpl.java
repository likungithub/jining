package com.xinhai.caiyun.customermanage.business;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.xinhai.caiyun.customermanage.api.CompanyInfoImage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.CustomerManage;
import com.xinhai.caiyun.customermanage.api.CustomerManageService;
import com.xinhai.caiyun.customermanage.dao.CustomerManageMapper;
import com.xinhai.customer.api.Customer;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;


/**
 * @author 李茂飞
 *
 * @version
 */
@Repository
public class CustomerManageServiceImpl implements CustomerManageService {
    
    /**
     * 定义mapper
     */
    @Autowired
    private CustomerManageMapper customerMapper;
    
    /**
     * 插入操作实现
     * @param customer 插入内容
     */
    public void createCustomer(CustomerManage customer) {
    	customerMapper.createCustomer(customer);
    }
    
    /**
     * 根据id更新操作实现
     * @param yhid 用户id
     * @param customer 插入内容
     */
    public void updateCustomer(java.lang.Long yhid, CustomerManage customer) {
    	customerMapper.updateCustomer(yhid, customer);
    }
    
    /**
     * 批量删除操作实现
     * @param yhids 用户id
     */
    public void deleteCustomer(List<java.lang.Long> yhids) {
    	customerMapper.deleteCustomerList(yhids);
    }
    
    /**
     * 根据id删除操作
     * @param yhid 用户id
     */
    public void deleteCustomer(java.lang.Long yhid) {
    	customerMapper.deleteCustomer(yhid);
    }
    
    /**
     * 查询所有数据实现
     * @return list集合
     */
    public List<CustomerManage> getSearchCustomerList(Date starDate, Date endDate, String jd) {
        return customerMapper.getSearchCustomerList(starDate, endDate, jd);
    }
    
    /**
     * 查询所有数据实现
     * @return list集合
     */
    public List<CustomerManage> findAllCustomer() {
    	return customerMapper.getCustomerList();
    }


    @Override
    public List<Map> query(Map sql) {
        return customerMapper.query(sql);
    }

    @Override
    public void update(Map sql) {
        customerMapper.update(sql);
    }

    @Override
    public void shyyzz(Map tj) {
        customerMapper.shyyzz(tj);
    }

    /**
     * 根据id查询操作
     * @param yhid 用户id
     * @return Customer 返回单个数据
     */
    public CustomerManage findCustomer(java.lang.Long yhid) {
    	CustomerManage customer = customerMapper.getCustomer(yhid);
    	return customer;
    }

    @Override
    public void addLogo(String code, Customer customer) {
        customerMapper.addLogo(code, customer);
    }

    @Override
    public void insertCompanyInfoImage(CompanyInfoImage companyInfoImage) {
        customerMapper.insertCompanyInfoImage(companyInfoImage);
    }

    @Override
    public List<CompanyInfoImage> findCompanyImageList(String dljg_bm, String fjlx) {
        return customerMapper.findCompanyImageList(dljg_bm, fjlx);
    }

    @Override
    public CompanyInfoImage findCompanyInfoImageById(String id) {
        return customerMapper.findCompanyInfoImageById(id);
    }

    @Override
    public void deleteCompanyImage(String id, CompanyInfoImage companyInfoImage) {
        customerMapper.deleteCompanyImage(id, companyInfoImage);
    }

    @Override
    public void updateFileDownload(String id) {
        customerMapper.updateFileDownload(id);
    }

    @Override
    public int countImageSize(String dljg_bm, String fjlx) {
        return customerMapper.countImageSize(dljg_bm, fjlx);
    }
    
    /**
     * 根据id获取代理机构数据
     * @param id id
     * @return CustomerManage 代理机构数据
     */
    public CustomerManage selectCustomerById(String id) {
        return customerMapper.selectCustomerById(id);
    }
    
    /**
     * 根据dljgbm和附件类型获取对应附件数目
     * @param dljg_bm 代理机构编码
     * @param fjlx 附件类型
     * @return int 附件数目
     */
    public int getFJNum(String dljg_bm, String fjlx) {
        return customerMapper.getFJNum(dljg_bm, fjlx);
    }

    /**
     * 根据代理机构编码获得代理机构数据
     */
    @Override
    public CustomerManage getCustomerByUser(String dljgbm) {
        CustomerManage c = customerMapper.getCustomerByUser(dljgbm);
        c.setYyzzNum(customerMapper.getFJNum(c.getCode(), "001")); //营业执照数目
        c.setQyzzNum(customerMapper.getFJNum(c.getCode(), "002")); //企业资质数目
        c.setQyyjNum(customerMapper.getFJNum(c.getCode(), "003")); //企业业绩数目
        return c;
    }

    @Override
    public void updateUsers(List<String> yhids, User user) {
        customerMapper.updateUsers(yhids, user);
    }

    @Override
    public void updateSh(List<String> yhids, CustomerManage Customer) {
        customerMapper.updateSh(yhids, Customer);
        
    }

    /**
     * 根据yhid更新
     */
    @Override
    public void updateCustomerByYhid(CustomerManage customer) {
        customerMapper.updateCustomerByYhid(customer);
        //更新user表
        customerMapper.updateUserByYhid(customer.getEmail(), customer.getSjhm(), CurrentLoginUser.getId());
        
    }
    
    /**
     * 判断账号是否存在.
     *
     * @param zh 账号
     * @return true/false
     */
    @Override
    public Boolean hasExistByZh(String zh) {
        int a = customerMapper.hasExistByZh(zh);
        return a > 0;
    }
    
    @Override
    public CustomerManage getCustomerById(String id) {
        return customerMapper.getCustomerById(id);
    }
    @Override
    public long findAllSize(Date ssDate, Date seDate, Date zsDate,
            Date zeDate, String khbm) {
        return customerMapper.findAllSize(ssDate,seDate,zsDate,zeDate,khbm);
    }

    @Override
    public List<CustomerManage> getAgentByPage(int start, int length,
            Date ssDate, Date seDate, Date zsDate, Date zeDate, String khbm) {
        return customerMapper.getAgentByPage(start, length, ssDate, seDate, zsDate, zeDate, khbm);
    }

    @Override
    public long findAllCustomerSize() {
        return customerMapper.findAllCustomerSize();
    }

    @Override
    public long findTodayCustomerSize(Date sDate, Date eDate) {
        return customerMapper.findTodayCustomerSize(sDate,eDate);
    }

    @Override
    public long findAllArrears(String khbm, Date ssDate, Date seDate) {
        return customerMapper.findAllArrears(khbm, ssDate, seDate);
    }

    @Override
    public List<CustomerManage> getArrearsByPage(int start, int length,
            String khbm, Date ssDate, Date seDate) {
        return customerMapper.getArrearsByPage(start, length, khbm, ssDate, seDate);
    }

    @Override
    public long findTryoutSize() {
        return customerMapper.findTryoutSize();
    }

    @Override
    public long findAllTryoutSize(Date ssDate, Date seDate, Date zsDate,
            Date zeDate, String khbm) {
        return customerMapper.findAllTryoutSize(ssDate, seDate, zsDate, zeDate, khbm);
    }

    @Override
    public List<CustomerManage> getTryoutByPage(int start, int length,
            Date ssDate, Date seDate, Date zsDate, Date zeDate, String khbm) {
        return customerMapper.getTryoutByPage(start, length, ssDate, seDate, zsDate, zeDate, khbm);
    }

    @Override
    public long findPayCustomerSize() {
        return customerMapper.findPayCustomerSize();
    }

    @Override
    public long findWshSize() {
        return customerMapper.findWshSize();
    }
}
