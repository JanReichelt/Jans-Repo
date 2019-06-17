package cs2017_2_1_linked_list;

public class ListNode {
	
	Object data;
	ListNode next;

	public ListNode(Object data, ListNode next) {
		super();
		this.data = data;
		this.next = next;
	}
	
	public static boolean contains(ListNode n, Object o){
		boolean returnValue=false;
		while (true) {
			if(n==null){
				break;
			}
			System.out.println(n.data);
			if(n.data.equals(o)){
				returnValue=true;
				break;
			}
			n = n.next;
			
		}
		return returnValue;
		
		
	}
	
	

}
