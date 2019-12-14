package com.xinhai.caiyun.systemmanager.opera;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import java.util.*;

public class HttpOpera {

    public List<Map> httpPostWithjson(List<Map> urlList) {
        List<Map> jcxmList = new ArrayList<>();
        double a = new Date().getTime();
        CloseableHttpClient httpClient = HttpClients.createDefault();
        try {
            BasicResponseHandler handler = new BasicResponseHandler();
            StringEntity entity = new StringEntity("");//解决中文乱码问题
            entity.setContentEncoding("UTF-8");
            entity.setContentType("application/json");

            for(Map urlMap:urlList)
            {
                String url = urlMap.get("URL")+"";
                String id = urlMap.get("SC_CYD_ID")+"";
                String sc_cydh = urlMap.get("SC_CYDH")+"";
                HttpPost httpPost = new HttpPost(url);
                httpPost.setEntity(entity);
                String res = httpClient.execute(httpPost, handler);
                Map m = new HashMap();
                m.put("SC_CYD_ID",id);
                m.put("SC_CYDH",sc_cydh);
                m.put("RES",res);
                jcxmList.add(m);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            try {
                httpClient.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return jcxmList;
    }

    /**
     * 这就是一个 抽样单的 检测项List集合
     * @param resJcxStr
     * @param id
     * @param sc_cydh
     * @return
     */
    public List<Map> initHttpJcx(String resJcxStr,String id,String sc_cydh) {
        List<Map> scJcxmList = new ArrayList<>();
        try {
                //这是一笔测试数据
//            resJcxStr = "{\"status\":\"success\",\"planName\":\"山东省食品药品监督管理局2017年生产环节第3批食品安全监督抽检工作方案\",\"planNo\":\"SC201704\",\"itemsInfo\":[{\"remark\":null,\"inspectionItemType\":\"0\",\"minAllowLimitUnit\":null,\"standardMinAllowLimitUnit\":\"mg/kg\",\"byLaw\":\"GB 5009.12-2010《食品安全国家标准 食品中铅的测定》(第一法 石墨炉原子吸收光谱法)\",\"problemItemConclusion\":\"金属等元素污染物超标\",\"inspectionItemName\":\"铅(以Pb计)\",\"inspectionResultUnit\":\"mg/kg\",\"creatorName\":\"田利珍\",\"editorName\":null,\"maxAllowLimitUnit\":null,\"methodDetectionLimitUnit\":null,\"id\":\"UIOfnOq0RbKwX0esMzbgCw\",\"standardMaxAllowLimitUnit\":\"mg/kg\",\"minAllowLimit\":null,\"unitOfMesurement\":\"mg/kg\",\"creatorId\":\"O0000000000000000077\",\"standardMinAllowLimit\":\"0\",\"editorId\":null,\"createTime\":\"2016-12-31 01:00:00\",\"inspectionResult\":\"未检出,数值(大于等于0.005保留两位有效数字)\",\"byLawShort\":null,\"limitAmount\":\"0.005\",\"inspectionMethod\":\"GB 2762-2012《食品安全国家标准 食品中污染物限量》\",\"maxAllowLimit\":null,\"foodCategoryId\":\"G0pEUK6pQuid8Kd4bcXDFA\",\"methodDetectionLimit\":null,\"editTime\":null,\"itemDatasource\":\"00\",\"standardMaxAllowLimit\":\"0.5\",\"dataStatus\":\"1\"}]}";
            if(resJcxStr!=null && resJcxStr.indexOf("null")==0)
            {
                resJcxStr = resJcxStr.substring(5,resJcxStr.length()-1);
            }
            JSONObject jsonObject = JSONObject.parseObject(resJcxStr.replaceAll("null","''"));
            String status = jsonObject.getString("status");
            //返回内容成功
            if (status != null && status.equals("success")) {
                String planName = jsonObject.getString("planName");
                String planNo = jsonObject.getString("planNo");
                JSONArray itemsInfo = jsonObject.getJSONArray("itemsInfo");
                for (int i = 0; i < itemsInfo.size(); i++) {
                    JSONObject jcxJson = itemsInfo.getJSONObject(i);
                    String str= jcxJson.toJSONString(jcxJson,SerializerFeature.WriteMapNullValue);
                    Map<String, String> scJcxmMap =  JSONObject.parseObject(str,Map.class);
                    scJcxmMap.put("planName", planName);
                    scJcxmMap.put("planNo", planNo);
                    scJcxmMap.put("sc_cyd_id", id);
                    scJcxmMap.put("sc_cydh", sc_cydh);
                    scJcxmList.add(scJcxmMap);
                }
            }
            else //返回失败 则 回传空
            {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return scJcxmList;
    }
    public static void main(String args[])
    {
        HttpOpera hh = new HttpOpera();
        hh.initHttpJcx("","","");
    }
}
