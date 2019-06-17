package cs2017_2_2_stream;

import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.GregorianCalendar;

public class Launcher {
	public static void main(String[] args) {
		FileWriter output = null;
		PrintWriter p = null;
		Calendar c = new GregorianCalendar();
		try {
			output = new FileWriter("cs2017_2_2_stream/history.txt");
			p = new PrintWriter(output);
			p.printf("Call History: \n");
			p.printf("Call by %s at local time: %tT%n", args[0], c.getTime());
			p.printf("Call by %s at local time: %tT%n", args[1], c.getTime());
			p.printf("Call by %s at local time: %tT%n", args[2], c.getTime());
			
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			p.close();
		}

	}
}
