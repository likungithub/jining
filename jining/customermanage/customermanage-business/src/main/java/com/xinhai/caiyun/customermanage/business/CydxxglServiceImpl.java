package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.*;
import com.xinhai.caiyun.customermanage.dao.CydxxglMapper;
import com.xinhai.caiyun.customermanage.service.CydxxglService;
import com.xinhai.caiyun.systemmanager.api.ExcelBean;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import com.xinhai.caiyun.systemmanager.api.YqsbXx;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
import service.BmgzService;
import java.io.InputStream;
import java.util.*;

@Repository
public class CydxxglServiceImpl implements CydxxglService {
    @Autowired
    private CydxxglMapper cydxxglMapper;
    @Autowired
    private BmgzService bmgzService;
    //查询抽样单信息列表
    public List<Map> selectCydLong(Map map){
        return cydxxglMapper.selectCydLong(map);
    }
    public Integer selectCydLogCount(Map map){return cydxxglMapper.selectCydLogCount(map);}
    //导入Excel
    public void importcydExcel(InputStream in, MultipartFile file, String name,String wtid,String logId) throws Exception {
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in,file.getOriginalFilename());
        List<Map>list1 = new ArrayList<>();
        System.out.print(listob.size());
        int intlogid = 0;
       String  keystring="cydbh,rwly,rwlx,cyrq,cydd,ypmc,cpzl,yply,cyfs,ypsx,yplx,sb,ypph,scrq,bzq,zxbz,ggxh,zldj,scxkzbh,dj,sfck,cyjs,cysl,cysldw,bysl,bzfl,ypxt,cysypdcctj,cyypbz,jsydz,jsypjzrq,bcydwmc,qylx,bcydwdz,bcydwfrdb,bcydwnxse,bcydwyyzz,bcydwlxr,bcydwdh,bcydwcz,bcydwyb,bssczmc,bssczdz,bssczlxr,bssczlxdh,cydwmc,cydwdz,cydwlxr,cydwlxdh,cydwcz,cydwyb,cyr,bz,cyhj,bcydwqygm,bcydwssqy,cyfw,spflid,jybgzt,scdrsj,sfby,cyrlxdh,sfztc,ytlx,xkzlx,rqxz,xkzh,jhl,kcl,cctjqt,cctjwd,cctjsd,ypbzqt,cygj,txm,cydwjb,cydwlxrdh,cydwlxremail";
       List<String>    keysList= Arrays.asList(keystring.split(","));
       if(logId ==null||"".equals(logId)){
           intlogid = 0;
       }else {
           intlogid = Integer.parseInt(logId);
       }

