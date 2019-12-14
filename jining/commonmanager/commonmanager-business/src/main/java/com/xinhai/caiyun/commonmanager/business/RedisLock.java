package com.xinhai.caiyun.commonmanager.business;

import java.util.List;
import java.util.UUID;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.Transaction;

/**
 * Redis实现分布式锁
 * @author lixp
 */
@Component
public class RedisLock {
    
    /**
     * log
     */
    private Logger logger = LogManager.getLogger(RedisLock.class.getName());
    
    /**
     * jedis连接池
     */
    @Autowired
    private JedisPool jedisPool;
    
    /**
     * @return the jedis
     */
    public Jedis getJedis() {
        Jedis jedis = jedisPool.getResource();
        return jedis;
    }


    /**
     * 获取锁。 该获取锁方法有如下特性： 1.如果获取锁成功，会设置锁的生存时间； 2.虽然大多数情况下redis的锁都有生存时间，
     * 但是为了防止在上锁后、设置锁的生存周期 之前获取锁的方法出现了异常而终止。我们加入如下判断： 如果获取锁失败，会检查已存在锁是否设置有生存时间，
     * 如果没有设置生存时间，那么会给锁设置生存时间。 。
     *
     * @param conn
     *            redis连接
     * @param lockName
     *            锁名称
     * @param waitTimeOut
     *            等待获取锁的超时时间（毫秒）
     * @param lockTimeOut
     *            锁的生存时间（秒）
     * @return 如果获取锁成功则返回锁键对应值，否则返回null
     */
    public String acquireLockWithTimeOut(Jedis conn, String lockName,
            long waitTimeOut, int lockTimeOut) {
        String lockKey = "lock:" + lockName;
        String lockId = UUID.randomUUID().toString();
        long end = System.currentTimeMillis() + waitTimeOut;
        int i = 0;
        while (System.currentTimeMillis() < end) {
            if (conn.setnx(lockKey, lockId) == 1) {
                conn.expire(lockKey, lockTimeOut);
                System.out.println("acquire lock '" + lockName + "',lockId="
                        + lockId + ",retry " + i);
                return lockId;
            }
            if (conn.ttl(lockKey) < 0) {
                conn.expire(lockKey, lockTimeOut);
            }
            try {
                Thread.sleep(1);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            i++;
        }
        return null;
    }

    /**
     * 解锁。 解锁时将判断锁键对应值是否是给定的值，防止误解锁。
     *
     * @param conn
     *            redis连接
     * @param lockName
     *            锁名称
     * @param lockId
     *            锁键对应值
     * @param waiteTimeOut
     *            解锁动作的超时时间（毫秒）
     * @return true如果解锁成功，否则返回false
     */
    public boolean releaseLock(Jedis conn, String lockName, String lockId,
            long waiteTimeOut) {
        String lockKey = "lock:" + lockName;
        long end = System.currentTimeMillis() + waiteTimeOut;
        int i = 0;
        while (System.currentTimeMillis() < end) {
            conn.watch(lockKey);
            if (lockId.equals(conn.get(lockKey))) {
                Transaction trans = conn.multi();
                trans.del(lockKey);
                List<Object> exec = trans.exec();
                if (exec != null) {
                    System.out.println("release lock '" + lockName
                            + "',lockId=" + lockId + ",retry " + i);
                    return true;
                }
                i++;
                continue;
            }
            conn.unwatch();
            break;
        }
        return false;
    }
    
    /**
     * 关闭并返回连接池
     * @param jedis 实例
     */
    public void returnResource(Jedis jedis) {
        if (jedis != null) {
            if (jedis != null) {
                jedis.close();
            }
        }
    }
    

}
