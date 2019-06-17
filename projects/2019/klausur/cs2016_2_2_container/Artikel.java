package cs2016_2_2_container;

import java.util.*;

public class Artikel {

	

	private int ID;
	private float preis;
	private int menge;

	public Artikel(int iD, float preis, int menge) {
		super();
		ID = iD;
		this.preis = preis;
		this.menge = menge;
	}

	public int getID() {
		return ID;
	}

	public void setID(int iD) {
		ID = iD;
	}

	public float getPreis() {
		return preis;
	}

	public void setPreis(float preis) {
		this.preis = preis;
	}

	public int getMenge() {
		return menge;
	}

	public void setMenge(int menge) {
		this.menge = menge;
	}
	
	public String toString() {
		return "Artikel [ID=" + ID + ", preis=" + preis + ", menge=" + menge + "]";
	}
}
