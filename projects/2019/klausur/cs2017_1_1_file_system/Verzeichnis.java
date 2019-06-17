package cs2017_1_1_file_system;

import java.io.*;

public class Verzeichnis {

	public static void main(String[] args) {

		File f = new File("blu/bla/testdir/");
		f.mkdirs();

		if (!f.exists()) {
			System.out.println("Fehler: Pfad nicht gefunden!");

		} else {
			System.out.println(f.getAbsolutePath());
			File d = new File("blu/bla/testdir/test.txt");
			try {
				d.createNewFile();
			} catch (IOException e) {
				System.out.println("Fehler");
			}
			File e = new File("blu/bla/testdir/neuedatei.txt");
			d.renameTo(e);
		}
		
	}

}
