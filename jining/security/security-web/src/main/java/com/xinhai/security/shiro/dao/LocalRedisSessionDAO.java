package com.xinhai.security.shiro.dao;

import java.io.Serializable;
import java.util.Objects;

import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.eis.CachingSessionDAO;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @description:
 * @version: v1.0
 * @author lixp
 * @date: 2018年4月28日 上午11:13:10
 */
public class LocalRedisSessionDAO extends CachingSessionDAO{
    
    @Autowired
    CustomShiroSessionDAO customShiroSessionDAO;
    
    /* (non-Javadoc)
     * @see org.apache.shiro.session.mgt.eis.AbstractSessionDAO#doCreate(org.apache.shiro.session.Session)
     */
    @Override
    protected Serializable doCreate(Session session) {
        Serializable sessionId = this.generateSessionId(session);
        this.assignSessionId(session, sessionId);
      

        return sessionId;
    }
    
    /* (non-Javadoc)
     * @see org.apache.shiro.session.mgt.eis.CachingSessionDAO#doDelete(org.apache.shiro.session.Session)
     */
    @Override
    protected void doDelete(Session session) {
        customShiroSessionDAO.delete(session);
        
    }
    
    /* (non-Javadoc)
     * @see org.apache.shiro.session.mgt.eis.AbstractSessionDAO#doReadSession(java.io.Serializable)
     */
    @Override
    protected Session doReadSession(Serializable sessionId) {
        // TODO Auto-generated method stub
        return customShiroSessionDAO.doReadSession(sessionId);
    }
    
    /* (non-Javadoc)
     * @see org.apache.shiro.session.mgt.eis.CachingSessionDAO#doUpdate(org.apache.shiro.session.Session)
     */
    @Override
    protected void doUpdate(Session session) {
        customShiroSessionDAO.update(session);
        
    }
    
}
