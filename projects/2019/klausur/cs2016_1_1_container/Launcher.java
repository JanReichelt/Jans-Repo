package cs2016_1_1_container;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;
import java.util.TreeMap;

public class Launcher {

	public static void main(String[] args) throws FileNotFoundException {

		File f = new File("cs2016_1_1_container/gpl.txt");
		Scanner sc = new Scanner(f);
		TreeMap<String, Integer> treemap = new TreeMap();
		String wort = null;
		
		sc.useDelimiter("[^a-zA-Z']+");

		while (sc.hasNext()) {
			wort = sc.next();
			if (treemap.containsKey(wort)) {
				// System.out.println("Vorhanden");
				treemap.put(wort, treemap.get(wort) + 1);
			} else {
				treemap.put(wort, 1);
			}

		}
		sc.close();
		for (String s : treemap.keySet()) {
			System.out.print(s + "\t");
			System.out.println(treemap.get(s));

		}
		System.out.println(treemap.size());
	}

}
