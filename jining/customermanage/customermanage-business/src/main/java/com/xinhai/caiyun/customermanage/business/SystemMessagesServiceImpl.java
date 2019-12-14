package com.xinhai.caiyun.customermanage.business;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.xinhai.caiyun.customermanage.api.PtLtxx;
import com.xinhai.caiyun.customermanage.api.PtLtxxMx;
import com.xinhai.caiyun.customermanage.api.SystemMessages;
import com.xinhai.caiyun.customermanage.api.SystemMessagesService;
import com.xinhai.caiyun.customermanage.dao.SystemMessagesMapper;

/**
 * 消息提醒实现类
 * @author pusilin
 *
 */
@Repository
public class SystemMessagesServiceImpl implements SystemMessagesService {
	@Autowired
	private SystemMessagesMapper mapper;
	@Override
	public void addSystemMessages(SystemMessages message) {
		// TODO Auto-generated method stub
		mapper.addSystemMessages(message);
	}
	@Override
	public List<SystemMessages> searchByAll(String dl, String ygdm,int start1,int lengh1) {
		// TODO Auto-generated method stub
		return mapper.searchByAll(dl, ygdm,start1,lengh1);
	}
	@Override
	public void deleteById(String id, String dl, String ygdm) {
		// TODO Auto-generated method stub
		mapper.deleteById(id,dl,ygdm);
	}
	@Override
	public void updateById(String id, String dl, String ygdm) {
		// TODO Auto-generated method stub
		mapper.updateById(id,dl,ygdm);
	}
	@Override
	public List<SystemMessages> searchByType(String dl, String ygdm,
			int readStat) {
		// TODO Auto-generated method stub
		return mapper.searchByType(dl,ygdm,readStat);
	}
	@Override
	public List<SystemMessages> findByWeek(String cxzt, String dl, String ygdm,
			String typeTx, Date now1, Date last1, int start1, int length1) {
		// TODO Auto-generated method stub
		return mapper.findByWeek(cxzt, dl, ygdm, typeTx, now1, last1, start1,
				length1);
	}
	@Override
	public List<SystemMessages> findByMonth(String ydzt, String dl,
			String ygdm, String begin, String end, String type,int start1,int length1) {
		// TODO Auto-generated method stub
		return mapper.findByMonth(ydzt, dl, ygdm, begin, end, type,start1,length1);
	}

	@Override
	public List<SystemMessages> findByLastMonth(String cxzt, String dl,
			String ygdm, String begin, String end, String typeTx,int start1,int length1) {
		// TODO Auto-generated method stub
		return mapper.findByLastMonth(cxzt, dl, ygdm, begin, end, typeTx,start1,length1);
	}

	@Override
	public List<SystemMessages> findByYear(String cxzt, String dl, String ygdm,
			String begin, String end, String typeTx,int start1,int lengh1) {
		// TODO Auto-generated method stub
		return mapper.findByYear(cxzt, dl, ygdm, begin, end, typeTx,start1,lengh1);
	}

	@Override
	public List<SystemMessages> findByZdy(String cxzt, String dl, String ygdm,
			String begin, String end, String typeTx,int start1,int lengh1) {
		// TODO Auto-generated method stub
		return mapper.findByZdy(cxzt, dl, ygdm, begin, end, typeTx,start1,lengh1);
	}
	@Override
	public int searchCount(String dl, String zydm) {
		// TODO Auto-generated method stub
		return mapper.searchCount(dl,zydm);
	}
	@Override
	public List<SystemMessages> searchBytxType(String dl, String ygdm,
			String typeTx, String xlbz,int start1,int lengh1) {
		// TODO Auto-generated method stub
		return mapper.searchBytxType(dl, ygdm, typeTx, xlbz,start1,lengh1);
	}

	@Override
	public List<SystemMessages> searchBytx(String dl, String ygdm, String xlbz,int start1,int lengh1) {
		// TODO Auto-generated method stub
		return mapper.searchBytx(dl, ygdm, xlbz,start1,lengh1);
	}
	@Override
	public SystemMessages searchById(String id) {
		// TODO Auto-generated method stub
		return mapper.searchById(id);
	}
    @Override
    public int searchCountIndex(String dljgBm, String zydm) {
        // TODO Auto-generated method stub
        return mapper.searchCountIndex(dljgBm, zydm);
    }
    @Override
	public long searchByCountWeek(String ydbz, String dl, String ygdm,
			String type, Date now1, Date last1) {
		// TODO Auto-generated method stub
		return mapper.searchByCountWeek(ydbz,dl,ygdm,type,now1,last1);
	}

	@Override
	public long searchByCountMonth(String ydbz, String dl, String ygdm,
			String begin, String end, String type) {
		// TODO Auto-generated method stub
		return mapper.searchByCountMonth(ydbz,dl,ygdm,begin,end,type);
	}

	@Override
	public long searchByCountByLastWeek(String ydbz, String dl, String ygdm,
			String begin, String end, String type) {
		// TODO Auto-generated method stub
		return mapper.searchByCountByLastWeek(ydbz,dl,ygdm,begin,end,type);
	}

