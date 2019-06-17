package cs2013_5_thread;

public class SortRunnable implements Runnable {

    private int[] part;

    public SortRunnable(int[] a) {

        this.part = a;
    }

    public void run() {

        // Sortiere das eigene Teilfeld sequentiell.
        ArraySort.bubbleSort(this.part);
    }
}
