package com.xinhai.caiyun.commonmanager.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import com.xinhai.caiyun.commonmanager.api.RedisClinet;
import com.xinhai.caiyun.commonmanager.utils.SerializeUtil;

/**
 * @description:redis存储对象客户端
 * @author lixp
 * @date: 2017年6月23日 下午1:46:17
 * @version: v1.0
 */
@Component
public class RedisClinetImpl implements RedisClinet {

    /**
     * jedis连接池
     */
    @Autowired
    private JedisPool jedisPool;

    /**
     * 对象存储
     * 
     * @param key
     *            key
     * @param object
     *            对象
     * @return OK
     */
    public String set(String key, Object object) {
        Jedis jedis = null;
        try {
            jedis =jedisPool.getResource();
            if(jedis == null){
                return null;
            }
            return jedis.set(key.getBytes(), SerializeUtil.serialize(object));
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            returnResource(jedis);
        }
        return null;

    }

    /**
     * 获取存储
     * 
     * @param key
     *            key
     * @return Object
     */
    public Object get(String key) {
        Jedis jedis = null;
        try {
            jedis =jedisPool.getResource();
            if(jedis == null){
                return null;
            }
            byte[] value = jedis.get(key.getBytes());
            return SerializeUtil.unserialize(value);
        } catch (Exception e) {
            // TODO: handle exception
        } finally {
            returnResource(jedis);
        }
        return null;
    }

    /**
     * 删除缓存对象
     * 
     * @param key
     *            key
     * @return true
     */
    public boolean del(String key) {
        Jedis jedis = null;
        try {
            jedis =jedisPool.getResource();
            if(jedis == null){
                return false;
            }
            return jedis.del(key) > 0;
        } catch (Exception e) {
            // TODO: handle exception
        } finally {
            returnResource(jedis);
        }
        return false;

    }

    /**
     * 设置缓存有效期
     * 
     * @param key
     *            key
     * @param seconds
     *            秒
     */
    public void expire(String key, final int seconds) {
        Jedis jedis = null;
        try {
            jedis =jedisPool.getResource();
            if(jedis == null){
                return;
            }
            jedis.expire(key, seconds);
        } catch (Exception e) {
            // TODO: handle exception
        } finally {
            returnResource(jedis);
        }

    }

    /**
     * 关闭并返回连接池
     * 
     * @param jedis
     *            实例
     */
    public void returnResource(Jedis jedis) {
        if (jedis != null) {
            if (jedis != null) {
                jedis.close();
            }
        }
    }

}
