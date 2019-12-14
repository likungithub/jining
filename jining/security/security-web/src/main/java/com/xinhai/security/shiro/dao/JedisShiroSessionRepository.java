package com.xinhai.security.shiro.dao;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.session.Session;
import org.springframework.stereotype.Component;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.exceptions.JedisException;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.xinhai.security.api.ShiroSessionRepository;

@Component
public class JedisShiroSessionRepository extends JedisManager implements
        ShiroSessionRepository {
  Logger logger = LogManager.getLogger(JedisShiroSessionRepository.class);

  @Override
  public void saveSession(Session session) {
    if (session == null || session.getId() == null) {
      logger.error("session或者session id为空");
      return;
    }
    byte[] key = getRedisSessionKey(session.getId()).getBytes();
    byte[] value = SerializationUtils.serialize(session);
    Jedis jedis = this.getJedis();
    if (jedis == null) {
      return;
    }

    try {
      Long timeOut = session.getTimeout() / 1000;
      jedis.set(key, value);
      jedis.expire(key, Integer.parseInt(timeOut.toString()));
    } catch (JedisException e) {
      logger.error("保存session失败", e);
    } finally {
      this.returnResource(jedis);
    }
  }

  @Override
  public void deleteSession(Serializable id) {
    if (id == null) {
      logger.error("id为空");
      return;
    }
    Jedis jedis = this.getJedis();
    if (jedis == null) {
      return;
    }

    try {
      byte[] key = getRedisSessionKey(id).getBytes();
      jedis.del(key);
    } catch (JedisException ex) {
      logger.error("删除session失败", ex);
    } finally {
      this.returnResource(jedis);
    }
  }

  @Override
  public Session getSession(Serializable id) {
    if (id == null) {
      logger.error("id为空");
      return null;
    }

    Session session = null;
    Jedis jedis = this.getJedis();
    if (jedis == null) {
      return null;
    }

    try {
      byte[] key = getRedisSessionKey(id).getBytes();
      byte[] value = jedis.get(key);
      //System.out.println(value+":value#########################################################################################################################");
      //System.out.println(key+":key#########################################################################################################################");
      //System.out.println(id+":id#########################################################################################################################");
      logger.info(value+":value#########################################################################################################################");
      logger.info(key+":key#########################################################################################################################");
      logger.info(id+":id#########################################################################################################################");
      if (value != null) {
        session = SerializationUtils.deserialize(value);
        Long timeOut = session.getTimeout() / 1000;
        jedis.expire(key, Integer.parseInt(timeOut.toString()));
      }
    } catch (JedisException e) {
      logger.error("获取id为" + id + "的session失败", e);
    } finally {
      this.returnResource(jedis);
    }
    return session;
  }

  @Override
  public Collection<Session> getAllSessions() {
    Jedis jedis = this.getJedis();
    Set<Session> sessions = new HashSet<Session>();
    if (jedis == null) {
      return sessions;
    }

    try {
      Set<byte[]> byteKeys = jedis.keys((REDIS_SHIRO_SESSION + "*").getBytes());
      if (byteKeys != null && byteKeys.size() > 0) {
        for (byte[] bs : byteKeys) {
            Session ses =  SerializationUtils.unserialize((jedis.get(bs)));
            if(null !=ses){
                sessions.add(ses);
            }
         
        }
      }
    } catch (JedisException e) {
      logger.error("获取所有session失败", e);
    } finally {
      this.returnResource(jedis);
    }
    return sessions;
  }

  /**
   * 获取redis中的session key
   */
  private String getRedisSessionKey(Serializable sessionId) {
    return this.REDIS_SHIRO_SESSION + sessionId;
  }
}