        //查询委托单是否存在
        int dd = cydxxglMapper.selectWtd(wtid);
        //若委托单已存在，删除此委托下所有样品
        if(dd>0){
            cydxxglMapper.deleteWtYp(wtid);
        }
        Map wtinfo = cydxxglMapper.selectWtInfo(wtid);
        for (int i = 0;i<listob.size();i++){
            //获取样品编码
            String ypbm = bmgzService.getMaxYpbm(wtinfo.get("rwlx").toString());
            List<Object> list = listob.get(i);
            Map map=new HashMap();
            Map map1 = new HashMap();
             for(int j=0;j<list.size();j++){
                 map.put("wtid",wtid);
                 map.put("logid",intlogid+1);
                 map.put(keysList.get(j),String.valueOf(list.get(j)));
             }
            map1.put("wtid",wtid);
            map1.put("jszt","001");
            map1.put("ypzbzt","000");
            map1.put("ypjczt","001");
            map1.put("sjjyzt","001");
            map1.put("sjsczt","001");
            map1.put("if_cy","1");
            map1.put("bgbzzt","001");
            map1.put("bgzbzt","001");
            map1.put("bgzjsp","000");
            map1.put("bgshzt","000");
            map1.put("bgpzzt","000");
            map1.put("bgdyzt","000");
            map1.put("if_sc","0");
            map1.put("if_th","0");
            map1.put("zbfpzt","001");
            map1.put("ypbm",ypbm);
            map1.put("ifsgr","0");
            map1.put("ypmc",String.valueOf(list.get(5)));
            map1.put("sb",String.valueOf(list.get(6)));
            map1.put("ggxh",String.valueOf(list.get(16)));
            map1.put("ypdj",String.valueOf(list.get(17)));
            map1.put("ypsl",String.valueOf(list.get(22)));
            map1.put("ypdw",String.valueOf(list.get(23)));
            map1.put("scrq",String.valueOf(list.get(13)));
            map1.put("ypphhbh",String.valueOf(list.get(12)));
            map1.put("ypzt",String.valueOf(list.get(26)));
            map1.put("ypbctj",String.valueOf(list.get(27)));
            map1.put("scdw",String.valueOf(list.get(41)));
            map1.put("scdwlxdh",String.valueOf(list.get(44)));
            map1.put("ybjs",String.valueOf(list.get(21)));
            map1.put("bzq",String.valueOf(list.get(14)));
            map1.put("bzxx",String.valueOf(list.get(52)));
            map1.put("cydd",String.valueOf(list.get(4)));

            //插入表t_cydgl_jbxx中Excel数据
            cydxxglMapper.importcydExcel(map);
            //插入表t_ypgl_jbxx中Excel数据
            cydxxglMapper.importYpglExcel(map1);

        }
    }
    //存储导入日志
    public void insertWtLog(Map map){
        cydxxglMapper.insertWtLog(map);
    }

    //查询导入日志表主键
    public String selectLogid(Map map){
        return cydxxglMapper.selectLogid(map);
    }

    //查询导入Excel详情
    public List<Map> selectExcel(Map map) {
        return cydxxglMapper.selectExcel(map);
    }
    public Integer selectExcelCount(Map map) {
        return cydxxglMapper.selectExcelCount(map);
    }

    //委托列表
    public List<Tqywt> findWtAll(int start, int len) {
        return cydxxglMapper.findWtAll(start,len);
    }
    public int findWtAllNums(int start,int len) {
        return cydxxglMapper.findWtAllNums(start,len);
    }

    //导入Excel
    public void importypExcel(InputStream in, MultipartFile file, String name, String wtid) throws Exception {
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in,file.getOriginalFilename());
        List<Map>list1 = new ArrayList<>();
        System.out.print(listob.size());

        //查询委托单是否存在
        int dd = cydxxglMapper.selectWtd(wtid);
        //若委托单已存在，删除此委托下所有样品
        if(dd>0){
            cydxxglMapper.deleteWtYp(wtid);
        }
        Map wtinfo = cydxxglMapper.selectWtInfo(wtid);
        for (int i = 0;i<listob.size();i++){
            //获取样品编码
            String ypbm = bmgzService.getMaxYpbm(wtinfo.get("rwlx").toString());
            List<Object> list = listob.get(i);
            Map map1 = new HashMap();
            map1.put("wtid",wtid);
            map1.put("jszt","001");
            map1.put("ypzbzt","000");
            map1.put("ypjczt","001");
            map1.put("sjjyzt","001");
            map1.put("sjsczt","001");
            map1.put("if_cy","1");
            map1.put("bgbzzt","001");
            map1.put("bgzbzt","001");
            map1.put("bgzjsp","000");
            map1.put("bgshzt","000");
            map1.put("bgpzzt","000");
            map1.put("bgdyzt","000");
            map1.put("if_sc","0");
            map1.put("if_th","0");
            map1.put("zbfpzt","001");
            map1.put("ypbm",ypbm);
            map1.put("ifsgr",String.valueOf(list.get(16)));
            map1.put("ypmc",String.valueOf(list.get(0)));
            map1.put("sb",String.valueOf(list.get(1)));
            map1.put("ggxh",String.valueOf(list.get(2)));
            map1.put("ypdj",String.valueOf(list.get(3)));
            map1.put("ypsl",String.valueOf(list.get(4)));
            map1.put("ypdw",String.valueOf(list.get(5)));
            map1.put("scrq",String.valueOf(list.get(6)));
            map1.put("ypphhbh",String.valueOf(list.get(7)));
            map1.put("ypzt",String.valueOf(list.get(8)));
            map1.put("ypbctj",String.valueOf(list.get(9)));
            map1.put("scdw",String.valueOf(list.get(10)));
            map1.put("scdwlxdh",String.valueOf(list.get(11)));
            map1.put("ybjs",String.valueOf(list.get(12)));
            map1.put("bzq",String.valueOf(list.get(13)));
            map1.put("bzxx",String.valueOf(list.get(14)));
            map1.put("cydd",String.valueOf(list.get(15)));
            //插入表t_ypgl_jbxx中Excel数据
            cydxxglMapper.importYpglExcel(map1);

        }
    }
    public XSSFWorkbook exportyqsbExcel(String logid,String zydm) throws Exception {
        List<Bgzxx> bgzxxList= new ArrayList();
        List<Bgjcxm> jcbList = new ArrayList();
        Bgzxx bgzxx = null;
        Bgjcxm bgjcxm = null;
        XSSFWorkbook xssfWorkbook = null;
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("报告主信息");
        XSSFSheet sheet1 = workbook.createSheet("检验项目信息");

        Map map = new HashMap();
        map.put("logid", logid);
        map.put("zydm",zydm);
        List<Bgzxx> bgzxxid = cydxxglMapper.daochuSheet1(map);
        List<Bgjcxm> jcbLists = cydxxglMapper.daochuSheet2(map);

        for (int j=0;j<jcbLists.size();j++) {
            bgjcxm = jcbLists.get(j);
            jcbList.add(bgjcxm);
            int number = 0;
            for (int i = 0; i < bgzxxid.size(); i++) {
                number +=1;
                bgzxx = bgzxxid.get(i);
                bgzxxList.add(bgzxx);

                List<ExcelBean> list2 = new ArrayList<>();
                List<ExcelBean> list3 = new ArrayList<>();
                Map<Integer, List<ExcelBean>> map1 = new HashMap<>();
                Map<Integer, List<ExcelBean>> map2 = new HashMap<>();

                list2.add(new ExcelBean("抽样单编号*", "cydbh", 0));
                list2.add(new ExcelBean("报告分类1*", "bgfl1", 0));
                list2.add(new ExcelBean("报告书编号*", "ypbm", 0));
                list2.add(new ExcelBean("报告分类*", "bgfl", 0));
                list2.add(new ExcelBean("委托单位*", "wtdw", 0));
                list2.add(new ExcelBean("报告日期*", "lrrq", 0));
                list2.add(new ExcelBean("主检人", "bgzjspr", 0));
                list2.add(new ExcelBean("报告签发人*", "bgpzr", 0));
                list2.add(new ExcelBean("检验结论*", "yzjl", 0));
                list2.add(new ExcelBean("检验报告备注", "jysm", 0));
                list2.add(new ExcelBean("联系人(检验机构)*", "lxr", 0));
                list2.add(new ExcelBean("电话(检验机构)*", "sjhm", 0));
                list2.add(new ExcelBean("电子邮箱(检验机构)*", "email", 0));
                list2.add(new ExcelBean("地址(检验机构)*", "szcs", 0));
                list2.add(new ExcelBean("邮编(检验机构)*", "yb", 0));
                list2.add(new ExcelBean("传真(检验机构)*", "cz", 0));
                list2.add(new ExcelBean("填报人(检验机构)*", "tbr", 0));
                list2.add(new ExcelBean("填报日期*", "tbrq", 0));
                list2.add(new ExcelBean("电话(填报人)*", "tbdh", 0));
                list2.add(new ExcelBean("电子邮箱(填报人)*", "tbyx", 0));

                list3.add(new ExcelBean("抽样单编号*", "cydbh", 0));
                list3.add(new ExcelBean("报告分类1*", "bgfl1", 0));
                list3.add(new ExcelBean("检验项目ID*", "id", 0));
                list3.add(new ExcelBean("检验项目*", "zwmc_bm", 0));
                list3.add(new ExcelBean("检验结果*", "jyjg", 0));
                list3.add(new ExcelBean("结果单位*", "jgdw", 0));
                list3.add(new ExcelBean("标准限值*", "xlz", 0));
                list3.add(new ExcelBean("标准限值单位*", "jldw", 0));
                list3.add(new ExcelBean("结果判定*", "jgpd", 0));
                list3.add(new ExcelBean("说明", "bz", 0));
                list3.add(new ExcelBean("检验依据*", "jcyj", 0));
                list3.add(new ExcelBean("判定依据*", "pdyj", 0));
                list3.add(new ExcelBean("方法检出限*", "jcx", 0));
                list3.add(new ExcelBean("方法检出限单位*", "jcxdw", 0));
                list3.add(new ExcelBean("标准方法检出限*", "bzffjcx", 0));
                list3.add(new ExcelBean("标准方法检出限单位*", "bzffjcxdw", 0));
                list3.add(new ExcelBean("标准最小允许限*", "bzzxyxx", 0));
                list3.add(new ExcelBean("标准最小允许限单位*", "bzzxyxxdw", 0));
                list3.add(new ExcelBean("标准最大允许限*", "bzzdyxx", 0));
                list3.add(new ExcelBean("标准最大允许限单位*", "bzzdyxxdw", 0));
                list3.add(new ExcelBean("最小允许限*", "zxyxx", 0));
                list3.add(new ExcelBean("最小允许限单位*", "zxyxxdw", 0));
                list3.add(new ExcelBean("最大允许限*", "zdyxx", 0));
                list3.add(new ExcelBean("最大允许限单位*", "zdyxxdw", 0));


                map1.put(0, list2);
                map2.put(0, list3);

                xssfWorkbook = ExcelUtil.createExcelFiles1(Bgzxx.class, bgzxxList, map1, Bgjcxm.class,jcbList,map2,workbook,sheet,sheet1,number,j,i);
            }
        }
        return xssfWorkbook;
    }

}
