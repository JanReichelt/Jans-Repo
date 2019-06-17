package it2011_repeat_5_thread;

public class Launch {

	public static void main(String[] args) {
		
		Monat monat = new Monat();
		Leser leser = new Leser(monat);
		Konkurrent k1 = new Konkurrent(2, "Februar", monat);
		Konkurrent k2 = new Konkurrent(3, "März", monat);
		
		leser.start();
		k1.start();
		k2.start();
		
		try {
			Thread.sleep(1000);
		} catch (InterruptedException e) {
			System.out.println("Fehler");
		}
		
		leser.interrupt();
		k1.interrupt();
		k2.interrupt();
		
		
	}

}
