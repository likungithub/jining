package com.xinhai.security.shiro.dao;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

/**
 * Created by fanxi on 2016-5-11.
 */
public class JedisManager {
  public static final String REDIS_SHIRO_SESSION = "XINHAI_PLATFORM_SESSIONID_";
  Logger logger = LogManager.getLogger(JedisManager.class);

  @Autowired
  private JedisPool jedisPool;

  public Jedis getJedis() {
    try {
      return jedisPool.getResource();
    } catch (Exception ex) {
      logger.error("缓存服务连接失败！", ex);
      return null;
    }
  }

  public void returnResource(Jedis jedis) {
    if (jedis != null) {
      if (jedis != null) {
        jedis.close();
      }
    }
  }
}
