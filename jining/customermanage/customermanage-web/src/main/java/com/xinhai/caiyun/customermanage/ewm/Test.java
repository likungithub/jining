package com.xinhai.caiyun.customermanage.ewm;

import com.google.gson.JsonObject;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

public class Test {

    public static String httpPostWithjson(String url, String json) throws IOException {
        String result = "";
        double a = new Date().getTime();
        HttpPost httpPost = new HttpPost(url);
        CloseableHttpClient httpClient = HttpClients.createDefault();
        try {
            BasicResponseHandler handler = new BasicResponseHandler();
            StringEntity entity = new StringEntity("");//解决中文乱码问题
            entity.setContentEncoding("UTF-8");
            entity.setContentType("application/json");
            httpPost.setEntity(entity);
            result = httpClient.execute(httpPost, handler);
            System.out.println(new Date().getTime()-a);
            return result;
        } catch (Exception e) {
            e.printStackTrace();

        } finally {
            try {
                httpClient.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return result;
    }

    public void tt()
    {
        String httpURL = "http://60.216.97.250:8087/sample/command/dispatcher/com.inspur.transfer.SampleDataTrans/getPlanItemInfoByActionId?actionBaseNo=SCSC17110183";//
        try {
//            String result1 = httpPostWithjson(httpURL, httpURL);
//
//            if(result1!=null && result1.indexOf("null")==0)
//            {
//                result1 = result1.substring(5,result1.length()-1);
//                System.out.println(result1);
//            }



            String ceshi = "{\"status\":\"success\",\"planName\":\"山东省食品药品监督管理局2017年生产环节第3批食品安全监督抽检工作方案\",\"planNo\":\"SC201704\",\"itemsInfo\":[{\"remark\":null,\"inspectionItemType\":\"0\",\"minAllowLimitUnit\":null,\"standardMinAllowLimitUnit\":\"mg/kg\",\"byLaw\":\"GB 5009.12-2010《食品安全国家标准 食品中铅的测定》(第一法 石墨炉原子吸收光谱法)\",\"problemItemConclusion\":\"金属等元素污染物超标\",\"inspectionItemName\":\"铅(以Pb计)\",\"inspectionResultUnit\":\"mg/kg\",\"creatorName\":\"田利珍\",\"editorName\":null,\"maxAllowLimitUnit\":null,\"methodDetectionLimitUnit\":null,\"id\":\"UIOfnOq0RbKwX0esMzbgCw\",\"standardMaxAllowLimitUnit\":\"mg/kg\",\"minAllowLimit\":null,\"unitOfMesurement\":\"mg/kg\",\"creatorId\":\"O0000000000000000077\",\"standardMinAllowLimit\":\"0\",\"editorId\":null,\"createTime\":\"2016-12-31 01:00:00\",\"inspectionResult\":\"未检出,数值(大于等于0.005保留两位有效数字)\",\"byLawShort\":null,\"limitAmount\":\"0.005\",\"inspectionMethod\":\"GB 2762-2012《食品安全国家标准 食品中污染物限量》\",\"maxAllowLimit\":null,\"foodCategoryId\":\"G0pEUK6pQuid8Kd4bcXDFA\",\"methodDetectionLimit\":null,\"editTime\":null,\"itemDatasource\":\"00\",\"standardMaxAllowLimit\":\"0.5\",\"dataStatus\":\"1\"}]}";
            JSONObject jsonObject = JSONObject.fromObject(ceshi);
            String status = jsonObject.getString("status");
            //返回内容成功
            if(status!=null && status.equals("success"))
            {
                String planName = jsonObject.getString("planName");
                String planNo = jsonObject.getString("planNo");

                JSONArray itemsInfo = jsonObject.getJSONArray("itemsInfo");
                List<Map>  scJcxmList = new ArrayList<>();
                for(int i=0;i<itemsInfo.size();i++)
                {
                    JSONObject  jcxJson = itemsInfo.getJSONObject(i);
                    String inspectionItemType = jcxJson.getString("inspectionItemType");
                    System.out.println("inspectionItemType="+inspectionItemType);
                    Iterator iterator = jcxJson.keys();
                    Map scJcxmMap= new HashMap();
                    scJcxmMap.put("planName",planName);
                    scJcxmMap.put("planNo",planName);
                    while(iterator.hasNext()){
                        //hasNext方法，只是判断下一个元素的有无，并不移动指针
                        String key = (String) iterator.next();//next方法，向下移动指针，并且返回指针指向的元素，如果指针指向的内存中没有元素，会报异常
                        String val = jcxJson.getString(key);
                        scJcxmMap.put(key,val);
                    }
                    scJcxmList.add(scJcxmMap);
                }
                System.out.println("status="+status);
                System.out.println("planName="+planName);
                System.out.println("planNo="+planNo);
            }

            //遍历JSON准备记录检测项目



        } catch (Exception e) {
            e.printStackTrace();
        }
    }




    public static void main(String args[])
    {

    }
}
