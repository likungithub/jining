package com.xinhai.caiyun.customermanage.controller.pageoffice;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.crypto.Data;

import com.xinhai.caiyun.customermanage.api.Jcx;
import com.xinhai.caiyun.customermanage.dao.*;
import com.zhuozhengsoft.pageoffice.wordwriter.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.zhuozhengsoft.pageoffice.OpenModeType;
import com.zhuozhengsoft.pageoffice.PageOfficeCtrl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import  java.text.SimpleDateFormat;


@Controller
public class
OpenWord extends HttpServlet{
	private static final long serialVersionUID = -758686623642845302L;
	@Autowired
	private Cgsq1Mapper cgsq1Mapper;
	@Autowired
	private TqywtMapper tqywtMapper;
	@Autowired
	private BgglMapper bgglMapper;
	@Autowired
	private YplzMapper yplzMapper;
	@Autowired
	private TLZypglMapper tlZypglMapper;
	@Autowired
	private TypglMapper typglMapper;
	@RequestMapping("openword")  
         public String openword(HttpServletRequest request, HttpServletResponse response) throws Exception{
		PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
		request.setAttribute("poCtrl", poCtrl);
		//设置服务页面
		poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
		String id = request.getParameter("id");
		String type = request.getParameter("type");
		WordDocument doc= new WordDocument();
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		DataRegion dataRegion1 = doc.createDataRegion("PO_BGBZR1",DataRegionInsertType.After,"PO_BGBZR2");//报告编制人
		DataRegion dataRegion2 = doc.createDataRegion("PO_BGBZRQ1",DataRegionInsertType.After,"PO_BGBZRQ2");//报告编制日期
		DataRegion dataRegion3 = doc.createDataRegion("PO_BGSHR1",DataRegionInsertType.After,"PO_BGSHR2");//报告审核人
		DataRegion dataRegion4 = doc.createDataRegion("PO_BGSHRQ1",DataRegionInsertType.After,"PO_BGSHRQ2");//报告审核日期
		DataRegion dataRegion5 = doc.createDataRegion("PO_BGPZR1",DataRegionInsertType.After,"PO_BGPZR2");//报告批准人
		DataRegion dataRegion6 = doc.createDataRegion("PO_BGPZRQ1",DataRegionInsertType.After,"PO_BGPZRQ2");//报告批准日期
		if ("bgbz".equals(type)){
			String bgbz = this.bgglMapper.getDzqz(this.bgglMapper.getbgbz(id).get("bgbzr").toString());
			String bgbzrq =simpleDateFormat.format(new SimpleDateFormat("yyyy-MM-dd").parse(this.bgglMapper.getbgbz(id).get("bgbzrq").toString()));
			dataRegion1.setValue("[image]"+bgbz+"[/image]");
			dataRegion2.setValue(bgbzrq);
			dataRegion1.setEditing(true);
			dataRegion2.setEditing(true);
		}else if("bgsh".equals(type)){
			String bgbz = this.bgglMapper.getDzqz(this.bgglMapper.getbgbz(id).get("bgbzr").toString());
			String bgbzrq =simpleDateFormat.format(new SimpleDateFormat("yyyy-MM-dd").parse(this.bgglMapper.getbgbz(id).get("bgbzrq").toString()));
			String bgsh = this.bgglMapper.getDzqz(this.bgglMapper.getbgsh(id).get("bgshr").toString());
			String bgshrq = simpleDateFormat.format(new SimpleDateFormat("yyyy-MM-dd").parse(this.bgglMapper.getbgsh(id).get("bgshrq").toString()));
			dataRegion1.setValue("[image]"+bgbz+"[/image]");
			dataRegion2.setValue(bgbzrq);
			dataRegion1.setEditing(true);
			dataRegion2.setEditing(true);
			dataRegion3.setValue("[image]"+bgsh+"[/image]");
			dataRegion4.setValue(bgshrq);
			dataRegion3.setEditing(true);
			dataRegion4.setEditing(true);
		}else if("bgpz".equals(type)) {
			String bgbz = this.bgglMapper.getDzqz(this.bgglMapper.getbgbz(id).get("bgbzr").toString());
			String bgbzrq =simpleDateFormat.format(new SimpleDateFormat("yyyy-MM-dd").parse(this.bgglMapper.getbgbz(id).get("bgbzrq").toString()));
			String bgsh = this.bgglMapper.getDzqz(this.bgglMapper.getbgsh(id).get("bgshr").toString());
			String bgshrq = simpleDateFormat.format(new SimpleDateFormat("yyyy-MM-dd").parse(this.bgglMapper.getbgsh(id).get("bgshrq").toString()));
			dataRegion1.setValue("[image]"+bgbz+"[/image]");
			dataRegion2.setValue(bgbzrq);
			dataRegion1.setEditing(true);
			dataRegion2.setEditing(true);
			dataRegion3.setValue("[image]"+bgsh+"[/image]");
			dataRegion4.setValue(bgshrq);
			dataRegion3.setEditing(true);
			dataRegion4.setEditing(true);
			String bgpz = this.bgglMapper.getDzqz(this.bgglMapper.getbgpz(id).get("bgpzr").toString());
			String BGPZRQ = simpleDateFormat.format(new SimpleDateFormat("yyyy-MM-dd").parse(this.bgglMapper.getbgpz(id).get("bgpzrq").toString()));
			dataRegion5.setValue("[image]"+bgpz+"[/image]");
			dataRegion6.setValue(BGPZRQ);
			dataRegion5.setEditing(true);
			dataRegion6.setEditing(true);
		}
		//创建表格区域
		DataRegion datatableRegion = doc.openDataRegion("PO_DATATABLE");
		Table table =  datatableRegion.openTable(1);
		List<Map> list1 = this.bgglMapper.findById1(id);
		List<Map> list2 = this.bgglMapper.findjczz(id);
		int i = 0;
		for (Map map1:list1){
			table.openCellRC(2+i,1).setValue(i+1+"");
			table.openCellRC(2+i,3).setValue(map1.get("dw").toString());
			Cell cel4 = table.openCellRC(2+i,4);
			String jcxmid1 =map1.get("jcxmid").toString();
			for (Map map2:list2){
				String jcxmid2 =map2.get("jcxmid").toString();
				if (jcxmid1.trim().equals(jcxmid2.trim())) {
					String s = map2.get("if_fb")+"";
					System.out.print(s);
					//判断是否分包
					if("1".equals(map2.get("if_fb")+"")){
						table.openCellRC(2+i,2).setValue("*"+map1.get("jyxm").toString());
					}else {
						table.openCellRC(2+i,2).setValue(map1.get("jyxm").toString());
					}

					if ("".equals(map1.get("xlz"))){
						cel4.setValue("/");
					}else {
					cel4.setValue("≤"+map1.get("xlz").toString());
					}

					Cell cel5 = table.openCellRC(2+i,5);
					if (map1.get("jcx").toString().matches("-[0-9]+(.[0-9]+)?|[0-9]+(.[0-9]+)?")&& !"".equals(map1.get("xlz"))){
						Double jcx = Double.parseDouble(map1.get("jcx").toString());
						if (!"".equals(map2.get("jcz"))&& map2.get("jcz").toString().matches("-[0-9]+(.[0-9]+)?|[0-9]+(.[0-9]+)?")){
							Double jcz = Double.parseDouble(map2.get("jcz").toString());
							if (jcx>=jcz){
								cel5.setValue("未检出(≤ "+
								map1.get("jcx")+")");
							}else {
								cel5.setValue(map2.get("jcz")+"");
							}
						}else {
							if ("".equals(map2.get("jcz").toString())){
								cel5.setValue("/");
							}else {
								cel5.setValue(map2.get("jcz").toString());
							}
						}
					}else {
						cel5.setValue("/");
					}
					 table.openCellRC(2+i,6).setValue(map1.get("jcfa").toString());
					Cell cel7 = table.openCellRC(2+i,7);
					System.out.print(map1.get("xlz"));
					if (!"".equals(map1.get("xlz"))&& (map1.get("xlz")+"").matches("-[0-9]+(.[0-9]+)?|[0-9]+(.[0-9]+)?")){
						Double xlz = Double.parseDouble(map1.get("xlz").toString());
						if (!"".equals(map2.get("jcz")) && map2.get("jcz").toString().matches("-[0-9]+(.[0-9]+)?|[0-9]+(.[0-9]+)?")){
							Double jcz = Double.parseDouble(map2.get("jcz").toString());
							if (jcz<xlz){
								cel7.setValue("合格");
							}else {
								cel7.setValue("不合格");
							}
						}
					}else {
						cel7.setValue("/");
					}
				}
			}
			if (i!=list1.size()-1){
				table.insertRowAfter(table.openCellRC(2+i, 2));
				i++;
			}

		}
		datatableRegion.setEditing(true);
		poCtrl.setWriter(doc);
		//添加保存按钮
		poCtrl.addCustomToolButton("保存并关闭","Save",1);
	/*	poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);*/
		poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
		poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
		//设置保存的action
		poCtrl.setSaveFilePage("savefile.do");
		//打开word
//		String fileurl = request.getParameter("fileurl");
		String ypbm = request.getParameter("id");

		String fileurl = this.bgglMapper.selectBGLJ(ypbm);
		poCtrl.webOpen(request.getContextPath()+"/"+fileurl,OpenModeType.docAdmin,"张三");
		poCtrl.setTagId("PageOfficeCtrl1"); // 此行必须
        return "pageoffice/Word";
    }
	@RequestMapping("openword1")
	public String openword1(HttpServletRequest request, HttpServletResponse response) throws Exception{
        String ypid = request.getParameter("id");
		PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
		request.setAttribute("poCtrl", poCtrl);
		//设置服务页面
		poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
		//添加保存按钮
		poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
		poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
		//设置保存的action
		poCtrl.setSaveFilePage("savefile.do");
		//打开word
		poCtrl.webOpen(tlZypglMapper.findLzd(this.bgglMapper.findYpidByWtid(ypid.split(",")[0])),OpenModeType.docAdmin,"张三");
		poCtrl.setTagId("PageOfficeCtrl1"); // 此行必须
		return "pageoffice/Word";
	}
	@RequestMapping("openwordparam")
	public String openwordparam(HttpServletRequest request, HttpServletResponse response){
		PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
		request.setAttribute("poCtrl", poCtrl);
		//设置服务页面
		poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
		//添加保存按钮
		poCtrl.addCustomToolButton("保存并关闭","Save",1);
		//设置保存的action
		poCtrl.setSaveFilePage("savefile.do");
		//打开word
		poCtrl.webOpen("/customermanage/doc/test.doc",OpenModeType.docAdmin,"张三");
		return "pageoffice/Word";
	}

	@RequestMapping("openword3")
	public String openword2(HttpServletRequest request, HttpServletResponse response){
		PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
		request.setAttribute("poCtrl", poCtrl);
		//设置服务页面
		poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
		//添加保存按钮
		poCtrl.addCustomToolButton("保存并关闭","Save",1);
		poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);
		poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
		poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
		//设置保存的action
		poCtrl.setSaveFilePage("savefile.do");
		//打开word
//		String fileurl = request.getParameter("fileurl");
		String ypbm = request.getParameter("ypbm");
		String fileurl = this.bgglMapper.selectBGLJ(ypbm);
		poCtrl.webOpen(request.getContextPath()+"/"+fileurl,OpenModeType.docAdmin,"张三");
		poCtrl.setTagId("PageOfficeCtrl1"); // 此行必须
		return "pageoffice/Word";
	}
	@RequestMapping("openwordwtd")
	public String openwordwtd(HttpServletRequest request){
		String id = request.getParameter("id");
		PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
		request.setAttribute("poCtrl", poCtrl);
		//设置服务页面
		poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
		//添加保存按钮
		poCtrl.addCustomToolButton("保存并关闭","Save",1);
		poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);
		poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
		poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
		//设置保存的action
		poCtrl.setSaveFilePage("savefile.do");
		//打开word
