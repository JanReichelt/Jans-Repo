package cs2016_2_3_stream;

import java.io.*;
import java.util.zip.*;

public class Launcher {

	public static void main(String[] args) throws Exception {

		String s = "ääääääääää bbbbbbbb cccccc";
		byte[] v = s.getBytes("UTF-8");
		int a = v.length;
		ByteArrayOutputStream out = new ByteArrayOutputStream(a);
		byte[] b = new byte[10];
		Deflater d = new Deflater();
		int n = 0; // The number of bytes of compressed data.

		System.out.println(s.length());
		System.out.println(a);

		d.setInput(v);
		d.finish();

		while (!d.finished()) {

			n = d.deflate(b);
			out.write(b, 0, n);
		}
		
		System.out.println(out.size());

		byte[] c = out.toByteArray();
		Inflater i = new Inflater();
		i.setInput(c);
		
		while (!d.finished()) {
		
			n = i.inflate(b);
			out.write(b, 0, n);
		}

		System.out.println(out.size());
		byte[] z = out.toByteArray();
		String string = z.toString();
		System.out.println(string.length());

		out.close();
	}
}
