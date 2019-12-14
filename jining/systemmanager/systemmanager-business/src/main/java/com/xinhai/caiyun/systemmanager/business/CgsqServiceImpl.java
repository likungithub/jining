package com.xinhai.caiyun.systemmanager.business;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import com.xinhai.caiyun.systemmanager.dao.CgsqMapper;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import service.CgsqService;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@Transactional
public class CgsqServiceImpl implements CgsqService {
    @Autowired
    private CgsqMapper cgsqMapper;

    /**
     * 获得采购申请的信息
     */
    public List<Map> findByNaTy(Map map) {
        return cgsqMapper.findByNaTy(map);
    }

    ;

    /**
     * 获得采购信息的数量
     */
    public Integer findByNaTyNum(Map map) {
        return cgsqMapper.findByNaTyNum(map);
    }

    @Override
    public void updatezt(Integer id) {
        cgsqMapper.updatezt(id);
    }

    ;

    /**
     * 更新耗材的信息
     *
     * @param map
     */
    public void updateCgsq(Map map) {
        cgsqMapper.updateCgsq(map);
    }

    ;

    /**
     * 通过id查找耗材信息
     */
    public List<Map> findById(String id) {
        return cgsqMapper.findById(id);
    }

    ;

    /**
     * 增加采够申请的信息
     */
    public void addCgsq(Map map) {
        cgsqMapper.addCgsq(map);
    }

    ;
    /**
     * 批量删除信息
     */
    public void deleteCgsq(List<String> ids) {
        cgsqMapper.deleteCgsq(ids);
    }
    ;

    /**
     * 导入Excel
     */
    public void importCgsqExcel(InputStream in, MultipartFile file) throws Exception {
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in, file.getOriginalFilename());
        List<Map> list = new ArrayList<Map>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
        //遍历listob数据，把数据放到List中
        for (int i = 0; i < listob.size(); i++) {
            List<Object> ob = listob.get(i);
            Map map = new HashMap();
            map.put("xh", String.valueOf(ob.get(0)));
            map.put("hcmc", String.valueOf(ob.get(1)));
            map.put("gg", String.valueOf(ob.get(2)));
            map.put("sl", String.valueOf(ob.get(3)));
            map.put("cgmd", String.valueOf(ob.get(4)));
            map.put("dj", String.valueOf(ob.get(5)));
            map.put("zj", String.valueOf(ob.get(6)));
            map.put("sccj", String.valueOf(ob.get(7)));
            map.put("jb", String.valueOf(ob.get(8)));
            String hclx = String.valueOf(ob.get(9));
            if (hclx.equals("化学品")) {
                hclx = "2";
            } else if (hclx.equals("易制毒")) {
                hclx = "3";
            } else if (hclx.equals("易制爆")) {
                hclx = "4";
            } else if (hclx.equals("标准物质")) {
                hclx = "5";
            } else {
                hclx = "1";
            }
            map.put("hclx", hclx);
            map.put("hcbm",sdf.format(new Date())+i);//耗材的编码格式  随便写个  哈哈
            String sqr = CurrentLoginUser.getUser().getZydm();
            map.put("sqr", sqr);
            list.add(map);
        }
        //批量插入
        cgsqMapper.addCgsqExcel(list);
    }
}
