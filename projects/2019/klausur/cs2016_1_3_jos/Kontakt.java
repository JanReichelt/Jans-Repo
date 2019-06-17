package cs2016_1_3_jos;

import java.util.*;

public abstract class Kontakt {
	
	private Date timestamp;

	public abstract String getInformation();
	
	public Date getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}
}
