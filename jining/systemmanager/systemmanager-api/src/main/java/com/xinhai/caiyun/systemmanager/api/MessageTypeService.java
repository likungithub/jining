package com.xinhai.caiyun.systemmanager.api;


import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wangshuo on 2018/1/17 0017.
 */
@Service
public interface MessageTypeService {

    List<MessageType> findAllType();
}
