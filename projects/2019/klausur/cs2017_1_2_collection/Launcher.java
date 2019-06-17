package cs2017_1_2_collection;

import java.util.*;

public class Launcher {
	public static void main(String[] args) {
		System.out.println("Startup");
		Map<String, Double> cont = new Hashtable<String, Double>();
		Random rnd = new Random();
		for (int i = 0; i < 10; i++) {
			cont.put("entry" + i , rnd.nextDouble());
		}
		Set<String> s = cont.keySet();
		Iterator<String> iter = s.iterator();
		String s2 = null;
		while (iter.hasNext()) {
			s2 = iter.next();
			if (s2.equals("entry7")) {
				System.out.println("Found entry 7");
			}
		}
		cont.remove("entry8");
		System.out.println(cont.size());
		System.out.println(cont.toString());
		System.out.println(cont.values());
		System.out.println("Shutdown");
	}
}
