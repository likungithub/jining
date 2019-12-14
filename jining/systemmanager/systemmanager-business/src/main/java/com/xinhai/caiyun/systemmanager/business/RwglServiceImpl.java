package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.ExcelBean;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import com.xinhai.caiyun.systemmanager.api.ExcelUtilMoreSheet;
import com.xinhai.caiyun.systemmanager.api.Scgl;
import com.xinhai.caiyun.systemmanager.dao.RwglMapper;
import com.xinhai.security.api.CurrentLoginUser;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import service.RwglService;

import java.beans.IntrospectionException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class RwglServiceImpl implements RwglService {
    @Autowired
    private RwglMapper rwglMapper;

    @Override
    /**
     * 查找所有任务管理的信息信息
     * @return
     */
    public List<Map> findAllRwgl(Map map) {
        return rwglMapper.findAllRwgl(map);
    }

    /**
     * 查找所有任务管理的数量
     *
     * @return
     */
    @Override
    public Integer findAllRwglNum(Map map) {
        return rwglMapper.findAllRwglNum(map);
    }

    @Override
    public void importRwglExcel(InputStream in, MultipartFile file) throws Exception {
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in, file.getOriginalFilename());
        List<Map> list = new ArrayList<Map>();
        Map map = null;
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        //遍历listob数据，把数据放到List中
        for (int i = 1; i <= listob.size()-1; i++) {
            List<Object> ob = listob.get(i);
            map = new HashMap();
            map.put("cydbh", String.valueOf(ob.get(0)));//抽样单编号
            map.put("rwlx", String.valueOf(ob.get(1)));//任务类型
            map.put("cyhj", String.valueOf(ob.get(2)));//抽样环节
            map.put("cydd", String.valueOf(ob.get(3)));//抽样地点
            map.put("sfby", String.valueOf(ob.get(4)));//是否补阳
            map.put("rwly", String.valueOf(ob.get(5)));//任务来源
            map.put("cyr", String.valueOf(ob.get(6)));//抽样人
            map.put("cyrlxdh", String.valueOf(ob.get(7)));//抽样人联系电话
            String  cyrq =String.valueOf(ob.get(8));
            if("".equals(cyrq) || cyrq==null){
                cyrq =null;
            }
            map.put("cyrq", cyrq);//抽样日期
            map.put("sfztc", String.valueOf(ob.get(9)));//是否直通车
            map.put("bcydwmc", String.valueOf(ob.get(10)));//被抽样单位名称
            map.put("bcydwdz", String.valueOf(ob.get(11)));//被抽样单位地址
            map.put("bcydwqygm", String.valueOf(ob.get(12)));//被抽样单位企业规模
            map.put("ytlx", String.valueOf(ob.get(13)));//业态类型
            map.put("qylx", String.valueOf(ob.get(14)));//区域类型
            map.put("bcydwyyzz", String.valueOf(ob.get(15)));//营业执照
            map.put("bcydwfrdb", String.valueOf(ob.get(16)));//法人代表
            map.put("xkzlx", String.valueOf(ob.get(17)));//许可证类型
            map.put("xkzh", String.valueOf(ob.get(18)));//许可证号
            map.put("bcydwnxse", String.valueOf(ob.get(19)));//年销售额
            map.put("bcydwlxr", String.valueOf(ob.get(20)));//被抽样单位联系人
            map.put("bcydwdh", String.valueOf(ob.get(21)));//被抽样单位联系电话
            map.put("bcydwcz", String.valueOf(ob.get(22)));//被抽样单位传真
            map.put("bcydwyb", String.valueOf(ob.get(23)));//被抽样单位邮编
            map.put("ypmc", String.valueOf(ob.get(24)));//样品名称
            map.put("yply", String.valueOf(ob.get(25)));//样品来源
            map.put("cyfs", String.valueOf(ob.get(26)));//抽样方式
            map.put("ypsx", String.valueOf(ob.get(27)));//样品属性
            map.put("yplx", String.valueOf(ob.get(28)));//样品类型
            map.put("sb", String.valueOf(ob.get(29)));//商标
            map.put("ypph",String.valueOf(ob.get(30)));//样品批号
            map.put("rqxz", String.valueOf(ob.get(31)));//日期选择
            String  scrq =String.valueOf(ob.get(32));
            if("".equals(scrq) || scrq==null){
                scrq =null;
            }
            map.put("scrq", scrq);//日期
            map.put("bzq", String.valueOf(ob.get(33)));//保质期
            map.put("zxbz", String.valueOf(ob.get(34)));//执行标准
            map.put("ggxh", String.valueOf(ob.get(35)));//规格型号
            map.put("zldj", String.valueOf(ob.get(36)));//质量等级
            map.put("scxkzbh", String.valueOf(ob.get(37)));//生产许可证编号
            map.put("dj", String.valueOf(ob.get(38)));//单价
            map.put("sfck", String.valueOf(ob.get(39)));//是否出口
            map.put("cyjs", String.valueOf(ob.get(40)));//抽样基数
            map.put("cysl", String.valueOf(ob.get(41)));//抽样数量
            map.put("cysldw", String.valueOf(ob.get(42)));//抽样数量单位
            map.put("bysl", String.valueOf(ob.get(43)));//备样数量
            map.put("jhl", String.valueOf(ob.get(44)));//进货量
            map.put("kcl", String.valueOf(ob.get(45)));//库存量
            map.put("bzfl", String.valueOf(ob.get(46)));//包装分类
            map.put("ypxt", String.valueOf(ob.get(47)));//样品形态
            map.put("cysypdcctj", String.valueOf(ob.get(48)));//抽样时样品储存条件
            map.put("cctjqt", String.valueOf(ob.get(49)));//储存条件其他
            map.put("cctjwd", String.valueOf(ob.get(50)));//储存条件温度
            map.put("cctjsd", String.valueOf(ob.get(51)));//储存条件湿度
            map.put("cyypbz", String.valueOf(ob.get(52)));//抽样样品包装
            map.put("ypbzqt", String.valueOf(ob.get(53)));//样品包装其他
            map.put("cygj", String.valueOf(ob.get(54)));//抽样工具
            map.put("txm", String.valueOf(ob.get(55)));//条形码
            String  jsypjzrq =String.valueOf(ob.get(32));
            if("".equals(jsypjzrq) || jsypjzrq==null){
                jsypjzrq =null;
            }
            map.put("jsypjzrq",jsypjzrq);//寄送样截止日期
            map.put("bssczmc", String.valueOf(ob.get(57)));//标示生产者名称
            map.put("bssczdz", String.valueOf(ob.get(58)));//标示生产者地址
            map.put("bssczlxr", String.valueOf(ob.get(59)));//标示生产者联系人
            map.put("bssczlxdh", String.valueOf(ob.get(60)));//标示生产者联系电话
            map.put("cydwmc", String.valueOf(ob.get(61)));//抽样单位名称
            map.put("cydwjb", String.valueOf(ob.get(62)));//抽样单位级别
            map.put("cydwdz", String.valueOf(ob.get(63)));//抽样单位地址
            map.put("cydwlxr", String.valueOf(ob.get(64)));//抽样单位联系人
            map.put("cydwlxdh", String.valueOf(ob.get(65)));//抽样单位联系电话
            map.put("cydwlxrdh", String.valueOf(ob.get(66)));//抽样单位联系人电话
            map.put("cydwlxremail", String.valueOf(ob.get(67)));//抽样单位联系人Email
            map.put("cydwcz", String.valueOf(ob.get(68)));//抽样单位传真
            map.put("cydwyb", String.valueOf(ob.get(69)));//抽样单单位邮编
            map.put("bz", String.valueOf(ob.get(70)));//备注
            map.put("lrry", CurrentLoginUser.getUser().getZydm());
            map.put("bmdm", CurrentLoginUser.getUser().getBmdm());
            map.put("jylb","市级监督抽查");
            list.add(map);
        }
        //批量插入
         rwglMapper.addWtExcel(list);//插入到委托表
         rwglMapper.addYpExcel(list);//插入到样品表
         rwglMapper.addRwglExcel(list);//插入到省抽表
    }

    /**
     * 将接口中的json数据放到数据库中
     */
    public void addInterfaceJson(List<Scgl> list) {
        rwglMapper.addInterfaceJson(list);
    }
    /**
     * 通过抽样单编号查找对应的食品分类id
     */
    public Set<String> findSpflidByCydbh(String cydbh){
        return rwglMapper.findSpflidByCydbh(cydbh);
    };

    /**
     * 将报告的主信息导出
     *
     * @return
     * @throws InvocationTargetException
     * @throws ClassNotFoundException
     * @throws IntrospectionException
     * @throws ParseException
     * @throws IllegalAccessException
     */
    public XSSFWorkbook exportRwglExcel(String[] ids) throws InvocationTargetException, ClassNotFoundException, IntrospectionException, ParseException, IllegalAccessException {
        XSSFWorkbook xssfWorkbook1 = null;
        List<ExcelBean> excel = new ArrayList<ExcelBean>();
        //下面是食品抽检样品单信息
        List<Scgl> list0=new ArrayList<Scgl>();
        Scgl scgl0=null;
        for (int i=0;i<ids.length;i++){
            scgl0=rwglMapper.findCyypByCydbh(ids[i]);
            list0.add(scgl0);
        }
        Map<Integer, List<ExcelBean>> map0 = new LinkedHashMap<>();
        //设置标题栏
        excel.add(new ExcelBean("抽样单编号*", "cydbh", 0));
        excel.add(new ExcelBean("任务来源", "rwly", 0));
        excel.add(new ExcelBean("任务类型", "rwlx", 0));
        excel.add(new ExcelBean("抽样日期", "cyrq", 0));
        excel.add(new ExcelBean("抽样地点", "cydd", 0));
        excel.add(new ExcelBean("样品名称", "ypmc", 0));
        excel.add(new ExcelBean("产品种类", "cpzl", 0));
        excel.add(new ExcelBean("样品来源", "yply", 0));
        excel.add(new ExcelBean("抽样方式", "cyfs", 0));
        excel.add(new ExcelBean("样品属性", "ypsx", 0));
        excel.add(new ExcelBean("样品类型", "yplx", 0));
        excel.add(new ExcelBean("商标", "sb", 0));
        excel.add(new ExcelBean("样品批号", "ypph", 0));
        excel.add(new ExcelBean("生产日期", "scrq", 0));
        excel.add(new ExcelBean("保质期", "bzq", 0));
        excel.add(new ExcelBean("执行标准", "zxbz", 0));
        excel.add(new ExcelBean("规格型号", "ggxh", 0));
        excel.add(new ExcelBean("质量等级", "zldj", 0));
        excel.add(new ExcelBean("生产许可证编号", "scxkzbh", 0));
        excel.add(new ExcelBean("单价", "dj", 0));
        excel.add(new ExcelBean("是否出口", "if_ck", 0));
        excel.add(new ExcelBean("抽样基数/批号", "cyjs", 0));
        excel.add(new ExcelBean("抽样数量", "cysl", 0));
        excel.add(new ExcelBean("抽样数量单位", "cysldw", 0));
        excel.add(new ExcelBean("备样数量", "bysl", 0));
        excel.add(new ExcelBean("包装分类", "bzfl", 0));
        excel.add(new ExcelBean("样品形态", "ypxt", 0));
        excel.add(new ExcelBean("样品储存条件", "ypcctj", 0));
        excel.add(new ExcelBean("抽样样品包装", "cyypbz", 0));
        excel.add(new ExcelBean("寄送样品地址", "jsypdz", 0));
        excel.add(new ExcelBean("寄送样品截止日期", "jsypjzrq", 0));
        excel.add(new ExcelBean("被抽样单位名称", "bcydwmc", 0));
        excel.add(new ExcelBean("区域类型", "qylx", 0));
        excel.add(new ExcelBean("被抽样单位地址", "bcydwdz", 0));
        excel.add(new ExcelBean("被抽样单位法人代表", "bcydwfrdb", 0));
        excel.add(new ExcelBean("被抽样单位年销售额", "bcydwnxxe", 0));
        excel.add(new ExcelBean("被抽样单位营业执照号", "bcydwyyzzh", 0));
        excel.add(new ExcelBean("被抽样单位联系人", "bcydwlxr", 0));
        excel.add(new ExcelBean("被抽样单位电话", "bcydwdh", 0));
        excel.add(new ExcelBean("被抽样单位传真", "bcydwcz", 0));
        excel.add(new ExcelBean("被抽样单位邮编", "bcydwyb", 0));
        excel.add(new ExcelBean("标示生产者名称", "bssczmc", 0));
        excel.add(new ExcelBean("标示生产者地址", "bssczdz", 0));
        excel.add(new ExcelBean("标示生产者联系人", "bssczlxr", 0));
        excel.add(new ExcelBean("标示生产者联系电话", "bssczlxdh", 0));
        excel.add(new ExcelBean("抽样单位名称", "cydwmc", 0));
        excel.add(new ExcelBean("抽样单位地址", "cydwdz", 0));
        excel.add(new ExcelBean("抽样单位联系人", "cydwlxr", 0));
        excel.add(new ExcelBean("抽样单位电话", "cydwdh", 0));
        excel.add(new ExcelBean("抽样单位传真", "cydwcz", 0));
        excel.add(new ExcelBean("抽样单位邮编", "cydwyb", 0));
        excel.add(new ExcelBean("抽样人", "cyr", 0));
        excel.add(new ExcelBean("备注", "bz", 0));
        excel.add(new ExcelBean("抽样环节", "cyhj", 0));
        excel.add(new ExcelBean("被抽样单位企业规模", "bcydwqygm", 0));
        excel.add(new ExcelBean("被抽样单位所属区域", "bcydwssqy", 0));
        map0.put(0, excel);
        //下面是抽样单主信息
        List<Scgl> list1=new ArrayList<Scgl>();
        Scgl scgl=null;
        for (int i=0;i<ids.length;i++){
            scgl=rwglMapper.findBgzxxByCydbh(ids[i]);
            list1.add(scgl);
        }
        excel = new ArrayList<ExcelBean>();
        Map<Integer, List<ExcelBean>> map1 = new LinkedHashMap<>();
        //设置标题栏
        excel.add(new ExcelBean("抽样单编号*", "cydbh", 0));
        excel.add(new ExcelBean("报告分类1*", "bgfl1", 0));
        excel.add(new ExcelBean("报告书编号*", "bgsbh", 0));
        excel.add(new ExcelBean("报告分类*", "bgfl", 0));
        excel.add(new ExcelBean("委托单位*", "wtdw", 0));
        excel.add(new ExcelBean("报告日期*", "bgrq", 0));
        excel.add(new ExcelBean("主检人", "zjr", 0));
        excel.add(new ExcelBean("报告签发人*", "bgqfr", 0));
        excel.add(new ExcelBean("检验结论*", "jyjl", 0));
        excel.add(new ExcelBean("检验报告备注", "jybgbz", 0));
        excel.add(new ExcelBean("联系人(检验机构)*", "lxr", 0));
        excel.add(new ExcelBean("电话(检验机构)*", "dh", 0));
        excel.add(new ExcelBean("电子邮箱(检验机构)*", "dzyx", 0));
        excel.add(new ExcelBean("地址(检验机构)*", "dz", 0));
        excel.add(new ExcelBean("邮编(检验机构)*", "yb", 0));
        excel.add(new ExcelBean("传真(检验机构)*", "cz", 0));
        excel.add(new ExcelBean("填报人(检验机构)*", "tbr", 0));
        excel.add(new ExcelBean("填报日期*", "tbrq", 0));
        excel.add(new ExcelBean("电话(填报人)*", "tbrdh", 0));
        excel.add(new ExcelBean("电子邮箱(填报人)*", "tbrdzyx", 0));
        map1.put(0, excel);
        //下面是抽样单样品检测项信息
     /*   List<Scgl> list2=new ArrayList<Scgl>();
        List<Scgl> temp2=null;
        for (int i=0;i<ids.length;i++){
            temp2=rwglMapper.findJyxmByCydbh(ids[i]);
            list2.addAll(temp2);
        }
        excel = new ArrayList<ExcelBean>();
        Map<Integer, List<ExcelBean>> map2 = new LinkedHashMap<>();
        //设置标题栏
        excel.add(new ExcelBean("抽样单编号*", "cydbh", 0));
        excel.add(new ExcelBean("报告分类1*", "bgfl1", 0));
        excel.add(new ExcelBean("检验项目ID*", "jyxmid", 0));
        excel.add(new ExcelBean("检验项目*", "jyxm", 0));
        excel.add(new ExcelBean("检验结果*", "jyjg", 0));
        excel.add(new ExcelBean("结果单位*", "jgdw", 0));
        excel.add(new ExcelBean("标准限值*", "bzxz", 0));
        excel.add(new ExcelBean("标准限值单位*", "bzxzdw", 0));
        excel.add(new ExcelBean("结果判定*", "jgpd", 0));
        excel.add(new ExcelBean("说明", "sm", 0));
        excel.add(new ExcelBean("检验依据*", "jyyj", 0));
        excel.add(new ExcelBean("判定依据*", "pdyj", 0));
        excel.add(new ExcelBean("方法检出限*", "ffjcx", 0));
        excel.add(new ExcelBean("方法检出限单位*", "ffjcxdw", 0));
        excel.add(new ExcelBean("标准方法检出限*", "bzffjcx", 0));
        excel.add(new ExcelBean("标准方法检出限单位*", "bzffjcxdw", 0));
        excel.add(new ExcelBean("标准最小允许限*", "bzzxyxx", 0));
        excel.add(new ExcelBean("标准最小允许限单位*", "bzzxyxxdw", 0));
        excel.add(new ExcelBean("标准最大允许限*", "bzzdyxx", 0));
        excel.add(new ExcelBean("标注最大允许限单位*", "bzzdyxxdw", 0));
        excel.add(new ExcelBean("最小允许限*", "zxyxx", 0));
        excel.add(new ExcelBean("最小允许限单位*", "zxyxxdw", 0));
        excel.add(new ExcelBean("最大允许限*", "zdyxx", 0));
        excel.add(new ExcelBean("最大允许限单位*", "zdyxxdw", 0));
        map2.put(0, excel);*/
        List<List> objs=new ArrayList<List>();
        objs.add(list0);
        objs.add(list1);
       /* objs.add(list2);*/
        List<Map<Integer, List<ExcelBean>>> maps=new ArrayList<Map<Integer, List<ExcelBean>>>();
        maps.add(map0);
        maps.add(map1);
       /* maps.add(map2);*/
        List<String> sheetNames=new ArrayList<String>();
        sheetNames.add("食品抽检抽样单信息");
        sheetNames.add("食品抽检检验报告主信息");
       /* sheetNames.add("食品抽检检验项目信息");*/
        //调用ExcelUtil的方法
        xssfWorkbook1 = ExcelUtilMoreSheet.createExcelFile(Scgl.class, objs, maps, sheetNames);
        return xssfWorkbook1;
    }
    /**
     * 清空检省抽测项目临时表的信息
     */
    public void cleanTempScJcxm(){
        rwglMapper.cleanTempScJcxm();
    };
    /**
     * 通过抽样单编号 删除对应的省抽管理信息(t_scgl_jbxx)
     */
    public void deleteRwglExcel(String cydbh){
        rwglMapper.deleteRwglExcel(cydbh);
    };
    /**
     * 通过抽样单编号 删除对应的样品表中的信息t_ypgl_jbxx
     */
    public void deleteYpglExcel(String cydbh){
        rwglMapper.deleteYpglExcel(cydbh);
    };
    /**
     * 通过抽样单编号， 删除对应的委托表的信息 t_wt_jbxx
     */
    public void deleteWtExcel(String cydbh){
        rwglMapper.deleteWtExcel(cydbh);
    };
    /**
     * 通过抽样单编号 删除对应的的任务表中的信息 t_rwgl_jbxx
     */
    public void deleteRy_RwglExcel(String cydbh){
        rwglMapper.deleteRy_RwglExcel(cydbh);
    };
}