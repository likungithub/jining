package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.Gqyptz;
import com.xinhai.caiyun.customermanage.dao.GqyptzMapper;
import com.xinhai.caiyun.customermanage.service.GqyptzService;
import com.xinhai.caiyun.systemmanager.api.ExcelBean;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class GqyptzServiceImpl implements GqyptzService {
    @Autowired
    private GqyptzMapper gqyptzMapper;

    /**
     * 查询过期样品列表
     * @param map
     * @return
     */
    @Override
    public List<Map> selectGqypAll(Map map) {
        return gqyptzMapper.selectGqypAll(map);
    }

    @Override
    public Integer selectGqypCount(Map map) {
        return gqyptzMapper.selectGqypCount(map);
    }

    @Override
    public XSSFWorkbook exportgqypExcel(String[] ypid) throws Exception {
        List<Gqyptz> list = new ArrayList();
        Map map = new HashMap();
        Gqyptz gqyptz = null;
        for (String ypids:ypid) {
            map.put("ypbm",ypids);
            gqyptz = gqyptzMapper.findByYpbm(map);
            list.add(gqyptz);
        }
        List<ExcelBean>list2 = new ArrayList<>();
        Map<Integer,List<ExcelBean>>map1 = new HashMap<>();
        XSSFWorkbook xssfWorkbook = null;

        list2.add(new ExcelBean("委托ID/抽样单编号","wtid",0));
        list2.add(new ExcelBean("接收状态","jszt",0));
        list2.add(new ExcelBean("样品制备状态","ypzbzt",0));
        list2.add(new ExcelBean("样品编号","ypbm",0));
        list2.add(new ExcelBean("样品名称","ypmc",0));
        list2.add(new ExcelBean("商标","sb",0));
        list2.add(new ExcelBean("规格型号","ggxh",0));
        list2.add(new ExcelBean("样品等级","ypdj",0));
        list2.add(new ExcelBean("样品数量","ypsl",0));
        list2.add(new ExcelBean("样品单位","ypdw",0));
        list2.add(new ExcelBean("生产日期","scrq",0));
        list2.add(new ExcelBean("样品批号或原编号","ypphhbh",0));
        list2.add(new ExcelBean("样品状态","ypzt",0));
        list2.add(new ExcelBean("样品保存条件","ypbctj",0));
        list2.add(new ExcelBean("生产单位","scdw",0));
        list2.add(new ExcelBean("生产单位联系电话","scdwlxdh",0));
        list2.add(new ExcelBean("封样人员","fyry",0));
        list2.add(new ExcelBean("封样状态","fyzt",0));
        list2.add(new ExcelBean("样品到达日期","ypddrq",0));
        list2.add(new ExcelBean("是否蔬果肉","if_sgr",0));
        list2.add(new ExcelBean("是否食水工","if_ssg",0));
        list2.add(new ExcelBean("样品检测1001检测中002检测通过003检测未通过","ypjczt",0));
        list2.add(new ExcelBean("数据校验2001未校验002校验通过003校验未通过","sjjyzt",0));
        list2.add(new ExcelBean("数据审查3001未检查002检查通过003检查未通过","sjsczt",0));
        list2.add(new ExcelBean("样本基数","ybjs",0));
        list2.add(new ExcelBean("保质期(天)","bzq",0));
        list2.add(new ExcelBean("主检人","zjr",0));
        list2.add(new ExcelBean("样品物态","ypwt",0));
        list2.add(new ExcelBean("是否抽样","if_cy",0));
        list2.add(new ExcelBean("报告编制","bgbzzt",0));
        list2.add(new ExcelBean("报告制表","bgzbzt",0));
        list2.add(new ExcelBean("报告主检审批","bgzjsp",0));
        list2.add(new ExcelBean("报告审核","bgshzt",0));
        list2.add(new ExcelBean("报告批准","bgpzzt",0));
        list2.add(new ExcelBean("报告打印","bgdyzt",0));
        list2.add(new ExcelBean("备注信息","bzxx",0));
        list2.add(new ExcelBean("领取人员","lqry",0));
        list2.add(new ExcelBean("领取人员部门代码","lqrybmdm",0));
        list2.add(new ExcelBean("领取日期","lqrq",0));
        list2.add(new ExcelBean("制备日期","zbrq",0));
        list2.add(new ExcelBean("处理原因","clyy",0));
        list2.add(new ExcelBean("抽样地点","cydd",0));
        map1.put(0,list2);
        String sheetName = "过期样品台账";
        //调用ExcelUtil
        xssfWorkbook = ExcelUtil.createExcelFile(Gqyptz.class, list, map1, sheetName);
        return xssfWorkbook;
    }
}
