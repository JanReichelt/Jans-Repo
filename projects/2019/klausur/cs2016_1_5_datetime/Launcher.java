package cs2016_1_5_datetime;

import java.util.Calendar;
import java.util.GregorianCalendar;

public class Launcher {
	public static void main(String[] args) {
		Calendar c = GregorianCalendar.getInstance();
		
		System.out.println("Woche: " + c.get(Calendar.WEEK_OF_MONTH));
		
		System.out.println(c.get(Calendar.WEEK_OF_YEAR));
		
		c.add(Calendar.WEEK_OF_MONTH, 1);
		
		System.out.println("Woche: " + c.get(Calendar.WEEK_OF_MONTH));
		
		System.out.println(c.get(Calendar.DATE) + "-"
						+ (c.get(Calendar.MONTH) + 1)  + "-"
						+ c.get(Calendar.YEAR));
		
	}
}
