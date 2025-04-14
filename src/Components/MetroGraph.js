// MetroGraph.js
class MetroGraph {
    constructor() {
      this.vtces = new Map();
    }
  
    addVertex(vname) {
      this.vtces.set(vname, { nbrs: new Map() });
    }
  
    addEdge(vname1, vname2, value) {
      const vtx1 = this.vtces.get(vname1);
      const vtx2 = this.vtces.get(vname2);
  
      if (!vtx1 || !vtx2 || vtx1.nbrs.has(vname2)) {
        return;
      }
  
      vtx1.nbrs.set(vname2, value);
      vtx2.nbrs.set(vname1, value);
    }
  
    hasPath(vname1, vname2, processed) {
      if (this.containsEdge(vname1, vname2)) {
        return true;
      }
  
      processed.set(vname1, true);
      const vtx = this.vtces.get(vname1);
      
      for (const [nbr] of vtx.nbrs) {
        if (!processed.has(nbr)) {
          if (this.hasPath(nbr, vname2, processed)) {
            return true;
          }
        }
      }
  
      return false;
    }
  
    containsEdge(vname1, vname2) {
      const vtx1 = this.vtces.get(vname1);
      const vtx2 = this.vtces.get(vname2);
      
      if (!vtx1 || !vtx2 || !vtx1.nbrs.has(vname2)) {
        return false;
      }
      return true;
    }
  
    containsVertex(vname) {
      return this.vtces.has(vname);
    }
  
    dijkstra(src, des, useTime) {
      let val = 0;
      const ans = [];
      const map = new Map();
      const heap = new Heap();
  
      for (const [key] of this.vtces) {
        const np = { 
          vname: key,
          psf: "",
          cost: Infinity 
        };
  
        if (key === src) {
          np.cost = 0;
          np.psf = key;
        }
  
        heap.add(np);
        map.set(key, np);
      }
  
      while (!heap.isEmpty()) {
        const rp = heap.remove();
        
        if (rp.vname === des) {
          val = rp.cost;
          break;
        }
        
        map.delete(rp.vname);
        ans.push(rp.vname);
        
        const v = this.vtces.get(rp.vname);
        for (const [nbr] of v.nbrs) {
          if (map.has(nbr)) {
            const oc = map.get(nbr).cost;
            const k = this.vtces.get(rp.vname);
            let nc;
            
            if (useTime) {
              nc = rp.cost + 120 + 40 * k.nbrs.get(nbr);
            } else {
              nc = rp.cost + k.nbrs.get(nbr);
            }
  
            if (nc < oc) {
              const gp = map.get(nbr);
              gp.psf = rp.psf + " " + nbr;
              gp.cost = nc;
              heap.updatePriority(gp);
            }
          }
        }
      }
      return val;
    }
  
    getMinimumDistance(src, dst) {
      let min = Infinity;
      let ans = "";
      const processed = new Map();
      const stack = [{ 
        vname: src, 
        psf: src + "  ", 
        min_dis: 0, 
        min_time: 0 
      }];
  
      while (stack.length > 0) {
        const rp = stack.pop();
  
        if (processed.has(rp.vname)) {
          continue;
        }
  
        processed.set(rp.vname, true);
        
        if (rp.vname === dst) {
          const temp = rp.min_dis;
          if (temp < min) {
            ans = rp.psf;
            min = temp;
          }
          continue;
        }
  
        const rpvtx = this.vtces.get(rp.vname);
        for (const [nbr] of rpvtx.nbrs) {
          if (!processed.has(nbr)) {
            stack.push({
              vname: nbr,
              psf: rp.psf + nbr + "  ",
              min_dis: rp.min_dis + rpvtx.nbrs.get(nbr),
              min_time: rp.min_time
            });
          }
        }
      }
      return ans + min.toString();
    }
  
