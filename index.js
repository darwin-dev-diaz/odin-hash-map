import _ from "lodash";

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

// alright from what i understand, a hash map is an array of linked list.
// this hash map will only deal with text values

const createHashMap = () => {
  // create a list of variable size with an empty linkedList in each position
  const generateHashMap = (bucketSize) => {
    const hashMap = [];
    for (let i = 0; i < bucketSize; i++) {
      hashMap.push(createLinkedList());
    }
    return hashMap;
  };
  const getHashMap = () => {
    return hashMap;
  };
  // set original hashMap to an array of size 16
  let hashMap = generateHashMap(16);

  let capacity = hashMap.length;
  let currentLoadPercentage = 0;
  const loadFactor = 0.75;

  // the hash function we will use to turn keys into values
  const hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % hashMap.length;
    }
    return hashCode;
  };

  const grow = () => {
    console.log("Growing");
  };

  const updateCurrentLoadPercentage = () => {
    currentLoadPercentage =
      hashMap.reduce((acc, l) => (l.size() > 0 ? acc + 1 : acc), 0) / capacity;
    console.log(currentLoadPercentage);
    if (currentLoadPercentage >= loadFactor) {
      grow();
    }
  };

  const set = (key, value) => {
    // adds a new entry into the hash table
    // if collision, appends the linked list
    // if a duplicate key, updates the value
    const bucketIndex = hash(key);
    console.log({ bucketIndex });
    if (hashMap[bucketIndex].size() > 0) {
      for (let i = 0; i < hashMap[bucketIndex].size(); i++) {
        if (hashMap[bucketIndex].at(i).value.key === key) {
          hashMap[bucketIndex].at(i).value.value = value;
          return;
        }
      }
    }
    hashMap[bucketIndex].appendNode({ key, value });
    updateCurrentLoadPercentage();
  };

  const get = (key) => {
    // takes a key and returns the value assigned to this key
    // if no key is found, return null
    const bucketIndex = hash(key);
    if (hashMap[bucketIndex].size() > 0) {
      for (let i = 0; i < hashMap[bucketIndex].size(); i++) {
        if (hashMap[bucketIndex].at(i).value.key === key) {
          return hashMap[bucketIndex].at(i).value.value;
        }
      }
    }

    return null;
  };

  const has = (key) => {
    const bucketIndex = hash(key);
    if (hashMap[bucketIndex].size() > 0) {
      for (let i = 0; i < hashMap[bucketIndex].size(); i++) {
        if (hashMap[bucketIndex].at(i).value.key === key) {
          return true;
        }
      }
    }

    return false;
  };

  const remove = (key) => {
    const bucketIndex = hash(key);
    if (hashMap[bucketIndex].size() > 0) {
      for (let i = 0; i < hashMap[bucketIndex].size(); i++) {
        if (hashMap[bucketIndex].at(i).value.key === key) {
          hashMap[bucketIndex].removeAt(i);
          updateCurrentLoadPercentage();
          return true;
        }
      }
    }

    return false;
  };

  const length = () => {
    let totalKeys = 0;
    hashMap.forEach((l) => (totalKeys += l.size()));
    return totalKeys;
  };

  const clear = () => {
    hashMap = generateHashMap(16);
    updateCurrentLoadPercentage();
  };

  const keys = () => {
    const keyArr = [];
    hashMap.forEach((l) => {
      for (let i = 0; i < l.size(); i++) {
        keyArr.push(l.at(i).value.key);
      }
    });
    return keyArr;
  };

  const values = () => {
    const valueArr = [];
    hashMap.forEach((l) => {
      for (let i = 0; i < l.size(); i++) {
        valueArr.push(l.at(i).value.value);
      }
    });
    return valueArr;
  };

  const entries = () => {
    const entriesArr = [];
    hashMap.forEach((l) => {
      for (let i = 0; i < l.size(); i++) {
        const pushArr = [];
        pushArr.push(l.at(i).value.key);
        pushArr.push(l.at(i).value.value);
        entriesArr.push(pushArr);
      }
    });
    return entriesArr;
  };

  return {
    getHashMap,
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
    updateCurrentLoadPercentage,
  };
};

const h = createHashMap();
h.set("a", "");
h.set("b", "");
h.set("c", "");
h.set("d", "");
h.set("e", "");
h.set("f", "");
h.set("g", "");
h.set("h", "");
h.set("i", "");
h.set("j", "");
h.set("k", "");
h.set("l", "");
h.set("m", "");
h.set("n", "");
h.set("o", "");
h.set("p", ""); // capacity is 16 at 100 percent load
// h.set("r", "");
// h.set("s", "");
// h.set("t", "");
// h.set("u", "");
// h.set("v", "");
// h.set("w", "");
// h.updateCurrentLoadPercentage();
