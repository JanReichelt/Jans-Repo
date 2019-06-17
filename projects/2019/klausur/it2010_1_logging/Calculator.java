package it2010_1_logging;

import java.util.logging.Level;


public class Calculator {

	public int divide(int a, int b) {
		int c = 0;
		try {
			c = a / b;
			Launcher.logger.log(Level.INFO, "Divison erfolgreich");
		} catch (ArithmeticException e) {
			Launcher.logger.log(Level.SEVERE, "Divison durch 0!");
			System.out.println("Fehler. /0");
		}
		return c;
	}
}