    getMinimumTime(src, dst) {
      let min = Infinity;
      let ans = "";
      const processed = new Map();
      const stack = [{ 
        vname: src, 
        psf: src + "  ", 
        min_dis: 0, 
        min_time: 0 
      }];
  
      while (stack.length > 0) {
        const rp = stack.pop();
  
        if (processed.has(rp.vname)) {
          continue;
        }
  
        processed.set(rp.vname, true);
        
        if (rp.vname === dst) {
          const temp = rp.min_time;
          if (temp < min) {
            ans = rp.psf;
            min = temp;
          }
          continue;
        }
  
        const rpvtx = this.vtces.get(rp.vname);
        for (const [nbr] of rpvtx.nbrs) {
          if (!processed.has(nbr)) {
            stack.push({
              vname: nbr,
              psf: rp.psf + nbr + "  ",
              min_time: rp.min_time + 120 + 40 * rpvtx.nbrs.get(nbr),
              min_dis: rp.min_dis
            });
          }
        }
      }
      const minutes = Math.ceil(min / 60);
      return ans + minutes.toString();
    }
  
    getInterchanges(str) {
      const arr = [];
      const res = str.split("  ");
      arr.push(res[0]);
      let count = 0;
      
      for (let i = 1; i < res.length - 1; i++) {
        const index = res[i].indexOf('~');
        const s = res[i].substring(index + 1);
        
        if (s.length === 2) {
          const prev = res[i-1].substring(res[i-1].indexOf('~') + 1);
          const next = res[i+1].substring(res[i+1].indexOf('~') + 1);
          
          if (prev === next) {
            arr.push(res[i]);
          } else {
            arr.push(res[i] + " ==> " + res[i+1]);
            i++;
            count++;
          }
        } else {
          arr.push(res[i]);
        }
      }
      arr.push(count.toString());
      arr.push(res[res.length - 1]);
      return arr;
    }
  
    static createMetroMap() {
      const g = new MetroGraph();
      // Add all stations and edges as in the Java version
      g.addVertex("Noida Sector 62~B");
      g.addVertex("Botanical Garden~B");
      // ... add all other stations
      
      g.addEdge("Noida Sector 62~B", "Botanical Garden~B", 8);
      g.addEdge("Botanical Garden~B", "Yamuna Bank~B", 10);
      // ... add all other edges
      
      return g;
    }
  }
  
  // Heap implementation in JavaScript
  class Heap {
    constructor(compareFn = (a, b) => a.cost - b.cost) {
      this.data = [];
      this.map = new Map();
      this.compareFn = compareFn;
    }
  
    add(item) {
      this.data.push(item);
      this.map.set(item, this.data.length - 1);
      this.upheapify(this.data.length - 1);
    }
  
    upheapify(ci) {
      if (ci === 0) return;
      const pi = Math.floor((ci - 1) / 2);
      if (this.compareFn(this.data[ci], this.data[pi]) < 0) {
        this.swap(pi, ci);
        this.upheapify(pi);
      }
    }
  
    swap(i, j) {
      const ith = this.data[i];
      const jth = this.data[j];
      this.data[i] = jth;
      this.data[j] = ith;
      this.map.set(ith, j);
      this.map.set(jth, i);
    }
  
    size() {
      return this.data.length;
    }
  
    isEmpty() {
      return this.size() === 0;
    }
  
    remove() {
      this.swap(0, this.data.length - 1);
      const rv = this.data.pop();
      this.downheapify(0);
      this.map.delete(rv);
      return rv;
    }
  
    downheapify(pi) {
      const lci = 2 * pi + 1;
      const rci = 2 * pi + 2;
      let mini = pi;
  
      if (lci < this.data.length && this.compareFn(this.data[lci], this.data[mini]) < 0) {
        mini = lci;
      }
  
      if (rci < this.data.length && this.compareFn(this.data[rci], this.data[mini]) < 0) {
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
  
    updatePriority(pair) {
      const index = this.map.get(pair);
      this.upheapify(index);
    }
  }
  
  export default MetroGraph;