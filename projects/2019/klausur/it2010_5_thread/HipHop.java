package it2010_5_thread;

public class HipHop extends Thread{
	
	String word;
	int delay;
	public static void main(String[] args) {
		HipHop a = new HipHop("Hip",500);
		HipHop b = new HipHop("Hop",500);
		
		a.start();
		b.start();
	}
	
	public HipHop(String word, int delay) {
		super();
		this.word = word;
		this.delay = delay;
	}

	@Override
	public void run() {
		while(true){
			try {
				System.out.println(this.word);
				Thread.sleep(this.delay);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
	
	

}
