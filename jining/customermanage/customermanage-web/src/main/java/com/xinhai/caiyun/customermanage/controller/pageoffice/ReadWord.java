package com.xinhai.caiyun.customermanage.controller.pageoffice;

import com.xinhai.caiyun.customermanage.dao.BgmodelMapper;
import com.xinhai.caiyun.customermanage.dao.TLZypglMapper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
@Controller
public class ReadWord {
    public  String readword(String filePath,String bgid,BgmodelMapper bgmodelMapper) throws Exception{
        File file = new File(filePath);
        String zd = "";
        String str = "";
        List<Map> list = new ArrayList<>();
        try {
            FileInputStream fis = new FileInputStream(file);
            XWPFDocument xdoc = new XWPFDocument(fis);
            XWPFWordExtractor extractor = new XWPFWordExtractor(xdoc);
            str = extractor.getText();
            String S = "[a-z,A-Z,@,#,*,+]{1,}";
            Pattern p= Pattern.compile(S);
            Matcher m=p.matcher(str);
            while (m.find()){
                String zds = m.group();
                if (zds.startsWith("@")){
                    //图片
                    Map map = new HashMap();
                    zds = zds.substring(1,zds.length());
                    map.put("zd",zds);
                    map.put("lx",1);
                    list.add(map);
                }else if (zds.startsWith("#")){
                    //表格
                    Map map = new HashMap();
                    zds = zds.substring(1,zds.length());
                    map.put("zd",zds);
                    map.put("lx",2);
                    list.add(map);
                }else if (zds.startsWith("*")){
                    //列表
                    Map map = new HashMap();
                    zds = zds.substring(1,zds.length());
                    map.put("zd",zds);
                    map.put("lx",3);
                    list.add(map);
                }else if (zds.startsWith("+")){
                    //文档
                    Map map = new HashMap();
                    zds = zds.substring(1,zds.length());
                    map.put("zd",zds);
                    map.put("lx",4);
                    list.add(map);
                } else {
                    Map map = new HashMap();
                    map.put("zd",zds);
                    map.put("lx",5);
                    list.add(map);
                }
                zd = zd+zds+",";
                System.out.print(m.group());
            }
            fis.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        //删除对应关系
        bgmodelMapper.SCZD(bgid,list);
        return zd;
    }
}
