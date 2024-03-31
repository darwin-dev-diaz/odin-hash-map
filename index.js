import _ from "lodash";
import { createLinkedList, createNode } from "./linkedList.js";

const createHashMap = () => {
  const generateHashMap = (bucketSize) => {
    // create a list of variable size with an empty linkedList in each position
    const hashMap = [];
    for (let i = 0; i < bucketSize; i++) {
      hashMap.push(createLinkedList());
    }
    return hashMap;
  };
  const getHashMap = () => {
    // this function is for testing purposes
    return hashMap;
  };
  // set original hashMap to an array of size 16
  let hashMap = generateHashMap(16);

  let capacity = hashMap.length;
  let currentLoadPercentage = 0;
  const loadFactor = 0.75;

  const hash = (key) => {
    // the hash function we will use to turn keys into values
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

    // this makes sure that we don't access an index not within capacity
    const bucketIndex = hash(key);
    if (bucketIndex < 0 || bucketIndex >= hashMap.length) {
      throw new Error("Trying to access index out of bound");
    }
    
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
    
    // this makes sure that we don't access an index not within capacity
    const bucketIndex = hash(key);
    if (bucketIndex < 0 || bucketIndex >= hashMap.length) {
      throw new Error("Trying to access index out of bound");
    }

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
    // if the key is stored somewhere in our hashMap, return true
    // if the key is not stored somewhere in our hashMap, return false 

    // this makes sure that we don't access an index not within capacity
    const bucketIndex = hash(key);
    if (bucketIndex < 0 || bucketIndex >= hashMap.length) {
      throw new Error("Trying to access index out of bound");
    }
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
    // this function removes a key-pair in our hashMap
    // if the key is not found return false

    // this makes sure that we don't access an index not within capacity
    const bucketIndex = hash(key);
    if (bucketIndex < 0 || bucketIndex >= hashMap.length) {
      throw new Error("Trying to access index out of bound");
    }
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
    // return the total number of keys within our function

    let totalKeys = 0;
    hashMap.forEach((l) => (totalKeys += l.size()));
    return totalKeys;
  };

  const clear = () => {
    // resets our hashMap back to a clear hashMap of 16 buckets

    hashMap = generateHashMap(16);
    updateCurrentLoadPercentage();
  };

  const keys = () => {
    // returns all the keys in our hashmap as an array

    const keyArr = [];
    hashMap.forEach((l) => {
      for (let i = 0; i < l.size(); i++) {
        keyArr.push(l.at(i).value.key);
      }
    });
    return keyArr;
  };

  const values = () => {
    // returns the values of our hashMap in an array

    const valueArr = [];
    hashMap.forEach((l) => {
      for (let i = 0; i < l.size(); i++) {
        valueArr.push(l.at(i).value.value);
      }
    });
    return valueArr;
  };

  const entries = () => {
    // returns the entry pairs [key, values] in an array

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
    // doubles the size of our available buckets
    // updates our capacity
    // re-hashes all of our keys and sets the (keys, value) pairs back into our bigger hashMap
    // updates the currentLoadPercentage 
    // console.log("growing");
    const entriesArr = entries();
    hashMap = generateHashMap(hashMap.length * 2);
    capacity = hashMap.length;
    entriesArr.forEach((entry) => {
      set(entry[0], entry[1]);
    });
    updateCurrentLoadPercentage();
    
  };

  const updateCurrentLoadPercentage = () => {
    // updates current load percentage
    // if the current load is above our load factor,
    // grow our hashMap
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