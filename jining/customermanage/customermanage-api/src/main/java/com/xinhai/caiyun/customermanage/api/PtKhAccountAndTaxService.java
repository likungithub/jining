package com.xinhai.caiyun.customermanage.api;

import java.util.List;

import org.springframework.stereotype.Service;

public interface PtKhAccountAndTaxService {

    PtKhAccountAndTax findPtKhAccountAndTax(java.lang.Long id);

    void createPtKhAccountAndTax(PtKhAccountAndTax ptkhxx);

    /**
     * 根据id更新数据
     * @param id 条件
     * @param ptkhxx 传入参数
     */
    void updatePtKhAccountAndTax(java.lang.Long id, PtKhAccountAndTax ptkhxx);

    /**
     * 删除记账表相同所属年月，相同客户编码的重复数据
     * @param ssny
     * @param list
     */
    void deleteJZPtKhAccountAndTax(String ssny, List<PtKhAccountAndTax> list);
    
    /**
     * 删除报税表相同所属年月，相同客户编码的重复数据
     * @param ssny
     * @param list
     */
    void deleteBSPtKhAccountAndTax(String ssny, List<PtKhAccountAndTax> list);
    
    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertJZList(List<PtKhAccountAndTax> list);
    
    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertBSList(List<PtKhAccountAndTax> list);
    
    /**
     * 通过纳税人识别号获取一个PtKhAccountAndTax数据
     * 
     * @param nsrsbh
     *            传入的纳税人识别号
     * @return 一条数据
     */
    PtKhAccountAndTax getInformation(String nsrsbh);

    /**
     * 根据客户编码获取
     * @param khbm
     *          客户编码
     * @return
     */
    PtKhAccountAndTax findCustomerByKhbm(String khbm);
    
}
