package com.xinhai.caiyun.commonmanager.email;

import java.io.File;

/**
 * @description:右键发送接口
 * @version: v1.0
 * @author lixp
 * @date: 2017年8月14日 下午1:41:52
 */
public interface JavaMailAttachment {
    

    /**
     * 获取模板
     * @param pzlx 凭证类型
     * @param mbId id
     * @return 模板
     */
    String getSysMb(String pzlx, String mbId); 

    /**
     * 发送邮件
     * 
     * @param subject
     *            邮件主题
     * @param sendHtml
     *            邮件内容
     * @param receiveUser
     *            收件人地址
     * @param attachment
     *            附件
     * @param debug
     *            是否开启debug模式 打印信息
     * @throws Exception E
     */
    void doSendHtmlEmail(String subject, String sendHtml, String receiveUser,
            File attachment,Boolean debug) throws Exception;
}
