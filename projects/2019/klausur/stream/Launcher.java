package stream;

import java.io.*;

class UpCaseWriter extends FilterWriter {

	protected UpCaseWriter(Writer out) {

		super(out);
	}
	
	@Override
	public void write(int c) throws IOException {

		super.write(Character.toUpperCase(c));
	}
	
	@Override
	public void write(char[] cbuf, int off, int len) throws IOException {

		for (int i = 0; i < len; i++) {
			
			write(cbuf[off + i]);
		}
	}
	
	@Override
	public void write(String str, int off, int len) throws IOException {

		write(str.toCharArray(), off, len);
	}
}

public class Launcher {

	public static void main(String[] args) throws Exception {
		
		String s = "Dies ist ein Test";
		
		FileWriter fw = new FileWriter("stream/test.txt");
		UpCaseWriter ucw = new UpCaseWriter(fw);
		PrintWriter pw = new PrintWriter(ucw);
		
		pw.println(s);
		pw.close();
	}
}
