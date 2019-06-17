package cs2016_1_3_jos;

import java.beans.*;
import java.io.*;

public class Decoder {

	public static void main(String[] args) throws Exception {
	
		FileInputStream fis1 = new FileInputStream("cs2016_1_3_jos/out.txt");
		FileInputStream fis2 = new FileInputStream("cs2016_1_3_jos/out.xml");
		ObjectInputStream ois1 = new ObjectInputStream(fis1);
		XMLDecoder ois2 = new XMLDecoder(fis2);
		
		try {
			
			while (true) {
				
				Mitarbeiter m1 = (Mitarbeiter) ois1.readObject();
				System.out.println(m1.getAdresse().getOrt());
			}
			
		} catch (EOFException e) {
			
			ois1.close();
		}
		
		try {
	
			while (true) {
				
				Mitarbeiter m2 = (Mitarbeiter) ois2.readObject();
				System.out.println(m2.getAdresse().getOrt());
			}
			
		} catch (ArrayIndexOutOfBoundsException e) {
			
			ois2.close();
		}
	}
}
