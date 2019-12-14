package com.xinhai.Log.business;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.xinhai.Log.api.LoginLog;
import com.xinhai.Log.api.LoginLogService;
import com.xinhai.Log.dao.LoginlLogMapper;

/**
 * 登录日志数据访问层
 * @author Administrator
 *
 */
@Repository
public class LoginLogServiceImpl implements LoginLogService {
    /**
     * 系统内日志
     */
    Logger logger = LoggerFactory.getLogger(LoginLogServiceImpl.class.getName());

    /**
     * 自动绑定
     */
    @Autowired
	private LoginlLogMapper loginlogMapper;

    @Override
    public void createLoginLog(LoginLog log) {
        // TODO Auto-generated method stub
        loginlogMapper.createLoginLog(log);
    }

    @Override
    public LoginLog findLoginLog(String id) {
        // TODO Auto-generated method stub
        return loginlogMapper.findLoginLog(id);
    }

    @Override
    public List<LoginLog> findAllLoginLog(Date starDate, Date endDate) {
        // TODO Auto-generated method stub
        return loginlogMapper.findAllLoginLog(starDate,endDate);
    }

    @Override
    public void updateLoginLog(String id, Date outtime) {
        // TODO Auto-generated method stub
        loginlogMapper.updateLoginLog(id, outtime);
    }

    @Override
    public List<LoginLog> searchLoginLog(String keyword) {
        // TODO Auto-generated method stub
        return loginlogMapper.searchLoginLog(keyword);
    }

    @Override
    public void deleteLoginLog(long id) {
        // TODO Auto-generated method stub
        loginlogMapper.deleteLoginLog(id);
    }

    @Override
    public LoginLog findLoginLogByIP(String ip) {
        // TODO Auto-generated method stub
        return loginlogMapper.findLoginLogByIP(ip);
    }

    @Override
    public long findAllLoginLogSize(Date starDate, Date endDate) {
        // TODO Auto-generated method stub
        return loginlogMapper.findAllLoginLogSize(starDate,endDate);
    }

    @Override
    public List<LoginLog> getLoginLogByPage(int start, int length,
            Date starDate, Date endDate) {
        // TODO Auto-generated method stub
        return loginlogMapper.getLoginLogByPage(start,length,starDate,endDate);
    }

	@Override
	public List<Map<String, Object>> allCustomerLoginCount(String begin,
			String end) {
		// TODO Auto-generated method stub
		return loginlogMapper.allCustomerLoginCount(begin,end);
	}

	@Override
	public List<Map<String, Object>> allCustomerLoginCountByMonth(String begin,
			String end) {
		// TODO Auto-generated method stub
		return loginlogMapper.allCustomerLoginCountByMonth(begin,end);
	}

	@Override
	public List<Map<String, Object>> LoginStationByEveryDay(String begin,String end) {
		// TODO Auto-generated method stub
		return loginlogMapper.LoginStationByEveryDay(begin,end);
	}

	@Override
	public List<Map<String, Object>> loginStatByWeek(String begin, String end) {
		// TODO Auto-generated method stub
		return loginlogMapper.loginStatByWeek(begin,end);
	}

    @Override
    public long findLoginLogSize(String starDate, String endDate, String zydm, String dljgbm) {
        return loginlogMapper.findLoginLogSize(starDate, endDate, zydm, dljgbm);
    }

    @Override
    public List<LoginLog> findLoginLogList(int start, int length, String starDate, String endDate, String zydm, String dljgbm) {
        return loginlogMapper.findLoginLogList(start, length, starDate, endDate, zydm, dljgbm);
    }

}
