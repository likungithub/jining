package com.xinhai.caiyun.systemmanager.business;

import com.xinhai.caiyun.systemmanager.api.ExcelBean;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import com.xinhai.caiyun.systemmanager.api.ExcelUtilMoreSheet;
import com.xinhai.caiyun.systemmanager.api.Scgl;
import com.xinhai.caiyun.systemmanager.dao.BmgzMapper;
import com.xinhai.caiyun.systemmanager.dao.ScwtMapper;
import com.xinhai.caiyun.systemmanager.opera.HttpThread;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import service.BmgzService;
import service.ScwtService;

import java.beans.IntrospectionException;
import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ScwtServiceImpl implements ScwtService {
    @Autowired
    private ScwtMapper scwtMapper;

    @Autowired
    private BmgzService bmgzService;
    @Override
    /**
     * 查找所有任务管理的信息信息
     * @return
     */
    public List<Map> findAllScsj(Map map) {
        return scwtMapper.findAllScsj(map);
    }

    /**
     * 查找所有任务管理的数量
     *
     * @return
     */
    @Override
    public Integer findAllScsjNum(Map map) {
        return scwtMapper.findAllScsjNum(map);
    }

    private String checkNull(Object obj)
    {
        String str="";
        if(obj!=null && obj.toString().trim().length()!=0)
        {
            str= obj+"";
        }
        return str;
    }


    @Override
    @Transactional(rollbackFor = Exception.class)
    /**
     * 将 省抽的导出的移交 抽样单 导入系统 并 开启线程  获取每个抽样单 在省抽对应的检测项
     */
    public void importRwglExcel(InputStream in, MultipartFile file,String zydm) throws Exception {
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in, file.getOriginalFilename());
        List<Map> list = new ArrayList<Map>();
        Map map = null;
        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        //遍历listob数据，把数据放到List中
        for (int i = 0; i < listob.size(); i++) {
            List<Object> ob = listob.get(i);
            map = new HashMap();



                map.put("SC_CYDH",checkNull(ob.get(0)));//省抽样单编号
                map.put("RWLY",checkNull(ob.get(1)));//任务来源

                //省抽任务类型 中文  // 省类型 监督抽检   风险监测   评价性监测   专项抽检   抽检监测   其他

                map.put("SC_RWLX",checkNull(ob.get(2)));//任务类型
                map.put("CYRQ",checkNull(ob.get(3)));//抽样日期
                map.put("CYDD",checkNull(ob.get(4)));//抽样地点
                map.put("YPMC",checkNull(ob.get(5)));//样品名称
                map.put("CHANPINZL",checkNull(ob.get(6)));//产品种类
                map.put("YPLAIYUAN",checkNull(ob.get(7)));//样品来源

            //抽样方式   001无菌抽样,002非无菌抽样',
                String cyfs = checkNull(ob.get(8));

                if(cyfs==null)
                {
                    cyfs="";
                }else
                if(cyfs.trim().equals("非无菌采样"))
                {
                    cyfs="002";
                }else
                if(cyfs.trim().equals("无菌采样"))
                {
                    cyfs="001";
                }
                map.put("CYFANGSHI",cyfs);//抽样方式

                //省抽 样品属性  普通食品   特殊膳食食品   节令食品   重大活动保障食品
                //本地      001普通属性,002特殊膳食食品,003节令食品,004重大活动保障食品
                String ypsx = checkNull(ob.get(9));

                 if(ypsx=="")
                 {
                     ypsx="";
                 }else if(ypsx.trim().equals("普通属性"))
                 {
                     ypsx="001";
                 }else if(ypsx.trim().equals("特殊膳食食品"))
                 {
                     ypsx="002";
                 }else if(ypsx.trim().equals("节令食品"))
                 {
                     ypsx="003";
                 }else if(ypsx.trim().equals("重大活动保障食品"))
                 {
                     ypsx="004";
                 }

                map.put("YPSHUXING",ypsx);//样品属性

                //本地   样品类型 001食用农产品,002现场制售食品,003工业加工食品,004餐饮加工食品,005食品添加剂,006食品相关产品,007其他',
                //省抽               食用农产品                   工业加工食品    餐饮加工食品    食品添加剂    食品相关产品   其它
                String yplx = checkNull(ob.get(10));
                    if(yplx=="")
                    {
                        yplx="";
                    }else if(yplx.trim().equals("食用农产品"))
                    {
                        yplx="001";
                    }else if(yplx.trim().equals("工业加工食品"))
                    {
                        yplx="003";
                    }else if(yplx.trim().equals("餐饮加工食品"))
                    {
                        yplx="004";
                    }else if(yplx.trim().equals("食品添加剂"))
                    {
                        yplx="005";
                    }else if(yplx.trim().equals("食品相关产品"))
                    {
                        yplx="006";
                    }else if(yplx.trim().equals("其它"))
                    {
                        yplx="007";
                    }

                map.put("YPLEIXIN()",yplx);//样品类型


                map.put("SB",checkNull(ob.get(11)));//商标
                map.put("YPPHHBH",checkNull(ob.get(12)));//样品批号
                map.put("SCRQ",checkNull(ob.get(13)));//生产/加工/购进日期
                map.put("BZQ",checkNull(ob.get(14)));//保质期
                map.put("YPZXBZ",checkNull(ob.get(15)));//执行标准/技术文件
                map.put("GGXH",checkNull(ob.get(16)));//规格型号
                map.put("YPDJ",checkNull(ob.get(17)));//质量等级
                map.put("SCXKBH",checkNull(ob.get(18)));//生产许可证编号
                map.put("YPDANJIA",checkNull(ob.get(19)));//单价
                map.put("IF_CK",checkNull(ob.get(20)));//是否出口
                map.put("YBJS",checkNull(ob.get(21)));//抽样基数/批量
                map.put("YPSL",checkNull(ob.get(22)));//抽样数量
                map.put("YPDW",checkNull(ob.get(23)));//抽样数量单位
                map.put("BYSL",checkNull(ob.get(24)));//备样数量

                //'包装分类 001散包,002预包装',
                String bzlx = checkNull(ob.get(25));
                    if(bzlx=="")
                    {
                        bzlx="";
                    }else if(bzlx.trim().equals("散包"))
                    {
                        bzlx="001";
                    }else if(bzlx.trim().equals("预包装"))
                    {
                        bzlx="002";
                    }

                map.put("YPBGFL",bzlx);//包装分类

                // 本地 1固体2    半固体 3液体 4气体
                //省抽形态 固态  半固态  液态  半液态  气体
            String ypxt = checkNull(ob.get(26));
                if(ypxt=="")
                {
                    ypxt="";
                }else if(ypxt.trim().equals("固态"))
                {
                    ypxt="1";
                }else if(ypxt.trim().equals("半固态"))
                {
                    ypxt="2";
                }else if(ypxt.trim().equals("液态"))
                {
                    ypxt="3";
                }else if(ypxt.trim().equals("半液态"))
                {
                    ypxt="5";
                }else if(ypxt.trim().equals("气态"))
                {
                    ypxt="6";
                }

                map.put("YPXT",ypxt);//样品形态
                //省抽 常温   冷藏   冷冻   避光   密闭   其他
                //本地 001常温  002避光  003干燥  004冷藏  005冷冻  006其他
                String cctj = checkNull(ob.get(27));
                    if(cctj=="")
                    {
                        cctj="";
                    }else if(cctj.trim().equals("常温"))
                    {
                        cctj="001";
                    }else if(cctj.trim().equals("冷藏"))
                    {
                        cctj="004";
                    }else if(cctj.trim().equals("冷冻"))
                    {
                        cctj="005";
                    }else if(cctj.trim().equals("避光"))
                    {
                        cctj="002";
                    }else if(cctj.trim().equals("密闭"))
                    {
                        cctj="007";
                    }else if(cctj.trim().equals("其他"))
                    {
                        cctj="006";
                    }

                map.put("YPBCTJ",cctj);//抽样时样品的储存条件

                //本地 001玻璃瓶,002塑料瓶,003塑料袋,004无菌袋005其他'
                //省抽     玻璃瓶   塑料瓶   塑料袋   无菌袋   其他
                String cyypbz = checkNull(ob.get(28));
                        if(cyypbz=="")
                        {
                            cyypbz="";
                        }else if(cyypbz.trim().equals("玻璃瓶"))
                        {
                            cyypbz="001";
                        }else if(cyypbz.trim().equals("塑料瓶"))
                        {
                            cyypbz="002";
                        }else if(cyypbz.trim().equals("塑料袋"))
                        {
                            cyypbz="003";
                        }else if(cyypbz.trim().equals("无菌袋"))
                        {
                            cyypbz="004";
                        }else if(cyypbz.trim().equals("其他"))
                        {
                            cyypbz="005";
                        }

                map.put("CYYPBZ",cyypbz);//抽样样品包装


                map.put("JSYPDZ",checkNull(ob.get(29)));//寄、送样品地址
                String jsypjzrq = checkNull(ob.get(30));
                if(jsypjzrq.equals(""))
                {
                    jsypjzrq=null;
                }
                map.put("JSYPJZRQ",jsypjzrq);//寄、送样品截止日期
                map.put("SJDW",checkNull(ob.get(31)));//被抽样单位名称
                map.put("QYLX",checkNull(ob.get(32)));//区域类型
                map.put("BCJDWDZ",checkNull(ob.get(33)));//被抽样单位地址
                map.put("FRDB",checkNull(ob.get(34)));//被抽样单位法人代表
                map.put("NXSE",checkNull(ob.get(35)));//被抽样单位年销售额（万元）
                map.put("YYZZH",checkNull(ob.get(36)));//被抽样单位营业执照号
                map.put("BCJDWLXR",checkNull(ob.get(37)));//被抽样单位联系人
                map.put("BCJDWYDDH",checkNull(ob.get(38)));//被抽样单位电话
                map.put("BCJDWCZ",checkNull(ob.get(39)));//被抽样单位传真
                map.put("BCJDWYB",checkNull(ob.get(40)));//被抽样单位邮编
                map.put("SCDW",checkNull(ob.get(41)));//标示生产者名称
                map.put("SCDZ",checkNull(ob.get(42)));//标示生产者地址
                map.put("SCDWLXR",checkNull(ob.get(43)));//标示生产者联系人
                map.put("SCDWLXDH",checkNull(ob.get(44)));//标示生产者联系电话
                map.put("CYDW",checkNull(ob.get(45)));//抽样单位名称
                map.put("CYDWXXDZ",checkNull(ob.get(46)));//抽样单位地址
                map.put("CYDWLXR",checkNull(ob.get(47)));//抽样单位联系人
                map.put("CYDWLXDH",checkNull(ob.get(48)));//抽样单位电话
                map.put("CYDWCZ",checkNull(ob.get(49)));//抽样单位传真
                map.put("CYDWYB",checkNull(ob.get(50)));//抽样单位邮编
                map.put("CYRY",checkNull(ob.get(51)));//抽样人
                map.put("BZ",checkNull(ob.get(52)));//备注
                map.put("CYDDSSHJ",checkNull(ob.get(53)));//抽样环节
                map.put("BCJDWGM",checkNull(ob.get(54)));//被抽样单位企业规模
                map.put("BCJDWQY",checkNull(ob.get(55)));//被抽样单位所属区域
                map.put("CYFW",checkNull(ob.get(56)));//抽样范围
                map.put("SC_SPFL_ID",checkNull(ob.get(57)));//食品分类id


                map.put("SC_DRRY",zydm);//省抽导入人员代码
            list.add(map);
        }
        scwtMapper.addYpExcelToSc(list);
    }


    /**
     * 同步检测项的操作
     */
    public void scTbJcx(String[] sjzj,String[] sccydhs) throws Exception
    {
        //获取当前系统中所有 数据不完整 也就是 没有 省抽 检测项的 抽样记录，开启线程拉数据
        List<Map> scYpList = new ArrayList<>();
        for(int i=0;i<sjzj.length ;i++)
        {
            Map<String,String> m = new HashMap();
            m.put("SC_CYD_ID",sjzj[i]);
            m.put("SC_CYDH",sccydhs[i]);
            scYpList.add(m);
        }
        //在这里 开始 线程
        HttpThread httpThread = new HttpThread();
        httpThread.setScwtMapper(this.scwtMapper);
        httpThread.setJgsl(10);
        httpThread.setScYpList(scYpList);
        Thread thread = new Thread(httpThread);
        thread.start();
    }


    //同步到本地委托的操作
    public void scTbBdWt(String[] ids)  throws Exception
    {

        List<Map> scCydList = this.scwtMapper.getScCydById(ids);

        //这里是处理 委托 ID的状态
        for(int i =0;scCydList!=null && i<scCydList.size();i++) {
            Map m = scCydList.get(i);
            //委托ID先不处理，同步到 本地时再处理
            String wtidStr = bmgzService.getMaxYpbm("Z1"); //省抽的 任务类型 目前先这么定义吧
            //本地的委托ID还要做一个特殊处理 因为 表里不写入时 ，永远不会变，所以要自己增加
            int num = Integer.parseInt(wtidStr.substring(wtidStr.length() - 4));
            String hzxh = String.format("%04d", num + i + 1);
            String wtid = wtidStr.substring(0, wtidStr.length() - 4) + hzxh;
            m.put("WTID", wtid);//本地系统的WTID
            m.put("YPBM", wtid);// t_ypgl_jbxx 表中的样品编码 字段 也是用的WTID
        }
        //批量  插入到委托表 和 样品管理基本信息表
        scwtMapper.scTbBdWt(scCydList);
        //省抽同步到本地 委托后  更新 省抽数据的同步状态  同时 将检测项插入到 本地 委托的检测项对应表中
        scwtMapper.updateScTbZtAndJcx(scCydList);
    }

    /**
     * 通过抽样单编号， 删除对应的委托表的信息 t_wt_jbxx
     */
    public void deleteScInfo(String zjid){
        scwtMapper.deleteScInfo(zjid);
    };




















    /**
     * 将接口中的json数据放到数据库中
     */
    public void addInterfaceJson(List<Scgl> list) {
        scwtMapper.addInterfaceJson(list);
    }
    /**
     * 通过抽样单编号查找对应的食品分类id
     */
    public Set<String> findSpflidByCydbh(String cydbh){
        return scwtMapper.findSpflidByCydbh(cydbh);
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
            scgl0=scwtMapper.findCyypByCydbh(ids[i]);
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
            scgl=scwtMapper.findBgzxxByCydbh(ids[i]);
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
            temp2=scwtMapper.findJyxmByCydbh(ids[i]);
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
        scwtMapper.cleanTempScJcxm();
    };
    /**
     * 通过抽样单编号 删除对应的省抽管理信息(t_scgl_jbxx)
     */
    public void deleteRwglExcel(String cydbh){
        scwtMapper.deleteRwglExcel(cydbh);
    };
    /**
     * 通过抽样单编号 删除对应的样品表中的信息t_ypgl_jbxx
     */
    public void deleteYpglExcel(String cydbh){
        scwtMapper.deleteYpglExcel(cydbh);
    };

    /**
     * 通过抽样单编号 删除对应的的任务表中的信息 t_rwgl_jbxx
     */
    public void deleteRy_RwglExcel(String cydbh){
        scwtMapper.deleteRy_RwglExcel(cydbh);
    };
}