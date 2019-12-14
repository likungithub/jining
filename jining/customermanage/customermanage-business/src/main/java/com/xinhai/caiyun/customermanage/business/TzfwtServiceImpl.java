package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.Tqywt;
import com.xinhai.caiyun.customermanage.api.Typgl;
import com.xinhai.caiyun.customermanage.api.Tzfwt;
import com.xinhai.caiyun.customermanage.dao.TypglMapper;
import com.xinhai.caiyun.customermanage.dao.TzfwtMapper;
import com.xinhai.caiyun.customermanage.service.TzfwtService;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import org.jboss.logging.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.*;

@Service
public class TzfwtServiceImpl implements TzfwtService {

    @Autowired
    private TzfwtMapper tzfwtMapper;

    @Autowired
    private TypglMapper typglMapper;

    @Override
    public Map findTzfwt(String id) {
        return tzfwtMapper.findTzfwt(id);
    }
    @Override
    public List<Map> findTzfwtByCydbm(String id) {
        return tzfwtMapper.findTzfwtByCydbm(id);
    }
    @Override
    public List<Tqywt> findTzfwtAll(int start, int len, String wtid, String ypmc, String cydh,String bcjdwmc, String ny) {
        return tzfwtMapper.findTzfwtAll(start, len, wtid, ypmc,cydh, bcjdwmc, ny);
    }

    @Override
    public int findTzfwtAllNums(int start, int len, String wtid, String ypmc,String cydh,String bcjdwmc, String ny) {
        return tzfwtMapper.findTzfwtAllNums(start, len, wtid, ypmc,cydh, bcjdwmc, ny);
    }

    @Override
    public List<Typgl> findYddcyypAll(int start, int len, String ypmc, String wtid) {
        return tzfwtMapper.findYddcyypAll(start, len, ypmc, wtid);

    }

    @Override
    public int findYddcyypAllNums(int start, int len, String ypmc, String wtid) {
        return tzfwtMapper.findYddcyypAllNums(start, len, ypmc, wtid);
    }

    @Override
    public void createTzfwt(Tqywt tqywt) {
        tzfwtMapper.createTzfwt(tqywt);
    }

    @Override
    public void deleteTzfwtbyId(String id) {
        tzfwtMapper.deleteTzfwtbyId(id);
    }

    @Override
    public void insertList(List<Tzfwt> list) {
        tzfwtMapper.insertList(list);
    }

    @Override
    public void updateTzfwt(Tqywt ypgl) {
        tzfwtMapper.updateTzfwt(ypgl);
    }

    @Override
    public List<Tzfwt> findAllWt() {
        return tzfwtMapper.findAllWt();
    }

    /**
     * 导入excel
     */
    public void importydywtExcel(InputStream in, MultipartFile file) throws Exception{
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in, file.getOriginalFilename());
        List<Map> list = new ArrayList<Map>();
        Map map =null;
        for(int i = 0;i<listob.size();i++){
            List<Object> ob = listob.get(i);
             map=new HashMap();
            map.put("wtid",String.valueOf(ob.get(0)));
            map.put("ypmc",String.valueOf(ob.get(1)));
            map.put("sb",String.valueOf(ob.get(2)));
            map.put("sjdw",String.valueOf(ob.get(3)));
            map.put("sjdwlxdh",String.valueOf(ob.get(4)));
            map.put("scdw",String.valueOf(ob.get(5)));
            map.put("scdwlxdh",String.valueOf(ob.get(6)));
            map.put("rwly",String.valueOf(ob.get(7)));
            map.put("cyrq",String.valueOf(ob.get(8)));
            map.put("scrq",String.valueOf(ob.get(9)));
            map.put("syrq",String.valueOf(ob.get(10)));
            map.put("ypsl",String.valueOf(ob.get(11)));
            map.put("ybjs",String.valueOf(ob.get(12)));
            map.put("ypzxbz",String.valueOf(ob.get(13)));
            map.put("ypdj",String.valueOf(ob.get(14)));
            map.put("cyry",String.valueOf(ob.get(15)));
            map.put("ggxh",String.valueOf(ob.get(16)));
            map.put("cydd",String.valueOf(ob.get(17)));
            map.put("syry",String.valueOf(ob.get(18)));
            map.put("bzxx",String.valueOf(ob.get(19)));

            if(map.get("wtid")!=null && map.get("wtid").toString().trim().length()> 0 && tzfwtMapper.checkYpbm(String.valueOf(ob.get(0))).size()==0){//委托编码是否存在数据库中  存在就放在集合里
                list.add(map);
            }
        }
        tzfwtMapper.createTzfwtliu(list);
        typglMapper.createTypglliu(list);
    }

    @Override
    public List<Map> getQueryAllCustomerInformation(int start, int len) {
        return tzfwtMapper.getQueryAllCustomerInformationM(start,len);
    }

    @Override
    public Integer getQuerySumCustomerInformation(int start, int len) {
        return tzfwtMapper.getQuerySumCustomerInformationM(start,len);
    }


}
