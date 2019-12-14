package com.xinhai.caiyun.customermanage.controller.pageoffice;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * @Author 单亮
 * @Description：
 * @Date: ${DATE} ${TIME}
 * @Modified By:
 */
public class WordUtilWtd {

    private static Configuration configuration = null;

    public WordUtilWtd(){
        configuration = new Configuration();
        configuration.setDefaultEncoding("UTF-8");
    }

    public static void main(String[] args) {
        WordUtilWtd test = new WordUtilWtd();
        Map<String,Object> dataMap = getData();
        String fileurl =  test.createWord(null,dataMap);
        System.out.println(fileurl);
    }

    public static String createWord(HttpServletRequest request,Map<String,Object> dataMap){
        String fileurl = "";
        String filename = "WTD"+UUID.randomUUID()+".doc";
        fileurl = "/file/"+filename;
        Template t=null;
        try {

            configuration = new Configuration();
            configuration.setDefaultEncoding("UTF-8");
            // 设置模板加载的方式
            if(request==null) {
                configuration.setDirectoryForTemplateLoading(
                        new File("D:/file"));
                t = configuration.getTemplate("weituodan.ftl"); //获取模板文件
            }else {
                configuration.setServletContextForTemplateLoading(request.getSession().getServletContext(), "/template");
                t = configuration.getTemplate("weituodan.ftl"); //获取模板文件
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        File outFile = new File(request.getSession().getServletContext().getRealPath("/")+fileurl); //导出文件
        try {
            Writer w = new OutputStreamWriter(new FileOutputStream(outFile), "utf-8");
             t.process(dataMap, w);
            w.close();
        } catch (TemplateException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return fileurl;
    }

    public static Map  getData() {
        Map<String, Object> dataMap = new HashMap<>();
        SimpleDateFormat format=new SimpleDateFormat("yyyyMMdd");
        String BGBH = "F"+format.format(new Date());//NO.

        String SPMC = "红烧牛肉面"; //食品名称
        String BCYDW = "山东营养卫士食品有限公司";  //被抽样单位
        String BCSCZ = "山东营养卫士食品有限公司";//标称生产者
        String WTDW = "山东省食品药品监督管理局";//委托单位
        String JYLB  = "省食品安全监督抽检";//检验类别
        String JCZXMC  = "济宁市食品药品检验检测中心";   //
        String BBDZ = "山东省济宁市任城区红星中路5号"; //本部地址
        String SPYJDZ = "山东省济宁市洸河路16号鲁南质检中心11楼";//食品检验地址
        String BBYWSLDH  = "0537-3155880";//本部业务受理电话
        String SPDH  = "18953781713";//食品电话
        String YZBM  = "272000";//邮政编码
        String DZYX  = "jiningyaojiansuo@163.com";//电子信箱
        String WZ  = "http://www.jnyjs.org.cn";//网址
        String CZ  = "0537-3155880";//传真
        String  SB  = "营养卫士";//商标
        String  XHGG = "84g/袋";//型号规格
        String  SCRQ = "2017.10.16";//生产日期
        String  ZLDJ = "合格品";//质量等级
        String  BCYDWDH = "13854322126";//联系电话
        String  BCSCZDH = "13854322126";//联系电话
        String  RWLY = "山东省食品药品监督管理局";//任务来源
        String  CYRY = "王亚新 马 涛";//抽样人员
        String  CYRQ  = "2017.10.19";//抽样日期
        String  YPDDRQ = "2017.10.30";//样品到达日期
        String  YPSL = "84g/袋×19袋";//样品数量
        String  CYJS  = "84g/袋×4000袋";//抽样基数
        String  CYDBH = "SCSC17081055";//抽样单编号
        String  JCFYRY = "王亚新";//检查封样人员
        String  CYDD = "生产环节：成品库（已检区）";//抽样地点
        String  FYZT = "袋装，完好";//封样状态
        String  YJXM = "铅、苯甲酸及其钠盐（限调味酱包）、山梨酸及其钾盐（限调味酱包）、菌落总数*、大肠菌群*、致病菌*（沙门氏菌*、金黄色葡萄球菌*）、铝的残留量（以干基计）（限面块）";//检验项目
        String  JYYJ = "Q/YYWS0001S-2015、GB 2762-2017、GB 2760-2014、GB 17400-2015";//检验依据
        String  JYJL = "经抽样检验，所检项目符合 Q/YYWS0001S-2015、 GB 2762-2017、GB 2760-2014、GB 17400-2015标准要求。";//检验结论
        String  QFRQ  = "2017 年11月27日";//签发日期
        String  BZ = "*为分包项目，承担分包的检验机构为：菏泽市食品药品检验检测研究院";//备   注


        String  XH  = "1";//序号
        String  JYXM = "铅（以Pb计）/（mg/kg）";//检验项目
        String  BZYQ = "≤0.5";//标准（技术）要求
        String  JYJG = "＜0.4 ";//检验结果
        String  DXPD = "合格";//单项判定

        dataMap.put("BGBH", BGBH);
        dataMap.put("SPMC", SPMC);
        dataMap.put("BCYDW", BCYDW);
        dataMap.put("BCSCZ", BCSCZ);
        dataMap.put("WTDW", WTDW);
        dataMap.put("JYLB", JYLB);
        dataMap.put("JCZXMC", JCZXMC);
        dataMap.put("BBDZ", BBDZ);
        dataMap.put("SPYJDZ", SPYJDZ);
        dataMap.put("BBYWSLDH", BBYWSLDH);
        dataMap.put("SPDH", SPDH);
        dataMap.put("YZBM", YZBM);
        dataMap.put("DZYX", DZYX);
        dataMap.put("WZ", WZ);
        dataMap.put("CZ", CZ);
        dataMap.put("SB", SB);
        dataMap.put("XHGG", XHGG);
        dataMap.put("SCRQ", SCRQ);
        dataMap.put("ZLDJ", ZLDJ);
        dataMap.put("BCYDWDH", BCYDWDH);
        dataMap.put("BCSCZDH", BCSCZDH);
        dataMap.put("RWLY", RWLY);
        dataMap.put("CYRY", CYRY);
        dataMap.put("CYRQ", CYRQ);
        dataMap.put("YPDDRQ", YPDDRQ);
        dataMap.put("YPSL", YPSL);
        dataMap.put("CYJS", CYJS);
        dataMap.put("CYDBH", CYDBH);
        dataMap.put("JCFYRY", JCFYRY);
        dataMap.put("CYDD", CYDD);
        dataMap.put("FYZT", FYZT);
        dataMap.put("YJXM", YJXM);
        dataMap.put("JYYJ", JYYJ);
        dataMap.put("JYJL", JYJL);
        dataMap.put("QFRQ", QFRQ);
        dataMap.put("BZ", BZ);
        dataMap.put("JYXM", JYXM);//所有检验项目



        List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
        for (int i = 0; i < 5; i++) {
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("XH", i+1);
            map.put("JYXM", JYXM);
            map.put("BZYQ", BZYQ);
            map.put("JYJG", JYJG);
            map.put("DXPD", DXPD);
            list.add(map);
        }

        dataMap.put("list", list);
        return dataMap;
    }



    private void getData1(Map<String, Object> dataMap) {
        dataMap.put("title", "标题");
        List<Map<String,Object>> list = new ArrayList<Map<String,Object>>();
        for (int i = 0; i < 10; i++) {
            Map<String,Object> map = new HashMap<String,Object>();
            map.put("name", "name"+i);
            map.put("age", "age"+i);
            list.add(map);
        }

        dataMap.put("list", list);
    }
}
