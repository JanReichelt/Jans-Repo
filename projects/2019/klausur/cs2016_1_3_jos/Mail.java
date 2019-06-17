package cs2016_1_3_jos;

import java.io.*;

public class Mail extends Kontakt implements Serializable {

	private String mailAdresse = "";

	@Override
	public String getInformation() {
		return this.mailAdresse;
	}

	public String getMailAdresse() {
		return mailAdresse;
	}

	public void setMailAdresse(String mailAdresse) {
		this.mailAdresse = mailAdresse;
	}
}
