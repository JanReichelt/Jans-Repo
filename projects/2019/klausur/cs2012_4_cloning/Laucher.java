package cs2012_4_cloning;

import java.util.ArrayList;

public class Laucher {
	public static void main(String[] args) throws Exception {
		Mensa m1 = new Mensa();
		m1.kueche = new Kueche();
		m1.speiseSaal = new Raum();
		m1.getraenkeBar = null;
		m1.angestellte = new ArrayList<Rolle>();
		
		Koch k1 = new Koch();
		m1.angestellte.add(k1);
		
		TellerWaescher t1 = new TellerWaescher();
		m1.angestellte.add(t1);
		
		Mensa m2 = (Mensa) m1.clone();
		
		System.out.println(m1.angestellte);
		System.out.println(m2.angestellte);
		System.out.println(m1.getraenkeBar);
		System.out.println(m2.getraenkeBar);
		System.out.println(m1.speiseSaal);
		System.out.println(m2.speiseSaal);
		
	}
}