//		String fileurl = request.getParameter("fileurl");
		String  fileurl = this.tqywtMapper.getWtdljById(id);
		poCtrl.webOpen(fileurl,OpenModeType.docAdmin,"张三");
		poCtrl.setTagId("PageOfficeCtrl1"); // 此行必须
		return "pageoffice/Word";
	}
	@RequestMapping("openwordwtbg")
	public String openwordwtbg(HttpServletRequest request){
		String name = request.getParameter("id");
		String ids [] = name.split(",");
		String id = ids[0];
		//String wtid = tqywtMapper.findwtidw(id);
		String ypid = tqywtMapper.findYpidByYpbm(id);
		WordDocument doc = new WordDocument();
		//报告批准
		Map pzMap = this.bgglMapper.findBGPZ(ypid);
		try {
		if (IFNULL(pzMap)){
			String zxry = pzMap.get("ZXRY_DM")+"";
			doc.createDataRegion("PO_PZRY1",DataRegionInsertType.After,"PO_PZRY2").setValue("[image]"+ bgglMapper.getDzqz(zxry) +"[/image]");
			Date pzsj = new SimpleDateFormat("yyyy-MM-dd").parse(pzMap.get("ZXSJ") + "");
			String pzsj1 = new SimpleDateFormat("yyyy-MM-dd").format(pzsj);
			doc.createDataRegion("PO_PZSJ1",DataRegionInsertType.After,"PO_PZSJ2").setValue(pzsj1);
		}
		//报告审核
		Map shMap =this.bgglMapper.findBGSH(ypid);
		if (IFNULL(shMap)){
			String zxry = shMap.get("ZXRY_DM")+"";
			doc.createDataRegion("PO_SHRY1",DataRegionInsertType.After,"PO_SHRY2").setValue("[image]"+ bgglMapper.getDzqz(zxry) +"[/image]");
			Date shsj = new SimpleDateFormat("yyyy-MM-dd").parse(shMap.get("ZXSJ") + "");
			String shsj1 = new SimpleDateFormat("yyyy-MM-dd").format(shsj);
			doc.createDataRegion("PO_SHSJ1",DataRegionInsertType.After,"PO_SHSJ2").setValue(shsj1);
		}
		//主检审批
		Map zjMAP =this.bgglMapper.findZJSP(ypid);
		if (IFNULL(zjMAP)){
			String zxry = zjMAP.get("ZXRY_DM")+"";
			doc.createDataRegion("PO_ZJRY1",DataRegionInsertType.After,"PO_ZJRY2").setValue("[image]"+ bgglMapper.getDzqz(zxry) +"[/image]");
			Date zjsj = new SimpleDateFormat("yyyy-MM-dd").parse(zjMAP.get("ZXSJ") + "");
			String zjsj1 = new SimpleDateFormat("yyyy-MM-dd").format(zjsj);
			doc.createDataRegion("PO_ZJSJ1",DataRegionInsertType.After,"PO_ZJSJ2").setValue(zjsj1);
		}
			//报告编制
			Map bzMAP =this.bgglMapper.findBGBZ(ypid);
			if (IFNULL(bzMAP)){
				String zxry = bzMAP.get("ZXRY_DM")+"";
				doc.createDataRegion("PO_ZJRY1",DataRegionInsertType.After,"PO_ZJRY2").setValue("[image]"+ bgglMapper.getDzqz(zxry) +"[/image]");
				Date zjsj = new SimpleDateFormat("yyyy-MM-dd").parse(bzMAP.get("ZXSJ") + "");
				String zjsj1 = new SimpleDateFormat("yyyy-MM-dd").format(zjsj);
				doc.createDataRegion("PO_ZJSJ1",DataRegionInsertType.After,"PO_ZJSJ2").setValue(zjsj1);
			}

		}catch (Exception e){
		}
		PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
		request.setAttribute("poCtrl", poCtrl);
		//设置服务页面
		poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
		poCtrl.setWriter(doc);
		//添加保存按钮
		poCtrl.addCustomToolButton("保存并关闭","Save",1);
		poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);
		poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
		poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
		//设置保存的action
		poCtrl.setSaveFilePage("savefile.do");
		//打开word
