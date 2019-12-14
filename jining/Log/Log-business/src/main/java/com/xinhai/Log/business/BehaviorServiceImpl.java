package com.xinhai.Log.business;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.xinhai.Log.api.Behavior;
import com.xinhai.Log.api.BehaviorService;
import com.xinhai.Log.dao.BehaviorMapper;

@Repository
public class BehaviorServiceImpl implements BehaviorService{

    @Autowired
    private BehaviorMapper behaviormapper;
    
    @Override
    public List<Behavior> findAll(Date starDate, Date endDate) {
        // TODO Auto-generated method stub
        return behaviormapper.findAll(starDate, endDate);
    }

    @Override
    public Behavior findById(String id) {
        // TODO Auto-generated method stub
        return behaviormapper.findById(id);
    }

    @Override
    public void createBehavior(Behavior behavior) {
        // TODO Auto-generated method stub
        behaviormapper.createBehavior(behavior);
    }

    @Override
    public long findAllLoginLogSize(Date starDate, Date endDate) {
        // TODO Auto-generated method stub
        return behaviormapper.findAllLoginLogSize(starDate, endDate);
    }

    @Override
    public List<Behavior> getLoginLogByPage(int start, int length,
            Date starDate, Date endDate) {
        // TODO Auto-generated method stub
        return behaviormapper.getLoginLogByPage(start,length,starDate,endDate);
    }

	@Override
	public List<Map<String, Object>> searchCompanyCountByWeek() {
		// TODO Auto-generated method stub
		return behaviormapper.searchCompanyCountByWeek();
	}

}
