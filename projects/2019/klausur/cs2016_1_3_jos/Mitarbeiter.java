package cs2016_1_3_jos;

import java.io.Serializable;
import java.util.*;

public class Mitarbeiter implements Serializable {
	
	private int id = 0;
	private String name = "";
	private Date geburtstag = null;
	private Adresse adresse = null;
	private List<Kontakt> kontakte = null;
	private transient String passwort = "";
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getGeburtstag() {
		return geburtstag;
	}
	public void setGeburtstag(Date geburtstag) {
		this.geburtstag = geburtstag;
	}
	public Adresse getAdresse() {
		return adresse;
	}
	public void setAdresse(Adresse adresse) {
		this.adresse = adresse;
	}
	public List<Kontakt> getKontakte() {
		return kontakte;
	}
	public void setKontakte(List<Kontakt> kontakte) {
		this.kontakte = kontakte;
	}
	public String getPasswort() {
		return passwort;
	}
	public void setPasswort(String passwort) {
		this.passwort = passwort;
	}

}
