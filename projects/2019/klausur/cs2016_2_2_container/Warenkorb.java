package cs2016_2_2_container;

import java.util.*;

public class Warenkorb {

	Vector vec;

	public Warenkorb() {
		super();
		this.vec = new Vector();
	}

	public void add(Artikel a) {
		this.vec.add(a);
	}

	public float berechneBestellwert() {
		float g = 0;
		Artikel a = null;
		for (int i = 0; i < this.vec.size(); i++) {
			a = (Artikel) this.vec.get(i);
			g = g + (a.getPreis() * a.getMenge());
		}
		return g;
	}

	@Override
	public String toString() {
		Artikel a = null;
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < this.vec.size(); i++) {

			a = (Artikel) this.vec.get(i);
			System.out.println(a);
			sb.append(a.toString());
		}
		return sb.toString();
	}

	public Vector getVec() {
		return this.vec;
	}

	public void setVec(Vector vec) {
		this.vec = vec;
	}

}
