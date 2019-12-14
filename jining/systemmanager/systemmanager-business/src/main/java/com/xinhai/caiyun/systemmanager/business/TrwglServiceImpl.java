package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.Trwgl;
import com.xinhai.caiyun.systemmanager.dao.TrwglMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import service.TrwglService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by super man on 2018/5/21.
 */
@Service
public class TrwglServiceImpl implements TrwglService {

    @Autowired
    private TrwglMapper trwglMapper;

    @Override
    public Trwgl findTrwgl(String id) {
        return trwglMapper.findTrwgl(id);
    }

    @Override
    public void createTrwgl(Trwgl trwgl) {
        trwglMapper.createTrwgl(trwgl);
    }

    @Override
    public void deleteTrwglbyId(Trwgl trwgl) {
        trwglMapper.deleteTrwglbyId(trwgl);
    }

    @Override
    public void deleteTrwgl(List<String> id) {
        trwglMapper.deleteTrwgl(id);
    }

    @Override
    public void insertList(List<Trwgl> list) {
        trwglMapper.insertList(list);
    }

    @Override
    public void updateTrwgl(Trwgl trwgl) {
        trwglMapper.updateTrwgl(trwgl);
    }

    @Override
    public List<Trwgl> findTrwgllist(int start, int len, String rwType, String wtType, String searchText, String zydm,String rwzt) {
        return trwglMapper.findTrwgllist(start, len, rwType, wtType, searchText, zydm,rwzt);
    }

    @Override
    public int findTrwgllistNums(String rwType, String wtType, String searchText, String zydm) {
        return trwglMapper.findTrwgllistNums(rwType, wtType, searchText, zydm);
    }

    @Override
    public void updateBlzt(Integer[] idlist,String blzt,String if_jd) {
        this.trwglMapper.updateBlzt(idlist,blzt,if_jd);
    }

    @Override
    public void updateBlzt002(Integer[] idlist) {
        this.trwglMapper.updateBlzt002(idlist);
    }

    @Override
    public void deleteRw(String[] ypbm) {
        this.trwglMapper.deleteRw(ypbm);
    }

    @Override
    public void gxrwwry(String[] wtid, String zxry) {
        this.trwglMapper.gxrwwry(wtid,zxry);
    }

    @Override
    public void updateTrwglWtid(Trwgl trwgl) {
        trwglMapper.updateTrwglWtid(trwgl);
    }
}
