const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      let current = this.rootNode;

      while (current) {
        if (data < current.data) {
          if (current.left) {
            current = current.left;
          } else {
            current.left = newNode;

            return ;
          }
        } else {
          if (current.right) {
            current = current.right;
          } else {
            current.right = newNode;

            return;
          }
        }
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let current = this.rootNode;

    while (current) {
      if (current.data === data) {
        return current;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  remove(data) {
    let current = this.rootNode;
    let prev;
    let isLastChoiceLeft;

    while (current) {
      if (current.data === data) {
        if (!current.left && !current.right){
          if (isLastChoiceLeft) {
            prev.left = null;
          } else {
            prev.right = null;
          }
        } else if (current.left && !current.right) {
          if (isLastChoiceLeft) {
            prev.left = current.left;
          } else {
            prev.right = current.left;
          }
        } else if (current.right && !current.left) {
          if (isLastChoiceLeft) {
            prev.left = current.right;
          } else {
            prev.right = current.right;
          }
        } else {
          if (!current.right.left) {
            current.data = current.right.data;
            current.right = current.right.right;
          } else {
            let leftChild = current.right.left;
            let prevLeft = current.right.left;

            while (leftChild.left) {
              prevLeft = leftChild;
              leftChild = leftChild.left;
            }

            current.data = leftChild.data;
            prevLeft.left = null;
          }
        }
        return ;
      }
      prev = current;
      if (data < current.data) {
        current = current.left;
        isLastChoiceLeft = true;
      } else {
        current = current.right;
        isLastChoiceLeft = false;
      }
    }

    return ;
  }

  min() {
    let current = this.rootNode;

    while (current.left) {
      current = current.left;
    }

    return current.data;
  }

  max() {
    let current = this.rootNode;

    while (current.right) {
      current = current.right;
    }

    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};