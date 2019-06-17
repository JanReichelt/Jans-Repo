package cs2012_5_dom;

import java.io.File;
import java.util.Iterator;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class Launcher {

	public static void main(String[] args) throws Exception {
		File file = new File("cs2012_5_dom/addressbook.xml");

		SAXReader reader = new SAXReader();
		Document document = reader.read(file);

		Element root = document.getRootElement();
		Iterator<Element> i1 = root.elementIterator();
		Iterator<Element> i2 = null;
		Element e1 = null;
		Element e2 = null;
		int a = 0;
		int b = 0;

		while (i1.hasNext()) {
			e1 = i1.next();
			System.out.println(e1.getName());
			System.out.println(e1.attributeValue("id"));
			i2 = e1.elementIterator();
			a++;

			while (i2.hasNext()) {
				e2 = i2.next();
				System.out.print(e2.getName());
				System.out.println(" " + e2.getText());
				if (e2.getName().equals("country") ) {
					if (e2.getText().equals("Märchenland")) {
						b++;
					}
				}
			}
		}
		System.out.println(a);
		System.out.println(b);
	}

}
