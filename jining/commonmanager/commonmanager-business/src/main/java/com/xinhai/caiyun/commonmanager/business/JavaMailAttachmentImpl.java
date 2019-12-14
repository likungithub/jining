package com.xinhai.caiyun.commonmanager.business;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.text.MessageFormat;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.annotation.PostConstruct;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import redis.clients.jedis.Jedis;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.xinhai.caiyun.commonmanager.api.EmailConfig;
import com.xinhai.caiyun.commonmanager.dao.CommonManagerMapper;
import com.xinhai.caiyun.commonmanager.email.JavaMailAttachment;

/**
 * @description:邮键发送接口
 * @version: v1.0
 * @author lixp
 * @date: 2017年8月14日 下午1:41:52
 */
@Component
public class JavaMailAttachmentImpl implements JavaMailAttachment {

	@Override
	public String getSysMb(String pzlx, String mbId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void doSendHtmlEmail(String subject, String sendHtml,
			String receiveUser, File attachment, Boolean debug)
			throws Exception {
		// TODO Auto-generated method stub
		
	}
    
  
}
