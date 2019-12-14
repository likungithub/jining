package com.xinhai.caiyun.customermanage.business;
import com.xinhai.caiyun.customermanage.dao.ImportExcelMapper;
import com.xinhai.caiyun.customermanage.dao.TqywtMapper;
import com.xinhai.caiyun.customermanage.service.ImportExcelService;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.InputStream;
import java.util.*;

@Service
public class ImportExcelServiceImpl implements ImportExcelService {
    @Autowired
    private ImportExcelMapper importExcelMapper;
    @Autowired
    private TqywtMapper tqywtMapper;
    /**
     *导入抽样一对多中的样品信息
     */
    public void importCyypExcel(InputStream in, MultipartFile file, String wtid) throws Exception{
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in, file.getOriginalFilename());
        List<Map> list = new ArrayList<Map>();
        Map map =null;
        //遍历listob数据，把数据放到List中
        for (int i = 0; i < listob.size(); i++) {
            List<Object> ob = listob.get(i);
            map = new HashMap();
            map.put("wtid",wtid);
            map.put("ypbm", String.valueOf(ob.get(0)));
            map.put("ypmc", String.valueOf(ob.get(1)));
            map.put("ypdj", String.valueOf(ob.get(2)));
            map.put("ggxh", String.valueOf(ob.get(3)));
            map.put("ypsl", String.valueOf(ob.get(4)));
            map.put("ypdw", String.valueOf(ob.get(5)));
            map.put("sb", String.valueOf(ob.get(6)));
            map.put("scrq", String.valueOf(ob.get(7)));
            map.put("ypphhbh", String.valueOf(ob.get(8)));
            map.put("ypzt", String.valueOf(ob.get(9)));
            String ypbctj=String.valueOf(ob.get(10));
            if("常温".equals(ypbctj)){
                ypbctj="001";
            }else if("避光".equals(ypbctj)){
                ypbctj="002";
            }else if("干燥".equals(ypbctj)){
                ypbctj="003";
            }else if("冷藏".equals(ypbctj)){
                ypbctj="004";
            }else if("冷冻".equals(ypbctj)){
                ypbctj="005";
            }else {
                ypbctj="006";
            }
            map.put("ypbctj", ypbctj);
            map.put("scdw", String.valueOf(ob.get(11)));
            map.put("scdwlxdh", String.valueOf(ob.get(12)));
            map.put("fyry", String.valueOf(ob.get(13)));
            map.put("fyzt", String.valueOf(ob.get(14)));
            map.put("ybjs", String.valueOf(ob.get(15)));
            map.put("bzq", String.valueOf(ob.get(16)));
            String ypwt=String.valueOf(ob.get(17));
            if("固态".equals(ypwt)){
                ypwt="1";
            }else if("液态".equals(ypwt)){
                ypwt="2";
            }else if("气态".equals(ypwt)){
                ypwt="3";
            }else {
                ypwt="4";
            }
            map.put("ypwt",ypwt );
            String if_th=String.valueOf(ob.get(18));
            if("是".equals(if_th)){
                if_th="1";
            }else {
                if_th="0";
            }
            map.put("if_th",if_th );
            String if_sgr= String.valueOf(ob.get(19));
            if("是".equals(if_sgr)){
                if_sgr="1";
            }else {
                if_sgr="0";
            }
            map.put("if_sgr",if_sgr);
            map.put("ypddrq", String.valueOf(ob.get(20)));
            map.put("cydd",String.valueOf(ob.get(21)));//抽样地点
            map.put("if_cy","1");
            if(tqywtMapper.checkYpbm(String.valueOf(ob.get(0))).size()==0){//检测样品编码是否存在数据库中  存在就放在集合里
                list.add(map);
            }
        }
        //批量插入
        importExcelMapper.importCyypExcel(list);
    }
}
