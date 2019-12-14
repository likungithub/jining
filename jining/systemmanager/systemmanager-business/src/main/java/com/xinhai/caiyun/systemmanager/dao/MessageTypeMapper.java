package com.xinhai.caiyun.systemmanager.dao;

import com.xinhai.caiyun.systemmanager.api.MessageType;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by wangshuo on 2018/1/17 0017.
 */
@Repository
public interface MessageTypeMapper {

    List<MessageType> findAllType();
}
