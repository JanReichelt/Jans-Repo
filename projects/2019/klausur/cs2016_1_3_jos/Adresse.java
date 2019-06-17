package cs2016_1_3_jos;

import java.io.Serializable;

public class Adresse implements Serializable {
	
	private String strasze = "";
	private String plz = "";
	private String ort = "";
	
	public String getStrasze() {
		return strasze;
	}

	public void setStrasze(String strasze) {
		this.strasze = strasze;
	}

	public String getPlz() {
		return plz;
	}

	public void setPlz(String plz) {
		this.plz = plz;
	}

	public String getOrt() {
		return ort;
	}

	public void setOrt(String ort) {
		this.ort = ort;
	}

}
