package com.xinhai.caiyun.systemmanager.business;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import com.xinhai.caiyun.systemmanager.dao.KcglMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import service.KcglService;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Transactional
public class KcglServiceImpl implements KcglService {

    @Autowired
    private KcglMapper kcglMapper;
    /**
     * 查找库存管理的的信息
     */
    public List<Map> selectKcgl(Map map){
        return kcglMapper.selectKcgl(map);
    };
    /**
     * 查找库存管理的信息的数量
     */
    public Integer selectKcglNum(Map map){
        return kcglMapper.selectKcglNum(map);
    };
    /**
     * 删除库存信息
     */
    public void delKcgl(String id){
        kcglMapper.delKcgl(id);
    };
    /**
     *通过id查找耗材信息
     */
    public List<Map> findById(String id){
        return kcglMapper.findById(id);
    };
    /**
     * 更新耗材的信息
     */
    public void updateKcgl(Map map){
        kcglMapper.updateKcgl(map);
    };
    /**
     * 设置库存的用库存数量
     */
    public void  setCyKcsl(Map map){
        kcglMapper.setCyKcsl(map);
    };
    /**
     * 获得所有的检测库存的信息
     */
    public List<Map> queryAllKcglByCheck(){
        return kcglMapper.queryAllKcglByCheck();
    };
    /**
     * 获得职员代码的信息
     */
    public List<String> queryZydm (String bmmc){
        return kcglMapper.queryZydm(bmmc);
    };
    /**
     * 导入excel
     */
    public void importKcglExcel(InputStream in, MultipartFile file) throws Exception{
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in, file.getOriginalFilename());
        List<Map> list = new ArrayList<Map>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        //遍历listob数据，把数据放到List中
        for (int i = 0; i < listob.size(); i++) {
            List<Object> ob = listob.get(i);
            Map map=new HashMap();
            map.put("bh",String.valueOf(ob.get(0)));
            map.put("hcmc",String.valueOf(ob.get(1)));
            map.put("gg",String.valueOf(ob.get(2)));
            map.put("jb",String.valueOf(ob.get(3)));
            map.put("sl",String.valueOf(ob.get(4)));
            map.put("sccj",String.valueOf(ob.get(5)));
            map.put("cfwz",String.valueOf(ob.get(6)));
            String hclx=String.valueOf(ob.get(7));
            if("化学品".equals(hclx)){
                hclx="2";
            }else if("易制毒".equals(hclx)){
                hclx="3";
            }else if("易制爆".equals(hclx)){
                hclx="4";
            }else if ("标准物质".equals(hclx)){
                hclx="5";
            }else {
                hclx="1";
            }
            map.put("hclx",hclx);
            map.put("hcbm",sdf.format(new Date())+i);
            list.add(map);
        }
       kcglMapper.saveExcelData(list);
        //批量插入
    };
}
