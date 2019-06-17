package cs2013_4_sax;

import javax.xml.parsers.*;

public class Launcher {

	public static void main(String[] args) throws Exception {
		
		
		SAXParserFactory f = SAXParserFactory.newInstance();
		f.setValidating(true);
		SAXParser p = f.newSAXParser();
		XMLHandler x = new XMLHandler();
//		p.parse("cs2013_4_sax/buecher.xml", x);
		p.parse("cs2013_4_sax/buecher_non-valid.xml", x);
		

	}
}
