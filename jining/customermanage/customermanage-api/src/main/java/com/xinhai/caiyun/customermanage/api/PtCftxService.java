package com.xinhai.caiyun.customermanage.api;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;

/**
 * 催费欠费提醒
 * 
 * @author lmf
 *
 */
@Service
public interface PtCftxService {

    /**
     * 查找本月所有已经保存在催费表中的客户
     * 
     * @param profit
     */
    List<PtCftx> findAllDone(String year, String month, String dljgBm);

    /**
     * 查询催费，欠费数据
     * 
     * @param dljgbm
     *            代理机构编码
     * @param cfzt
     *            催费状态
     * @return List<PtCftx> 数据
     */
    List<PtCftx> findCftx(String dljgbm, String cfzt);

    /**
     * 查询催费，欠费客户数量
     * 
     * @param dljgbm
     *            代理机构编码
     * @param cfzt
     *            催费状态
     * @return List<PtCftx> 数据
     */
    List<PtCftx> findCftxNum(String dljgbm, String cfzt);
    
    /**
     * 查询催费，欠费数据金额
     * 
     * @param zydm
     *            职员代码
     * @param cfzt
     *            催费状态
     * @return List<PtCftx> 数据
     */
    BigDecimal findCftxByUser(String dljgbm, String zydm, String cfzt);

    /**
     * 查询催费，欠费客户数量
     * 
     * @param zydm
     *            职员代码
     * @param cfzt
     *            催费状态
     * @return List<PtCftx> 数据
     */
    Integer findCftxNumByUser(String dljgbm, String zydm, String cfzt);

    /**
     * 
     * @return
     */
    int deleteByFzbzPtCftx(String fzbz);

    /**
     * 保存收费信息时从催费提醒中查找
     * @param id
     *          客户编码
     * @param sfyf
     *          收费月份
     * @param sfnf
     *          收费年份
     * @return
     *          返回催费提醒信息
     */
    void findCftxBySfxx(String id, String sfyf, String sfnf);
}
