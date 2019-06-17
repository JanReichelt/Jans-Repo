package cs2017_2_3_datetime;

import java.util.*;

public class Launcher {

	public static void main(String[] args) {
	
		GregorianCalendar c = new GregorianCalendar(2000, 1, 1);
		Date d = c.getTime();
		long millis = d.getTime();
		long l = System.currentTimeMillis();
		long di = l - millis;
		long s = di / 1000;
		long ts = s % 60; 
		long m = s / 60;
		long tm = m % 60; 
		long hr = m / 60;
		long th = hr % 24; 
		long day = hr / 24;
		long td = day; 

		System.out.println(ts);
		System.out.println(tm);
		System.out.println(th);
		System.out.println(td);
	}
}
