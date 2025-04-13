class GraphMain {
  constructor() {
    this.vtces = new Map();
  }

  numVertex() {
    return this.vtces.size;
  }

  containsVertex(vname) {
    return this.vtces.has(vname);
  }

  addVertex(vname) {
    const vtx = new Vertex();
    this.vtces.set(vname, vtx);
  }

  removeVertex(vname) {
    const vtx = this.vtces.get(vname);
    const keys = Array.from(vtx.nbrs.keys());

    for (const key of keys) {
      const nbrVtx = this.vtces.get(key);
      nbrVtx.nbrs.delete(vname);
    }

    this.vtces.delete(vname);
  }

  numEdges() {
    const keys = Array.from(this.vtces.keys());
    let count = 0;

    for (const key of keys) {
      const vtx = this.vtces.get(key);
      count = count + vtx.nbrs.size;
    }

    return count / 2;
  }

  containsEdge(vname1, vname2) {
    const vtx1 = this.vtces.get(vname1);
    const vtx2 = this.vtces.get(vname2);
    
    if (vtx1 === undefined || vtx2 === undefined || !vtx1.nbrs.has(vname2)) {
      return false;
    }

    return true;
  }

  addEdge(vname1, vname2, value) {
    const vtx1 = this.vtces.get(vname1);
    const vtx2 = this.vtces.get(vname2);

    if (vtx1 === undefined || vtx2 === undefined || vtx1.nbrs.has(vname2)) {
      return;
    }

    vtx1.nbrs.set(vname2, value);
    vtx2.nbrs.set(vname1, value);
  }

  removeEdge(vname1, vname2) {
    const vtx1 = this.vtces.get(vname1);
    const vtx2 = this.vtces.get(vname2);
    
    if (vtx1 === undefined || vtx2 === undefined || !vtx1.nbrs.has(vname2)) {
      return;
    }

    vtx1.nbrs.delete(vname2);
    vtx2.nbrs.delete(vname1);
  }

  displayMap() {
    console.log("\tDelhi Metro Map");
    console.log("\t------------------");
    console.log("----------------------------------------------------\n");
    const keys = Array.from(this.vtces.keys());

    for (const key of keys) {
      let str = key + " =>\n";
      const vtx = this.vtces.get(key);
      const vtxnbrs = Array.from(vtx.nbrs.keys());
      
      for (const nbr of vtxnbrs) {
        str = str + "\t" + nbr + "\t";
        if (nbr.length < 16)
          str = str + "\t";
        if (nbr.length < 8)
          str = str + "\t";
        str = str + vtx.nbrs.get(nbr) + "\n";
      }
      console.log(str);
    }
    console.log("\t------------------");
    console.log("---------------------------------------------------\n");
  }
  
  displayStations() {
    console.log("\n***********************************************************************\n");
    const keys = Array.from(this.vtces.keys());
    let i = 1;
    for (const key of keys) {
      console.log(i + ". " + key);
      i++;
    }
    console.log("\n***********************************************************************\n");
  }
    
  hasPath(vname1, vname2, processed) {
    // DIR EDGE
    if (this.containsEdge(vname1, vname2)) {
      return true;
    }

    // MARK AS DONE
    processed.set(vname1, true);

    const vtx = this.vtces.get(vname1);
    const nbrs = Array.from(vtx.nbrs.keys());

    // TRAVERSE THE NBRS OF THE VERTEX
    for (const nbr of nbrs) {
      if (!processed.has(nbr))
        if (this.hasPath(nbr, vname2, processed))
          return true;
    }

    return false;
  }

  dijkstra(src, des, nan) {
    let val = 0;
    const ans = [];
    const map = new Map();
    const heap = new Heap();

    for (const key of this.vtces.keys()) {
      const np = new DijkstraPair();
      np.vname = key;
      np.cost = Number.MAX_SAFE_INTEGER;

      if (key === src) {
        np.cost = 0;
        np.psf = key;
      }

      heap.add(np);
      map.set(key, np);
    }

    // keep removing the pairs while heap is not empty
    while (!heap.isEmpty()) {
      const rp = heap.remove();
      
      if (rp.vname === des) {
        val = rp.cost;
        break;
      }
      
      map.delete(rp.vname);

      ans.push(rp.vname);
      
      const v = this.vtces.get(rp.vname);
      for (const nbr of v.nbrs.keys()) {
        if (map.has(nbr)) {
          const oc = map.get(nbr).cost;
          const k = this.vtces.get(rp.vname);
          let nc;
          if (nan)
            nc = rp.cost + 120 + 40 * k.nbrs.get(nbr);
          else
            nc = rp.cost + k.nbrs.get(nbr);

          if (nc < oc) {
            const gp = map.get(nbr);
            gp.psf = rp.psf + nbr;
            gp.cost = nc;

            heap.updatePriority(gp);
          }
        }
      }
    }
    return val;
  }

  getMinimumDistance(src, dst) {
    let min = Number.MAX_SAFE_INTEGER;
    let ans = "";
    const processed = new Map();
    const stack = [];

    // create a new pair
    const sp = new Pair();
    sp.vname = src;
    sp.psf = src + "  ";
    sp.min_dis = 0;
    sp.min_time = 0;
    
    // put the new pair in stack
    stack.unshift(sp);

    // while stack is not empty keep on doing the work
    while (stack.length > 0) {
      // remove a pair from stack
      const rp = stack.shift();

      if (processed.has(rp.vname)) {
        continue;
      }

      // processed put
      processed.set(rp.vname, true);
      
      // if there exists a direct edge b/w removed pair and destination vertex
      if (rp.vname === dst) {
        const temp = rp.min_dis;
        if (temp < min) {
          ans = rp.psf;
          min = temp;
        }
        continue;
      }

      const rpvtx = this.vtces.get(rp.vname);
      const nbrs = Array.from(rpvtx.nbrs.keys());

      for (const nbr of nbrs) {
        // process only unprocessed nbrs
        if (!processed.has(nbr)) {
          // make a new pair of nbr and put in queue
          const np = new Pair();
          np.vname = nbr;
          np.psf = rp.psf + nbr + "  ";
          np.min_dis = rp.min_dis + rpvtx.nbrs.get(nbr); 
          stack.unshift(np);
        }
      }
    }
    ans = ans + min.toString();
    return ans;
  }
  
  getMinimumTime(src, dst) {
    let min = Number.MAX_SAFE_INTEGER;
    let ans = "";
    const processed = new Map();
    const stack = [];

    // create a new pair
    const sp = new Pair();
    sp.vname = src;
    sp.psf = src + "  ";
    sp.min_dis = 0;
    sp.min_time = 0;
    
    // put the new pair in queue
    stack.unshift(sp);

    // while queue is not empty keep on doing the work
    while (stack.length > 0) {
      // remove a pair from queue
      const rp = stack.shift();

      if (processed.has(rp.vname)) {
        continue;
      }

      // processed put
      processed.set(rp.vname, true);

      // if there exists a direct edge b/w removed pair and destination vertex
      if (rp.vname === dst) {
        const temp = rp.min_time;
        if (temp < min) {
          ans = rp.psf;
          min = temp;
        }
        continue;
      }

      const rpvtx = this.vtces.get(rp.vname);
      const nbrs = Array.from(rpvtx.nbrs.keys());

      for (const nbr of nbrs) {
        // process only unprocessed nbrs
        if (!processed.has(nbr)) {
          // make a new pair of nbr and put in queue
          const np = new Pair();
          np.vname = nbr;
          np.psf = rp.psf + nbr + "  ";
          np.min_time = rp.min_time + 120 + 40 * rpvtx.nbrs.get(nbr); 
          stack.unshift(np);
        }
      }
    }
    const minutes = Math.ceil(min / 60);
    ans = ans + minutes.toString();
    return ans;
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
        const prev = res[i - 1].substring(res[i - 1].indexOf('~') + 1);
        const next = res[i + 1].substring(res[i + 1].indexOf('~') + 1);
        
        if (prev === next) {
          arr.push(res[i]);
        } else {
          arr.push(res[i] + " ==> " + res[i + 1]);
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

  static createMetroMap(g) {
    g.addVertex("Noida Sector 62~B");
    g.addVertex("Botanical Garden~B");
    g.addVertex("Yamuna Bank~B");
    g.addVertex("Rajiv Chowk~BY");
    g.addVertex("Vaishali~B");
    g.addVertex("Moti Nagar~B");
    g.addVertex("Janak Puri West~BO");
    g.addVertex("Dwarka Sector 21~B");
    g.addVertex("Huda City Center~Y");
    g.addVertex("Saket~Y");
    g.addVertex("Vishwavidyalaya~Y");
    g.addVertex("Chandni Chowk~Y");
    g.addVertex("New Delhi~YO");
    g.addVertex("AIIMS~Y");
    g.addVertex("Shivaji Stadium~O");
    g.addVertex("DDS Campus~O");
    g.addVertex("IGI Airport~O");
    g.addVertex("Rajouri Garden~BP");
    g.addVertex("Netaji Subhash Place~PR");
    g.addVertex("Punjabi Bagh West~P");
    
    g.addEdge("Noida Sector 62~B", "Botanical Garden~B", 8);
    g.addEdge("Botanical Garden~B", "Yamuna Bank~B", 10);
    g.addEdge("Yamuna Bank~B", "Vaishali~B", 8);
    g.addEdge("Yamuna Bank~B", "Rajiv Chowk~BY", 6);
    g.addEdge("Rajiv Chowk~BY", "Moti Nagar~B", 9);
    g.addEdge("Moti Nagar~B", "Janak Puri West~BO", 7);
    g.addEdge("Janak Puri West~BO", "Dwarka Sector 21~B", 6);
    g.addEdge("Huda City Center~Y", "Saket~Y", 15);
    g.addEdge("Saket~Y", "AIIMS~Y", 6);
    g.addEdge("AIIMS~Y", "Rajiv Chowk~BY", 7);
    g.addEdge("Rajiv Chowk~BY", "New Delhi~YO", 1);
    g.addEdge("New Delhi~YO", "Chandni Chowk~Y", 2);
    g.addEdge("Chandni Chowk~Y", "Vishwavidyalaya~Y", 5);
    g.addEdge("New Delhi~YO", "Shivaji Stadium~O", 2);
    g.addEdge("Shivaji Stadium~O", "DDS Campus~O", 7);
    g.addEdge("DDS Campus~O", "IGI Airport~O", 8);
    g.addEdge("Moti Nagar~B", "Rajouri Garden~BP", 2);
    g.addEdge("Punjabi Bagh West~P", "Rajouri Garden~BP", 2);
    g.addEdge("Punjabi Bagh West~P", "Netaji Subhash Place~PR", 3);
  }

  static printCodelist(vtces) {
    console.log("List of station along with their codes:\n");
    const keys = Array.from(vtces.keys());
    let i = 1, j = 0, m = 1;
    let temp = "";
    const codes = new Array(keys.length);
    
    for (const key of keys) {
      const stname = key.split(" ");
      codes[i - 1] = "";
      j = 0;
      
      for (const word of stname) {
        temp = word;
        let c = temp.charAt(0);
        while (c > 47 && c < 58) {
          codes[i - 1] += c;
          j++;
          if (j < temp.length) {
            c = temp.charAt(j);
          } else {
            break;
          }
        }
        if ((c < 48 || c > 57) && c < 123) {
          codes[i - 1] += c;
        }
      }
      
      if (codes[i - 1].length < 2) {
        codes[i - 1] += temp.charAt(1).toUpperCase();
      }
      
      let output = i + ". " + key + "\t";
      if (key.length < (22 - m)) {
        output += "\t";
      }
      if (key.length < (14 - m)) {
        output += "\t";
      }
      if (key.length < (6 - m)) {
        output += "\t";
      }
      output += codes[i - 1];
      console.log(output);
      
      i++;
      if (i === Math.pow(10, m)) {
        m++;
      }
    }
    return codes;
  }
}

class Vertex {
  constructor() {
    this.nbrs = new Map();
  }
}

class DijkstraPair {
  constructor() {
    this.vname = "";
    this.psf = "";
    this.cost = 0;
  }

  compareTo(o) {
    return o.cost - this.cost;
  }
}

class Pair {
  constructor() {
    this.vname = "";
    this.psf = "";
    this.min_dis = 0;
    this.min_time = 0;
  }
}

// Implementation of a priority queue (Heap)
class Heap {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
    this.items.sort((a, b) => a.compareTo(b));
  }

  remove() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  updatePriority(item) {
    // Find the item and update it
    const index = this.items.findIndex(i => i.vname === item.vname);
    if (index !== -1) {
      this.items[index] = item;
      this.items.sort((a, b) => a.compareTo(b));
    }
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

// Main function equivalent
function main() {
  const g = new GraphMain();
  GraphMain.createMetroMap(g);
  
  console.log("\n\t\t\t****WELCOME TO THE METRO APP*****");

  // Since we can't directly interact with the console in a browser environment,
  // we'll modify to use a browser-based interaction system
  let running = true;
  
  const displayMenu = () => {
    console.log("\t\t\t\t~~LIST OF ACTIONS~~\n\n");
    console.log("1. LIST ALL THE STATIONS IN THE MAP");
    console.log("2. SHOW THE METRO MAP");
    console.log("3. GET SHORTEST DISTANCE FROM A 'SOURCE' STATION TO 'DESTINATION' STATION");
    console.log("4. GET SHORTEST TIME TO REACH FROM A 'SOURCE' STATION TO 'DESTINATION' STATION");
    console.log("5. GET SHORTEST PATH (DISTANCE WISE) TO REACH FROM A 'SOURCE' STATION TO 'DESTINATION' STATION");
    console.log("6. GET SHORTEST PATH (TIME WISE) TO REACH FROM A 'SOURCE' STATION TO 'DESTINATION' STATION");
    console.log("7. EXIT THE MENU");
    console.log("\nENTER YOUR CHOICE FROM THE ABOVE LIST (1 to 7) : ");
  };

  const handleChoice = (choice) => {
    console.log("\n***********************************************************\n");
    
    if (choice === 7) {
      running = false;
      console.log("Thank you for using the Metro App!");
      return;
    }
    
    switch (choice) {
      case 1:
        g.displayStations();
        break;
      
      case 2:
        g.displayMap();
        break;
      
      case 3:
        const getShortestDistance = (sourceStation, destinationStation) => {
          const processed = new Map();
          if (!g.containsVertex(sourceStation) || !g.containsVertex(destinationStation) || 
              !g.hasPath(sourceStation, destinationStation, processed)) {
            console.log("THE INPUTS ARE INVALID");
          } else {
            console.log(`SHORTEST DISTANCE FROM ${sourceStation} TO ${destinationStation} IS ${g.dijkstra(sourceStation, destinationStation, false)}KM\n`);
          }
        };
        
        // Example usage (in a real app, these would come from user input)
        getShortestDistance("Rajiv Chowk~BY", "AIIMS~Y");
        break;
      
      case 4:
        const getShortestTime = (sourceStation, destinationStation) => {
          const processed = new Map();
          console.log(`SHORTEST TIME FROM (${sourceStation}) TO (${destinationStation}) IS ${g.dijkstra(sourceStation, destinationStation, true)/60} MINUTES\n\n`);
        };
        
        // Example usage
        getShortestTime("Rajiv Chowk~BY", "AIIMS~Y");
        break;
      
      case 5:
        const getShortestPathByDistance = (sourceStation, destinationStation) => {
          const processed = new Map();
          if (!g.containsVertex(sourceStation) || !g.containsVertex(destinationStation) || 
              !g.hasPath(sourceStation, destinationStation, processed)) {
            console.log("THE INPUTS ARE INVALID");
          } else {
            const str = g.getInterchanges(g.getMinimumDistance(sourceStation, destinationStation));
            const len = str.length;
            console.log("SOURCE STATION : " + sourceStation);
            console.log("DESTINATION STATION : " + destinationStation);
            console.log("DISTANCE : " + str[len-1]);
            console.log("NUMBER OF INTERCHANGES : " + str[len-2]);
            console.log("~~~~~~~~~~~~~");
            console.log("START  ==>  " + str[0]);
            for (let i = 1; i < len - 3; i++) {
              console.log(str[i]);
            }
            console.log(str[len-3] + "   ==>    END");
            console.log("~~~~~~~~~~~~~");
          }
        };
        
        // Example usage
        getShortestPathByDistance("Rajiv Chowk~BY", "AIIMS~Y");
        break;
      
      case 6:
        const getShortestPathByTime = (sourceStation, destinationStation) => {
          const processed = new Map();
          if (!g.containsVertex(sourceStation) || !g.containsVertex(destinationStation) || 
              !g.hasPath(sourceStation, destinationStation, processed)) {
            console.log("THE INPUTS ARE INVALID");
          } else {
            const str = g.getInterchanges(g.getMinimumTime(sourceStation, destinationStation));
            const len = str.length;
            console.log("SOURCE STATION : " + sourceStation);
            console.log("DESTINATION STATION : " + destinationStation);
            console.log("TIME : " + str[len-1] + " MINUTES");
            console.log("NUMBER OF INTERCHANGES : " + str[len-2]);
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("START  ==>  " + str[0] + " ==>  ");
            for (let i = 1; i < len - 3; i++) {
              console.log(str[i]);
            }
            console.log(str[len-3] + "   ==>    END");
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
          }
        };
        
        // Example usage
        getShortestPathByTime("Rajiv Chowk~BY", "AIIMS~Y");
        break;
      
      default:
        console.log("Please enter a valid option! ");
        console.log("The options you can choose are from 1 to 7. ");
    }
  };

  // In a browser environment, this would be triggered by UI interactions
  displayMenu();
  
  // Example: Handle a specific choice (in a real app, this would be user-driven)
  handleChoice(1); // List all stations
}

// Call the main function to start the application
main();
