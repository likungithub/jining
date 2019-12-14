package com.xinhai.usermanager.controller.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by fanxi on 2016-4-29.
 */
@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "用户登录账号已经存在！")
public class UserAccountHasExistException extends RuntimeException {
}
