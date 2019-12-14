package com.xinhai.caiyun.systemmanager.opera;


import com.xinhai.caiyun.systemmanager.dao.ScwtMapper;

import java.util.*;


public class HttpThread implements Runnable{


    private List<Map> scYpList;
    private ScwtMapper scwtMapper;
    //间隔数量 每多少个 休眠一下
    private int jgsl=10;

//    private List<String> urlList;

    public List<Map> getScYpList() {
        return scYpList;
    }

    public void setScYpList(List<Map> scYpList) {
        this.scYpList = scYpList;
    }

    public ScwtMapper getScwtMapper() {
        return scwtMapper;
    }

    public void setScwtMapper(ScwtMapper scwtMapper) {
        this.scwtMapper = scwtMapper;
    }

    public int getJgsl() {
        return jgsl;
    }

    public void setJgsl(int jgsl) {
        this.jgsl = jgsl;
    }



    public void listSdClon(List<Map> mbList,List<Map> lyList)
    {
        for(Map m :lyList)
        {
            mbList.add(m);
        }
    }

    public void run()
    {
        HttpOpera httpOpera = new HttpOpera();
        try {
            int rows = this.scYpList.size();
            List<Map> zxUrlList = new ArrayList<>();
            List<Map> jcxmJsonList= new ArrayList<>();
            List<Map> jcxmMapList = new ArrayList<>();
//            String httpURL = "http://60.216.97.250:8087/sample/command/dispatcher/com.inspur.transfer.SampleDataTrans/getPlanItemInfoByActionId?actionBaseNo=";
            String httpURL = "http://124.128.39.242:8087/sample/command/dispatcher/com.inspur.transfer.SampleDataTrans/getPlanItemInfoByActionId?actionBaseNo=";
            double st = new Date().getTime();
            for(int i=0;i<scYpList.size();i++)
            {
                Map scYpMap = scYpList.get(i);
                String id = scYpMap.get("SC_CYD_ID")+"";//抽样单数据主键 ,防止 省抽 抽样单号重复
                String sc_cydh = scYpMap.get("SC_CYDH")+"";
                Map tMap = new HashMap();
                tMap.put("SC_CYD_ID",id);
                tMap.put("SC_CYDH",sc_cydh);
                if(i!=0 && i%jgsl==0)
                {
                    //这个时候要执行一发 整数说明到10个
                    tMap.put("URL",httpURL+sc_cydh);
                    zxUrlList.add(tMap);
                    List<Map> jcxmTempList = httpOpera.httpPostWithjson(zxUrlList);//一批一批获取
                    if(jcxmTempList!=null && jcxmTempList.size()>0)
                    {
                        //取出一批URL对应的 检测项 集合后 就清空 URL
                        zxUrlList.clear();
                        //将 获取的检测项集合 克隆到 整体存放
                        this.listSdClon(jcxmJsonList,jcxmTempList);
                    }
                    //休眠 10秒钟
                    Thread.sleep(1000*5);
                }else
                {
                    tMap.put("URL",httpURL+sc_cydh);
                    zxUrlList.add(tMap);
                }
            }
            System.out.println("HTTP循环内执行时间="+(new Date().getTime()-st));
            Thread.sleep(1000*5);
            if(zxUrlList.size()>0)
            {
                List<Map> jcxmTempList = httpOpera.httpPostWithjson(zxUrlList);//最后剩下的 检测项
                if(jcxmTempList!=null && jcxmTempList.size()>0)
                {
                    //取出一批URL对应的 检测项 集合后 就清空 URL
                    zxUrlList.clear();
                    //将 获取的检测项集合 克隆到 整体存放
                    this.listSdClon(jcxmJsonList,jcxmTempList);
                }
            }
            System.out.println("HTTP执行时间="+(new Date().getTime()-st));
            //检测项 的 JSON 获取完了 下面开始 分解
            for(Map jcxmJsonMap :jcxmJsonList)
            {
                List<Map> jcxmTList = httpOpera.initHttpJcx(jcxmJsonMap.get("RES")+"",jcxmJsonMap.get("SC_CYD_ID")+"",jcxmJsonMap.get("SC_CYDH")+"");
                if(jcxmTList!=null)
                {
                    this.listSdClon(jcxmMapList,jcxmTList);
                }
            }

            //这个就是 最终的 所有检测项目
            //jcxmMapList
            System.out.println("最终检测项目数量="+jcxmMapList.size());
            System.out.println("总执行时间="+(new Date().getTime()-st));
            this.scwtMapper.addCydJcx(jcxmMapList);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }




}
