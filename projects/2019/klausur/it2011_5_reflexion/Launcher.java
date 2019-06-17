package it2011_5_reflexion;

import java.awt.*;
import java.lang.reflect.*;
import java.util.*;

public class Launcher {

	public static void main(String[] args) throws Exception {

		// Klausur IT 2011, Aufgabe 5
		
		Object o1 = "Meta Programmierung"; 
		Object o2 = new Date();
		Object o3 = 5;
		Object o4 = true;
		Object o5 = new Point(1, 2);

		Class<?> c1 = o1.getClass();
		Class<?> c2 = o2.getClass();
		Class<?> c3 = o3.getClass();
		Class<?> c4 = o4.getClass();
		Class<?> c5 = o5.getClass();

		System.out.println(c1.getName() + ": " + o1);
		System.out.println(c2.getName() + ": " + o2);
		System.out.println(c3.getName() + ": " + o3);
		System.out.println(c4.getName() + ": " + o4);
		System.out.println(c5.getName() + ": " + o5);
		
		System.out.println("\nEigenschaften:");
		Field[] fields1 = c1.getDeclaredFields();
		Field[] fields2 = c2.getDeclaredFields();
		Field[] fields3 = c3.getDeclaredFields();
		Field[] fields4 = c4.getDeclaredFields();
		Field[] fields5 = c5.getDeclaredFields();
		
		for (Field f : fields1) {
			System.out.println(f.getName());
		}
		for (Field f : fields2) {
			System.out.println(f.getName());
		}
		for (Field f : fields3) {
			System.out.println(f.getName());
		}
		for (Field f : fields4) {
			System.out.println(f.getName());
		}
		for (Field f : fields5) {
			System.out.println(f.getName());
		}
		
		System.out.println("\nKonstruktoren:");
		Constructor<?>[] constructors = c5.getConstructors();
		
		for (Constructor<?> c : constructors) {
			System.out.println(c);
		}
		
		System.out.println("\nMethodenaufruf:");
		
		Method m1 = c5.getMethod("getX");
		Method m2 = c5.getMethod("getY");
		
		Double x = (Double) m1.invoke(o5);
		Double y = (Double) m2.invoke(o5);
		
		System.out.println("X: " + x + " Y: " + y);
		
		System.out.println("\nÄndern von Eigenschaften:");

		Field ax = c5.getDeclaredField("x");
		Field ay = c5.getDeclaredField("y");
		
		System.out.println("Vor Änderung: " + o5.toString());
		ax.set(o5, 40);
		ay.set(o5, 30);
		System.out.println("Nach Änderung: " + o5.toString());
	}
}
