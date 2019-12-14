package com.xinhai.caiyun.dao;

import com.xinhai.caiyun.bean.PtKhtj;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

/**
 * @description:管理员欢迎页接口
 * @author xinl
 * @date: 2017年11月17日 上午09:12:00
 * @version: v1.0
 */
public interface AdminWelcomeMapper {
    /**客户统计
     *             01 代理员工
     *             02 代理新增客户
     *             03 代理新增潜在客户
     *             04 新增代理记账公司
     *             05 初审代理记账公司
     *             06 终审代理记账公司
     * @param tjlx
     * @return
     */
    List<PtKhtj> findKhtj(@Param("tjlx") String  tjlx);

    /**
     * @Author: shanliang
     * @Description:启动统计
     * @Date:2018-03-08 9:41
     **/
    List<Map<String,String>> qdtj(@Param("cxtj") Map  cxtj);
}
