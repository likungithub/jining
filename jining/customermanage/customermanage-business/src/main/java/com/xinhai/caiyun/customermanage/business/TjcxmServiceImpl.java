package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.ExcelUtil;
import com.xinhai.caiyun.customermanage.api.TjcxmJbxx;
import com.xinhai.caiyun.customermanage.api.Tqywt;
import com.xinhai.caiyun.customermanage.api.TwtJbxx;
import com.xinhai.caiyun.customermanage.dao.TjcxmMapper;
import com.xinhai.caiyun.customermanage.dao.TqywtMapper;
import com.xinhai.caiyun.customermanage.service.TjcxmService;
import com.xinhai.caiyun.customermanage.service.TqywtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.*;

@Service
public class TjcxmServiceImpl implements TjcxmService {

    @Autowired
    private TjcxmMapper tjcxmMapper;

    @Override
    public TjcxmJbxx findTjcxmJbxx(String id) {
        return tjcxmMapper.findTjcxmJbxx(id);
    }

    @Override
    public List<TwtJbxx> findTjcxmJbxxAll(int start, int len, String htmc, String htbh, String htlx, String wtdwmc, Date HtstartDate, Date HtendDate, Date BgstartDate, Date BgendDate, String ywry, String zydm) {
        return null;
    }

    @Override
    public int findTjcxmJbxxAllNums(String htmc, String htbh, String htlx, String wtdwmc, Date HtstartDate, Date HtendDate, Date BgstartDate, Date BgendDate, String ywry, String zydm) {
        return 0;
    }

    @Override
    public void createTjcxmJbxx(TjcxmJbxx tjcxm) {
        tjcxmMapper.createTjcxmJbxx(tjcxm);
    }

    @Override
    public void deleteTjcxmJbxxbyId(String id) {
        tjcxmMapper.deleteTjcxmJbxxbyId(id);
    }

    @Override
    public void insertList(List<TjcxmJbxx> list) {

    }

    @Override
    public void updateTjcxmJbxx(TjcxmJbxx jcxm) {
        tjcxmMapper.updateTjcxmJbxx(jcxm);
    }

    @Override
    public List<Map> findTjcxmlist(int start, int len, String jcxm, String yl, String xl, String zydm,String jclbdm,String ypid,String pdyj,String jyyj) {
        return tjcxmMapper.findTjcxmlist(start, len, jcxm, yl, xl, zydm, jclbdm,ypid,pdyj,jyyj);
    }

    @Override
    public int findTjcxmlistNums(String jcxm, String yl, String xl, String zydm,String jclbdm,String ypid,String pdyj,String jyyj) {
        return tjcxmMapper.findTjcxmlistNums(jcxm, yl, xl, zydm, jclbdm,ypid,pdyj,jyyj);
    }

    @Override
    public List<TjcxmJbxx> findJcxmByYpid(int start, int len, String type, String searchText, String ypid, String zydm) {
        return tjcxmMapper.findJcxmByYpid(start, len, type, searchText, ypid, zydm);
    }

    @Override
    public int findJcxmByYpidNums(String type, String searchText, String ypid, String zydm) {
        return tjcxmMapper.findJcxmByYpidNums(type, searchText, ypid, zydm);
    }
    private String checkNull(Object obj)
    {
        if(obj==null)
        {
            return "";
        }else
        {
            return obj+"";
        }
    }

