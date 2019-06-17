package cs2013_4_sax;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.SAXParseException;
import org.xml.sax.helpers.DefaultHandler;

public class XMLHandler extends DefaultHandler {
	String aktuellesElement = "";
	int autorenAnzahl = 0;

	@Override
	public void startDocument() throws SAXException {
		super.startDocument();
		System.out.println("Anfang des Dokuments.");
	}

	@Override
	public void endDocument() throws SAXException {
		super.endDocument();
		System.out.println("Ende des Dokuments.");
	}

	@Override
	public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {

		super.startElement(uri, localName, qName, attributes);

		if (qName.equals("buch")) {
			System.out.println("Buch gefunden.");
		} else {
			this.aktuellesElement = qName;
		}
	}

	@Override
	public void endElement(String uri, String localName, String qName) throws SAXException {
		super.endElement(uri, localName, qName);
		if (qName.equals("buch")) {
			System.out.println("Buch zu Ende.");
			aktuellesElement = "";
			autorenAnzahl = 0;
		}
	}

	@Override
	public void characters(char[] ch, int start, int length) throws SAXException {
		super.characters(ch, start, length);
		String textinhalt = new String(ch, start, length);
		switch (this.aktuellesElement) {
		case "titel":
			System.out.println("Titel: " + textinhalt);
			break;
		case "isbn":
			System.out.println("ISBN: " + textinhalt);
			break;
		case "autor": 
			System.out.println("Auor: " + textinhalt);
			break;
		case "verlag":
			System.out.println("Verlag: " + textinhalt);
			break;
		default: 
			System.out.println("Unbekanntes Element");
			break;
		}
	}

	@Override
	public void error(SAXParseException e) throws SAXException {
		super.error(e);
		throw new SAXException("Fehler!" + e.getLineNumber() + e.getMessage());
	}
}