//		String fileurl = request.getParameter("fileurl");
		String  fileurl = this.tqywtMapper.getWtbgljById(ypid);
		poCtrl.webOpen(request.getContextPath()+"/"+fileurl,OpenModeType.docAdmin,"张三");
		poCtrl.setTagId("PageOfficeCtrl1"); // 此行必须
		return "pageoffice/Word";
	}
	@RequestMapping("openwordyddcybg")
	public String openwordyddcybg(HttpServletRequest request){
		String id = request.getParameter("id");
		PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
		request.setAttribute("poCtrl", poCtrl);
		//设置服务页面
		poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
		//添加保存按钮
		poCtrl.addCustomToolButton("保存并关闭","Save",1);
		poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);
		poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
		poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
		//设置保存的action
		poCtrl.setSaveFilePage("savefile.do");
		//打开word
//		String fileurl = request.getParameter("fileurl");
		String  fileurl = this.tqywtMapper.getYddcybgljById(id);
		poCtrl.webOpen(request.getContextPath()+"/"+fileurl,OpenModeType.docAdmin,"张三");
		poCtrl.setTagId("PageOfficeCtrl1"); // 此行必须
		return "pageoffice/Word";
	}
	@RequestMapping("openword5")
	public String openword5(HttpServletRequest request){
		String ypbm = request.getParameter("ypbm");
		PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
		request.setAttribute("poCtrl", poCtrl);
		//设置服务页面
		poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
		//添加保存按钮
		poCtrl.addCustomToolButton("保存并关闭","Save",1);
		poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);
		poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
		poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
		//设置保存的action
		poCtrl.setSaveFilePage("savefile.do");
		WordDocument doc= new WordDocument();
		DataRegion dataRegion1 = doc.createDataRegion("PO_JBR1",DataRegionInsertType.After,"PO_JBR2");
		DataRegion dataRegion2 = doc.createDataRegion("PO_JBRRQ1",DataRegionInsertType.After,"PO_JBRRQ2");
		DataRegion dataRegion3 = doc.createDataRegion("PO_JSFZR1",DataRegionInsertType.After,"PO_JSFZR2");
		DataRegion dataRegion4 = doc.createDataRegion("PO_JSFZRRQ1",DataRegionInsertType.After,"PO_JSFZRRQ2");
		Map map = this.bgglMapper.findJbr(ypbm);
		String jbr = this.bgglMapper.getDzqz(map.get("jbr").toString());
		dataRegion1.setValue("[image]"+jbr+"[/image]");
		dataRegion1.setEditing(true);
		dataRegion2.setValue(map.get("jbrspsj").toString());
		dataRegion2.setEditing(true);
		Map map1 = this.bgglMapper.findJs(ypbm);
		String jsfzr  = this.bgglMapper.getDzqz(map1.get("jsfzr").toString());
		dataRegion3.setValue("[image]"+jsfzr+"[/image]");
		dataRegion4.setValue(map1.get("jsspsj").toString());
		poCtrl.setWriter(doc);
		//打开word
