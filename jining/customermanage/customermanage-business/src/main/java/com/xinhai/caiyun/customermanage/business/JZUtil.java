package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.commonmanager.api.RedisClinet;
import com.xinhai.caiyun.commonmanager.utils.AESCipher;
import com.xinhai.caiyun.commonmanager.utils.OSSUploadFileUtil;
import com.xinhai.caiyun.customermanage.api.CustomerManageService;
import com.xinhai.caiyun.customermanage.api.HttpClientUtil;
import com.xinhai.caiyun.customermanage.dao.CustomerManageMapper;
import com.xinhai.caiyun.systemmanager.api.CsXtpz;
import com.xinhai.caiyun.systemmanager.api.CsXtpzService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.File;
import java.net.URLEncoder;
import java.util.*;

import static com.xinhai.caiyun.commonmanager.utils.AESCipher.aesDecryptString;

/**
 * @Author shanliang
 * @Description： 记账接口工具类
 * @Date: 2017-11-28 13:18
 * @Modified By:
 */
@Component
public class JZUtil {

    private static String URL = "";
    private static String TB="0";//不同步

    @Autowired
    private  CustomerManageService customerManageService;
    private static CustomerManageService customerManageService_static;

    @Autowired
    private   RedisClinet redisClient;

    private static RedisClinet redisClient_static;

    @Autowired
    private  CsXtpzService csXtpzService;

    private static CsXtpzService csXtpzService_static;


    //@PostConstruct
    private  void init(){
        try {
            csXtpzService_static = csXtpzService;
            redisClient_static = redisClient;
            customerManageService_static = customerManageService;

            CsXtpz csXtpz = (CsXtpz)redisClient.get(CsXtpzService.prefix + "004");
            //查询数据库参数
            if (csXtpz == null) {
                csXtpz = csXtpzService.findCsXtpzByDm("004");
                redisClient.set(CsXtpzService.prefix + csXtpz.getDmPzlx(), csXtpz);
                URL = csXtpz.getKey1();
            }else{
                URL = csXtpz.getKey1();
            }

            csXtpz = (CsXtpz)redisClient.get(CsXtpzService.prefix + "009");
            //查询数据库参数
            if (csXtpz == null) {
                csXtpz = csXtpzService.findCsXtpzByDm("009");
                redisClient.set(CsXtpzService.prefix + csXtpz.getDmPzlx(), csXtpz);
                TB = csXtpz.getKey1();
            }else{
                TB = csXtpz.getKey1();
            }

        }catch (Exception e){
            e.printStackTrace();
        }
    }


    private static void initTB(){
        try {
            CsXtpz csXtpz = (CsXtpz)redisClient_static.get(CsXtpzService.prefix + "009");
            //查询数据库参数
            if (csXtpz == null) {
                csXtpz = csXtpzService_static.findCsXtpzByDm("009");
                redisClient_static.set(CsXtpzService.prefix + csXtpz.getDmPzlx(), csXtpz);
                TB = csXtpz.getKey1();
            }else{
                TB = csXtpz.getKey1();
            }
        }catch (Exception e){
            e.printStackTrace();
        }
    }


    public static Map doGet(String url,Map map){
        Map resultMap = new HashMap();
        try {
            HttpClientUtil httpClientUtil = new HttpClientUtil();
            httpClientUtil.init();
            String str_return =  httpClientUtil.doGet(url, map);
            resultMap.put("success",true);
            resultMap.put("data",str_return);
        }catch (Exception e){
            resultMap.put("success",false);
        }
        return resultMap;
    }


    public static Map doPost(String url,Map map){
        Map resultMap = new HashMap();
        try {
            HttpClientUtil httpClientUtil = new HttpClientUtil();
            httpClientUtil.init();
            resultMap =  httpClientUtil.doPost(url, map);
            resultMap.put("success",true);
        }catch (Exception e){
            resultMap.put("success",false);
        }
        return resultMap;
    }


    private static String key = "Gx_Cys_key@2017!";
    public static String dec(String res){
        try {
             res= AESCipher.aesDecryptString(res, key);
             return res;
        }catch (Exception e){

        }
        return res;
    }


    public static String enc(String res){
        try {
            res =  CryptAES.AES_Encrypt(res);
            return res;
        }catch (Exception e){

        }
        return res;
    }

    public static String decc(String res){
        try {
            res =  CryptAES.AES_Decrypt(res);
            return res;
        }catch (Exception e){

        }
        return res;
    }

