package cs2017_1_5_reflexion;

import java.lang.reflect.*;

public class Launcher {

	public static void main(String[] args) throws Exception {
		Class<?> test = Class.forName("cs2017_1_5_reflexion.Test");

		Test t = (Test) test.newInstance();
		
		Method m = test.getDeclaredMethod("m1");
		//t.m1();
		
		Object o = m.invoke(t);
		System.out.println(o);
	}

}
