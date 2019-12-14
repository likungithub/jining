package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.*;
import com.xinhai.caiyun.customermanage.dao.YpclMapper;
import com.xinhai.caiyun.customermanage.service.YpclService;
import com.xinhai.caiyun.systemmanager.api.ExcelBean;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import com.xinhai.security.api.CurrentLoginUser;
import com.xinhai.usermanager.entity.User;
import com.xinhai.usermanager.service.UserService;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class YpclServiceImpl implements YpclService {

    @Autowired
    private YpclMapper ypclMapper;
    @Autowired
    private UserService userService;

    @Override
    public List<Map> getYpclJsAll(Map map) {
        return ypclMapper.getYpclJsAllM(map);
    }

    @Override
    public int getYpclJsNums(Map map) {
        return ypclMapper.getYpclJsNumsM(map);
    }

    @Override
    public List<Map> getSampleChoiceAll(Map map) {
        return ypclMapper.getSampleChoiceAllM(map);
    }

    @Override
    public int getSampleChoiceNums(Map map) {
        return ypclMapper.getSampleChoiceNumsM(map);
    }

    @Override
    public Map getAloneSampleChoice(String id) {
        return ypclMapper.getAloneSampleChoiceM(id);
    }

    @Override
    public List<Map>  getSampleProcessorPeople() {
        return ypclMapper.getSampleProcessorPeopleM();
    }

    @Override
    public void setCreateYpclxx(Ypclxx ypclxx) {
         ypclMapper.setCreateYpclxxM(ypclxx);
    }

    @Override
    public List<Map> getYpclSPAll(Map map) {
        return ypclMapper.getYpclSPAllM(map);
    }

    @Override
    public int getYpclSPNums(Map map) {
        return ypclMapper.getYpclSPNumsM(map);
    }

    @Override
    public void getSampleApprovalUpdateZT(Ypclxx ypclxx) {
        ypclMapper.getSampleApprovalUpdateZTM(ypclxx);
    }

    @Override
    public void getCreateYpclSP(ypclsp ypclsp) {
        ypclMapper.getCreateYpclSPM(ypclsp);
    }

    @Override
    public Map getAloneSampleHandleChoice(String id) {
        return ypclMapper.getAloneSampleHandleChoiceM(id);
    }


    @Override
    public List<Map> getYpclQRAll(Map map) {
        return ypclMapper.getYpclQRAllM(map);
    }

    //导入
    @Override
    public void importYpclExcel(InputStream in, MultipartFile file, String name) throws Exception {
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in,file.getOriginalFilename());
        System.out.print(listob.size());
        User user = userService.getUser(CurrentLoginUser.getUser().getId());//获取当前登录用户信息
        for (int i = 0;i<listob.size();i++){
            List<Map> listYp = new ArrayList<>();
            List<Object> list = listob.get(i);
            Map map=new HashMap();
            Map map1=new HashMap();
            map1.put("ypbm",String.valueOf(list.get(0)));
            listYp = ypclMapper.findYpglByypbm(map1);
            map.put("wtid",String.valueOf(listYp.get(0).get("wtid")));
            map.put("ypid",String.valueOf(listYp.get(0).get("id")));
            map.put("zl",String.valueOf(list.get(2)));
            map.put("clyy",String.valueOf(list.get(3)));
            map.put("clfs",String.valueOf(list.get(4)));
            String clry = ypclMapper.findByclrymc(String.valueOf(list.get(5)));
            map.put("clry",clry);
            map.put("bz",String.valueOf(list.get(6)));
            map.put("zt","0");
            map.put("sqry",user.getId());
            ypclMapper.importYpclExcel(map);
        }
    }



    @Override
    public int getYpclQRNums(Map map) {
        return ypclMapper.getYpclQRNumsM(map);
    }

    @Override
    public String getCustomerName(String id) {
        return ypclMapper.getCustomerNameM(id);
    }

    @Override
    public void getSampleInformationAllUpdateZT(Map map) {
        ypclMapper.getSampleInformationAllUpdateZTM(map);
    }



    //导出
    @Override
    public XSSFWorkbook exportYpclExcel(String[] id) throws Exception {
        List<Ypcl>list = new ArrayList<>();
        Map map = new HashMap();
        Ypcl ypcl = null;
        for (String ids:id) {
            map.put("id",ids);
            ypcl = ypclMapper.findByYpclid(map);
            list.add(ypcl);
        }
        List<ExcelBean>list2 = new ArrayList<>();
        Map<Integer,List<ExcelBean>>map1 = new HashMap<>();
        XSSFWorkbook xssfWorkbook = null;
        list2.add(new ExcelBean("样品编码","ypbm",0));
        list2.add(new ExcelBean("样品名称","ypmc",0));
        list2.add(new ExcelBean("重量","zl",0));
        list2.add(new ExcelBean("处理原因","clyy",0));
        list2.add(new ExcelBean("处理方式","clfs",0));
        list2.add(new ExcelBean("处理人","clry",0));
        list2.add(new ExcelBean("备注","bz",0));
        list2.add(new ExcelBean("所属委托单","wtid",0));
        list2.add(new ExcelBean("状态","zt",0));
        list2.add(new ExcelBean("退回原因","thyy",0));
        list2.add(new ExcelBean("申请人","sqry",0));
        list2.add(new ExcelBean("申请时间","sqsj",0));

        map1.put(0,list2);
        String sheetName = "样品处理申请详情";
        //调用ExcelUtil
        xssfWorkbook = ExcelUtil.createExcelFile(Ypcl.class, list, map1, sheetName);
        return xssfWorkbook;
    }

    @Override
    public void getSampleInfoConfirm(Map map) {
        ypclMapper.getSampleInfoConfirmM(map);
    }


}
