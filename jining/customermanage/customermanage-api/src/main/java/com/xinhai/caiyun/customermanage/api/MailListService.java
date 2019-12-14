package com.xinhai.caiyun.customermanage.api;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * Description:
 * User: admin
 * Date: 2017-12-21
 * Time: 15:09
 */
@Service
public interface MailListService {

    /**
     * 根据代理机构编码获取通讯录信息
     * @param dljgbm
     * @return
     */
     List<MailList> getAllMailList(String dljgbm);

    /**
     * 获取某条通讯录的信息
     * @param id
     * @return
     */
     MailList getMailListById(String id,String dljgbm);

    /**
     * 根据联系人或单位检索常用联系人
     * @param lxrhdw
     * @return
     */
    List<MailList> getMailListByKeyWord(String lxrhdw,String dljgbm);

    /**
     * 添加代理记账公司通讯录（常用联系方式）
     * @param mailList
     */
    void  addMailList(MailList mailList);

    /**
     * 更新代理记账公司通讯录（常用联系方式）
     * @param mailList
     */
    void  editMailList(String id,MailList mailList);

    /**
     * 根据ID删除每条通讯录信息
     * @param id
     */
    void  delMailList(String id,MailList mailList);

    /**
     * 根据ID进行批量删除
     */
    void  delMailLists(List<String> list, MailList mailList);

    /**
     * 根据代理机构编码查询所有的手机号码
     * @param dl
     * @return
     */
    List<String> getAllMailSjhmList(String dl);

    /**
     * 根据代理机构编码查询所有的联系人或地名
     * @param dl
     * @return
     */
    List<String> getAllMailNameList(String dl);

    /**
     * 后台分页
     * @param dljgbm
     * @param startA
     * @param lengthA
     * @param searchText
     * @return
     */
    List<MailList> getAllMailListByfy(String dljgbm, int startA, int lengthA, String searchText);

    /**
     * 后台分页长度
     * @param dljgbm
     * @param searchText
     * @return
     */
    long getAllMailListByfyLen(String dljgbm, String searchText);
}
