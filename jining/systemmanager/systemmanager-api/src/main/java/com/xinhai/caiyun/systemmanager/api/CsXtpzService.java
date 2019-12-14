package com.xinhai.caiyun.systemmanager.api;

import java.util.List;

/**
 * 系统配置
 * @author slg
 *
 */
public interface CsXtpzService {

    public static String prefix = "SYS_PARAM_";

    List<CsXtpz> findAllCsXtpz();

    CsXtpz findCsXtpz(String id);

    void updateCsXtpzById(CsXtpz csXtpz);

    void updateCsXtpzByDm(CsXtpz csXtpz);


    void insertCsXtpz(CsXtpz csXtpz);

    void deleteCsXtpz(String id);

    CsXtpz findCsXtpzByDm(String dm);

}
