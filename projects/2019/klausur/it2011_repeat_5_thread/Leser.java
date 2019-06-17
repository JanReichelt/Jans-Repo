package it2011_repeat_5_thread;

public class Leser extends java.lang.Thread {

	private Monat monat;

	public Leser(Monat monat) {
		super();
		this.monat = monat;
	}

	@Override
	public void run() {
		while (isInterrupted() == false) {
			System.out.println(this.monat.toString());
		}
	}
}
