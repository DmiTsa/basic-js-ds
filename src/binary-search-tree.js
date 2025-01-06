const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

class BinarySearchTree {
  constructor() {
    this.rootValue = null
  }

  root() {
    return this.rootValue
  }

  add(data) {
    this.rootValue = insertData(this.rootValue, data)

    function insertData(node, value) {
      if (!node) {
        return new Node(value)
      }

      if (value === node.data) {
        return node
      }

      if (value < node.data) {
        node.left = insertData(node.left, value)
      } else {
        node.right = insertData(node.right, value)
      }

      return node
    }
  }

  has(data) {
    return searchData(this.rootValue, data)

    function searchData(node, value) {
      if (!node) {
        return false
      }

      if (value === node.data) {
        return true
      }

      return value < node.data
        ? searchData(node.left, data)
        : searchData(node.right, data)
    }
  }

  find(data) {
    return getData(this.rootValue, data)

    function getData(node, value) {
      if (!node) {
        return null
      }

      if (value === node.data) {
        return node
      }

      return value < node.data
        ? getData(node.left, data)
        : getData(node.right, data)
    }
  }

  remove(data) {
    this.rootValue = removeNode(this.rootValue, data)

    function removeNode(node, value) {
      if (!node) {
        return null
      }

      if (value < node.data) {
        node.left = removeNode(node.left, data)
        return node
      } else if (value > node.data) {
        node.right = removeNode(node.right, data)
        return node
      } else {
        if (!node.left) {
          node = node.right
          return node
        }

        if (!node.right) {
          node = node.left
          return node
        }

        let minRightBranch = node.right
        while (minRightBranch.left) {
          minRightBranch = minRightBranch.left
        }
        node.data = minRightBranch.data

        node.right = removeNode(node.right, minRightBranch.data)

        return node
      }
    }
  }

  min() {
    if (!this.rootValue) {
      return;
    }

    let node = this.rootValue
    while (node.left) {
      node = node.left
    }

    return node.data
  }

  max() {
    if (!this.rootValue) {
      return;
    }

    let node = this.rootValue
    while (node.right) {
      node = node.right
    }

    return node.data
  }
}

module.exports = {
  BinarySearchTree
};

// const tree = new BinarySearchTree()

// tree.add(10)
// tree.add(10)
// tree.add(5)
// tree.add(20)
// tree.add(12)

// tree.remove(20)
//root
// console.log(tree.root())

//find
// console.log(tree.find(10))
// console.log(tree.find(100))

//has
// console.log(
//   tree.has(4),
//   tree.has(5),
//   tree.has(20),
//   tree.has(10),
// );

// console.log(tree.min());
// console.log(tree.max());
