package com.xinhai.Log.business;

import com.xinhai.Log.api.Log;
import com.xinhai.Log.api.LogService;
import com.xinhai.Log.dao.LogMapper;

import oracle.net.aso.e;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;

/**
 * 数据访问层
 * @author Administrator
 *
 */
@Repository
public class LogServiceImpl implements LogService {
    
    /**
     * 系统内日志
     */
    Logger logger = LogManager.getLogger(LogServiceImpl.class.getName());
	
	/**
	 * 自动绑定数据链接接口
	 */
    @Autowired
	private LogMapper logmapper;

    @Override
    public Log findLog(String id) {
        // TODO Auto-generated method stub
        try {
            return logmapper.findLog(id);
        } catch (Exception e) {
            logger.error("", e);
        }
        return new Log();
    }

    @Override
    public void updateLog(String id, Log log) {
        // TODO Auto-generated method stub
        logmapper.updateLog(id, log);
    }

    @Override
    public void deleteLog(String id) {
        // TODO Auto-generated method stub
        logmapper.deleteLog(id);
    }

    @Override
    public void createLog(Log log) {
        // TODO Auto-generated method stub
        logmapper.createLog(log);
    }

    @Override
    public void deleteLog(List<String> ids) {
        // TODO Auto-generated method stub
        logmapper.deleteLog(ids);
    }

    @Override
    public List<Log> searchLog(Date starDate,Date endDate) {
        // TODO Auto-generated method stub
        return logmapper.searchLog(starDate, endDate);
    }

    @Override
    public long findAllLoginLogSize(Date starDate, Date endDate) {
        // TODO Auto-generated method stub
        return logmapper.findAllLoginLogSize(starDate, endDate);
    }

    @Override
    public List<Log> getLoginLogByPage(int start, int length, Date starDate,
            Date endDate) {
        // TODO Auto-generated method stub
        return logmapper.getLoginLogByPage(start,length,starDate,endDate);
    }
}
