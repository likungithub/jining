package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.Jcb;
import com.xinhai.caiyun.customermanage.api.Jcxmbgl;
import com.xinhai.caiyun.customermanage.api.MailList;
import com.xinhai.caiyun.customermanage.dao.JcbaoMapper;
import com.xinhai.caiyun.customermanage.service.JcbaoService;
import com.xinhai.caiyun.systemmanager.api.ExcelBean;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import net.sf.json.JSONArray;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.*;

@Repository
public class JcbaoServiceImpl implements JcbaoService {
    @Autowired
    private JcbaoMapper jcbaoMapper;

    //导入Excel
    @Override
    public void importjcbExcel(InputStream in, MultipartFile file, String name) throws Exception {
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in,file.getOriginalFilename());
        System.out.print(listob.size());
        String sheet = null;
        String mark = null;
        int line=0;
        boolean type = true;
        boolean markType = true;
        List<Object> sheetlist = new ArrayList<Object>();
        List<Object> marklist = new ArrayList<Object>();
        List<Object> jcxmIdList = new ArrayList<Object>();
        String keyString = "zwmc_bm,xl,cyl,yl,cpdlmc,cpdldm,jclbdm,jcfa,pdyj,pdyjmc,zm,bl,if_pd,bjf,pdnh,xlzmrz,jcyj,jcyjmc,if_cma,if_cmaf,if_cnas,if_catl,jcx,xlz,jldw,ywmc,bzxx,lrry,bmdm,gxry,scry,bzffjcxdw,bzzxyxx,bzzxyxxdw,bzzdyxx,bzzdyxxdw,if_yqfp,jcff,wswnz,wswmz,wswcz,if_xtpd,jg,if_bzff,zbzl,zbzldw,yyckjz,bz";
        List<String> keyList = Arrays.asList(keyString.split(","));
        for(int i=0;i<listob.size()-16;i++){
            List<Object> list = listob.get(i);
            Map map=new HashMap();
            //先拿到sheet页
            sheet = String.valueOf(list.get(list.size()-1));
            //将拿到的sheet页放入集合里
            sheetlist.add(sheet);

            //过滤第一次循环
            if(i>0&&type){
                //判断此次循环取到的sheet与上次循环取到的sheet是否相同
                if(sheet.equals(String.valueOf(sheetlist.get(sheetlist.size()-2)))){
                    type = true;
                }else {
                    type = false;
                }
            }
            //判断是否切换了sheet页(type:true没有切换；type:false切换了sheet页)
            if(type){
                //将关联标志放入集合里
                marklist.add(String.valueOf(list.get(0)));
                for (int keyi=0;keyi<list.size()-2;keyi++){
                    map.put(keyList.get(keyi),String.valueOf(list.get(keyi+1)));
                }
                //插入检测项表中Excel数据
                jcbaoMapper.insertJcxm(map);
                jcxmIdList.add(jcbaoMapper.selectJcxmId(map));
            }else {
                String jcbid = UUID.randomUUID().toString();

                //遍历marklist集合,判断关联标志有没有改变
                for (int is=line;is<marklist.size();is++){
                    //获取关联标志
                    mark=String.valueOf(marklist.get(is));
                    //过滤第一次循环
                    if(is>0&&is>line){
                        //判断每行标志是否改变(markType:true没改变；markType:false已改变)
                        if(mark.equals(String.valueOf(marklist.get(is-1)))){
                            markType = true;
                        }else {
                            markType = false;
                        }
                    }else {
                        markType = true;
                    }
                    //如果标志没有改变
                    if(markType){
                        map.put("jcbname",String.valueOf(list.get(1)));
                        map.put("jcbdl",String.valueOf(list.get(2)));
                        map.put("jcxid",String.valueOf(jcxmIdList.get(is)));
                        map.put("zt","1");
                        String jcb_if = jcbaoMapper.selectJbcmc(map);
                        if(jcb_if==null||jcb_if.equals("")){
                            map.put("jcbid",jcbid);
                        }else {
                            map.put("jcbid",jcb_if);
                        }
                        jcbaoMapper.insertJcb(map);
                    }else {
                        line = is;
                        break;
                    }

                }
            }
        }

    }

    @Override
    public XSSFWorkbook exportjcbExcel(String[] jcbid) throws Exception {
        List<Jcxmbgl> jcxlist= new ArrayList();
        List<Jcb> jcbList = new ArrayList();
        Jcxmbgl jcxmbgl = null;
        Jcb jcb = null;
        XSSFWorkbook xssfWorkbook = null;
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("检测项目");
        XSSFSheet sheet1 = workbook.createSheet("检测包");



        for (String jcbids:jcbid) {
            Map map = new HashMap();
            map.put("jcbid", jcbids);
            List<Jcxmbgl> jcxid = jcbaoMapper.jcxid(map);
            int number = 0;
            jcb = jcbaoMapper.findJcbByJcbid(map);
            jcbList.add(jcb);
            for(int i=0;i<jcxid.size();i++){
                number +=1;
                jcxmbgl = jcxid.get(i);
                jcxlist.add(jcxmbgl);

                List<ExcelBean> list2 = new ArrayList<>();
                List<ExcelBean> list3 = new ArrayList<>();
                Map<Integer, List<ExcelBean>> map1 = new HashMap<>();
                Map<Integer, List<ExcelBean>> map2 = new HashMap<>();

                list2.add(new ExcelBean("标识", "markid", 0));
                list2.add(new ExcelBean("检测项目名称", "zwmc_bm", 0));
                list2.add(new ExcelBean("细类", "xl", 0));
                list2.add(new ExcelBean("次亚类", "cyl", 0));
                list2.add(new ExcelBean("亚类", "yl", 0));
                list2.add(new ExcelBean("产品大类名称", "cpdlmc", 0));
                list2.add(new ExcelBean("产品大类代码", "cpdldm", 0));
                list2.add(new ExcelBean("检测类别代码：001食品、002药品、003农产品...", "jclbdm", 0));
                list2.add(new ExcelBean("检测方法", "jcfa", 0));
                list2.add(new ExcelBean("判定依据", "pdyj", 0));
                list2.add(new ExcelBean("判定依据名称", "pdyjmc", 0));
                list2.add(new ExcelBean("组名", "zm", 0));
                list2.add(new ExcelBean("倍率", "bl", 0));
                list2.add(new ExcelBean("是否判定(1是0否)", "if_pd", 0));
                list2.add(new ExcelBean("比较符", "bjf", 0));
                list2.add(new ExcelBean("判断编号", "pdnh", 0));
                list2.add(new ExcelBean("限量值默认值", "xlzmrz", 0));
                list2.add(new ExcelBean("检验依据", "jcyj", 0));
                list2.add(new ExcelBean("检测依据名称", "jcyjmc", 0));
                list2.add(new ExcelBean("是否有CMA资质(1是0否)", "if_cma", 0));
                list2.add(new ExcelBean("是否有CMAF资质(1是0否)", "if_cmaf", 0));
                list2.add(new ExcelBean("是否有CNAS资质(1是0否)", "if_cnas", 0));
                list2.add(new ExcelBean("是否有CATL资质(1是0否)", "if_catl", 0));
                list2.add(new ExcelBean("检出限", "jcx", 0));
                list2.add(new ExcelBean("限量值", "xlz", 0));
                list2.add(new ExcelBean("计量单位", "jldw", 0));
                list2.add(new ExcelBean("英文名称", "ywmc", 0));
                list2.add(new ExcelBean("备注", "bzxx", 0));
                list2.add(new ExcelBean("录入人员", "lrry", 0));
                list2.add(new ExcelBean("录入人所在部门代码", "bmdm", 0));
                list2.add(new ExcelBean("跟新人员", "gxry", 0));
                list2.add(new ExcelBean("删除人员", "scry", 0));
                list2.add(new ExcelBean("标准方法检出限单位", "bzffjcxdw", 0));
                list2.add(new ExcelBean("标准最小允许限", "bzzxyxx", 0));
                list2.add(new ExcelBean("标准最小允许限单位", "bzzxyxxdw", 0));
                list2.add(new ExcelBean("标准最大允许限", "bzzdyxx", 0));
                list2.add(new ExcelBean("标准最大允许限单位", "bzzdyxxdw", 0));
                list2.add(new ExcelBean("仪器分配状态(001未分配;002已分配)", "if_yqfp", 0));
                list2.add(new ExcelBean("检测方法", "jcff", 0));
                list2.add(new ExcelBean("微生物n值", "wswnz", 0));
                list2.add(new ExcelBean("微生物M值", "wswmz", 0));
                list2.add(new ExcelBean("微生物C值", "wswcz", 0));
                list2.add(new ExcelBean("是否系统判定(0否;1是)", "if_xtpd", 0));
                list2.add(new ExcelBean("价格", "jg", 0));
                list2.add(new ExcelBean("是否标准方法（0否;1是）", "if_bzff", 0));
                list2.add(new ExcelBean("制备质量", "zbzl", 0));
                list2.add(new ExcelBean("制备质量单位", "zbzldw", 0));
                list2.add(new ExcelBean("营养参考价值", "yyckjz", 0));
                list2.add(new ExcelBean("备注", "bz", 0));


                list3.add(new ExcelBean("标识", "markid", 0));
                list3.add(new ExcelBean("检测包名称", "jcbname", 0));
                list3.add(new ExcelBean("检测包类型", "jcbdl", 0));

                map1.put(0, list2);
                map2.put(0, list3);
                String[] sheetName = new String[]{"检测项目", "检测包"};
                //调用ExcelUtil
                xssfWorkbook = ExcelUtil.createExcelFiles(Jcxmbgl.class, jcxlist, map1, Jcb.class, jcbList, map2,workbook,sheet,sheet1,number);
            }
        }
        return xssfWorkbook;
    }
}
