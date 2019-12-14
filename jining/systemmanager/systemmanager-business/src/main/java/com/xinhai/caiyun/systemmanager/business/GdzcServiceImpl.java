package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.ExcelBean;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import com.xinhai.caiyun.systemmanager.api.YqsbXx;
import com.xinhai.caiyun.systemmanager.dao.GdzcMapper;
import com.xinhai.caiyun.systemmanager.dao.YqsbtzMapper;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import service.GdzcService;
import service.YqsbtzService;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class GdzcServiceImpl implements GdzcService {
    @Autowired
    private GdzcMapper yqsbtzMapper;
    //    查看仪器设备台账
    public List<Map> selectYqsbtz(Map map){
        return yqsbtzMapper.selectYqsbtz(map);
    };
    public Integer selectYqtzCount(Map map){
        return yqsbtzMapper.selectYqtzCount(map);
    };
    /*导入操作*/
    public void importyqsbtzExcel(InputStream in, MultipartFile file,String name)throws Exception{
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in,file.getOriginalFilename());
           List<Map>list1 = new ArrayList<>();
           System.out.print(listob.size());
        for (int i = 0;i<listob.size();i++){
            List<Object> list = listob.get(i);
                Map map=new HashMap();
            map.put("skbh",String.valueOf(list.get(0)));
            map.put("sbmc",String.valueOf(list.get(1)));
            map.put("ggxh",String.valueOf(list.get(2)));
            map.put("zqddj",String.valueOf(list.get(3)));
            map.put("fbl",String.valueOf(list.get(4)));
            map.put("sccs",String.valueOf(list.get(5)));
            map.put("sbyz",String.valueOf(list.get(6)));
            map.put("jdjg",String.valueOf(list.get(7)));
            String s = String.valueOf(list.get(8));
            String s1 = s.replace('/','-');
            map.put("jdrq",s1);
            map.put("bzxx",String.valueOf(list.get(9)));
//               list1.add(map);
            yqsbtzMapper.importyqsbtzExcel(map);
            yqsbtzMapper.importyqsbtzBaseExcel(map);
        }
//        yqsbtzMapper.importyqsbtzExcel(list1);
//        yqsbtzMapper.importyqsbtzBaseExcel(list1);
    }
    /*删除台账记录*/
    public void deleteYqsbtz(Map map){ yqsbtzMapper.deleteYqsbtz(map); };
    /*关于受控编号*/
    public List<Map> selectSkbh(){ return yqsbtzMapper.selectSkbh(); };
    /*新增仪器设备*/
    public void insertNewYqsb(Map map){
        yqsbtzMapper.insertNewYqsb(map);
    };
    /*新增基本信息*/
    public void insertBaseYqsb(Map map){
        yqsbtzMapper.insertBaseYqsb(map);
    };
    /*修改基本信息*/
    public void updateBaseYqsb(Map map){
        yqsbtzMapper.updateBaseYqsb(map);
    };
    /*修改仪器设备台账信息*/
    public void updateYqsbtz(Map map){
        yqsbtzMapper.updateYqsbtz(map);
    };
    /*导出功能*/
    public XSSFWorkbook exportyqsbExcel(String []skbhs)throws Exception{
        List<YqsbXx>list = new ArrayList<>();
        Map map = new HashMap();
        YqsbXx yqsbXx = null;
        for (String skbh:skbhs) {
            map.put("skbh",skbh);
            yqsbXx = yqsbtzMapper.findBySkbh(map);
            list.add(yqsbXx);
        }
        List<ExcelBean>list2 = new ArrayList<>();
        Map<Integer,List<ExcelBean>>map1 = new HashMap<>();
        XSSFWorkbook xssfWorkbook = null;
        list2.add(new ExcelBean("受控编号","skbh",0));
        list2.add(new ExcelBean("设备名称","sbmc",0));
        list2.add(new ExcelBean("规格型号","ggxh",0));
        list2.add(new ExcelBean("准确度等级","zqddj",0));
        list2.add(new ExcelBean("分辨力","fbl",0));
        list2.add(new ExcelBean("生产厂商","sccs",0));
        list2.add(new ExcelBean("设备原值","sbyz",0));
        list2.add(new ExcelBean("检定机构","jdjg",0));
        list2.add(new ExcelBean("检定日期","jdrq",0));
        list2.add(new ExcelBean("备注信息","bzxx",0));
        map1.put(0,list2);
        String sheetName = "仪器设备信息";
        //调用ExcelUtil
        xssfWorkbook = ExcelUtil.createExcelFile(YqsbXx.class, list, map1, sheetName);
        return xssfWorkbook;
    };
    /*消息提醒*/
    public List<Map> findyqsbjd(){
        return yqsbtzMapper.findyqsbjd();
    };
    /*避免消息重复*/
    public Integer yqjdxxXZfs(){
        return yqsbtzMapper.yqjdxxXZfs();
    };
    /*检定消息提醒*/
    public List<String> findJD(){
        return yqsbtzMapper.findJD();
    };

    /*消息提醒*/
    public List<Map> findyqsbwh(){
        return yqsbtzMapper.findyqsbwh();
    };
    /*避免消息重复*/
    public Integer yqwhxxXZfs(){
        return yqsbtzMapper.yqwhxxXZfs();
    };
    /*检定消息提醒*/
    public List<String> findWH(){
        return yqsbtzMapper.findWH();
    };

    /*消息提醒*/
    public List<Map> findyqsbhc(){
        return yqsbtzMapper.findyqsbhc();
    };
    /*避免消息重复*/
    public Integer yqhcxxXZfs(){
        return yqsbtzMapper.yqhcxxXZfs();
    };
    /*检定消息提醒*/
    public List<String> findHC(){
        return yqsbtzMapper.findHC();
    };
}
