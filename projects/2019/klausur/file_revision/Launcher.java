package file_revision;

import java.io.*;

public class Launcher {

	public static File search(File d, String n, File r) {
		
		if (d.exists() == true) {

			File[] files = d.listFiles();
			String fn = null;
			
			for (File f : files) {
				
				if (r != null) {
					
					break;
				}
				
				System.out.println(f);
				
				if (f.isDirectory() == true) {
					
					r = Launcher.search(f, n, r);
					
				} else {

					fn = f.getName();
					
					if (fn != null) {
						
						if (fn.equals(n)) {
							
							r = f;
						}
					
					} else {
					
						System.out.println("Fehler: Dateiname ist null.");
					}
				}
			}
			
		} else {
			
			System.out.println("Fehler: Verzeichnis existiert nicht.");
		}
		
		return r;
	}

	public static void main(String[] args) {

		File d = new File("/export/home/staff/cheller2/project/cybop/");
		String n = new String("cyboi.c");
		File f = Launcher.search(d, n, null);

		if (f != null) {

			System.out.println("Datei gefunden unter: " + f.getAbsolutePath());
		}
	}
}
