package com.xinhai.caiyun.commonmanager.utils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 获取各种格式的当前日期
 * @author 李茂飞
 *
 */
public class GetDate {

    /**
     * 根据输入年月获取第一天
     * @param year ：输入年 
     * @param month :输入月
     * @return String  yyyy-MM-dd 此格式的日期字符串
     */
    public static String getFirstDay(int year, int month) {
        Calendar cal = Calendar.getInstance(); 
        month--;
        cal.set(Calendar.YEAR, year);     
        cal.set(Calendar.MONTH, month);  
        cal.set(Calendar.DAY_OF_MONTH, cal.getMinimum(Calendar.DATE)); 
        return  new SimpleDateFormat("yyyy-MM-dd ").format(cal.getTime()); 
    }
        
        /**
         * 根据输入年月获取最后一天
         * @param year ：输入年 
         * @param month :输入月
         * @return String yyyy-MM-dd  此格式的日期字符串
         */
    public static String getLastDay(int year, int month) {   
        Calendar cal = Calendar.getInstance();
        cal.clear(); //清缓存
        month--;
        cal.set(Calendar.YEAR, year);     
        cal.set(Calendar.MONTH, month);
        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DATE));  
        return  new SimpleDateFormat("yyyy-MM-dd ").format(cal.getTime());  
    }
        
        /**
         * 获取当前时间（ 返回String）
         * @param i 输出类型
         * 输入1：返回yyyy-MM-dd格式
         * 输入2：返回yyyy-MM-dd HH:mm:ss格式
         * 输入3：返回yyyyMMddHHmmss格式
         * @return String yyyy-MM-dd
         */
    public static String getNowDate(int i) {
        SimpleDateFormat formatter;
        if (i == 1) {
            formatter = new SimpleDateFormat("yyyy-MM-dd");
        } else if (i == 2) {
            formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        } else {
            formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        }
        String ctime = formatter.format(new Date()); 
        return ctime;
    }
        
        /**
         * 获取当前时间（ 返回Timestamp）
         * 返回yyyy-MM-dd HH:mm:ss格式
         * @return String yyyy-MM-dd
         * @throws ParseException 
         */
    public static Date getCurrentDate() throws ParseException {
        SimpleDateFormat formatter;
        formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return formatter.parse(formatter.format(new Date())); 
        //Timestamp ts = Timestamp.valueOf(ctime);
        
    }

        /**
         * 获取当前时间年
         * @return int year
         */
    public static int getNowYear() {
        Calendar ca = Calendar.getInstance();
        int year = ca.get(Calendar.YEAR); //获取年份
        return year;
    }
        
        /**
         * 获取当前时间月
         * @return int month
         */
    public static int getNowMonth() {
        Calendar ca = Calendar.getInstance();  
        int month = ca.get(Calendar.MONTH); //获取月份 
        month++;
        return month;
    }
    
        /**
         * 获取当前时间天
         * @return int day
         */
    public static int getNowDay() {
        Calendar ca = Calendar.getInstance();  
        int day = ca.get(Calendar.DATE); //获取天 
        return day;
    }
    
        /**
         * 获取当前时间前后多少天
         * @param now 开始时间
         * @param type 单位 01天 02月 03年
         * @param num 多少 （几天，几月，几年）正数表示该日期后，负数表示该日期的前
         * @return int day
         */
    public static Date getFutureDay(Date now, String type, Integer num) {
        // 时间表示格式可以改变，yyyyMMdd需要写例如20160523这种形式的时间
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
        // 将字符串的日期转为Date类型，ParsePosition(0)表示从第一个字符开始解析
        Date date = sdf.parse(sdf.format(now), new ParsePosition(0));
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        // add方法中的第二个参数n中，正数表示该日期后n天，负数表示该日期的前n天
        if (type.equals("01")) { //前后多少天
            calendar.add(Calendar.DATE, num); 
        } else if (type.equals("02")) { //前后多少月
            calendar.add(Calendar.MONTH, num); 
        } else if (type.equals("03")) { //前后多少年
            calendar.add(Calendar.YEAR, num); 
        }
        
        Date date1 = null;
        try {
            date1 = sdf.parse(sdf.format(calendar.getTime()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
        String out = sdf.format(date1);
        System.out.println(out);
        return date1;
    }
    
    /**  
     * 计算两个日期之间相差的天数  
     * @param smdate 较小的时间 
     * @param bdate  较大的时间 
     * @return 相差天数 
     * @throws ParseException  
     */    
    public static int daysBetween(Date smdate, Date bdate) throws ParseException {    
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");  
        smdate = sdf.parse(sdf.format(smdate));  
        bdate = sdf.parse(sdf.format(bdate));  
        Calendar cal = Calendar.getInstance();    
        cal.setTime(smdate);    
        long time1 = cal.getTimeInMillis();                 
        cal.setTime(bdate);    
        long time2 = cal.getTimeInMillis();         
        long between_days = (time2 - time1)/(1000*3600*24);  
            
        return Integer.parseInt(String.valueOf(between_days));           
    }

//    public static void main (String [] args) {
//        getFutureDay(new Date(), "02", 3);
//    }
    
    /**
     * String转List<String>
     * @param param 传入参数
     * @return List<String> list
     */
    public static List<String> StringToList (String param) {
        String[] arr = param.split(",");
        //转成list
        List<String> list = new ArrayList<String>();
        if (param.length() > 0) {
            list = Arrays.asList(arr);
        }
        return list;
    }
    
    /**
     * String转List<Integer>
     * @param param 传入参数
     * @return List<Integer> list
     */
    public static List<Integer> IntToList (String param) {
        String[] str = param.split(","); 
        int[] array = new int[str.length];  
        for (int i = 0; i < str.length; i++) {  
            array[i] = Integer.parseInt(str[i]); 
        }
        List<Integer> list = Arrays.stream(array).boxed().collect(Collectors.toList()); //数组转List
        
        return list;
    }

    /**
     * 根据传入日期，计算当前日期所在周的周一与周日日期
     * @param d date
     * @return Date[] 数组
     */
    public static Date[] getMonday(Date d) {
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd"); //设置时间格式
        Calendar cal = Calendar.getInstance();
        cal.setTime(d);
        System.out.println("要计算日期为:"+sdf.format(cal.getTime())); //输出要计算日期

        //判断要计算的日期是否是周日，如果是则减一天计算周六的，否则会出问题，计算到下一周去了
        int dayWeek = cal.get(Calendar.DAY_OF_WEEK);//获得当前日期是一个星期的第几天
        if(1 == dayWeek) {
            cal.add(Calendar.DAY_OF_MONTH, -1); //以天的方式，将当前日期减去一天，得到周六的日期
        }

        cal.setFirstDayOfWeek(Calendar.MONDAY);//设置一个星期的第一天，按中国的习惯一个星期的第一天是星期一

        int day = cal.get(Calendar.DAY_OF_WEEK);//获得当前日期是一个星期的第几天
        cal.add(Calendar.DATE, cal.getFirstDayOfWeek() - day);//根据日历的规则，给当前日期减去星期几与一个星期第一天的差值
        Date [] dd = new Date[2];
        dd[0] = cal.getTime();
        System.out.println("所在周星期一的日期："+sdf.format(cal.getTime()));

        cal.add(Calendar.DATE, 6);
        dd[1] = cal.getTime();
        System.out.println("所在周星期日的日期："+sdf.format(cal.getTime()));

        return dd;
    }

    /**
     * 根据传入日期，计算当前日期所在月的月初与月末日期
     * @param d date
     * @return Date[] 数组
     */
    public static Date[] getMonthFirstDay(Date d) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(d);

        cal.add(Calendar.MONTH, 0);
        cal.set(Calendar.DAY_OF_MONTH,1);//设置为1号,当前日期既为本月第一天
        Date [] dd = new Date[2];
        dd[0] = cal.getTime();

        //获取当前月最后一天
        cal.set(Calendar.DAY_OF_MONTH, cal.getActualMaximum(Calendar.DAY_OF_MONTH));
        dd[1] = cal.getTime();
        return dd;
    }

    /**
     * 根据传入日期，计算当前日期所在年的年初与年末日期
     * @param d date
     * @return Date[] 数组
     */
    public static Date[] getYearFirstDay(Date d) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(d);

        cal.add(Calendar.YEAR, 0);
        cal.set(Calendar.DAY_OF_YEAR,1);//设置为1号,当前日期既为本月第一天
        Date [] dd = new Date[2];
        dd[0] = cal.getTime();

        //获取当前月最后一天
        cal.set(Calendar.DAY_OF_YEAR, cal.getActualMaximum(Calendar.DAY_OF_YEAR));
        dd[1] = cal.getTime();
        return dd;
    }

//    public static void main(String [] args){
//        String a = getLastDay(2017,2);
//        System.out.println(a);
//    }
}
