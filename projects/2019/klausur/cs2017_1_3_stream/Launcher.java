package cs2017_1_3_stream;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class Launcher {

	public static void main(String[] args) throws IOException {
		FileReader reader = null;
		BufferedReader breader = null;
		BufferedWriter bwriter = null;
		try {
			reader = new FileReader("cs2017_1_3_stream/in.txt");
			breader = new BufferedReader(reader);
			String s = null;
			FileWriter writer = new FileWriter("cs2017_1_3_stream/out.txt");
			bwriter = new BufferedWriter(writer);
			int i = 0;
			while (true) {
				s = breader.readLine();

				if (s == null) {
					break;
				}

				bwriter.write(i + s);
				bwriter.newLine();

				i++;

			}
			bwriter.write("And they all lived happily ever after." + "\n");
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			breader.close();
			bwriter.close();
		}
	}

}
