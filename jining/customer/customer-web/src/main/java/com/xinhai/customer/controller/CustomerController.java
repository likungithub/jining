package com.xinhai.customer.controller;

import com.alibaba.fastjson.JSONObject;
import com.gaoxin.plugin.InvokeResult;
import com.xinhai.caiyun.commonmanager.api.MaxAtomicInteger;
import com.xinhai.caiyun.commonmanager.api.RedisClinet;
import com.xinhai.caiyun.commonmanager.utils.AESCipher;
import com.xinhai.caiyun.commonmanager.utils.AccountValidatorUtil;
import com.xinhai.caiyun.commonmanager.utils.GetDate;
import com.xinhai.customer.api.Customer;
import com.xinhai.customer.api.CustomerService;
import com.xinhai.extattr.api.ExtendAttributeTemplate;
import com.xinhai.extattr.api.ExtendAttributeTemplateService;
import com.xinhai.organization.api.Organization;
import com.xinhai.organization.service.OrganizationService;
import com.xinhai.rolemanager.service.RoleService;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.security.api.MD5EncryptService;
import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.service.UserService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

/**
 * 代理记账公司的客户管理信息
 *
 * @author 李茂飞
 */
@Controller
@RequestMapping("/customer")
public class CustomerController {
    /**
     * 日志
     */
    private Logger logger = LogManager.getLogger(CustomerController.class.getName());

}
