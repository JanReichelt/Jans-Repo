package cs2015_5_reflexion;

import java.awt.Point;
import java.lang.reflect.*;

public class Launcher {

	public static void main(String[] args) throws Exception {
		Point point = new Point();

		Class<?> c1 = Point.class;
		Class<?> c2 = point.getClass();
		Class<?> c3 = Class.forName("java.awt.Point");

		System.out.println(c1);
		System.out.println(c2);
		System.out.println(c3);

		System.out.println(c1.isInterface());

		System.out.println(c1.getSuperclass());
		Class<?>[] classArray = c1.getInterfaces();

		for (int i = 0; i < classArray.length; i++) {
			System.out.println(classArray[i].getName());
		}
		Point o1 = (Point) c1.newInstance();
		System.out.println("X: " + o1.x + "Y: " + o1.y);
		
		Class<Point> c = Point.class;
		Point p1 = c.newInstance();
		System.out.println("X: " + p1.x + "Y: " + p1.y);
		
		Constructor<Point> con = c.getConstructor();
		Point p2 = con.newInstance();
		System.out.println("X: " + p2.x + "Y: " + p2.y);
		
		Field field1 = c1.getField("x");
		
		field1.set(o1, 50);
		field1.setInt(o1, 60);
		
		System.out.println("X: " + o1.x);
		
	}
}
