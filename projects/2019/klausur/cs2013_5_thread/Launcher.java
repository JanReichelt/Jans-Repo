package cs2013_5_thread;

import java.util.Arrays;

public class Launcher {

	private static final int SIZE = 100000;

	public static void main(String[] args) {
		int[] a1 = new int[Launcher.SIZE];
		int[] a2 = new int[Launcher.SIZE];

		for (int i = 0; i < Launcher.SIZE; i++) {
			a1[i] = Launcher.SIZE - i - 1;
			a2[i] = a1[i];
		}
		long l1 = System.currentTimeMillis();
		ArraySort.bubbleSort(a1);
		long l2 = System.currentTimeMillis();
		// System.out.println(Arrays.toString(a1));
		System.out.println("Fertig! Benötigte Zeit: " + (l2 - l1));

		ArraySort.threadCount = 4;
		l1 = System.currentTimeMillis();
		ArraySort.parallelSort(a2);
		l2 = System.currentTimeMillis();
		// System.out.println(Arrays.toString(a2));
		System.out.println("Fertig! Benötigte Zeit: " + (l2 - l1));

		for (int i = 0; i < Launcher.SIZE; i++) {
			if ( a1[i] != a2[i]) {
				System.out.println("Fehler");
			}
		}
	}

}
