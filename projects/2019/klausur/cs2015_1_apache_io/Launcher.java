package cs2015_1_apache_io;

import java.io.*;
import java.util.List;

import org.apache.commons.io.FileSystemUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;

public class Launcher {

	public static void main(String[] args) throws IOException {
		File f = new File("cs2015_1_apache_io/gedicht.txt");
		List<String> lines = FileUtils.readLines(f);
		String path = "filesystem/nonsense/../gedicht.txt";
		path=FilenameUtils.normalize(path);
		System.out.println(path);
		for (String line : lines) {
			System.out.println(line.length());
		}
		
		System.out.println(FileSystemUtils.freeSpaceKb());
		
	}
}