    public static boolean notNULL(String str) {
        boolean result = false;
        if ((str != null) && (!"".equals(str)) && (!"null".equals(str)) && (!"undefined".equals(str))) {
            result = true;
        }
        return result;
    }

    public static Map decMap(Map map){
        Map m = new HashMap();
        Set keys = map.keySet();
        Iterator iterator = keys.iterator();
        while(iterator.hasNext()){
            String key = iterator.next()+"";
            String value = map.get(key)+"";
            value = decc(value);
            m.put(key,value);
        }
        return m;
    }

    public static String getTB(){
        initTB();
        return TB;
    }

   /**
    * @Author: shanliang
    * @Description:同步方法 0全部 1公司信息同步 2员工信息同步 3用户公司关系
    * @Date:2017-12-22 16:27
    **/
    public synchronized  static Map tbxx(String bs,String zydm,String khbm) {
        try{
            initTB();
            if(TB.equals("0")) {
                //如果不同步则跳过提示
                Map m = new HashMap();
                m.put("result", "ok");
                return m;
            }
        }catch (Exception e){}
        String url = "http://120.27.232.180:88/yh.php?ac=single_login";
        url = "http://120.27.232.180:88/yh.php?ac=single_login";
        url = "http://120.27.232.180:10090/ycwutf8/single_login.php?ac=single_login";
        url = URL;
        String urls[] = url.split("/single_login");
        String gsxxtb_url = urls[0] + "/single_login.php?ac=sl_dw";
        String ryxxtb_url = urls[0] + "/single_login.php?ac=sl_ry";
        String rykh_url = urls[0] + "/single_login.php?ac=sl_rykh";
        Map result = new HashMap();
        result.put("result", "error");
        try {

            //用户信息同步

            if ((bs.indexOf("1") != -1)) {
                Map m = new HashMap();
                String sql = "select customer.name as dwmc,user.zydm,user.name as xm,user.yddh as sjh,(select u.yddh from user u where u.dljg_bm=user.dljg_bm and u.if_manager='1') as cwzgdh, case user.if_manager when '1' THEN '01' ELSE '02' END as js,user.fwjsrq as yxrq,'10' as yhs from user left join role on user.jsdm=role.id left JOIN customer ON user.dljg_bm=customer.code where customer.SCBZ=FALSE and user.is_enabled=true ";
                if(notNULL(zydm)){
                    sql+="  and user.zydm='"+zydm+"'";
                }
                m.put("sql", sql);
                List<Map> userxxs = customerManageService_static.query(m);
                if(userxxs.size()>0) {
                    for (Map map : userxxs) {
                        System.out.println(map);
                        String dwmc = map.get("dwmc") + "";//单位名称
                        dwmc = enc(dwmc);

                        String xm = map.get("xm") + "";//人员姓名
                        xm = enc(xm);


                        String sjh = map.get("sjh") + "";//用户手机号
                        sjh = dec(sjh);
                        sjh = enc(sjh);


                        /*01=主管会计
                        02=记账会计*/
                        String js = map.get("js") + "";
                        js = enc(js);

                        String cwzgdh = map.get("cwzgdh") + "";//主管会计手机号
                        cwzgdh = dec(cwzgdh);
                        cwzgdh = enc(cwzgdh);


                        String yxrq = map.get("yxrq") + "";//有效日期
                        if (!notNULL(yxrq)) {
                            yxrq = "2025-01-01";
                        }
                        yxrq = enc(yxrq);


                        String yhs = map.get("yhs") + "";//用户数
                        yhs = enc(yhs);

                        Map cs_map = new HashMap();
                        cs_map.put("dwmc", dwmc);
                        cs_map.put("xm", xm);
                        cs_map.put("sjh", sjh);
                        cs_map.put("cwzgdh", cwzgdh);
                        cs_map.put("js", js);
                        cs_map.put("yxrq", yxrq);
                        cs_map.put("yhs", yhs);
                        try {
                            result = doPost(ryxxtb_url, cs_map);
                            result.put("enc_data",cs_map);
                            result.put("dec_data",decMap(cs_map));
                            result.put("loginurl", url + "&mobile=" + URLEncoder.encode(sjh, "UTF-8"));
                        } catch (Exception e) {
                            result.put("result", "出现异常");
                        }
                        //如果成功则更新同步状态
                    }
                }else{
                    result.put("result", "没有数据");
                }
            }

            if ((bs.indexOf("2") != -1)) {
                //公司信息同步
                Map m = new HashMap();
                String sql = "select khbm as dwbm,gsmc as dwmc,pt_khxx.nsrsbh as shxydm,frdb as fr,'' as frdh,user.zydm as cwzgdm,(select u.name from user u where u.dljg_bm=user.dljg_bm and u.if_manager='1') as cwzg,(select u.yddh from user u where u.dljg_bm=user.dljg_bm and u.if_manager='1')  as cwzgdh,TZFWRQ as yxrq from pt_khxx LEFT join user on user.zydm=pt_khxx.ZYDM where pt_khxx.nsrsbh !='' and pt_khxx.SCBZ=FALSE and user.is_enabled=true";
                if(notNULL(khbm)){
                    sql+=" and pt_khxx.khbm='"+khbm+"'";
                }
                m.put("sql", sql);
                List<Map> khxxs = customerManageService_static.query(m);

                if(khxxs.size()>0) {
                    for (Map map : khxxs) {
                        System.out.println(map);
                        String id = map.get("khbm") + "";//ID
                        String dwmc = map.get("dwmc") + "";//单位名称
                        dwmc = enc(dwmc);
                        String shxydm = map.get("shxydm") + "";//社会信用代码
                        shxydm = enc(shxydm);
                        String fr = map.get("fr") + "";//法人
                        fr = dec(fr);
                        fr = enc(fr);
                        String frdh = map.get("frdh") + "";//法人电话
                        frdh = enc(frdh);
                        String cwzg = map.get("cwzg") + "";//财务主管
                        cwzg = enc(cwzg);
                        String cwzgdh = map.get("cwzgdh") + "";//财务主管电话
                        cwzgdh = dec(cwzgdh);
                        cwzgdh = enc(cwzgdh);
                        String yxrq = map.get("yxrq") + "";//有效日期
                        if (!notNULL(yxrq)) {
                            yxrq = "2025-01-01";
                        }
                        yxrq = enc(yxrq);
                        Map cs_map = new HashMap();
                        cs_map.put("dwmc", dwmc);
                        cs_map.put("shxydm", shxydm);
                        cs_map.put("fr", fr);
                        cs_map.put("frdh", frdh);
                        cs_map.put("cwzg", cwzg);
                        cs_map.put("cwzgdh", cwzgdh);
                        cs_map.put("yxrq", yxrq);
                        try {
                            result = doPost(gsxxtb_url, cs_map);
                            result.put("enc_data",cs_map);
                            result.put("dec_data",decMap(cs_map));
                        } catch (Exception e) {
                            result.put("result", e.getLocalizedMessage());
                        }
                        //如果成功则更新同步状态
                    }
                }else{
                    result.put("result", "没有数据");
                }
            }

            //用户公司关系同步
            if ((bs.indexOf("3") != -1)) {
                Map m = new HashMap();
                String sql = "select user.yddh as sjh,user.zydm as zydm,pt_khxx.gsmc as dwmc_list,pt_khxx.KHBM as dwbm from pt_khxx LEFT JOIN user on pt_khxx.ZYDM=user.zydm where pt_khxx.SCBZ=FALSE and user.is_enabled=true ";
                if (notNULL(zydm)) {
                    sql += " and user.zydm='" + zydm + "' ";
                }
                if (notNULL(khbm)) {
                    sql += " and pt_khxx.khbm='" + khbm + "' ";
                }
                m.put("sql", sql);//and pt_khxx.KHBM='KH0000001166'
                List<Map> khxx_users = customerManageService_static.query(m);
                int usersize = khxx_users.size();
                if (khxx_users.size() > 0) {
                    String dwmc_list = "";
                    String sjh = "";
                    for (int j = 0; j < khxx_users.size(); j++) {
                        Map map = khxx_users.get(j);
                        if (map == null) {
                            result.put("result", "没有数据");
                            continue;
                        }
                        System.out.println(map);
                        dwmc_list = map.get("dwmc_list") + ",";//单位名称
                        sjh = map.get("sjh") + "";//用户手机号
                        sjh = dec(sjh);
                        sjh = enc(sjh);

                        Map cs_map = new HashMap();
                        cs_map.put("dwmc_list", enc(dwmc_list));
                        cs_map.put("sjh", sjh);
                        try {
                            result = doPost(rykh_url, cs_map);
                            result.put("enc_data", cs_map);
                            result.put("dec_data", decMap(cs_map));
                        } catch (Exception e) {
                        }
                    }
                }
            }else {
                //result.put("result", "没有数据");
            }

        } catch (Exception e) {
            result.put("result", e.getMessage());
        }

        return result;
    }


}

