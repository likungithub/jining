package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.Yprk;
import com.xinhai.caiyun.customermanage.dao.YprkMapper;
import com.xinhai.caiyun.customermanage.service.YprkService;
import com.xinhai.caiyun.systemmanager.api.ExcelBean;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import com.xinhai.security.api.CurrentLoginUser;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class YprkServiceImpl implements YprkService {
    @Autowired
    private YprkMapper yprkMapper;
    //查询样品入库详情
    @Override
    public List<Map> selectYprkAll(Map map) {
        return yprkMapper.selectYprkAll(map);
    }

    @Override
    public Integer selectYprkCount(Map map) {
        return yprkMapper.selectYprkCount(map);
    }

    //导出Excel
    @Override
    public XSSFWorkbook exportYprkExcel(String[] ypbm) throws Exception {
        List<Yprk>list = new ArrayList<>();
        Map map = new HashMap();
        Yprk yprk = null;
        for (String ypbms:ypbm) {
            map.put("ypbm",ypbms);
            yprk = yprkMapper.findByYpbm(map);
            list.add(yprk);
        }
        List<ExcelBean>list2 = new ArrayList<>();
        Map<Integer,List<ExcelBean>>map1 = new HashMap<>();
        XSSFWorkbook xssfWorkbook = null;
        list2.add(new ExcelBean("样品编码","ypbm",0));
        list2.add(new ExcelBean("样品名称","ypmc",0));
        list2.add(new ExcelBean("入库原因","crkly",0));
        list2.add(new ExcelBean("入库信息","info",0));
        list2.add(new ExcelBean("送样人员","syry",0));
        list2.add(new ExcelBean("入库时间","crksj",0));
        list2.add(new ExcelBean("正样数量","zysl",0));
        list2.add(new ExcelBean("副样数量","fysl",0));
        list2.add(new ExcelBean("备样数量","bysl",0));
        list2.add(new ExcelBean("录入人员","lrry",0));
        list2.add(new ExcelBean("录入日期","lrrq",0));

        map1.put(0,list2);
        String sheetName = "入库样品详情";
        //调用ExcelUtil
        xssfWorkbook = ExcelUtil.createExcelFile(Yprk.class, list, map1, sheetName);
        return xssfWorkbook;
    }

    @Override
    public void importYprkExcel(InputStream in, MultipartFile file, String name) throws Exception {
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in,file.getOriginalFilename());
        System.out.print(listob.size());
        for (int i = 0;i<listob.size();i++){
            List<Object> list = listob.get(i);
            Map map=new HashMap();
            map.put("ypid",String.valueOf(list.get(0)));
            map.put("crkly",String.valueOf(list.get(2)));
            map.put("info",String.valueOf(list.get(3)));
            map.put("syry",String.valueOf(list.get(4)));
            map.put("crksj",String.valueOf(list.get(5)));
            map.put("zysl",String.valueOf(list.get(6)));
            map.put("fysl",String.valueOf(list.get(7))) ;
            map.put("bysl",String.valueOf(list.get(8)));
            map.put("lrry", CurrentLoginUser.getUser().getName());
            String ypMark = yprkMapper.selectYpCount(map);
            if(ypMark==null||ypMark.equals("")){
                yprkMapper.importYprkExcel(map);
            }else {
                yprkMapper.deleteYp(ypMark);
                yprkMapper.importYprkExcel(map);
            }

        }
    }
}
