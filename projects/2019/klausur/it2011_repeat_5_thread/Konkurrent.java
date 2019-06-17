package it2011_repeat_5_thread;

public class Konkurrent extends java.lang.Thread {

	private int nummer;
	private String name;
	private Monat monat;

	public Konkurrent(int nummer, String name, Monat monat) {
		this.nummer = nummer;
		this.name = name;
		this.monat = monat;
	}

	@Override
	public void run() {
		while (isInterrupted() == false) {
			this.monat.setMonat(this.nummer, this.name);
		}
	}
}