    public void importJcxmExcel(InputStream in, MultipartFile file) throws Exception {
        int nowRwo=0;
        int colCount=0;
        try {
            List<List<Object>> listob = ExcelUtil.getBankListByExcel(in, file.getOriginalFilename());
            List<Map> list = new ArrayList<Map>();
            Map map = null;
            //遍历listob数据，把数据放到List中
            int rowCount = listob.size();

            for (int i = 0; i < listob.size(); i++) {
                nowRwo=i;
                List<Object> ob = listob.get(i);
                colCount = ob.size();
                map = new HashMap();
                map.put("zwmc_bm", checkNull(ob.get(0) + ""));//检测项名称
                map.put("xl", checkNull(ob.get(1)));//细类
                map.put("cyl", checkNull(ob.get(2)));//次亚类
                map.put("yl", checkNull(ob.get(3)));//亚类
                map.put("cpdlmc", checkNull(ob.get(4)));//产品大类名称
                map.put("cpdldm", checkNull(ob.get(5)));//产品大类代码
                map.put("jclbdm", checkNull(ob.get(6)));//产品类别代码
                map.put("jcfa", checkNull(ob.get(7)));//检测方法
                map.put("pdyj", checkNull(ob.get(8)));//判定依据
                map.put("pdyjmc", checkNull(ob.get(9)));//判定依据名称
                map.put("zm", checkNull(ob.get(10)));//组名
                map.put("bl", checkNull(ob.get(11)));//倍率
                String pd = checkNull(ob.get(12));
                if (pd.equals("是")) {
                    pd = "1";
                } else if (pd.equals("否")) {
                    pd = "0";
                } else {
                    pd = "3";
                }
                map.put("if_pd", pd);//是否判定
                map.put("bjf", checkNull(ob.get(13)));//比较符
                map.put("pdnh", checkNull(ob.get(14)));//判断编号
                map.put("xlzmrz", checkNull(ob.get(15)));//限量值默认值
                map.put("jcyj", checkNull(ob.get(16)));//检测依据
                map.put("jcyjmc", checkNull(ob.get(17)));//检测依据名称
                String cma = checkNull(ob.get(18));
                if (cma.equals("是")) {
                    cma = "1";
                } else if (cma.equals("否")) {
                    cma = "0";
                } else {
                    cma = "3";
                }
                map.put("if_cma", cma);//是否有cma资质
                String cmaf = checkNull(ob.get(19));
                if (cmaf.equals("是")) {
                    cmaf = "1";
                } else if (cmaf.equals("否")) {
                    cmaf = "0";
                } else {
                    cmaf = "3";
                }
                map.put("if_cmaf", cmaf);//是否有cmaf资质
                String cnas = checkNull(ob.get(20));
                if (cnas.equals("是")) {
                    cnas = "1";
                } else if (cnas.equals("否")) {
                    cnas = "0";
                } else {
                    cnas = "3";
                }
                map.put("if_cnas", cnas);//是否有cnas资质
                String catl = checkNull(ob.get(21));
                if (catl.equals("是")) {
                    catl = "1";
                } else if (catl.equals("否")) {
                    catl = "0";
                } else {
                    catl = "3";
                }
                map.put("if_catl", catl);//是否catl资质
                map.put("jcx", checkNull(ob.get(22)));//检出限
                map.put("xlz", checkNull(ob.get(23)));//限量值
                map.put("jldw", checkNull(ob.get(24)));//计量单位
                map.put("bzffjcxdw", checkNull(ob.get(25)));//标准方法检出限单位
                map.put("bzzxyxx", checkNull(ob.get(26)));//标准最小允许限
                map.put("bzzxyxxdw", checkNull(ob.get(27)));//标准最小允许限单位
                map.put("bzzdyxx", checkNull(ob.get(28)));//标准最大允许限
                map.put("bzzdyxxdw", checkNull(ob.get(29)));//标准最大允许限单位
                map.put("wswnz", checkNull(ob.get(30)));//微生物n值
                map.put("wswmz", checkNull(ob.get(31)));//微生物m值
                map.put("wswcz", checkNull(ob.get(32)));//微生物c值
                String xtpd = checkNull(ob.get(33));
                if (xtpd.equals("是")) {
                    xtpd = "1";
                } else if (catl.equals("否")) {
                    xtpd = "0";
                } else {
                    xtpd = "3";
                }
                map.put("if_xtpd", xtpd);//是否系统判定
                map.put("jg", checkNull(ob.get(34)));//价格
                String bzff = checkNull(ob.get(35));
                if (bzff.equals("是")) {
                    bzff = "1";
                } else if (catl.equals("否")) {
                    bzff = "0";
                } else {
                    bzff = "3";
                }
                map.put("if_bzff", bzff);//是否标准方法
                map.put("zbzl", checkNull(ob.get(36)));//制备质量
                map.put("zbzldw", checkNull(ob.get(37)));//制备质量单位
                map.put("yyckjz", checkNull(ob.get(38)));//营养参考价值
                map.put("bz", checkNull(ob.get(39)));//备注
                list.add(map);
            }
            tjcxmMapper.addJcxmExcel(list);
        }catch (Exception e)
        {
            System.out.println("错误行="+nowRwo+"====错误列"+colCount+"====");
            throw  e;
        }
        //批量插入

    }
    /**
     * 删除检测项目
     */
    public  void  delJxcmJbxx(String id){
        tjcxmMapper.delJxcmJbxx(id);
    };

    //20190830添加新方法列表
    public int findTjcxmlistNumsNew(Map map){
        return tjcxmMapper.findTjcxmlistNumsNew(map);
    }

    public List<Map> findTjcxmlistNew(Map map){
        return tjcxmMapper.findTjcxmlistNew(map);
    }
}
