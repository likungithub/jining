package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.MessageType;
import com.xinhai.caiyun.systemmanager.api.MessageTypeService;
import com.xinhai.caiyun.systemmanager.dao.MessageTypeMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by wangshuo on 2018/1/17 0017.
 */
@Repository
public class MessageTypeServiceImpl implements MessageTypeService {
    @Autowired
    MessageTypeMapper messageTypeMapper;

    @Override
    public List<MessageType> findAllType() {
        return messageTypeMapper.findAllType();
    }
}
