package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.*;
import com.xinhai.caiyun.customermanage.dao.*;
import com.xinhai.caiyun.customermanage.service.TypglService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class TypglServiceImpl implements TypglService {

    @Autowired
    private TypglMapper typglMapper;

    @Autowired
    private TypcbMapper typcbMapper;

    @Autowired
    private TyppsMapper typpsMapper;

    @Autowired
    private TypspMapper typspMapper;

    @Autowired
    private TypcfMapper typcfMapper;

    @Autowired
    private TtmdyMapper ttmdyMapper;

    @Autowired
    private TLZypglMapper tlZypglMapper;
    /**
     * 通过id获取样品接收数据
     * @param id
     * @return
     */
    public Typgl findTypjs(String id){
    	 return typglMapper.findTypjs(id);
    }

    /**
     * 获取样品样品接收数据
     * @return
     */
    public List<TwtJbxx> findTypjsAll(int start, int len, String htmc, String htbh, String htlx, String wtdwmc,Date HtstartDate,
            Date HtendDate, Date BgstartDate, Date BgendDate,String ywry,String zydm,String jszt){
    	return typglMapper.getTypjsAll(start, len, htmc, htbh, htlx, wtdwmc, HtstartDate, HtendDate, BgstartDate, BgendDate, ywry,zydm,jszt);
    }
    /**
     * 修改样品管理表的接收状态
     * @param jszt
     */
    public void alterYpJS_jszt(String jszt,String ypbm){
        typglMapper.alterYpJS_jszt(jszt,ypbm);
    };
    /**
     * 删除样品接收响相应的数据  在样品管理人员表中
     * @param lx
     * @param ypbm
     */
    public void deleteYpJS_rydm(String lx,String ypbm){
        typglMapper.deleteYpJS_rydm(lx,ypbm);
    };
    /**
     * 获取全部样品数据的数量
     * @return
     */
    public int findTypjsAllNums(String htmc, String htbh, String htlx, String wtdwmc,Date HtstartDate,
            Date HtendDate, Date BgstartDate, Date BgendDate,String ywry,String zydm,String jszt){
    	return  typglMapper.getTypjsAllNums(htmc, htbh, htlx, wtdwmc, HtstartDate, HtendDate, BgstartDate, BgendDate, ywry,zydm,jszt);
    }

    /**
     * 获取样品详情列表
     */
    @Override
    public List<Typgl> getTypjsAlYpxq(int start, int len,String wtid,String zydm,String jszt,Map map) {
    	// TODO Auto-generated method stub
    	return typglMapper.getTypjsAlYpxq(start,len,wtid, zydm, jszt,map);
    }

    @Override
    public int getTypjsAlYpxqNums(String wtid, String zydm, String jszt,Map map) {
    	// TODO Auto-generated method stub
    	return typglMapper.getTypjsAlYpxqNums(wtid, zydm, jszt,map);
    }

    /**
     * 样品管理列表_样品接收_样品详情_检测项目列表
     */
    @Override
    public List<TjcxmJbxx> getTypjsAlYpxqJcxm(int start, int len,String zwmcBm,String jcfa,String ypbm,String zydm,String jszt) {
    	// TODO Auto-generated method stub
    	return typglMapper.getTypjsAlYpxqJcxm(start,len,zwmcBm,jcfa,ypbm, zydm, jszt);
    }

    public int  getTypjsAlYpxqJcxmNums(String zwmcBm,String jcfa,String ypbm,String zydm,String jszt){
    	return typglMapper.getTypjsAlYpxqJcxmNums(zwmcBm,jcfa,ypbm, zydm, jszt);
    }

    /**
     * 通过id更新样品接收状态
     * @param ypgl
     * @return
     */
    @Override
    public void updateTypglJszt(Typgl ypgl){
    	 typglMapper.updateTypglJszt(ypgl);
    }

    @Override
    public void createTypgl(Typgl typgl) {
        typglMapper.createTypgl(typgl);
    }

    @Override
    public void deleteTypglbyId(String id) {
        typglMapper.deleteTypglbyId(id);
    }

    @Override
    public void deleteTypgl(List<String> id) {
        typglMapper.deleteTypgl(id);
        typglMapper.delYpJcxm(id);
    }
    /**
     * 批量删除
     * @param
     */
    @Transactional
    public void delWtxx(List<String> id){
    	typglMapper.deleteWtxxByWtid(id);
        typglMapper.deleteTypglByWtid(id);

    }

    @Override
    public void deleteJcxm(List<String> id, String ypid) {
        typglMapper.deleteJcxm(id, ypid);
    }

    @Override
    public void insertList(List<Typgl> list) {
        typglMapper.insertList(list);
    }

    @Override
    public void updateTypgl(Typgl ypgl) {
        typglMapper.updateTypgl(ypgl);
    }

    @Override
    public void updateYddcyypxx(Typgl ypgl) {
        typglMapper.updateYddcyypxx(ypgl);
    }

    @Override
    public Typgl findTypxx(String id) {
        return typglMapper.findTypxx(id);
    }

    @Override
    public List<Typgl> findTypxxlist(int start, int len, String type, String searchText, String zydm) {
        return typglMapper.findTypxxlist(start,len,type,searchText, zydm);
    }

    @Override
    public int findTypxxlistNums(String type, String searchText, String zydm) {
        return typglMapper.findTypxxlistNums(type,searchText, zydm);
}

    @Override
    public void updateYpJcxmList(String uuid, String ypid) {
        typglMapper.updateYpJcxmList(uuid,ypid);
    }
    @Override
	public void insert(List<Map> mapList) {
    	typglMapper.insert(mapList);
	}

    public List<Tlygl> getTypjslygl(Map<String, String> map){
    	return typglMapper.getTypjslygl(map);
    }


    public int getTypjslyglNums(Map<String, String> map){
    	return typglMapper.getTypjslyglNums(map);
    }

    @Override
    public List<Yplzd> findYplzd() {
        List<Yplzd>  list =this.typglMapper.findYplzd();
        for(Yplzd s:list) {
            String id  = s.getJcxmid();
            s.setJcxmid(this.typglMapper.findjcxm(id));
        }
        return list;
    }

    @Override
    public List<Ypzblist> ypzbgetRw(String ypbm) {
       List<Ypzblist> LIST = this.typglMapper.ypzbgetRw(ypbm);
        return LIST;
    }

    @Override
    public Integer getYpzbCount(String ypbm) {

        return this.typglMapper.getYpzbCount(ypbm);
    }

    @Override
    public String addYpzb(Ypzblist ypzblist) {
        this.typglMapper.addYpzb(ypzblist);
        return "1";
    }

    @Override
    public void deleteYpzb(String zbypbm) {
        this.typglMapper.deleteYpzb(zbypbm);
    }


    /*样品拆包*/
    @Override
    public List<Map> selectAll(Map map) {
        return typcbMapper.selectAll(map);
    }

    @Override
    public List<Map> selectAlll(Map map) {
        return typcbMapper.selectAlll(map);
    }
    //评审
    @Override
    public List<Map> selectpsAll(Map map) {
        return typcbMapper.selectpsAll(map);
    }


    @Override
    public List<Map> selectspAll(Map map) {
        return typspMapper.selectspAll(map);
    }

    @Override
    public int selectCount(Map map) {
        return typcbMapper.selectCount(map);
    }

    @Override
    public int selectspCount(Map map) {
        return typspMapper.selectspCount(map);
    }

    @Override
    public void updateById(Typcb typcb) {
        typcbMapper.updateById(typcb);
    }

   @Override
    public void updatepsById(Typps typps) { typpsMapper.updatepsById(typps); }
    /*
        @Override
        public void up(Typps typps) { typpsMapper.up(typps); }

        @Override
        public void updatespById(Typsp typsp) { typspMapper.updatespById(typsp); }
    */
    @Override
    public void updatecf(Typgl typgl) {
        typglMapper.updatecf(typgl);
    }

    @Override
    public void updatejcypfb(Typgl typgl) {
        typglMapper.updatejcypfb(typgl);
    }

    @Override
    public void updateJSR(Typcb typcb) {
        typcbMapper.updateJSR(typcb);
    }

    /*条码打印*/
    @Override
    public List<Map> tmdySelect(Map map) {
        return ttmdyMapper.tmdySelect(map);
    }

    @Override
    public int tmdyCount(Map map) {
        return ttmdyMapper.tmdyCount(map);
    }

    /*条码扫描*/
    @Override
    public Typcb tmsmSelect(String ypbm) {
        return ttmdyMapper.tmsmSelect(ypbm);
    }

    /*打印样品条码1*/


    @Override
    public List<Map> ypbmdy(List dy){return typglMapper.ypbmdy(dy); };
    //样品制备编码打印
    @Override
    public List<Map> ypzbdy(List dy){return typglMapper.ypzbdy(dy); }

    @Override
    public void getUPYPUpdate(Typgl typgl) {
        tlZypglMapper.getUPYPUpdateM(typgl);
    };

    public List<Map> getKsByDmList(){return typglMapper.getKsByDmList();}
    @Override
    public List<Map> getByList(Map map) {
        return typglMapper.getByList(map);
    }
    @Override
    public int getByListNum(Map map) {
        return typglMapper.getByListNum(map);
    }
}
