package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.BasicsParmaterSetting;
import com.xinhai.caiyun.systemmanager.api.BasicsParmaterSettingService;
import com.xinhai.caiyun.systemmanager.dao.BasicsParmaterSettingMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 基础设置实现BasicsParmaterSettingService类.
 * 
 * @author wangshuo
 *
 */
@Repository
public class BasicsParmaterSettingServiceImpl implements
        BasicsParmaterSettingService {
    @Autowired
    BasicsParmaterSettingMapper basicsParmaterSettingMapper;

    @Override
    public List<BasicsParmaterSetting> finddayByDl(String dl, String remindCode) {
        // TODO Auto-generated method stub
        return basicsParmaterSettingMapper.finddayByDl(dl, remindCode);
    }

    /**
     * 通过代理机构编码查询所有信息
     * 
     * @param dl
     *            代理机构编码
     * @param lxdm
     *            查询的是哪种提示信息
     * @return list 信息列表
     */
    @Override
    public List<BasicsParmaterSetting> findAllByDl(String dl, String lxdm) {
        if (lxdm.equals("100")) {
            return basicsParmaterSettingMapper.findOneByDl(dl);
        } else if (lxdm.equals("200")) {
            return basicsParmaterSettingMapper.findTwoByDl(dl);
        } else if (lxdm.equals("300")) {
            return basicsParmaterSettingMapper.findThreeByDl(dl);
        } else {
            return basicsParmaterSettingMapper.findAllByDl(dl);
        }

    }

    @Override
    public void updateRemindDay1(String taxbeforeday, String dl) {
        // TODO Auto-generated method stub
        basicsParmaterSettingMapper.updateRemindDay1(taxbeforeday, dl);
    }

    @Override
    public void updateRemindDay2(String paybeforeday, String dl) {
        // TODO Auto-generated method stub
        basicsParmaterSettingMapper.updateRemindDay2(paybeforeday, dl);
    }

    @Override
    public void updateRemindDay3(String afterpayday, String dl) {
        // TODO Auto-generated method stub
        basicsParmaterSettingMapper.updateRemindDay3(afterpayday, dl);

    }

    @Override
    public void updateExpirecontract(String taxbeforeday, String dl) {
        basicsParmaterSettingMapper.updateExpirecontract(taxbeforeday,dl);
    }

    @Override
    public void updateOverduecontract(String taxbeforeday, String dl) {
        basicsParmaterSettingMapper.updateOverduecontract(taxbeforeday,dl);
    }

    @Override
    public int insertXx1(String dl, String taxpayerNumber) {
        // TODO Auto-generated method stub
        return basicsParmaterSettingMapper.insertXx1(dl, taxpayerNumber);
    }

    @Override
    public int insertXx2(String dl, String taxpayerNumber) {
        // TODO Auto-generated method stub
        return basicsParmaterSettingMapper.insertXx2(dl, taxpayerNumber);
    }

    @Override
    public int insertXx3(String dl, String taxpayerNumber) {
        // TODO Auto-generated method stub
        return basicsParmaterSettingMapper.insertXx3(dl, taxpayerNumber);
    }

	@Override
	public List<BasicsParmaterSetting> findByTaskOut(String dl, String remindCode) {
		// TODO Auto-generated method stub
		return basicsParmaterSettingMapper.findByTaskOut(dl,remindCode);
	}

	@Override
	public List<BasicsParmaterSetting> findByTaskExpiration(String dl, String remindCode) {
		// TODO Auto-generated method stub
		return basicsParmaterSettingMapper.findByTaskExpiration(dl,remindCode);
	}

	@Override
	public int insertXx4(String dl, String taxpayerNumber) {
		// TODO Auto-generated method stub
		return basicsParmaterSettingMapper.insertXx4(dl,taxpayerNumber);
	}

	@Override
	public int insertXx5(String dl, String taxpayerNumber) {
		// TODO Auto-generated method stub
		return basicsParmaterSettingMapper.insertXx5(dl,taxpayerNumber);
	}

	@Override
	public void updateTaskOut(String taxbeforeday, String dl) {
		// TODO Auto-generated method stub
		basicsParmaterSettingMapper.updateTaskOut(taxbeforeday,dl);
	}

	@Override
	public void updateTaskExpiration(String taxbeforeday, String dl) {
		// TODO Auto-generated method stub
		basicsParmaterSettingMapper.updateTaskExpiration(taxbeforeday,dl);
	}

	@Override
	public List<BasicsParmaterSetting> findByOnTrial(String dl,
                                                     String remindCode) {
		// TODO Auto-generated method stub
		return basicsParmaterSettingMapper.findByOnTrial(dl,remindCode);
	}

	@Override
	public int insertXx6(String dl, String taxpayerNumber) {
		// TODO Auto-generated method stub
		return basicsParmaterSettingMapper.insertXx6(dl,taxpayerNumber);
	}

	@Override
	public void updateOnTrial(String taxbeforeday, String dl) {
		// TODO Auto-generated method stub
		basicsParmaterSettingMapper.updateOnTrial(taxbeforeday,dl);
	}

}
