package com.xinhai.caiyun.systemmanager.opera;

import java.util.*;

public class TestThread {
    public static void main(String args[])
    {

        HttpThread myThread = new HttpThread();
        List<Map> scYpList = new ArrayList<Map>();
        Map m1 = new HashMap();
            m1.put("WTID","JMJC2019Z1070311");
            m1.put("SC_CYDH","2016PJ2-L1-HX2L-010");
        scYpList.add(m1);

        Map m2 = new HashMap();
            m2.put("WTID","JMJC2019Z1070310");
            m2.put("SC_CYDH","/");
        scYpList.add(m2);
        Map m3 = new HashMap();
            m3.put("WTID","JMJC2019Z1070309");
            m3.put("SC_CYDH","234hhui7");
        scYpList.add(m3);
        myThread.setJgsl(10);
        myThread.setScYpList(scYpList);

        Thread thread = new Thread(myThread);
//        thread.set
        thread.start();
    }
}
