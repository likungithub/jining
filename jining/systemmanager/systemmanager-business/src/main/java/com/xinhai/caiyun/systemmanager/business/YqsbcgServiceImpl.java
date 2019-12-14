package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import com.xinhai.caiyun.systemmanager.dao.YqsbcgMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import service.YqsbcgService;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class YqsbcgServiceImpl implements YqsbcgService {
    @Autowired
    private YqsbcgMapper yqsbcgMapper;
    /*查看采购申请*/
    public List<Map> selectYqsbcg(Map map){
        return yqsbcgMapper.selectYqsbcg(map);
    };
    public Integer selectYqCount(Map map){
        return yqsbcgMapper.selectYqCount(map);
    };
    /*查询申请人所在部门*/
    public List<Map> selectBmdm(Map map){
        return yqsbcgMapper.selectBmdm(map);
    };
    /*新增设备采购申请*/
    public void insertYqsbcg(Map map){
        yqsbcgMapper.insertYqsbcg(map);
    };
    /*删除仪器设备采购申请*/
    public void deleteYqsbcgsq(Map map){
        yqsbcgMapper.deleteYqsbcgsq(map);
    };
    /*修改仪器设备采购申请*/
    public void updateYqsbcgsq(Map map){
        yqsbcgMapper.updateYqsbcgsq(map);
    };
    /*提交采购申请*/
    public void submitCgsq(Map map){
        yqsbcgMapper.submitCgsq(map);
    };
    /*判断身份*/
    public List<Map> findInd(Map map){
        return yqsbcgMapper.findInd(map);
    };
    /*实验室主管查询采购申请信息*/
    public List<Map> findYqcgsqsys(Map map){
        return yqsbcgMapper.findYqcgsqsys(map);
    };
    public Integer findCountsys(Map map){
        return  yqsbcgMapper.findCountsys(map);
    };
    /*分管主任查询采购申请信息*/
    public List<Map> findYqcgsqfg(Map map){
        return yqsbcgMapper.findYqcgsqfg(map);
    };
    public Integer findCountfg(Map map){
        return yqsbcgMapper.findCountfg(map);
    };
    /*单位负责人查询采购申请信息*/
    public List<Map> findYqcgsqdw(Map map){
        return yqsbcgMapper.findYqcgsqdw(map);
    };
    public Integer findCountdw(Map map){
        return yqsbcgMapper.findCountdw(map);
    };
    /*实验室主管审批*/
    public void syszgSP(Map map){
        yqsbcgMapper.syszgSP(map);
    };
    /*分管主任审批*/
    public void fggrSP(Map map){
        yqsbcgMapper.fggrSP(map);
    };
    /*单位负责人审批*/
    public void dwfzrSP(Map map){
        yqsbcgMapper.dwfzrSP(map);
    };
    /*退回*/
    public void syszgTH(Map map){
        yqsbcgMapper.syszgTH(map);
    };
    public void fggrTH(Map map){
        yqsbcgMapper.fggrTH(map);
    };
    public void dwfzrTH(Map map){
        yqsbcgMapper.dwfzrTH(map);
    };
    public void importCgsqExcel(InputStream in, MultipartFile file)throws Exception{
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in,file.getOriginalFilename());
//        List<Map>list1 = new ArrayList<>();
        Map map = new HashMap();
        for (int i = 0;i<listob.size();i++){
            List<Object> list = listob.get(i);
            map.put("cgmc",String.valueOf(list.get(0)));
            map.put("pp",String.valueOf(list.get(1)));
            map.put("sl",String.valueOf(list.get(2)));
            map.put("bj",String.valueOf(list.get(3)));
            map.put("zl",String.valueOf(list.get(4)));
            map.put("xh",String.valueOf(list.get(5)));
            //  map.put("sqrq",new Date().getTime());
            map.put("sqr",String.valueOf(list.get(7)));
            map.put("sqbm",String.valueOf(list.get(8)));
            map.put("yt",String.valueOf(list.get(9)));
            map.put("bzxx",String.valueOf(list.get(10)));
//            list1.add(map);
            yqsbcgMapper.importCgsqExcel(map);
        }
    };
}
