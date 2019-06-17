package cs2016_1_3_jos;

import java.beans.*;
import java.io.*;
import java.util.*;

public class Launcher {

	public static void main(String[] args) throws IOException {
	
		Adresse am1, am2;
		Mitarbeiter m1, m2;

		am1 = new Adresse();
		am1.setStrasze("Maxstraße");
		am1.setPlz("01326");
		am1.setOrt("Dresden");

		am2 = new Adresse();
		am2.setStrasze("Mulstraße");
		am2.setPlz("01326");
		am2.setOrt("Dresden");

		List<Kontakt> l1 = new ArrayList<Kontakt>();
		Telefon k1 = new Telefon();
		k1.setTimestamp(new Date());
		k1.setTelefonnummer("987960786");
		Mail k2 = new Mail();
		k2.setMailAdresse("kbwf@jh.de");
		l1.add(k1);
		l1.add(k2);

		m1 = new Mitarbeiter();
		m1.setId(1);
		m1.setAdresse(am1);
		m1.setGeburtstag(new Date());
		m1.setName("Fred");
		m1.setKontakte(l1);

		m2 = new Mitarbeiter();
		m2.setId(2);
		m2.setAdresse(am1);
		m2.setGeburtstag(new Date());
		m2.setName("Max");
		m2.setKontakte(l1);

		FileOutputStream fos1 = new FileOutputStream("cs2016_1_3_jos/out.txt");
		FileOutputStream fos2 = new FileOutputStream("cs2016_1_3_jos/out.xml");
		ObjectOutputStream oos = new ObjectOutputStream(fos1);
		XMLEncoder enc = new XMLEncoder(fos2);

		oos.writeObject(m1);
		oos.writeObject(m2);

		enc.writeObject(m1);
		enc.writeObject(m2);

		oos.close();
		enc.close();
	}
}
