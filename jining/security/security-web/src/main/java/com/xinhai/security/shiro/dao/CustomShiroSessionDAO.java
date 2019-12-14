package com.xinhai.security.shiro.dao;

import com.xinhai.security.api.ShiroSessionRepository;
import com.xinhai.security.shiro.SecurityConfig;

import org.apache.shiro.session.Session;
import org.apache.shiro.session.UnknownSessionException;
import org.apache.shiro.session.mgt.eis.AbstractSessionDAO;
import org.apache.shiro.util.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

/**
 * Created by fanxi on 2016-5-11.
 */
@Repository
public class CustomShiroSessionDAO extends AbstractSessionDAO {
  Logger logger = LoggerFactory.getLogger(CustomShiroSessionDAO.class);

  private ConcurrentMap<Serializable, Session> sessions = new ConcurrentHashMap();
  @Autowired
  private SecurityConfig securityConfig;

  @Autowired
  private ShiroSessionRepository shiroSessionRepository;

  public ShiroSessionRepository getShiroSessionRepository() {
    return shiroSessionRepository;
  }

  public void setShiroSessionRepository(
          ShiroSessionRepository shiroSessionRepository) {
    this.shiroSessionRepository = shiroSessionRepository;
  }

  @Override
  protected Serializable doCreate(Session session) {
    Serializable sessionId = this.generateSessionId(session);
    this.assignSessionId(session, sessionId);
    for (int i = 0; i < 5; i++) {
      storeSession(session, sessionId);
      if (Objects.isNull(this.readSession(sessionId))) {
        try {
          Thread.sleep(500);
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
        continue;
      } else {
        break;
      }
    }

    return sessionId;
  }

  private void storeSession(Session session, Serializable sessionId) {
    if (securityConfig.isSecurityDisabled()) {
      this.storeSession(sessionId, session);
    } else {
      getShiroSessionRepository().saveSession(session);
    }
  }

  @Override
  protected Session doReadSession(Serializable sessionId) {
    if (securityConfig.isSecurityDisabled()) {
      return (Session) this.sessions.get(sessionId);
    } else {
      return getShiroSessionRepository().getSession(sessionId);
    }
  }

  @Override
  public void update(Session session) throws UnknownSessionException {
    if (!securityConfig.isSecurityDisabled()) {
      getShiroSessionRepository().saveSession(session);
    } else {
      this.storeSession(session.getId(), session);
    }
  }

  @Override
  public void delete(Session session) {
    if (session == null) {
      logger.equals("session can not be null,delete failed");
      return;
    }
    Serializable id = session.getId();
    if (id != null) {
      if (!securityConfig.isSecurityDisabled()) {
        getShiroSessionRepository().deleteSession(id);
      } else {
        this.sessions.remove(id);
      }
    }
  }

  @Override
  public Collection<Session> getActiveSessions() {
    if (!securityConfig.isSecurityDisabled()) {
      return getShiroSessionRepository().getAllSessions();
    } else {
      Collection values = this.sessions.values();
      return (Collection) (CollectionUtils.isEmpty(values) ? Collections.emptySet() : Collections.unmodifiableCollection(values));
    }

  }


  protected Session storeSession(Serializable id, Session session) {
    if (id == null) {
      throw new NullPointerException("id argument cannot be null.");
    } else {
      return (Session) this.sessions.putIfAbsent(id, session);
    }
  }
}
