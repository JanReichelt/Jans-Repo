package cs2016_2_5_formatting;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Currency;
import java.util.Locale;
import java.util.Set;

public class Launcher {
	public static void main(String[] args) {
		Set<Currency> currencies = Currency.getAvailableCurrencies();
		for (Currency c : currencies) {
			System.out.println(c.getDisplayName() + " - " + c.getNumericCode() + " - " + c.getSymbol());
		}

		NumberFormat g = DecimalFormat.getCurrencyInstance(Locale.GERMANY);
		System.out.println(g.format(12345.6789));
	}
}