	@Override
	public long searchCountByYear(String ydbz, String dl, String ygdm,
			String begin, String end, String type) {
		// TODO Auto-generated method stub
		return mapper.searchCountByYear(ydbz,dl,ygdm,begin,end,type);
	}

	@Override
	public long searchCountByZdy(String ydbz, String dl, String ygdm,
			String beginTime, String endTime, String type) {
		// TODO Auto-generated method stub
		return mapper.searchCountByZdy(ydbz,dl,ygdm,beginTime,endTime,type);
	}

	@Override
	public long searchCountByAll(String dl, String ygdm) {
		// TODO Auto-generated method stub
		return mapper.searchCountByAll(dl,ygdm);
	}

	@Override
	public long searchCountBytype(String dl, String ygdm, String type,
			String ydbz) {
		// TODO Auto-generated method stub
		return mapper.searchCountBytype(dl,ygdm,type,ydbz);
	}

	@Override
	public Long searchCountByTx(String dl, String ygdm, String ydbz) {
		// TODO Auto-generated method stub
		return mapper.searchCountByTx(dl,ygdm,ydbz);
	}
	
	/**
     * 查找所有存在消息的客户列表
     * @param dljgBm 代理机构编码
     * @return 客户列表
     */
	public List<Map<String, String>> getAllKhList(String zydm) {
	    return mapper.searchAllKhList(zydm);
	}
	
	/**
     * App查找所有存在消息的客户列表
     * @param dljgBm 代理机构编码
     * @return 客户列表
     */
    public List<Map<String, String>> getAllAppKhList(String zydm) {
        return mapper.getAllAppKhList(zydm);
    }
	
    /**
     * 查找所有客户列表
     * @param dljgBm 代理机构编码
     * @return 客户列表
     */
	public List<Map<String, String>> findAllPtKhxx(String dljgBm,String zydm,String gsmc){
	    return mapper.findAllPtKhxx(dljgBm,zydm,gsmc);
	}
	
	 /**
     * 查找所有客户列表
     * @param dljgBm 代理机构编码
     * @return 客户列表
     */
    public List<Map<String, String>> findAllAppPtKhxx(String khbm,String gsmc){
        return mapper.findAllAppPtKhxx(khbm,gsmc);
    }
	   
/*    *//**
     * 查找所有消息的客户列表
     * @param dljgBm 代理机构编码
     * @return 客户列表
     *//*
    public List<PtLtxx>  getLtxx(String dljgBm) {
        return mapper.searchLtxx(dljgBm);
    }*/
	
    /**
     * 查找对应客户的聊天记录
     * @param dljgBm 代理机构编码，
     * @param khbm 代理机构编码，
     * @return 客户列表
     */
    public Map<String, Object> getLtxx(String dljgBm, String khbm) {
        
        List<Map<String, String>> lsm = mapper.searchLtxx(dljgBm, khbm);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("userId", khbm);
        map.put("ltxx", lsm);
        return map;
    }
    
    /**
     * @param ptLtxx 聊天信息
     */
    public void addLtxx(PtLtxxMx ptLtxx) {
        mapper.addLtxx(ptLtxx);
    }
    
    /**
     * @param ptLtxx 聊天信息
     */
    public void updateLtxx(PtLtxxMx ptLtxx) {
        mapper.updateLtxx(ptLtxx);
    }
    
	@Override
	public List<SystemMessages> searchByAllAndAdmin(String dl,int start1, int lengh1, String ydbz,
			String type) {
		// TODO Auto-generated method stub
		return mapper.searchByAllAndAdmin(dl,start1,lengh1,ydbz,type);
	}
	@Override
	public long searchByAllAndAdmincount(String dl,int start1, int lengh1, String ydbz,
			String type) {
		// TODO Auto-generated method stub
		return mapper.searchByAllAndAdmincount(dl,start1,lengh1,ydbz,type);
	}
    @Override
    public long searchByAllAndAdmincountNew(String dljgBm, String ydbz, String type,
            Date ssDate, Date seDate, String selectTime, String zydm) {
        // TODO Auto-generated method stub
        return mapper.searchByAllAndAdmincountNew(dljgBm, ydbz, type, ssDate, seDate, selectTime, zydm);
    }
    @Override
    public List<SystemMessages> searchByAllAndAdminNew(String dljgbm,
            int start, int length, String ydbz, String type, Date ssDate,
            Date seDate, String selectTime, String zydm) {
        // TODO Auto-generated method stub
        return mapper.searchByAllAndAdminNew(dljgbm, start, length, ydbz, type, ssDate, seDate, selectTime, zydm);
    }
    @Override
    public void addSystemMessagesByUserList(SystemMessages sysmes,
            List<Map<String, String>> list) {
        // TODO Auto-generated method stub
        mapper.addSystemMessagesByUserList(sysmes,list);
    }
    @Override
    public void addSystemMessagesByHtbmList(SystemMessages sysmes,
            List<Map<String, String>> list) {
        // TODO Auto-generated method stub
        mapper.addSystemMessagesByHtbmList(sysmes,list);
    }
    @Override
    public void addSystemMessagesByUserString(Map<String, Object> map) {
        // TODO Auto-generated method stub
        mapper.addSystemMessagesByUserString(map);
    }
   
}
