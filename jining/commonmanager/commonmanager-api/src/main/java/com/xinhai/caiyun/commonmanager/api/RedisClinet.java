package com.xinhai.caiyun.commonmanager.api;

import redis.clients.jedis.Jedis;

/**
 * @description:redis存储对象客户端
 * @author lixp
 * @date: 2017年6月23日 下午1:46:17
 * @version: v1.0
 */
public interface RedisClinet {

    /**
     * 对象存储
     * @param key key
     * @param object 对象
     * @return OK
     */
    String set(String key, Object object);
    
    /**
     * 获取存储
     * @param key key
     * @return Object
     */
    Object get(String key);
    
    /**
     * 删除缓存对象
     * @param key key
     * @return true
     */
    boolean del(String key);
    
    /**
     * 设置缓存有效期 
     * @param key key
     * @param seconds 秒
     */
    void expire(String key, int seconds);
    
    
    /**
     * 关闭并返回连接池
     * @param jedis 实例
     */
    void returnResource(Jedis jedis);
    
}
