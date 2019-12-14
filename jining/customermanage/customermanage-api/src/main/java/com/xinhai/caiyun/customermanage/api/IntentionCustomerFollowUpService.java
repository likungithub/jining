package com.xinhai.caiyun.customermanage.api;

import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * 意向客户跟进接口
 * Created by 王硕 on 2018/4/11 0011.
 */
@Service
public interface IntentionCustomerFollowUpService {

    /**
     * 新增共享客户（职员）
     * @param shareCustomer
     */
    void addShareCustomer(ShareCustomer shareCustomer);

    /**
     * 查看共享员工（职员）
     * @param yxid
     * @param dljgBm
     * @return
     */
    List<ShareCustomer> findByYxId(String yxid, String dljgBm);

    void deleteShareCustomer(String yxid, String dljgBm, String currentZydm, Date date);

    /**
     * 新增跟进内容
     * @param followUpInfo
     */
    void addFollowUpContent(FollowUpInfo followUpInfo);

    /**
     * 新增跟进附件
     * @param followUpFile
     */
    void addFollowUpFiles(FollowUpFile followUpFile);

    FollowUpInfo findFollowInfoById(String id);

    void updateFollowUpContent(FollowUpInfo followUpInfo, String id);

    void updateFollowUpFiles(FollowUpFile followUpFile, String id);

    /**
     * 获取当前跟进客户的跟进信息
     * @param dljgBm
     * @param intentionCode
     * @return
     */
    List<FollowUpInfo> findFollowUpInfoByAgencyCodeAndIntentionCode(String dljgBm, String intentionCode);

    /**
     * 获取当前跟进客户的跟进信息附件
     * @param dljgBm
     * @param gjId
     * @return
     */
    List<FollowUpFile> findFollowUpFilesByAgencyCodeAndIntentionCode(String dljgBm, String gjId);

    /**
     * 删除文件
     * @param id
     */
    void deleteFile(String id);

    /**
     * 删除跟新信息
     * @param id
     */
    void deleteFollowUpInfo(String id);

    /**
     * 通过跟进id 查询跟进信息
     * @param id
     * @return
     */
    FollowUpInfo findFollowInfoBygjId(String id);

    String findByYxIdForLrry_dm(String yxid, String id);

    String findByGjidForLrry_dm(String gjId);

    /**
     * 通过跟进id查询文件
     * @param id
     * @return
     */
    List<FollowUpFile> findByGjId(String id);

    /**
     * 通过跟进id 删除跟进信息
     * @param id
     * @param inputPeopleCode
     * @param date
     */
    void deleteFollowUpInfoByGjId(String id, String inputPeopleCode, Date date);
}
