/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  
  /** push(val): add new value to end of list. */

  push(val) {
    // Create new node with val
    let newNode = new Node(val);

    // Check if list is empty.
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else { // Insert at end O(1)
      this.tail.next = newNode
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length +=1;

  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    // Check if list is empty.
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length += 1;

  }

  /** pop(): return & remove last item. */

  pop() {
    // Check if list is empty.
    if (!this.head) {
        return "The list is empty: No Items to pop.";
    }

    let retNode = this.tail.val;
    if (this.length === 1) {
        // If there's only one node in the list.
        this.head = null;
        this.tail = null;
    } else {
        this.tail = this.tail.prev;
        this.tail.next = null; // Make sure to check if this.tail is null before accessing its properties.
    }
    this.length -= 1;
    return retNode;
}


  /** shift(): return & remove first item. */

  shift() {
    // Check if list is empty.
    if (!this.head) {
        return undefined; // Or throw an error, depending on your requirements.
    }

    let retNode = this.head.val;
    if (this.length === 1) {
        // If there's only one node in the list.
        this.head = null;
        this.tail = null;
    } else {
        this.head = this.head.next;
        this.head.prev = null; // Make sure to update the prev pointer of the new head.
    }
    this.length -= 1;
    return retNode;
}


  /** getAt(idx): get val at idx. */

  getAt(idx) {
    let temp = this.head;
    let currIdx = 0;
    // Check if index is in linked list.
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index: Index not in list.")
    } 
    while (currIdx != idx) {
      temp = temp.next;
      currIdx +=1;
    }
    return temp.val;    
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let temp = this.head;
    let currIdx = 0;
    // Check if index is in linked list.
    if (idx > this.length || idx < 0) {
      throw new Error("Invalid index: Index not in list.")
    } 
    while (currIdx != idx) {
      temp = temp.next;
      currIdx +=1;
    }
    temp.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    // Create a new node with the given value.
    let newNode = new Node(val);

    // Initialize variables.
    let temp = this.head;
    let currIdx = 0;
    let prevNode = null;

    // Check if index is out of bounds.
    if (idx < 0 || idx > this.length) {
        throw new Error("Invalid index: Index not in list.");
    }

    // Traverse the list to find the correct position.
    while (currIdx < idx) {
        prevNode = temp;
        temp = temp.next;
        currIdx++;
    }

    // Link the new node between prevNode and temp.
    if (prevNode) {
        prevNode.next = newNode;
        newNode.prev = prevNode;
    } else {
        // Inserting at the beginning of the list.
        this.head = newNode;
    }

    newNode.next = temp;
    if (temp) {
        temp.prev = newNode;
    } else {
        // Inserting at the end of the list.
        this.tail = newNode;
    }

    // Increment the length of the list.
    this.length++;
}

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx < 0 || idx >= this.length) {
        throw new Error("Invalid index: Index out of bounds.");
    }

    let temp = this.head;

    // If removing the only node in the list
    if (this.length === 1) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        return temp.val;
    }

    let currIdx = 0;

    // Traverse the list to find the node at the given index
    while (currIdx < idx) {
        temp = temp.next;
        currIdx++;
    }

    // Once node is found, make the previous and next point to each other
    let prevNode = temp.prev;
    let nextNode = temp.next;

    // If the node is at the head of the list
    if (!prevNode) {
        this.head = nextNode;
    } else {
        prevNode.next = nextNode;
    }

    // If the node is at the tail of the list
    if (!nextNode) {
        this.tail = prevNode;
    } else {
        nextNode.prev = prevNode;
    }

    // Disconnecting temp from the linked list and then returning its value
    this.length--;
    return temp.val;
}


  /** average(): return an average of all values in the list */

  average() {
    let sum = 0;
    if (this.length === 0) {
        return 0; // Return 0 if the list is empty.
    } else {
        let temp = this.head;
        while (temp != null) {
            sum += temp.val;
            temp = temp.next;
        }
        return sum / this.length;
    }
  }

}

module.exports = LinkedList;


