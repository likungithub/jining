package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.dao.BmgzMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.BmgzService;

import java.util.Calendar;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class BmgzServiceImpl implements BmgzService {
    @Autowired
    private BmgzMapper bmgzMapper;

    /*修改委托单编码规则*/
    public void updateBmgz(Map map){
        bmgzMapper.updateBmgz(map);
    }
    /*修改样品编码规则*/
    public void updateBmgzyp(Map map){
        bmgzMapper.updateBmgzyp(map);
    }
    /*查询当前编码规则*/
    public List<Map> selectBmgz() {
        return bmgzMapper.selectBmgz();
    }
    /*新增委托单*/
    public void insertBmgz(Map map){
        bmgzMapper.insertBmgz(map);
    }
    /*新增样品*/
    public void insertBmgzyp(Map map){
        bmgzMapper.insertBmgzyp(map);
    }

    public String getMaxWtbm() {
        String res = "";
        String maxstr = bmgzMapper.getMaxWtbm();
        List<Map> list = bmgzMapper.selectBmgz();
        if (list == null || list.size() < 1) {
            res =  "" + java.util.Calendar.getInstance().get(Calendar.YEAR);
            if (maxstr == null || "".equals(maxstr)) {
                res = res + "0001";
            } else {
                int num = Integer.parseInt(maxstr.substring(maxstr.length() - 4));
                String xh = String.format("%04d", num + 1);
                String y = maxstr.substring(maxstr.length() - 8, maxstr.length() - 4);
                if (y.equals(res))
                    res = res + xh;
                else
                    res = res + "0001";
            }
        } else {
            //JMJC+年份+委托形式编号+2位月份+4位序号。1+5+2+3+6
            Map bmgz = list.get(0);
            res = java.util.Calendar.getInstance().get(Calendar.YEAR) +"";
            String mm = String.format("%02d", java.util.Calendar.getInstance().get(Calendar.MONTH) + 1);
            String bm1 = bmgz.get("bm1").toString();
            String bm2 = bmgz.get("bm2").toString();
            String bm3 = bmgz.get("bm3").toString();
            String addr = bmgz.get("bm4").toString();
            if (maxstr == null || "".equals(maxstr)) {
                res = bm1 + res + bm2 + mm + "0001";
            } else {
                int num = Integer.parseInt(maxstr.substring(maxstr.length() - 4));
                String xh = String.format("%04d", num + 1);
                String y = maxstr.substring(0, maxstr.length()-6);
                if (y.indexOf(res) > -1) {    //年份相等
                    String m = maxstr.substring(maxstr.length() - 6, maxstr.length() - 4);
                    if (mm.equals(m)) {
                        res = bm1 + res + bm2 + mm + xh;
                    } else {
                        res = bm1 + res + bm2 + mm + "0001";
                    }
                }
                else
                    res = bm1 + res + bm2 + mm + "0001";
            }
        }

        return res;
    }

    /**
     * 自动编号
     * @param rwlxbm 委托任务类型编码
     * @return
     */
    public String getMaxYpbm(String rwlxbm) {
        String res = "";
        String maxstr = bmgzMapper.getMaxYpbm();
        List<Map> list = bmgzMapper.selectBmgz();
        if (list == null || list.size() < 1) {
            res =  "" + java.util.Calendar.getInstance().get(Calendar.YEAR);
            if (maxstr == null || "".equals(maxstr)) {
                res = res + "0001";
            } else {
                int num = Integer.parseInt(maxstr.substring(maxstr.length() - 4));
                String xh = String.format("%04d", num + 1);
                String y = maxstr.substring(maxstr.length() - 8, maxstr.length() - 4);
                if (y.equals(res))
                    res = res + xh;
                else
                    res = res + "0001";
            }
        } else {
            //JMJC+年份+委托形式编号+2位月份+4位序号。1+5+2+3+6
            Map bmgz = list.get(0);
            res = java.util.Calendar.getInstance().get(Calendar.YEAR) +"";
            String mm = String.format("%02d", java.util.Calendar.getInstance().get(Calendar.MONTH) + 1);
            String bm1 = bmgz.get("bm1").toString();
            String bm2 = rwlxbm; //bmgz.get("bm2").toString();
            String bm3 = bmgz.get("bm3").toString();
            String addr = bmgz.get("bm4").toString();
            if (maxstr == null || "".equals(maxstr)) {
                res = bm1 + res + bm2 + mm + "0001";
            } else {
                int num = Integer.parseInt(maxstr.substring(maxstr.length() - 4));
                String xh = String.format("%04d", num + 1);
                String y = maxstr.substring(0, maxstr.length()-6);
                if (y.indexOf(res) > -1) {    //年份相等
                    String m = maxstr.substring(maxstr.length() - 6, maxstr.length() - 4);
                    if (mm.equals(m)) {
                        res = bm1 + res + bm2 + mm + xh;
                    } else {
                        res = bm1 + res + bm2 + mm + "0001";
                    }
                }
                else
                    res = bm1 + res + bm2 + mm + "0001";
            }
        }

        return res;
    }
    public String getMaxYpbm2() {
        String res = "";
        String maxstr = bmgzMapper.getMaxYpbm();
        List<Map> list = bmgzMapper.selectBmgz();
        if (list == null || list.size() < 1) {
            res = java.util.Calendar.getInstance().get(Calendar.YEAR) +"";
            if (maxstr == null || "".equals(maxstr)) {
                res = res + "0001";
            } else {
                int num = Integer.parseInt(maxstr.substring(maxstr.length() - 4));
                String xh = String.format("%04d", num + 1);
                String y = maxstr.substring(maxstr.length() - 8, maxstr.length() - 4);
                if (y.equals(res))
                    res = res + xh;
                else
                    res = res + "0001";
            }
        } else {
            Map bmgz = list.get(0);
            res = java.util.Calendar.getInstance().get(Calendar.YEAR) +"";
//            String bm1 = bmgz.get("bm1").toString();
//            String bm2 = bmgz.get("bm2").toString();
//            String bm3 = bmgz.get("bm3").toString();
            String addr = bmgz.get("ypaddress").toString();
            if (maxstr == null || "".equals(maxstr)) {
                res = addr + res + "0001";
            } else {
                int num = Integer.parseInt(maxstr.substring(maxstr.length() - 4));
                String xh = String.format("%04d", num + 1);
                String y = maxstr.substring(maxstr.length() - 8, maxstr.length() - 4);
                if (y.equals(res))
                    res = addr + res + xh;
                else
                    res = addr + res + "0001";
            }
        }
        return res;
    }
}
