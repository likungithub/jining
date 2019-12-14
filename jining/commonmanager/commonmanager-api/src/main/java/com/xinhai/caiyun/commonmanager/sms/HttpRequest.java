package com.xinhai.caiyun.commonmanager.sms;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Random;

//用户请使用UTF-8作为源码文件的保存格式，避免出现乱码问题
/**
 * @description:华兴软通，sdk接口调用demo,http版;http不是安全接口,需要找客服绑定IP才能使用 
 *                                                              推荐尽量使用POST方式,虽然该接口支持Get访问
 *                                                              .
 *                                                              因为短信服务器对GET方式的参数进行url编码后的长度限制为2048个字符
 *                                                              (一个汉字编码后一般等于9个字符
 *                                                              ，短信很容易超标)
 * @version: v1.0
 * @author: lixp
 * @date: 2017年6月27日 上午8:27:46
 */
public class HttpRequest {

    /**
     * HTTP的Post请求方式(推荐)
     * 
     * @param strUrl
     *            访问地址
     * @param param
     *            参数字符串
     * */
    public String requestPost(String strUrl, String param) {
        System.out.println("HTTP的POST请求:" + strUrl + ";数据:" + param);
        String returnStr = null; // 返回结果定义
        URL url = null;
        HttpURLConnection httpURLConnection = null;

        try {
            url = new URL(strUrl);
            httpURLConnection = (HttpURLConnection) url.openConnection();
            httpURLConnection.setRequestProperty("Accept-Charset", "utf-8");
            httpURLConnection.setRequestProperty("Content-Type",
                    "application/x-www-form-urlencoded");
            httpURLConnection.setDoOutput(true);
            httpURLConnection.setDoInput(true);
            httpURLConnection.setRequestMethod("POST"); // post方式
            httpURLConnection.connect();
            // System.out.println("ResponseCode:" +
            // httpURLConnection.getResponseCode());
            // POST方法时使用
            byte[] byteParam = param.getBytes("UTF-8");
            DataOutputStream out = new DataOutputStream(
                    httpURLConnection.getOutputStream());
            out.write(byteParam);
            out.flush();
            out.close();
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    httpURLConnection.getInputStream(), "utf-8"));
            StringBuffer buffer = new StringBuffer();
            String line = "";
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }

            reader.close();
            returnStr = buffer.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (httpURLConnection != null) {
                httpURLConnection.disconnect();
            }
        }
        return returnStr;
    }

    /**
     * HTTP的Get请求方式
     * 
     * @param strUrl
     *            访问地址
     * @param param
     *            参数字符串
     * */
    public String requestGet(String strUrl, String param) {
        System.out.println("HTTP的GET请求:" + strUrl + "?" + param);
        String returnStr = null; // 返回结果定义
        URL url = null;
        HttpURLConnection httpURLConnection = null;
        try {
            url = new URL(strUrl + "?" + param);
            httpURLConnection = (HttpURLConnection) url.openConnection();
            httpURLConnection.setRequestProperty("Accept-Charset", "utf-8");
            httpURLConnection.setRequestProperty("Content-Type",
                    "application/x-www-form-urlencoded");
            httpURLConnection.setDoOutput(true);
            httpURLConnection.setDoInput(true);
            httpURLConnection.setRequestMethod("GET"); // get方式
            httpURLConnection.setUseCaches(false); // 不用缓存
            httpURLConnection.connect();
            // System.out.println("ResponseCode:" +
            // httpURLConnection.getResponseCode());
            BufferedReader reader = new BufferedReader(new InputStreamReader(
                    httpURLConnection.getInputStream(), "utf-8"));
            StringBuffer buffer = new StringBuffer();
            String line = "";
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }

            reader.close();
            returnStr = buffer.toString();
        } catch (Exception e) {
            e.printStackTrace();

            return null;
        } finally {
            if (httpURLConnection != null) {
                httpURLConnection.disconnect();
            }
        }
        return returnStr;
    }

    /**
     * 获取余额的方法
     * 
     * @param type
     *            请求方式,POST,GET,推荐POST
     */
    public void getBalance(String type) {
        String url = "http://www.stongnet.com/sdkhttp/getbalance.aspx";
        String regCode = "101100-WEB-HUAX-043007"; // 华兴软通注册码，请在这里填写您从客服那得到的注册码
        String regPasswod = "BEXJIEAN"; // 华兴软通注册码对应的密码，请在这里填写您从客服那得到的注册码
        String param = "reg=" + regCode + "&pwd=" + regPasswod;

        String returnStr = null;
        if (type.equals("GET")) {
            returnStr = this.requestGet(url, param);
        } else {
            returnStr = this.requestPost(url, param);
        }

        System.out.println("----------" + returnStr);
    }

    /**
     * 发送短信的方法
     * 
     * @param type
     *            请求方式,POST,GET,推荐POST
     */
    public void sendSms1(String type) {
        String url = "http://www.stongnet.com/sdkhttp/sendsms.aspx";
        String regCode = "101100-WEB-HUAX-043007"; // 华兴软通注册码，请在这里填写您从客服那得到的注册码
        String regPasswod = "BEXJIEAN"; // 华兴软通注册码对应的密码，请在这里填写您从客服那得到的注册码
        String sourceAdd = null; // 子通道号（最长10位，可为空
        String phone = "17685853535"; // 手机号码（最多1000个），多个用英文逗号(,)隔开，不可为空
        /*
         * 签名:工信部规定,签名表示用户的真实身份,请不要在签名中冒用别人的身份,如客户使用虚假身份我们将封号处理并以诈骗为由提交工信部备案，
         * 一切责任后果由客户承担 华兴软通短信系统要求签名必须附加在短信内容的尾部,以全角中文中括号包括,且括号之后不能再有空格,否则将导致发送失败
         * 虽然在程序中,签名是附加在短信内容的尾部,但是真实短信送达到用户手机时,签名则可能出现在短信的头部,这是各地运营商的政策不同,
         * 会在它们自己的路由对签名的位置做调整 短信内容的长度计算会包括签名;签名内容的长度限制受政策变化,具体请咨询客服
         * 写在程序里是让用户自定义签名的方式,还有一种方式是让客服绑定签名,这种方式签名不需要写在程序中,具体请咨询客服
         */
        String signature = "【华兴】"; // 签名
        Random random = new Random();
        String content = "华兴软通$-_.+!*',^(αβ &@#%)验证码:"
                + (1000 + random.nextInt(9000)) + signature; // 短信内容,请严格按照客服定义的模板生成短信内容,否则发送将失败(含有中文，特殊符号等非ASCII码的内容，用户必须保证其为UTF-8编码格式)
        try {
            content = URLEncoder.encode(content, "UTF-8"); // content中含有空格，换行，中文等非ascii字符时，需要进行url编码，否则无法正确传输到服务器
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println(e.getMessage());
            return;
        }
        String param = "reg=" + regCode + "&pwd=" + regPasswod + "&sourceadd="
                + sourceAdd + "&phone=" + phone + "&content=" + content;

        String returnStr = null;
        if (type.equals("GET")) {
            returnStr = this.requestGet(url, param);
        } else {
            returnStr = this.requestPost(url, param);
        }
        System.out.println(returnStr);
    }

    /**
     * 发送短信的方法
     * 
     * @param type
     *            请求方式,POST,GET,推荐POST
     * @throws UnsupportedEncodingException
     */
    public void sendSms(String type, String phone, String content)
            throws UnsupportedEncodingException {
        String url = "http://www.stongnet.com/sdkhttp/sendsms.aspx";
        String regCode = "101100-WEB-HUAX-208544"; // 华兴软通注册码，请在这里填写您从客服那得到的注册码
        String regPasswod = "QTYQJCZN"; // 华兴软通注册码对应的密码，请在这里填写您从客服那得到的注册码
        String sourceAdd = null; // 子通道号（最长10位，可为空
        // String phone = "15610079715"; //手机号码（最多1000个），多个用英文逗号(,)隔开，不可为空
        /*
         * 签名:工信部规定,签名表示用户的真实身份,请不要在签名中冒用别人的身份,如客户使用虚假身份我们将封号处理并以诈骗为由提交工信部备案，
         * 一切责任后果由客户承担 华兴软通短信系统要求签名必须附加在短信内容的尾部,以全角中文中括号包括,且括号之后不能再有空格,否则将导致发送失败
         * 虽然在程序中,签名是附加在短信内容的尾部,但是真实短信送达到用户手机时,签名则可能出现在短信的头部,这是各地运营商的政策不同,
         * 会在它们自己的路由对签名的位置做调整 短信内容的长度计算会包括签名;签名内容的长度限制受政策变化,具体请咨询客服
         * 写在程序里是让用户自定义签名的方式,还有一种方式是让客服绑定签名,这种方式签名不需要写在程序中,具体请咨询客服
         */
        String signature = "【华兴】"; // 签名
        Random random = new Random();
        // String content = "华兴软通$-_.+!*',^(αβ &@#%)验证码:" + (1000 +
        // random.nextInt(9000)) + signature;
        // //短信内容,请严格按照客服定义的模板生成短信内容,否则发送将失败(含有中文，特殊符号等非ASCII码的内容，用户必须保证其为UTF-8编码格式)
        content = URLEncoder.encode(content, "UTF-8"); // content中含有空格，换行，中文等非ascii字符时，需要进行url编码，否则无法正确传输到服务器
        String param = "reg=" + regCode + "&pwd=" + regPasswod + "&sourceadd="
                + sourceAdd + "&phone=" + phone + "&content=" + content;

        String returnStr = null;
        if (type.equals("GET")) {
            returnStr = this.requestGet(url, param);
        } else {
            returnStr = this.requestPost(url, param);
        }
        System.out.println(returnStr);
    }
    
    public static void main(String[] args) throws UnsupportedEncodingException {
        // TODO Auto-generated method stub
        System.out.println("Hello,华兴软通短信系统!");
        HttpRequest httpRequest = new HttpRequest();
        httpRequest.getBalance("POST");
        Random random = new Random();
        int yzm = (10000 + random.nextInt(90000));
        httpRequest.sendSms("POST","17685853535","【财云升】您的APP登录手机号变更为：XXXX，请使用手机验证码方式登录，并及时更改登录密码。dddddddddd");
        
    }

}
