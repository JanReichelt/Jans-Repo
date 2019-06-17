package it2011_1_random_access_file;

import java.io.*;

public class Launcher {

	public static void main(String[] args) throws Exception {
		RandomAccessFile f = new RandomAccessFile("it2011_1_random_access_file/test.txt", "rw");

		f.writeUTF("Hallo");
		f.writeUTF("Welt");
		f.seek(7);
		String a = f.readUTF();
		f.seek(0);
		String b = f.readUTF();
		System.out.println(a);
		System.out.println(b);
		f.close();
	}
}