/** 
 ## **Further Study**

### **Doubly Linked Lists**

Doubly Linked Lists are just like Singly Linked Lists, but each node has a pointer to the previous node as well as the next one. Implement a class for ***DoublyLinkedList*** with the same methods as above (be mindful of opportunities to speed up your code now that each node has two pointers!)

### **Reverse In Place**

Write a function that reverses a linked list *in place* — not by creating a new list or new nodes.

### **Sort Sorted Linked Lists**

Write a function that is passed two linked lists, ***a*** and ***b***, both of which are already sorted.

It should return a *new* linked list, in sorted order.

### **Pivot Around Value**

Imagine we have a singly-linked linked list:
  __       __       __       __       __       __       __
 |7| ---> |6| ---> |2| ---> |3| ---> |9| ---> |1| ---> |1| ---> NULL                                        
 --       --       --       --       --       --       --

In this challenge, you’ll be given a value and you want to rearrange the items in the linked 
list so that all items with data less than the given value are in the first half, and items 
with greater than or equal to the given value are in the second half.

For example, for the value 5:

  __       __       __       __       __       __       __
 |2| ---> |3| ---> |1| ---> |1| ---> |7| ---> |6| ---> |9| ---> NULL                                        
 --       --       --       --       --       --       --

Notice that this list isn’t sorted; all we need to do is “pivot” it around the given value. Otherwise, items are still in the same order as they were (7 came before 6 in the original list, so it still does — but both of them are greater than 5, so they appear in the second half).
For example:
--------------------------------------------------------
let ll = new LinkedList([7, 6, 2, 3, 9, 1, 1])

ll.pivot(5)

// now list is 2 3 1 1 7 6 9
​---------------------------------------------------------
If the given pivot value is in the list, it should appear in the second half (with other greater-than-or-equal-to values):
---------------------------------------------------------
let ll = new LinkedList([7, 6, 2, 5, 3, 5, 9, 1, 1])

ll.pivot(5)

//  now list is 2 3 1 1 7 6 5 5 9
----------------------------------------------------------


Circular Arrays
In this challenge, you will create a “circular array” — like a list ADT but the end wraps around to the beginning (which makes for some interesting problems).
A circular array is defined by having a start and indexes (be sure to think about optimizing runtime for indexing, since we’ll do this so much more often than adding items to it):

-----------------------------------------------------------
let circ = new CircularArray()
circ.addItem('harry')
circ.addItem('hermione')
circ.addItem('ginny')
circ.addItem('ron')

circ.printArray()
// harry
// hermione
// ginny
// ron

circ.getByIndex(2)  // ginny
circ.getByIndex(15) // null
------------------------------------------------------------

Because the last item circles back around to the first item, you can rotate the list and shift the indexes. Positive numbers rotate the list start (defined as the index 0) to the right (or higher indexes):
------------------------------------------------------------
let circ = new CircularArray()
circ.addItem('harry')
circ.addItem('hermione')
circ.addItem('ginny')
circ.addItem('ron')

circ.rotate(1)
circ.printArray()
// hermione
// ginny
// ron
// harry

circ.getByIndex(2)  // ron
------------------------------------------------------------

And negative numbers rotate the list start to the left (or lower indexes):
------------------------------------------------------------

let circ = new CircularArray()
circ.addItem('harry')
circ.addItem('hermione')
circ.addItem('ginny')
circ.addItem('ron')

circ.rotate(-1)
circ.printArray()
// ron
// harry
// hermione
// ginny

circ.getByIndex(2)  // hermione
------------------------------------------------------------

And you can also rotate more than once around the ring:

------------------------------------------------------------
let circ = new CircularArray()
circ.addItem('harry')
circ.addItem('hermione')
circ.addItem('ginny')
circ.addItem('ron')

circ.rotate(-17)
circ.getByIndex(1)  // harry
------------------------------------------------------------

If you add a new item after rotating, it should go at the end of the list in its current rotation:

------------------------------------------------------------
let circ = new CircularArray()
circ.addItem('harry')
circ.addItem('hermione')
circ.addItem('ginny')
circ.addItem('ron')

circ.rotate(-2)
circ.addItem('dobby')

circ.printArray()
// ginny
// ron
// harry
// hermione
// dobby
------------------------------------------------------------

**Data Structure**

Think about the data structure you’d want to use to store the items.

While it’s tempting to use something like a Linked List, the runtime to find an item by index in a linked list is ***O(n)***.

You can use a standard array to store the items, but you’ll need to think about how to keep track of the head and handle rotations.
 */