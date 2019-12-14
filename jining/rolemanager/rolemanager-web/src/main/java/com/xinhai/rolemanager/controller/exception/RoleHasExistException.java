package com.xinhai.rolemanager.controller.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by fanxi on 2016-5-3.
 */
@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "角色名称已经存在！")
public class RoleHasExistException extends RuntimeException {
}
