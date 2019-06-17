package cs2013_5_thread;

import java.util.Date;

public class ArraySort {

    // Die Anzahl der Threads.
    public static int threadCount = 1;

    public static void parallelSort(int[] a) {
    	
    	Thread[] sortThreads = new Thread[ArraySort.threadCount];
    	
    	int[][] parts = ArraySort.splitArray(a, ArraySort.threadCount);
    	
    	for (int i = 0; i < ArraySort.threadCount; i++) {
			
    		SortRunnable sr = new SortRunnable(parts[i]);
    		
    		sortThreads[i] = new Thread(sr);
    		
		}
    	
    	for (Thread t1: sortThreads) {
			t1.start();
		}
    	
    	for (Thread t2: sortThreads) {
			try {
				t2.join();
			} catch (InterruptedException e) {
				System.out.println("Fehler beim Threads.join()");
			}
		}
    	
    	ArraySort.mergeArray(a, parts);
    	
    }

    //
    // Vorgegebene Methoden
    //

    public static void bubbleSort(int[] a) {

        System.out.println("Start bubbleSort() in Thread \"" + Thread.currentThread().getName() + "\" at: " + new Date());

        int i, j, t = 0, n = a.length;

        for (i = 0; i < n; i++) {

            for (j = 1; j < (n - i); j++) {

                if (a[j - 1] > a[j]) {

                    t = a[j - 1];
                    a[j - 1] = a[j];
                    a[j] = t;
                }
            }
        }

        System.out.println("Ende bubbleSort() in Thread \"" + Thread.currentThread().getName() + "\" at: " + new Date());
    }

    /**
     * Extrahiere Teilfelder aus einem Gesamtfeld.
     */
    private static int[][] splitArray(int[] a, int partCount) {

        int[][] result = new int[partCount][];
        int partLength = a.length / partCount;

        for (int partNo = 0; partNo < partCount; partNo++) {

            // Anfang und Ende des neuen Teilstückes berechnen.
            int idxStart = partNo * partLength;
            int idxEnd;

            if (partNo == (partCount - 1)) {

                // Das letzte Teilstück enthält alle Elemente bis zum Ende.
                idxEnd = a.length;

            } else {

                idxEnd = idxStart + partLength;
            }

            result[partNo] = new int[idxEnd - idxStart];

            // Elemente in das resultierende Teilstück übernehmen.
            for (int idx = idxStart; idx < idxEnd; idx++) {

                result[partNo][idx - idxStart] = a[idx];
            }
        }

        return result;
    }

    private static void mergeArray(int[] a, int[][] parts) {

        // Teilstücke zusammenführen.
        int[] arrSorted = new int[0];

        for (int[] part : parts) {

            arrSorted = ArraySort.mergeParts(arrSorted, part);
        }

        // Sortierung in das Ursprungs-Array übernehmen.
        for (int i = 0; i < a.length; i++) {

            a[i] = arrSorted[i];
        }
    }

    private static int[] mergeParts(int[] part1, int[] part2) {

        int[] result = new int[part1.length + part2.length];
        int i1 = 0, i2 = 0; // Indizes part1, part2

        for (int i = 0; i < result.length; i++) {

            if (i1 < part1.length) {

                if (i2 < part2.length) {

                    if (part1[i1] < part2[i2]) {

                        result[i] = part1[i1++];

                    } else {

                        result[i] = part2[i2++];
                    }

                } else {

                    // Ende von part2 -> Rest von part1 kopieren
                    result[i] = part1[i1++];
                }

            } else {

                // Ende von part1 -> Rest von part2 kopieren
                result[i] = part2[i2++];
            }
        }

        return result;
    }
}
