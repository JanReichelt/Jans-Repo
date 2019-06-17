package cs2016_2_1_logging;

import java.io.*;
import java.util.*;
import java.util.logging.*;

public class Launcher {

	static Logger log = Logger.getLogger(Logger.GLOBAL_LOGGER_NAME);
	
	public static void initLogger() throws SecurityException, IOException {
		Handler handler = new FileHandler("cs2016_2_1_logging/log.xml");
		log.addHandler(handler);
	}

	public static void main(String[] args) throws SecurityException, IOException {
		log.setLevel(Level.INFO);
		initLogger();
		File f = new File("cs2016_2_1_logging/scores.dat");
		Scanner s = null;

		try {

			s = new Scanner(f);
			log.info("Test");
			while (s.hasNext()) {

				String string = s.next();
				Integer i = s.nextInt();
				System.out.printf("|%s\t|%d|%n", string, i);
			}

		} catch (Exception e) {
			
			System.out.println("Error: " + e.getMessage());

		} finally {

			s.close();
		}
	}
}
