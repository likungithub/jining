package com.xinhai.caiyun.systemmanager.business;
import com.xinhai.caiyun.systemmanager.api.Cggl;
import com.xinhai.caiyun.systemmanager.api.ExcelBean;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import com.xinhai.caiyun.systemmanager.dao.CgglMapper;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import service.CgglService;
import java.beans.IntrospectionException;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class CgglServiceImpl implements CgglService {
    @Autowired
    private CgglMapper cgglMapper;

    /**
     * 获得采购管理中的数据
     */
    public List<Map> selectCggl(Map map) {
        return cgglMapper.selectCggl(map);
    }

    ;

    /**
     *
     * 获得采购管理中的数据的数量
     */
    public Integer selectCount(Map map) {
        return cgglMapper.selectCount(map);
    }
    /**
     * 编制成功和退回操作  修改状态
     */
    public void  saveBzzt(Map map){
        cgglMapper.saveBzzt(map);
    };
    ;
    public XSSFWorkbook exportCgglExcel(String[] ids) throws InvocationTargetException, ClassNotFoundException, IntrospectionException, ParseException, IllegalAccessException {
        XSSFWorkbook xssfWorkbook1 = null;
        List<ExcelBean> excel = new ArrayList<ExcelBean>();
        List<Cggl> list=new ArrayList<Cggl>();
        Cggl cggl=null;
        Integer num=1;
        for (int i=0;i<ids.length;i++){
            cggl=cgglMapper.queryCcglExcel(ids[i]);
            cggl.setXh(num++);
            String hclx=cggl.getHclx();
            if(hclx.equals("1")){
                hclx="一般耗材";
            }else if(hclx.equals("2")){
                hclx="化学品";
            } else if(hclx.equals("3")){
                hclx="易制毒";
            } else if(hclx.equals("4")){
                hclx="易制爆";
            }else {
                hclx="";
            }
            cggl.setHclx(hclx);
            String  sqzt=cggl.getSqzt();
            if(sqzt.equals("001")){
                sqzt="审批中";
            }else if(sqzt.equals("002")){
                sqzt="审批通过";
            }else if(sqzt.equals("003")){
                sqzt="已退回";
            }else if(sqzt.equals("004")){
                sqzt="已采购";
            }else if(sqzt.equals("005")){
                sqzt="已入库";
            }else {
                sqzt="";
            }
            cggl.setSqzt(sqzt);
            list.add(cggl);
        }
        Map<Integer, List<ExcelBean>> map = new LinkedHashMap<>();
        //设置标题栏
        excel.add(new ExcelBean("序号", "xh", 0));
        excel.add(new ExcelBean("耗材名称", "hcmc", 0));
        excel.add(new ExcelBean("规格", "gg", 0));
        excel.add(new ExcelBean("级别", "jb", 0));
        excel.add(new ExcelBean("数量", "sl", 0));
        excel.add(new ExcelBean("采购时效(天)", "cgsx", 0));
        excel.add(new ExcelBean("质保期限(天)", "zbqx", 0));
        excel.add(new ExcelBean("申请人", "sqr", 0));
        excel.add(new ExcelBean("申请日期", "sqrq", 0));
        excel.add(new ExcelBean("审批人", "spr", 0));
        excel.add(new ExcelBean("审批日期", "sprq", 0));
        excel.add(new ExcelBean("单价(元)", "dj", 0));
        excel.add(new ExcelBean("总价(元)", "zj", 0));
        excel.add(new ExcelBean("备注", "bz", 0));
        excel.add(new ExcelBean("申请状态", "sqzt", 0));
        excel.add(new ExcelBean("耗材类型", "hclx", 0));
        map.put(0, excel);
        //调用ExcelUtil的方法
        xssfWorkbook1 = ExcelUtil.createExcelFile(Cggl.class, list,map, "采购信息单");
        return xssfWorkbook1;
    };
    /**
     * 获得采购验收的信息
     */
    public List<Map> queryCgys(Map map){
        return cgglMapper.queryCgys(map);
    };
    /*
     *
     * 修改耗材单价总价*/
    public void updateCgsqhcbz(Map map){
        cgglMapper.updateCgsqhcbz(map);
    };
    /**
     * 获得采购验收的信息的数量
     */
    public Integer queryCgysNum(Map map){
        return cgglMapper.queryCgysNum(map);
    };
    /**
     * 采购验收  更改采购状态和申请状态
     */
    public void  saveCgysZt(List ids){
        cgglMapper.saveCgysZt(ids);
    };
    /**
     * 通过ids  获得对应的采购验收的信息
     */
    public List<Map>  queryCgysByIds(List ids){
        return cgglMapper.queryCgysByIds(ids);
    };
    /**
     * 更新采购管理中的总价
     */
    public void saveZj(Map map){
        cgglMapper.saveZj(map);
    };
}
