package cs2016_1_3_jos;

import java.io.*;

public class Telefon extends Kontakt implements Serializable {

	private String telefonnummer;

	@Override
	public String getInformation() {
		return this.telefonnummer;
	}
	
	public String getTelefonnummer() {
		return telefonnummer;
	}

	public void setTelefonnummer(String telefonnummer) {
		this.telefonnummer = telefonnummer;
	}
}
