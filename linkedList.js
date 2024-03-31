function createLinkedList() {
  let linkedList = { head: {} };
  const getLinkedList = () => {
    return linkedList;
  };

  const appendNode = (value) => {
    if (Object.values(linkedList.head).length === 0) {
      Object.assign(linkedList.head, createNode(value));
    } else {
      let currentNode = linkedList.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = createNode(value);
    }
  };

  const prependNode = (value) => {
    if (Object.values(linkedList.head).length === 0) {
      Object.assign(linkedList.head, createNode(value));
    } else {
      linkedList.head = createNode(value, linkedList.head);
    }
  };

  const size = () => {
    if (Object.values(linkedList.head).length === 0) return 0;

    let counter = 1;
    let currentNode = linkedList.head;
    while (currentNode.next) {
      counter++;
      currentNode = currentNode.next;
    }
    return counter;
  };

  const head = () => {
    return linkedList.head;
  };

  const tail = () => {
    let currentNode = linkedList.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    return currentNode;
  };
  const at = (index) => {
    let currentNode = linkedList.head;
    while (index > 0) {
      currentNode = currentNode.next;
      index--;
      if (!currentNode) return null;
    }
    return currentNode;
  };

  const pop = () => {
    if (!linkedList.head.next) {
      linkedList = {};
    } else {
      let currentNode = linkedList.head;
      while (currentNode.next.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = null;
    }
  };

  const contains = (value) => {
    let currentNode = linkedList.head;
    while (true) {
      if (typeof value === "object" && _.isEqual(value, currentNode.value))
        return true;
      else if (currentNode.value === value) return true;
      if (!currentNode.next) break;
      currentNode = currentNode.next;
    }
    return false;
  };
  const find = (value) => {
    let currentNode = linkedList.head;
    let index = 0;
    while (true) {
      if (typeof value === "object" && _.isEqual(value, currentNode.value))
        return index;
      else if (currentNode.value === value) return index;
      if (!currentNode.next) break;
      currentNode = currentNode.next;
      index++;
    }
    return null;
  };
  const toString = () => {
    if (Object.values(linkedList.head).length === 0) {
      return "head ->";
    }
    let currentNode = linkedList.head;
    let returnString = "head -> ";
    while (true) {
      returnString = returnString + `( ${currentNode.value} ) -> `;
      if (!currentNode.next) break;
      currentNode = currentNode.next;
    }
    return returnString + "null";
  };

  const insertAt = (value, index) => {
    try {
      let currIndex = 0;
      let previousNode = null;
      let currentNode = linkedList.head;
      while (currIndex < index) {
        previousNode = currentNode;
        currentNode = currentNode.next;
        currIndex++;
      }

      if (previousNode) {
        previousNode.next = createNode(value, currentNode);
      } else {
        linkedList.head = createNode(value, linkedList.head);
      }
    } catch {
      console.log("Error: Invalid index");
      return;
    }
  };

  const removeAt = (index) => {
    if (size() === 1) {
      linkedList = { head: {} };
    } else {
      try {
        let currIndex = 0;
        let previousNode = null;
        let currentNode = linkedList.head;
        let afterNode = currentNode.next;
        while (currIndex < index) {
          previousNode = currentNode;
          currentNode = currentNode.next;
          afterNode = currentNode.next;
          currIndex++;
        }
        if (!previousNode) {
          if (afterNode) linkedList.head = afterNode;
          else linkedList = {};
        } else {
          previousNode.next = afterNode;
        }
      } catch {
        console.log("Error: Invalid index for removeAt() function");
      }
    }
  };

  return {
    getLinkedList,
    appendNode,
    prependNode,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}

function createNode(value = null, next = null) {
  return { value, next };
}

export {createLinkedList, createNode}