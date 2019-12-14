package com.xinhai.caiyun.commonmanager.business;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.xinhai.caiyun.commonmanager.api.RedisClinet;
import com.xinhai.caiyun.commonmanager.config.CommonConfig;
import com.xinhai.caiyun.commonmanager.dao.CommonManagerMapper;
import com.xinhai.caiyun.systemmanager.api.CsXtpz;
import com.xinhai.caiyun.systemmanager.api.CsXtpzService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import redis.clients.jedis.Jedis;

import javax.annotation.PostConstruct;

@Component
public class CommonConfigImpl implements CommonConfig{

    @Autowired
    RedisClinet redisClient;




    @Autowired
    private CsXtpzService csxtpzservice;

    /**
     * Mapper接口，对应同名称的xml文件
     */
    @Autowired
    private CommonManagerMapper commonManagerMapper;


    //@PostConstruct
    public void init() {
       CsXtpz csXtpz =  csxtpzservice.findCsXtpzByDm("002");
       if(csXtpz!=null) {
           redisClient.set(CsXtpzService.prefix + csXtpz.getDmPzlx(), csXtpz);
       }
       /* String share_url = commonManagerMapper.getShareConfig();
        if(!StringUtils.isEmpty(share_url)){
            redisClient.set("share.url",share_url);
        }*/
    }

    @Override
    public String getShareUrl() {
        try {
            CsXtpz csXtpz = (CsXtpz) redisClient.get(CsXtpzService.prefix + "002");
            return csXtpz.getKey1();
        }catch (Exception e){
            e.printStackTrace();
            return "";
        }
    }

    /**
     * 获取模板
     * @param mbId id
     * @return 模板
     */
    @Override
    public String getSysMb(String pzlx, String mbId) {
        return commonManagerMapper.getSysMb(pzlx,mbId);
    }

}
