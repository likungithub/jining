package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.Tqywt;
import com.xinhai.caiyun.customermanage.dao.TqywtMapper;
import com.xinhai.caiyun.customermanage.service.TqywtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class TqywtServiceImpl implements TqywtService {

    @Autowired
    private TqywtMapper tqywtMapper;

    @Override
    public Tqywt findTqywt(String id) {
        return tqywtMapper.findTqywt(id);
    }

    @Override
    public List<Tqywt> findTqywtAll(int start, int len, String wtdwmc, String ypmc, String type, String ypbm, String ny) {
        return tqywtMapper.findTqywtAll(start,len,wtdwmc, ypmc, type, ypbm, ny);
}

    @Override
    public int findTqywtAllNums(int start,int len,String wtdwmc, String ypmc, String type, String ypbm, String ny) {
        return tqywtMapper.findTqywtAllNums(start,len,wtdwmc, ypmc,type,ypbm,ny);
    }

    @Override
    public List<Tqywt> findTqywtAllsy(int start, int len, String wtid) {
        return tqywtMapper.findTqywtAllsy(start,len,wtid);
    }

    @Override
    public int findTqywtAllNumssy(int start, int len, String wtid) {
        return tqywtMapper.findTqywtAllNumssy(start,len,wtid);
    }

    @Override
    public void createTqywt(Tqywt tqywt) {
        tqywtMapper.createTqywt(tqywt);
    }

    @Override
    public void deleteTqywtbyId(String id) {
        tqywtMapper.deleteTqywtbyId(id);
    }

    @Override
    public void insertList(List<Tqywt> list) {
        tqywtMapper.insertList(list);
    }

    @Override
    public void updateTqywt(Tqywt ypgl) {
        tqywtMapper.updateTqywt(ypgl);
    }

    @Override
    public String findWtid(String s) {
        return tqywtMapper.findWtid(s);
    }

    @Override
    public List<Map> findById(String id) {
        return tqywtMapper.findById(id);
    }

    @Override
    public String findwtidw(String id) {
        return tqywtMapper.findwtidw(id);
    }

    @Override
    public String findJcxm(String id) {
        return tqywtMapper.findJcxm(id);
    }

    @Override
    public Integer findWtForSave(Map map) {
        return tqywtMapper.findWtForSave(map);
    }

}
