package it2011_repeat_5_thread;

public class Monat {

	public Monat(int nummer, String name) {
		super();
		this.nummer = nummer;
		this.name = name;
	}

	private int nummer = 0;
	private String name = null;

	public Monat() {
		this.nummer = 1;
		this.name = "Januar";
	}

	public int getNummer() {
		return nummer;
	}

	public void setNummer(int nummer) {
		this.nummer = nummer;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	synchronized public void setMonat(int nummer, String name) {
		this.setName(name);
		this.setNummer(nummer);
	}
	
	@Override
	synchronized public String toString() {
		String a = this.getName();
		int b = this.getNummer();
		return a + b;
	}

}
