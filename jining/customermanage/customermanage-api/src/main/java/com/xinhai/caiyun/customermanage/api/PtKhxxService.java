package com.xinhai.caiyun.customermanage.api;

import java.util.List;

import org.springframework.stereotype.Service;

public interface PtKhxxService {

    PtKhxx findPtKhxx(Long id);

    void createPtKhxx(PtKhxx ptkhxx);

    /**
     * 根据id更新数据
     * @param id 条件
     * @param ptkhxx 传入参数
     */
    void updatePtKhxx(Long id, PtKhxx ptkhxx);


    //void updatePtKhxxbysjh(String sjh,PtKhxx ptkhxx);

    PtKhxx getInformationKhxxbysjh(String sjhm);


    void deletePtKhxx(Long id);

    void deletePtKhxxbykhbm(String khbm);
    
    /**
     * 批量检查
     * @param list 插入的list
     * @param dljg_bm 传入的代理机构编码
     * @return String 返回的用户名称集合
     */
    String checkList(List<PtKhxx> list, String dljg_bm);
    
    /**
     * 批量插入
     * @param list 插入的list
     */
    void insertList(List<PtKhxx> list);

    /**
     * 根据当前的代理机构编码查找正在服务和停止服务的客户
     * 
     * @param dljg_bm
     *            代理机构编码
     * @param fwzt
     *            服务状态
     * @return 客户列表
     */
    List<PtKhxx> findAllPtKhxx(String dljg_bm, String fwzt);

    /**
     * 通过纳税人识别号获取一个PtKhxx数据
     * 
     * @param nsrsbh
     *            传入的纳税人识别号
     * @return 一条数据
     */
    PtKhxx getInformation(String nsrsbh, String khbm);
    PtKhxx getInformationKhxx(String nsrsbh);

    /**
     * 根据id跟新客户服务状态
     * 
     * @param ids
     *            传入id
     * @param fwzt
     *            服务状态 为0停止，为1启动
     */
    void updateFw(List<String> ids, Integer fwzt);

    /**
     * 根据客户编码获取
     * @param khbm
     *          客户编码
     * @return
     */
    PtKhxx findCustomerByKhbm(String khbm);
    
    /**
     * 根据id查找一条客户
     * @param id
     * @return
     */
    PtKhxx findPtKhxxById(Long id);
    
    /**
     * 根据id更新客户
     */
    //void updatePtKhxxById(PtKhxx ptkhxx);
    
    /**
     * 根据传入的客户资料及税务提醒内容，插入纳税申报表
     * @param ptkhxx 客户资料
     * @param ptSwtxlist 税务提醒内容
     * @param txsj 提前几天预警
     * @return 插入的数量
     */
    int insertNssb(PtKhxx ptkhxx, List<PtSwtx> ptSwtxlist, String txsj);
    
    /**
     * 根据传入的客户资料及税务提醒内容，更新纳税申报表
     * 1.插入前先根据代理记账公司的代理机构编码，客户的纳税人识别号，
     * 删除本月之后（包括本月）bszt状态为false的数据；
     * 2.分类查出已经申报的数据 本月之后（包括本月），若没有，正常插入，若存在，在增加数据时排除；
     * @param ptkhxx 客户资料
     * @param ptSwtxlist 税务提醒内容
     * @param txsj 提前几天预警
     * @return 插入的数量
     */
    int updateNssb(PtKhxx ptkhxx, List<PtSwtx> ptSwtxlist, String txsj);

    /**
     * 根据代理机构编码查询客户信息
     * @param dljgbm
     *          代理机构编码
     * @return
     */
    long findPtKhxxSizeByDljgbm(String dljgbm);

    /**
     * 分页获取代理机构客户信息
     * @param start
     * @param length
     * @param dljgbm
     * @return
     */
    List<PtKhxx> getPtkhxxByPage(int start, int length, String dljgbm);

    /**
     * 根据id删除客户
     * @param ids id
     */
    void delKh(List<String> ids);
}
