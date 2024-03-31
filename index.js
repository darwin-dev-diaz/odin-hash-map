import _ from "lodash";
import { createLinkedList, createNode } from "./linkedList.js";



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

  const set = (key, value) => {
    // adds a new entry into the hash table
    // if collision, appends the linked list
    // if a duplicate key, updates the value
    const bucketIndex = hash(key);
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

  const grow = () => {
    const entriesArr = entries();
    hashMap = generateHashMap(hashMap.length * 2);
    capacity = hashMap.length;
    entriesArr.forEach((entry) => {
      set(entry[0], entry[1]);
    });
    updateCurrentLoadPercentage();
    
  };

  const updateCurrentLoadPercentage = () => {
    currentLoadPercentage =
      hashMap.reduce((acc, l) => (l.size() > 0 ? acc + 1 : acc), 0) / capacity;
    // console.log({ currentLoadPercentage });
    if (currentLoadPercentage >= loadFactor) {
      grow();
    }
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
h.set("l", ""); // 75 percent load
h.set("m", "");
// h.updateCurrentLoadPercentage()
console.log(h.has("m"))
console.log(h.has("m"))
