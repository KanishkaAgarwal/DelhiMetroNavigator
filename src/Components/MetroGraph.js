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
              gp.psf = rp.psf + "->" + nbr;
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
      let ans = ""; // path for shortest path 
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
          continue; // to prevent cycle 
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
      return ans + min.toString(); // shortest path and minimum distance 
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
      const arr = []; // result
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
      return arr;  // path,count of interchange,destination
    }
  
    static createMetroMap() {
      const g = new MetroGraph();
  
      
      g.addVertex("Noida Sector 62~B");
      g.addVertex("Botanical Garden~B");
      g.addVertex("Yamuna Bank~B");
      g.addVertex("Rajiv Chowk~BY");
      g.addVertex("Dwarka Sector 21~B");
      
      
      g.addVertex("Vishwavidyalaya~Y");
      g.addVertex("Kashmere Gate~Y");
      g.addVertex("Rajiv Chowk~BY"); 
      g.addVertex("Hauz Khas~YV"); 
      g.addVertex("Huda City Centre~Y");
      
      
      g.addVertex("Kashmere Gate~V"); 
      g.addVertex("Hauz Khas~YV"); 
      g.addVertex("Ballabhgarh~V");
      
      
      g.addVertex("Rithala~R");
      g.addVertex("Kashmere Gate~R"); 
      g.addVertex("Inderlok~R");
      
      
      g.addEdge("Noida Sector 62~B", "Botanical Garden~B", 8);
      g.addEdge("Botanical Garden~B", "Yamuna Bank~B", 10);
      g.addEdge("Yamuna Bank~B", "Rajiv Chowk~BY", 12);
      g.addEdge("Rajiv Chowk~BY", "Dwarka Sector 21~B", 15);
      
      
      g.addEdge("Vishwavidyalaya~Y", "Kashmere Gate~Y", 8);
      g.addEdge("Kashmere Gate~Y", "Rajiv Chowk~BY", 10);
      g.addEdge("Rajiv Chowk~BY", "Hauz Khas~YV", 14);
      g.addEdge("Hauz Khas~YV", "Huda City Centre~Y", 20);
      
      
      g.addEdge("Kashmere Gate~V", "Hauz Khas~YV", 18);
      g.addEdge("Hauz Khas~YV", "Ballabhgarh~V", 22);
      
      
      g.addEdge("Rithala~R", "Kashmere Gate~R", 25);
      g.addEdge("Kashmere Gate~R", "Inderlok~R", 6);
      
      
      g.addEdge("Rajiv Chowk~BY", "Rajiv Chowk~BY", 5); 
      g.addEdge("Kashmere Gate~Y", "Kashmere Gate~V", 8); 
      g.addEdge("Kashmere Gate~Y", "Kashmere Gate~R", 10); 
      g.addEdge("Hauz Khas~YV", "Hauz Khas~YV", 4); 
      
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