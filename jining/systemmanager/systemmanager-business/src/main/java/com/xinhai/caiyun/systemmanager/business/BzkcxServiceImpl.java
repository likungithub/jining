package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.Bzkcx;
import com.xinhai.caiyun.systemmanager.api.ExcelBean;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import com.xinhai.caiyun.systemmanager.dao.BzkcxMapper;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import service.BzkcxService;

import java.beans.IntrospectionException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class BzkcxServiceImpl implements BzkcxService {
    @Autowired
    private BzkcxMapper bzkcxMapper;
    /**
     * c查找所有的检测项目信息
     * @return
     */
    public List<Map> findAllBzkcx(Map map){
        return bzkcxMapper.findAllBzkcx(map);
    };
    /**
     * c查找所有的检测项数量
     * @return
     */
    public Integer findAllBzkcxNum(Map map){
        return bzkcxMapper.findAllBzkcxNum(map);
    };
    /**
     * 通过id删除一条数据
     */
    public void deleteBzkcxById(Integer id){
        bzkcxMapper.deleteBzkcxById(id);
    };
    /**
     * 增加标准库查询的信息
     */
    public void addBzkcx(Map map){
        bzkcxMapper.addBzkcx(map);
    };
    /**
     * 通过id获得单个值
     */
    public Map findBzkcxById(Integer id){
        return bzkcxMapper.findBzkcxById(id);
    };
    /**
     * 更新数据
     * @param map
     */
    public void updateBzkcx(Map map){
        bzkcxMapper.updateBzkcx(map);
    };
    /**
     * 导入Excel
     */
    public void importExcelInfo(InputStream in, MultipartFile file) throws Exception {
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in,file.getOriginalFilename());
        List<Map> list=new ArrayList<Map>();
        Map map=null;
        SimpleDateFormat sf=new SimpleDateFormat("yyyy-MM-dd");
            //遍历listob数据，把数据放到List中
            for (int i = 0; i < listob.size(); i++) {
                List<Object> ob = listob.get(i);
                map=new HashMap();
                map.put("jcxmc",String.valueOf(ob.get(0)));
                map.put("ywmc",String.valueOf(ob.get(1)));
                map.put("pdnh",String.valueOf(ob.get(2)));
                String if_pd=String.valueOf(ob.get(3));
                String pd="";
                if(if_pd.equals("是")){
                    pd="1";
                }else if(if_pd.equals("否")){
                    pd="0";
                }else {
                    pd="0";
                }
                map.put("if_pd",pd);
                map.put("yyckjz", String.valueOf(ob.get(4)));
                map.put("bl",String.valueOf(ob.get(5)));
                map.put("jcff",String.valueOf(ob.get(6)));
                map.put("jcyj",String.valueOf(ob.get(7)));
                map.put("jcyjmc",String.valueOf(ob.get(8)));
                map.put("wswnz",String.valueOf(ob.get(9)));
                map.put("wswcz",String.valueOf(ob.get(10)));
                map.put("wswmz",String.valueOf(ob.get(11)));
                map.put("xlz",String.valueOf(ob.get(12)));
                map.put("xlzmrz",String.valueOf(ob.get(13)));
                map.put("jcxdw",String.valueOf(ob.get(14)));
                map.put("zxyxx",String.valueOf(ob.get(15)));
                map.put("zxyxxdw",String.valueOf(ob.get(16)));
                map.put("zdyxx",String.valueOf(ob.get(17)));
                map.put("zdyxxdw",String.valueOf(ob.get(18)));
                String if_xtpd=String.valueOf(ob.get(19));
                String xtpd="";
                if(if_xtpd.equals("是")){
                    xtpd="1";
                }else if(if_xtpd.equals("否")){
                    xtpd="0";
                }else {
                    xtpd="0";
                }
                map.put("if_xtpd",xtpd);
                String if_bzff=String.valueOf(ob.get(20));
                String bzff="";
                if(if_bzff.equals("是")){
                    bzff="1";
                }else if(if_bzff.equals("否")){
                    bzff="0";
                }else {
                    bzff="0";
                }
                map.put("if_bzff",bzff);
                String if_cma=String.valueOf(ob.get(21));
                String cma="";
                if(if_cma.equals("是")){
                    cma="1";
                }else if(if_cma.equals("否")){
                    cma="0";
                }else {
                    cma="0";
                }
                map.put("if_cma",cma);
                String if_cmaf=String.valueOf(ob.get(22));
                String cmaf="";
                if(if_cmaf.equals("是")){
                    cmaf="1";
                }else if(if_cmaf.equals("否")){
                    cmaf="0";
                }else {
                    cmaf="0";
                }
                map.put("if_cmaf",cmaf);
                String if_cnas=String.valueOf(ob.get(23));
                String cnas="";
                if(if_cnas.equals("是")){
                    cnas="1";
                }else if(if_cnas.equals("否")){
                    cnas="0";
                }else {
                    cnas="0";
                }
                map.put("if_cnas",cnas);
                String if_catl=String.valueOf(ob.get(24));
                String catl="";
                if(if_catl.equals("是")){
                    catl="1";
                }else if(if_catl.equals("否")){
                    catl="0";
                }else {
                    catl="0";
                }
                map.put("if_catl",catl);
                map.put("zbzl",String.valueOf(ob.get(25)));
                map.put("zbzldw",String.valueOf(ob.get(26)));
                list.add(map);
            }
            bzkcxMapper.addExcelBzkcx(list);
            //批量插入
    }
    /**
     * 导出excel
     */
    public XSSFWorkbook exportExcelInfo(String[] ids) throws InvocationTargetException, ClassNotFoundException, IntrospectionException, ParseException, IllegalAccessException {
        List<Bzkcx> list=new ArrayList<Bzkcx>();
        Bzkcx bzkcx=null;
        String[] id=ids;
        for (int i=0;i<ids.length;i++){
          bzkcx=bzkcxMapper.findExcelBzkcxById(Integer.parseInt(ids[i]));
            list.add(bzkcx);
        }
        List<ExcelBean> excel=new ArrayList<ExcelBean>();
        Map<Integer,List<ExcelBean>> map=new LinkedHashMap<>();
        XSSFWorkbook xssfWorkbook=null;
        //设置标题栏
        excel.add(new ExcelBean("检测项名称","jcxmc",0));
        excel.add(new ExcelBean("英文名称","ywmc",0));
        excel.add(new ExcelBean("判断编号","pdnh",0));
        excel.add(new ExcelBean("是否请求判断","if_pd",0));
        excel.add(new ExcelBean("营养参考价值","yyckjz",0));
        excel.add(new ExcelBean("倍率","bl",0));
        excel.add(new ExcelBean("检测方法","jcff",0));
        excel.add(new ExcelBean("检测依据","jcyj",0));
        excel.add(new ExcelBean("检测依据名称","jcyjmc",0));
        excel.add(new ExcelBean("微生物n值","wswnz",0));
        excel.add(new ExcelBean("微生物c值","wswcz",0));
        excel.add(new ExcelBean("微生物m值","wswmz",0));
        excel.add(new ExcelBean("限量值","xlz",0));
        excel.add(new ExcelBean("限量值默认值","xlzmrz",0));
        excel.add(new ExcelBean("检出限单位","jcxdw",0));
        excel.add(new ExcelBean("最小允许限","zxyxx",0));
        excel.add(new ExcelBean("最小允许限单位","zxyxxdw",0));
        excel.add(new ExcelBean("最大允许限","zdyxx",0));
        excel.add(new ExcelBean("最大允许限单位","zdyxxdw",0));
        excel.add(new ExcelBean("是否系统判断","if_xtpd",0));
        excel.add(new ExcelBean("是否标准方法","if_bzff",0));
        excel.add(new ExcelBean("CMA","if_cma",0));
        excel.add(new ExcelBean("CMAF","if_cmaf",0));
        excel.add(new ExcelBean("CNAS","if_cnas",0));
        excel.add(new ExcelBean("CATL","if_catl",0));
        excel.add(new ExcelBean("制备质量","zbzl",0));
        excel.add(new ExcelBean("制备质量单位","zbzldw",0));
        map.put(0, excel);
        String sheetName = "标准文件";
        //调用ExcelUtil的方法
        xssfWorkbook = ExcelUtil.createExcelFile(Bzkcx.class, list, map, sheetName);
        return xssfWorkbook;
    };
}
