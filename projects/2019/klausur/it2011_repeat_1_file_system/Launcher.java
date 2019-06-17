package it2011_repeat_1_file_system;

import java.io.File;

public class Launcher {

	public static void main(String[] args) {
		File f = new File("/etc");
		File[] l = f.listFiles();
		if (f.exists()) {

			for (File file : l) {
				if (file.isFile()) {
					System.out.println("Datei: " + file.getName());
				} else {
					System.out.println("Verzeichnis: " + file.getName());
				}
				if (file.isHidden()) {
					System.out.println("Versteckt: " + file.getName());
				}
				if (file.canWrite()) {
					System.out.println("Schreibbar: " + file.getName());
				}
				if (file.canRead()) {
					System.out.println("Lesbar: " + file.getName());
				}
				if (file.canExecute()) {
					System.out.println("Ausfuehrbar: " + file.getName());
				}
				
				
				
			}
			System.out.println(l.length);
			System.out.println(f.getFreeSpace());

		}
	}
}
