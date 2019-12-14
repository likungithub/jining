package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.Tqywt;
import com.xinhai.caiyun.customermanage.dao.CydxxglMapper;
import com.xinhai.caiyun.customermanage.dao.ScxtdjMapper;
import com.xinhai.caiyun.customermanage.service.ScxtdjService;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
import service.BmgzService;

import java.io.InputStream;
import java.util.*;

@Repository
public class ScxtdjServiceImpl implements ScxtdjService {
    @Autowired
    private ScxtdjMapper scxtdjMapper;
    @Autowired
    private CydxxglMapper cydxxglMapper;
    @Autowired
    private BmgzService bmgzService;
    /**
     * 查询导入日志
     * @param map
     * @return
     */
    @Override
    public List<Map> selectRzAll(Map map) {
        return scxtdjMapper.selectRzAll(map);
    }

    @Override
    public Integer selectRzCount(Map map) {
        return scxtdjMapper.selectRzCount(map);
    }

    /**
     * 查询导入日志表主键
     * @param map
     * @return
     */
    @Override
    public String selectLogid(Map map) {
        return scxtdjMapper.selectLogid(map);
    }

    /**
     * 导入操作
     * @param in
     * @param file
     * @param name
     * @param wtid
     * @param logId
     * @throws Exception
     */
    @Override
    public void importscxtdjExcel(InputStream in, MultipartFile file, String name, String wtid, String logId) throws Exception {
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in,file.getOriginalFilename());
        List<Map>list1 = new ArrayList<>();
        System.out.print(listob.size());
        int intlogid = 0;
        String  keystring="cydbh,rwly,rwlx,cyrq,cydd,ypmc,cpzl,yply,cyfs,ypsx,yplx,sb,ypph,scrq,bzq,zxbz,ggxh,zldj,scxkzbh,dj,sfck,cyjs,cysl,cysldw,bysl,bzfl,ypxt,cysypdcctj,cyypbz,jsydz,jsypjzrq,bcydwmc,qylx,bcydwdz,bcydwfrdb,bcydwnxse,bcydwyyzz,bcydwlxr,bcydwdh,bcydwcz,bcydwyb,bssczmc,bssczdz,bssczlxr,bssczlxdh,cydwmc,cydwdz,cydwlxr,cydwlxdh,cydwcz,cydwyb,cyr,bz,cyhj,bcydwqygm,bcydwssqy,cyfw,spflid,jybgzt,scdrsj,sfby,cyrlxdh,sfztc,ytlx,xkzlx,rqxz,xkzh,jhl,kcl,cctjqt,cctjwd,cctjsd,ypbzqt,cygj,txm,cydwjb,cydwlxrdh,cydwlxremail";
        List<String>    keysList= Arrays.asList(keystring.split(","));
        if(logId ==null||"".equals(logId)){
            intlogid = 0;
        }else {
            intlogid = Integer.parseInt(logId);
        }

        //查询委托单是否存在
        int dd = cydxxglMapper.selectWtd(wtid);
        //若委托单已存在，删除此委托下所有样品
        if(dd>0){
            cydxxglMapper.deleteWtYp(wtid);
        }
        Map wtinfo = cydxxglMapper.selectWtInfo(wtid);
        for (int i = 0;i<listob.size();i++){
            //获取样品编码
            String ypbm = bmgzService.getMaxYpbm(wtinfo.get("rwlx").toString());
            List<Object> list = listob.get(i);
            Map map=new HashMap();
            Map map1 = new HashMap();
            for(int j=0;j<list.size();j++){
                map.put("wtid",wtid);
                map.put("logid",intlogid+1);
                map.put(keysList.get(j),String.valueOf(list.get(j)));
            }
            map1.put("wtid",wtid);
            map1.put("jszt","001");
            map1.put("ypzbzt","000");
            map1.put("ypjczt","001");
            map1.put("sjjyzt","001");
            map1.put("sjsczt","001");
            map1.put("if_cy","1");
            map1.put("bgbzzt","001");
            map1.put("bgzbzt","001");
            map1.put("bgzjsp","000");
            map1.put("bgshzt","000");
            map1.put("bgpzzt","000");
            map1.put("bgdyzt","000");
            map1.put("if_sc","0");
            map1.put("if_th","0");
            map1.put("zbfpzt","001");
            map1.put("ypbm",ypbm);
            map1.put("ifsgr","0");
            map1.put("ypmc",String.valueOf(list.get(5)));
            map1.put("sb",String.valueOf(list.get(6)));
            map1.put("ggxh",String.valueOf(list.get(16)));
            map1.put("ypdj",String.valueOf(list.get(17)));
            map1.put("ypsl",String.valueOf(list.get(22)));
            map1.put("ypdw",String.valueOf(list.get(23)));
            map1.put("scrq",String.valueOf(list.get(13)));
            map1.put("ypphhbh",String.valueOf(list.get(12)));
            map1.put("ypzt",String.valueOf(list.get(26)));
            map1.put("ypbctj",String.valueOf(list.get(27)));
            map1.put("scdw",String.valueOf(list.get(41)));
            map1.put("scdwlxdh",String.valueOf(list.get(44)));
            map1.put("ybjs",String.valueOf(list.get(21)));
            map1.put("bzq",String.valueOf(list.get(14)));
            map1.put("bzxx",String.valueOf(list.get(52)));
            map1.put("cydd",String.valueOf(list.get(4)));

            //插入表t_cydgl_jbxx中Excel数据
            scxtdjMapper.importcydExcelSc(map);
            //插入表t_ypgl_jbxx中Excel数据
            cydxxglMapper.importYpglExcel(map1);

        }
    }

    /**
     * 插入导入日志
     * @param map
     */
    @Override
    public void insertScdjLog(Map map) {
        scxtdjMapper.insertScdjLog(map);
    }
    //查询导入Excel详情
    public List<Map> selectExcel(Map map) {
        return scxtdjMapper.selectExcel(map);
    }
    public Integer selectExcelCount(Map map) {
        return scxtdjMapper.selectExcelCount(map);
    }
}
