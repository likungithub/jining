package com.xinhai.caiyun.customermanage.api;

import java.util.List;

/**
 * 应用接口
 * @author Administrator
 *
 */
public interface PtSwtxService {
  
    
    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertList(List<PtSwtx> list);

    /**
     * 根据当前的代理机构编码查找
     * 
     * @param dljg_bm 代理机构编码
     * @param nsrsbh
     *            传入的纳税人识别号
     * @return 客户列表
     */
    List<PtSwtx> findAllPtSwtx(String dljg_bm, String nsrsbh);

    /**
     * 通过纳税人识别号获取一个PtSwtx数据
     * 
     * @param nsrsbh
     *            传入的纳税人识别号
     * @return 一条数据
     */
    PtSwtx getInformation(String nsrsbh);

    /**
     * 根据id跟新客户服务状态
     * 
     * @param id
     *            传入id
     */
    void updateFw(java.lang.Long id);

    /**
     * 根据客户编码获取
     * @param khbm 客户编码
     * @return 一条信息
     */
    List<PtSwtx> findCustomerByKhbm(String khbm);
    
    /**
     * 根据客户编码删除
     * @param khbm 客户编码
     */
    void delByKhbm(String khbm);
    
    /**
     * 根据id查找一条客户
     * @param id 主键
     * @return 一条信息
     */
    PtSwtx findPtSwtxById(java.lang.Long id);
    
    /**
     * 根据id更新客户
     * @param ptSwtx 更新内容
     */
    void updatePtSwtxById(PtSwtx ptSwtx);
}
