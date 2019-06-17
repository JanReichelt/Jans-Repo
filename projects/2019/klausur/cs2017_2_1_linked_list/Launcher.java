package cs2017_2_1_linked_list;

public class Launcher {

	public static void main(String[] args) {
		ListNode n5 = new ListNode("n5", null);
		ListNode n4 = new ListNode("n4", n5);
		ListNode n3 = new ListNode("n3", n4);
		ListNode n2 = new ListNode("n2", n3);
		ListNode n1 = new ListNode("n1", n2);
		
		boolean b = ListNode.contains(n1, "n4");
		
		System.out.println(b);
	}

}
