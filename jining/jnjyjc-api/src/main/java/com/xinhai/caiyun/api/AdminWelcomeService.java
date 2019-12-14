package com.xinhai.caiyun.api;

import java.util.List;
import java.util.Map;

import com.xinhai.caiyun.bean.PtKhtj;

/**
 * @description:管理员欢迎页
 * @author xinl
 * @date: 2017年11月17日 上午09:12:00
 * @version: v1.0
 */
public interface AdminWelcomeService {
    /**
     * 客户统计
     * @param tjlx 统计类型
     *             01 代理员工
     *             02 代理新增客户
     *             03 代理新增潜在客户
     *             04 新增代理记账公司
     *             05 初审代理记账公司
     *             06 终审代理记账公司
     * @return
     */
    List<PtKhtj> findKhtj(String  tjlx);


   /**
    * @Author: shanliang
    * @Description:启动统计
    * @Date:2018-03-08 9:39
    **/
   List<Map<String,String>> qdtj(Map  cxtj);
}