//		String fileurl = request.getParameter("fileurl");
		String  fileurl = this.bgglMapper.findypxhbg(ypbm);
		System.out.print(fileurl);
		poCtrl.webOpen(request.getContextPath()+"/"+fileurl,OpenModeType.docAdmin,"张三");
		poCtrl.setTagId("PageOfficeCtrl1"); // 此行必须
		return  "pageoffice/Word";
	}
	@RequestMapping(value = "/openword6")
	public String openword6(HttpServletRequest request){
		String id = request.getParameter("id");
		PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
		request.setAttribute("poCtrl", poCtrl);
		//设置服务页面
		poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
		//添加保存按钮
		poCtrl.addCustomToolButton("保存并关闭","Save",1);
		poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);
		poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
		poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
		//设置保存的action
		poCtrl.setSaveFilePage("savefile.do");
		Map map = this.cgsq1Mapper.getCgsqInfo(id);
		WordDocument doc = new WordDocument();
		//采购名称
		doc.createDataRegion("PO_cgmc1",DataRegionInsertType.After,"PO_cgmc2").setValue(map.get("cgmc").toString());
		//规格
		doc.createDataRegion("PO_gg1",DataRegionInsertType.After,"PO_gg2").setValue(map.get("gg").toString());
		//数量
		doc.createDataRegion("PO_sl1",DataRegionInsertType.After,"PO_sl2").setValue(map.get("sl").toString());
		//备注
		doc.createDataRegion("PO_bzxx1",DataRegionInsertType.After,"PO_bzxx2").setValue(map.get("bzxx").toString());
		//s申请人
		doc.createDataRegion("PO_sqry1",DataRegionInsertType.After,"PO_sqry2").setValue("[image]"+this.bgglMapper.getDzqz(map.get("sqry").toString())+"[/image]");
		//申请日期
		doc.createDataRegion("PO_sqrq1",DataRegionInsertType.After,"PO_sqrq2").setValue(map.get("sqrq").toString());
		//科室主任
		doc.createDataRegion("PO_kszrbm1",DataRegionInsertType.After,"PO_kszrbm2").setValue("[image]"+this.bgglMapper.getDzqz(map.get("kszrbm").toString())+"[/image]");
		//科室主任审批日期
		doc.createDataRegion("PO_ksprq1",DataRegionInsertType.After,"PO_ksprq2").setValue(map.get("ksprq").toString());
		//技术负责人
		doc.createDataRegion("PO_jsfzrbm1",DataRegionInsertType.After,"PO_jsfzrbm2").setValue("[image]"+this.bgglMapper.getDzqz(map.get("jsfzrbm").toString())+"[/image]");
		//技术审批日期
		doc.createDataRegion("PO_jsprq1",DataRegionInsertType.After,"PO_jsprq2").setValue(map.get("jsprq").toString());
		//中心主任
		doc.createDataRegion("PO_zxldbm1",DataRegionInsertType.After,"PO_zxldbm2").setValue("[image]"+this.bgglMapper.getDzqz(map.get("zxldbm").toString())+"[/image]");
		//领导审批日期
		doc.createDataRegion("PO_zsprq1",DataRegionInsertType.After,"PO_zsprq2").setValue(map.get("zsprq").toString());
		//技术要求
		doc.createDataRegion("PO_jsyq1",DataRegionInsertType.After,"PO_jsyq2").setValue(map.get("jsyq").toString());
		//品牌
		/*doc.createDataRegion("PO_pp1",DataRegionInsertType.After,"PO_pp2").setValue(map.get("pp").toString());*/
		poCtrl.setWriter(doc);
		//打开word
		poCtrl.webOpen(request.getContextPath()+"/template/cgsq.docx",OpenModeType.docAdmin,"张三");
		poCtrl.setTagId("PageOfficeCtrl1"); // 此行必须
		return "pageoffice/Word";
	}

	@RequestMapping(value = "/openword7")
	public String openword7(HttpServletRequest request){
		String id = request.getParameter("id");
		PageOfficeCtrl poCtrl=new PageOfficeCtrl(request);
		request.setAttribute("poCtrl", poCtrl);
		//设置服务页面
		poCtrl.setServerPage(request.getContextPath()+"/poserver.zz");
		//添加保存按钮
		poCtrl.addCustomToolButton("保存并关闭","Save",1);
		poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);
		poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
		poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
		//设置保存的action
		poCtrl.setSaveFilePage("savefile.do");
		Map map = this.cgsq1Mapper.getCgsqInfo1(id);
		WordDocument doc = new WordDocument();
		//采购名称
		doc.createDataRegion("PO_cgmc1",DataRegionInsertType.After,"PO_cgmc2").setValue(map.get("cgmc").toString());
		//规格
		doc.createDataRegion("PO_gg1",DataRegionInsertType.After,"PO_gg2").setValue(map.get("gg").toString());
		//数量
		doc.createDataRegion("PO_sl1",DataRegionInsertType.After,"PO_sl2").setValue(map.get("sl").toString());
		//备注
		doc.createDataRegion("PO_bzxx1",DataRegionInsertType.After,"PO_bzxx2").setValue(map.get("bzxx").toString());
		//技术要求
		doc.createDataRegion("PO_jsyq1",DataRegionInsertType.After,"PO_jsyq2").setValue(map.get("jsyq").toString());
		//品牌
		doc.createDataRegion("PO_pp1",DataRegionInsertType.After,"PO_pp2").setValue(map.get("pp").toString());
		//供应商
		doc.createDataRegion("PO_gys1",DataRegionInsertType.After,"PO_gys2").setValue(map.get("gys").toString());
		//期货
		doc.createDataRegion("PO_qh1",DataRegionInsertType.After,"PO_qh2").setValue(map.get("qh").toString());
		//单价
		doc.createDataRegion("PO_dj1",DataRegionInsertType.After,"PO_dj2").setValue(map.get("dj").toString());
		//金额
		doc.createDataRegion("PO_je1",DataRegionInsertType.After,"PO_je2").setValue(map.get("je").toString());
		//采购员
		doc.createDataRegion("PO_cgry1",DataRegionInsertType.After,"PO_cgry2").setValue("[image]"+this.bgglMapper.getDzqz(map.get("cgry").toString())+"[/image]");
		//采购日期
		doc.createDataRegion("PO_cgrq1",DataRegionInsertType.After,"PO_cgrq2").setValue(map.get("cgrq").toString());
		//中心主任
		doc.createDataRegion("PO_zxldbm1",DataRegionInsertType.After,"PO_zxldbm2").setValue("[image]"+this.bgglMapper.getDzqz(map.get("zxldbm").toString())+"[/image]");
		//领导审批日期
		doc.createDataRegion("PO_zsprq1",DataRegionInsertType.After,"PO_zsprq2").setValue(map.get("zsprq").toString());
		poCtrl.setWriter(doc);
		//打开word
		poCtrl.webOpen(request.getContextPath()+"/template/cgsq1.docx",OpenModeType.docAdmin,"张三");
		poCtrl.setTagId("PageOfficeCtrl1"); // 此行必须
		return "pageoffice/Word";
	}
	@RequestMapping(value = "/openword10")
	public String openword10(HttpServletRequest request) {
		String id = request.getParameter("ypbm");
		PageOfficeCtrl poCtrl = new PageOfficeCtrl(request);
		request.setAttribute("poCtrl", poCtrl);
		//设置服务页面
		poCtrl.setServerPage(request.getContextPath() + "/poserver.zz");
		//添加保存按钮
		poCtrl.addCustomToolButton("保存并关闭", "Save", 1);
		poCtrl.addCustomToolButton("加盖印章", "InsertSeal()", 2);
		poCtrl.addCustomToolButton("打印", "PrintFile()", 6);
		poCtrl.addCustomToolButton("关闭", "CloseFile()", 21);
		//设置保存的action
		poCtrl.setSaveFilePage("savefile.do");
		Map map = this.bgglMapper.findfmInfo(id);
		WordDocument doc = new WordDocument();
		//委托id
		doc.createDataRegion("PO_WTID1", DataRegionInsertType.After, "PO_WTID2").setValue(map.get("wtid").toString());
		//样品名称
		String ypmc = "/";
		if (!"".equals(map.get("ypmc"))){
			ypmc=map.get("ypmc").toString();
		}
		doc.createDataRegion("PO_YPMC1", DataRegionInsertType.After, "PO_YPMC2").setValue(ypmc);
		//送检单位
		String ssjdw = "/";
		if (!"".equals("ssjdw")){
			ssjdw = map.get("ssjdw").toString();
		}
		doc.createDataRegion("PO_SSJDW1", DataRegionInsertType.After, "PO_SSJDW1").setValue(ssjdw);
		//检验类别
		String JYLB = "/";
		switch (map.get("jylb").toString()){
			case "W":
				JYLB = "委托检验";
				break;
			case "C":
				JYLB = "抽查检验";
				break;
			case "J":
				JYLB = "风险检测";
				break;
			case "Y":
				JYLB = "对比/验证检验";
				break;
		}
		doc.createDataRegion("PO_JYLB1", DataRegionInsertType.After, "PO_JYLB2").setValue(JYLB);
		//规格型号
		String ggxh = "/";
		if (!"".equals(map.get("ggxh"))){
			ggxh=map.get("ggxh").toString();
		}
		doc.createDataRegion("PO_GGXH1", DataRegionInsertType.After, "PO_GGXH2").setValue(ggxh);
		poCtrl.setWriter(doc);
		//打开word
		poCtrl.webOpen(request.getContextPath() + "/template/bgmodel.doc", OpenModeType.docAdmin, "张三");
		poCtrl.setTagId("PageOfficeCtrl1"); // 此行必须
		return "pageoffice/Word";
	}
	public boolean IFNULL(Map map){
		boolean flag =false;
		if (map!=null){
			flag = true;
		}
		return flag;
	}
}
