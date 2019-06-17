package cs2016_2_2_container;

public class Launcher {
	public static void main(String[] args) {
		Warenkorb w = new Warenkorb();
		
		Artikel a1 = new Artikel(2, 3.8f, 5);
		Artikel a2 = new Artikel(3, 4.6f, 7);
		Artikel a3 = new Artikel(4, 3.9f, 9);
		w.add(a1);
		w.add(a2);
		w.add(a3);
		
		System.out.println(w.toString());
		System.out.println(w.berechneBestellwert());
		
	}
}
