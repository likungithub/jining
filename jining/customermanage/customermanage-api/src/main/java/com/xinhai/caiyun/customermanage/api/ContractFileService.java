package com.xinhai.caiyun.customermanage.api;

import java.util.List;

import org.springframework.stereotype.Service;

/**
 * 合同呢附件
 * @author tangck
 *
 */
@Service
public interface ContractFileService {
    
    /**
     * 新增合同附件
     * @param contractFile
     *              合同附件对象
     */
    void insertContractFile(ContractFile contractFile);

    /**
     * 根据uuid获取合同附件
     * @param uuid
     *          uuid
     * @return
     *          返回合同附件列表
     */
    List<ContractFile> findContractFileByUUID(String uuid);

    /**
     * 修改合同附件的合同编码
     * @param uuid
     *          uuid
     * @param htbm
     *          合同编码
     */
    void updateFileByHtbm(String uuid, String htbm);

    /**
     * 根据合同编码获取合同附件
     * @param htbm
     *          合同编码
     * @return
     *          返回数量
     */
    long getContractFileSizeByHtbm(String htbm);

    /**
     * 删除合同附件
     * @param id
     *          合同附件编号
     * @param contractFile
     *          合同附件信息
     */
    void deleteContractFile(String id, ContractFile contractFile);
    
    
    /**
     * 删除合同附件
     * @param id
     *          合同附件编号
     * @param contractFile
     *          合同附件信息
     */
    void deleteContractFileByHtbm(ContractFile contractFile);

    /**
     * 修改下载次数
     * @param id
     *          合同附件编号
     */
    void updateFileDownload(String id);

    /**
     * 根据合同附件编码获取合同附件
     * @param id
     *          编号
     * @return
     *          返回合同附件信息
     */
    ContractFile findContractFileById(String id);
}
