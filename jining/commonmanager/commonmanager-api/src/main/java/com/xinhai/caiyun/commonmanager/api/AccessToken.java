package com.xinhai.caiyun.commonmanager.api;

import java.lang.annotation.ElementType;  
import java.lang.annotation.Retention;  
import java.lang.annotation.RetentionPolicy;  
import java.lang.annotation.Target;  
  
/**
 * @description:权限注解
 * @version: v1.0
 * @author lixp
 * @date: 2017年7月4日 下午1:41:52
 */ 
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)  
public @interface AccessToken {  
/*    String appkey(); 
    String token();*/  
}  