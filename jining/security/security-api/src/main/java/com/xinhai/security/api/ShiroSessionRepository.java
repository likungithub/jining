package com.xinhai.security.api;

import org.apache.shiro.session.Session;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.Collection;

/**
 * Created by fanxi on 2016-5-11.
 */
@Service
public interface ShiroSessionRepository { 
	void saveSession(Session session);

	void deleteSession(Serializable sessionId);

	Session getSession(Serializable sessionId);

	Collection<Session> getAllSessions();
}
