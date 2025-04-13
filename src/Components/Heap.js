class Heap {
    constructor() {
      this.data = [];
      this.map = new Map();
    }
  
    add(item) {
      this.data.push(item);
      this.map.set(item, this.data.length - 1);
      this.upheapify(this.data.length - 1);
    }
  
    upheapify(ci) {
      if (ci === 0) return;
      let pi = Math.floor((ci - 1) / 2);
      if (this.isLarger(this.data[ci], this.data[pi]) > 0) {
        this.swap(pi, ci);
        this.upheapify(pi);
      }
    }
  
    swap(i, j) {
      let temp = this.data[i];
      this.data[i] = this.data[j];
      this.data[j] = temp;
      this.map.set(this.data[i], i);
      this.map.set(this.data[j], j);
    }
  
    size() {
      return this.data.length;
    }
  
    isEmpty() {
      return this.data.length === 0;
    }
  
    remove() {
      this.swap(0, this.data.length - 1);
      let removedValue = this.data.pop();
      this.downheapify(0);
      this.map.delete(removedValue);
      return removedValue;
    }
  
    downheapify(pi) {
      let lci = 2 * pi + 1;
      let rci = 2 * pi + 2;
      let mini = pi;
  
      if (lci < this.data.length && this.isLarger(this.data[lci], this.data[mini]) > 0) {
        mini = lci;
      }
  
      if (rci < this.data.length && this.isLarger(this.data[rci], this.data[mini]) > 0) {
        mini = rci;
      }
  
      if (mini !== pi) {
        this.swap(mini, pi);
        this.downheapify(mini);
      }
    }
  
    get() {
      return this.data[0];
    }
  
    isLarger(t, o) {
      return t.compareTo(o);
    }
  
    updatePriority(item) {
      let index = this.map.get(item);
      this.upheapify(index);
    }
}
  