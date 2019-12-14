package com.xinhai.caiyun.customermanage.business;

import com.xinhai.caiyun.customermanage.api.Khxxgl;
import com.xinhai.caiyun.customermanage.api.MailList;
import com.xinhai.caiyun.customermanage.dao.KhglMapper;
import com.xinhai.caiyun.customermanage.service.KhglService;
import com.xinhai.caiyun.systemmanager.api.ExcelUtil;
import com.xinhai.security.api.CurrentLoginUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class KhglServiceImpl implements KhglService {

    @Autowired
    private KhglMapper khglMapper;

    @Override
    public void createKhxxgl(Khxxgl khxxgl) {
        khglMapper.createKhxxgl(khxxgl);
    }

    @Override
    public List<Khxxgl> findKhglAll(int start, int len, String khmc) {
        return khglMapper.findKhglAll(start,len,khmc);
    }

    @Override
    public int findkhglAllNums(int start, int len, String khmc) {
        return khglMapper.findkhglAllNums(start,len,khmc);
    }

    @Override
    public void deleteById(String id) {
        khglMapper.deleteById(id);
    }

    @Override
    public void updateKhxx(Khxxgl khxxgl) {
        khglMapper.updateKhxx(khxxgl);
    }

    @Override
    public List<Khxxgl> cxKhxxgl(String name) {
        return khglMapper.cxKhxxgl(name);
    }

    @Override
    public Khxxgl findKhgl(String id) {
        return khglMapper.findKhgl(id);
    }

    @Override
    public void importWtkhxxExcel(InputStream in, MultipartFile file, String name) throws Exception {
        List<List<Object>> listob = ExcelUtil.getBankListByExcel(in,file.getOriginalFilename());
        System.out.print(listob.size());
        for (int i = 0;i<listob.size();i++){
            List<Object> list = listob.get(i);
            Map map=new HashMap();
            map.put("KHMC",String.valueOf(list.get(0)));
            map.put("LXDH",String.valueOf(list.get(1)));
            map.put("SFMC",String.valueOf(list.get(2)));
            List<Map> list1 = khglMapper.findDm(map);
            String sfdm = String.valueOf(list1.get(0).get("xzqh_dm"));
            map.put("SFDM",sfdm);
            map.put("CSMC",String.valueOf(list.get(3)));
            List<Map> list2 = khglMapper.findDmsh(map);
            String shdm = String.valueOf(list2.get(0).get("xzqh_dm"));
            map.put("CSDM",shdm);
            map.put("XJMC",String.valueOf(list.get(4)));
            List<Map> list3 = khglMapper.findDmqu(map);
            String qudm = String.valueOf(list3.get(0).get("xzqh_dm"));
            map.put("XJDM",qudm);
            map.put("XXDZ",String.valueOf(list.get(5)));
            map.put("YZBM",String.valueOf(list.get(6)));
            map.put("YX",String.valueOf(list.get(7)));
            map.put("LXR",String.valueOf(list.get(8)));
            map.put("BZ",String.valueOf(list.get(9)));

            khglMapper.importWtkhxxExcel(map);
        }
    }

}
