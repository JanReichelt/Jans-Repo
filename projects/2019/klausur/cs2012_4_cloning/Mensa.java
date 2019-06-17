package cs2012_4_cloning;

import java.util.ArrayList;

public class Mensa implements Cloneable {

	public ArrayList<Rolle> angestellte;
	public Bar getraenkeBar;
	public Raum speiseSaal;
	public Kueche kueche;
	
	@Override
	public Object clone() throws CloneNotSupportedException {
		Mensa m = (Mensa) super.clone();
		m.kueche = (Kueche) this.kueche.clone();
		if (this.getraenkeBar != null) {
			m.getraenkeBar = (Bar) this.getraenkeBar.clone();
		} else {
			System.out.println("Bar ist null");
		}
		m.speiseSaal = (Raum) this.speiseSaal.clone();
		//m.angestellte = (ArrayList<Rolle>) this.angestellte.clone();
		m.angestellte = new ArrayList<Rolle>();
		for (Rolle rolle : this.angestellte) {
			m.angestellte.add((Rolle) rolle.clone());
		}
		return m;
	}
}
