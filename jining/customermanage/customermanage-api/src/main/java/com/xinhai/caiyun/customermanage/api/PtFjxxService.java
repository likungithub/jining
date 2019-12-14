package com.xinhai.caiyun.customermanage.api;

import java.util.List;

public interface PtFjxxService {

    /**
     * 根据客户编码查询附件
     * @param khbm
     *          客户编码或者uuid
     * @return
     *          返回客户附件list
     */
    List<PtFjxx> findPtFjxxByKhbm(String khbm);

    /**
     * 保存附件
     * @param fjxx
     *          附件信息
     */
    void insertCustomerFile(PtFjxx fjxx);

    /**
     * 根据id查询附件
     * @param id
     *          编号
     * @return
     *          返回附件信息
     */
    PtFjxx findPtFjxxById(String id);

    /**
     * 删除附件信息
     * @param id
     *          编号
     * @param ptfjxx
     *          附件信息
     */
    void deletePtFjxxFile(String id, PtFjxx ptfjxx);

    /**
     * 获取文件路劲
     * @param id
     *          编号
     */
    void updateFileDownload(String id);

    /**
     * 更改文件的客户编码
     * @param uuid
     *          原本的编号
     * @param khbm 
     *          客户编码
     */
    void updateFileInfo(String uuid, String khbm);

    /**
     * 查询附件数量
     * @param khdm
     *          客户编码
     * @return
     *          返回附件数量
     */
    long getFileSzie(String khdm);
    
}
