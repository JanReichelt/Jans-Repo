package it2010_1_logging;

import java.io.File;
import java.io.IOException;
import java.util.logging.*;

public class Launcher {
	static Logger logger = Logger.getLogger(Logger.GLOBAL_LOGGER_NAME);

	public static void main(String[] args) throws SecurityException, IOException {
		
		Launcher.initLogger();
		Calculator c = new Calculator();
		int ergebnis = c.divide(6, 0);
		Launcher.logger.log(Level.INFO, "Divison durchgeführt");
		System.out.println(ergebnis);
	}
	
	public static void initLogger() throws SecurityException, IOException{
		
		Handler handler = new FileHandler("it2010_1_logging" + File.separator + "test.xml");
		Launcher.logger.addHandler(handler);
		
		Launcher.logger.setLevel(Level.INFO);
	}

}
