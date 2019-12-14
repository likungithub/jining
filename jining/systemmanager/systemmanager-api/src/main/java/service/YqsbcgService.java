package service;

import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

public interface YqsbcgService {
    /*查看采购申请*/
    public List<Map> selectYqsbcg(Map map);
    public Integer selectYqCount(Map map);
    /*查询申请人所在部门*/
    public List<Map> selectBmdm(Map map);
    /*新增采购申请*/
    public void insertYqsbcg(Map map);
    /*删除仪器设备采购申请*/
    public void deleteYqsbcgsq(Map map);
    /*修改仪器设备采购申请*/
    public void updateYqsbcgsq(Map map);
    /*提交采购申请*/
    public void submitCgsq(Map map);
    /*判断身份*/
    public List<Map> findInd(Map map);
    /*实验室主管查询采购申请信息*/
    public List<Map> findYqcgsqsys(Map map);
    public Integer findCountsys(Map map);
    /*分管主任查询采购申请信息*/
    public List<Map> findYqcgsqfg(Map map);
    public Integer findCountfg(Map map);
    /*单位负责人查询采购申请信息*/
    public List<Map> findYqcgsqdw(Map map);
    public Integer findCountdw(Map map);
    /*实验室主管审批*/
    public void syszgSP(Map map);
    /*分管主任审批*/
    public void fggrSP(Map map);
    /*单位负责人审批*/
    public void dwfzrSP(Map map);
    /*退回*/
    public void syszgTH(Map map);
    public void fggrTH(Map map);
    public void dwfzrTH(Map map);
    public void importCgsqExcel(InputStream in, MultipartFile file)throws Exception;
}
