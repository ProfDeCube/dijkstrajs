import dijkstra, { findPath, findPathWithCost } from '../dijkstra.js'
import { expect } from 'chai';

describe('dijkstra.js', () => {

  describe('.findPath()', () => {

    it('should find the path between two points, all edges have weight 1', () => {
      // A B C
      // D E F
      // G H I
      const graph = {
        a: { b: 1, d: 1 },
        b: { a: 1, c: 1, e: 1 },
        c: { b: 1, f: 1 },
        d: { a: 1, e: 1, g: 1 },
        e: { b: 1, d: 1, f: 1, h: 1 },
        f: { c: 1, e: 1, i: 1 },
        g: { d: 1, h: 1 },
        h: { e: 1, g: 1, i: 1 },
        i: { f: 1, h: 1 }
      };
      const path = findPath(graph, 'a', 'i');
      expect(path).to.eql(['a', 'd', 'g', 'h', 'i']);
    });

    it('should find the path between two points, weighted edges', () => {
      const graph = {
        a: { b: 10, c: 100, d: 1 },
        b: { c: 10 },
        d: { b: 1, e: 1 },
        e: { f: 1 },
        f: { c: 1 },
        g: { b: 1 }
      };

      const pathAC = findPath(graph, 'a', 'c');
      expect(pathAC).to.eql(['a', 'd', 'e', 'f', 'c']);
      const pathDB = findPath(graph, 'd', 'b');
      expect(pathDB).to.eql(['d', 'b']);
    });

    it('should throw on unreachable destination', () => {
      const graph = {
        a: { b: 10, c: 100, d: 1 },
        b: { c: 10 },
        d: { b: 1, e: 1 },
        e: { f: 1 },
        f: { c: 1 },
        g: { b: 1 }
      };

      expect(() => { findPath(graph, 'c', 'a'); }).to.throw();
      expect(() => { findPath(graph, 'a', 'g'); }).to.throw();
    });

    it('should throw on non-existent destination', () => {
      const graph = {
        a: { b: 10, c: 100, d: 1 },
        b: { c: 10 },
        d: { b: 1, e: 1 },
        e: { f: 1 },
        f: { c: 1 },
        g: { b: 1 }
      };

      expect(() => { findPath(graph, 'a', 'z'); }).to.throw();
    });
  });
  
  describe('.findPathWithCost()', () => {

    it('should find the path between two points, all edges have weight 1', () => {
      // A B C
      // D E F
      // G H I
      const graph = {
        a: { b: 1, d: 1 },
        b: { a: 1, c: 1, e: 1 },
        c: { b: 1, f: 1 },
        d: { a: 1, e: 1, g: 1 },
        e: { b: 1, d: 1, f: 1, h: 1 },
        f: { c: 1, e: 1, i: 1 },
        g: { d: 1, h: 1 },
        h: { e: 1, g: 1, i: 1 },
        i: { f: 1, h: 1 }
      };
      const [path, cost] = findPathWithCost(graph, 'a', 'i');
      expect(path).to.eql(['a', 'd', 'g', 'h', 'i']);
      expect(cost).to.eql(4);
    });

    it('should find the path between two points, weighted edges', () => {
      const graph = {
        a: { b: 10, c: 100, d: 1 },
        b: { c: 10 },
        d: { b: 1, e: 1 },
        e: { f: 1 },
        f: { c: 1 },
        g: { b: 1 }
      };

      const [pathAC, costAC] = findPathWithCost(graph, 'a', 'c');
      expect(pathAC).to.eql(['a', 'd', 'e', 'f', 'c']);
      expect(costAC).to.eql(4);

      const [pathDB, costDB] = findPathWithCost(graph, 'd', 'b');
      expect(pathDB).to.eql(['d', 'b']);
      expect(costDB).to.eql(1);
    });

    
    it('should find the path between two points, weighted edges, no short path', () => {
      const graph = {
        a: { b: 10, c: 100, d: 1 },
        b: { c: 10 },
        d: { b: 1, e: 1 },
        e: { a: 1 },
      };

      const [pathAC, costAC] = findPathWithCost(graph, 'a', 'c');
      expect(pathAC).to.eql(['a', 'd', 'b', 'c']);
      expect(costAC).to.eql(12);
    });

    it('should throw on unreachable destination', () => {
      const graph = {
        a: { b: 10, c: 100, d: 1 },
        b: { c: 10 },
        d: { b: 1, e: 1 },
        e: { f: 1 },
        f: { c: 1 },
        g: { b: 1 }
      };

      expect(() => { findPathWithCost(graph, 'c', 'a'); }).to.throw();
      expect(() => { findPathWithCost(graph, 'a', 'g'); }).to.throw();
    });

    it('should throw on non-existent destination', () => {
      const graph = {
        a: { b: 10, c: 100, d: 1 },
        b: { c: 10 },
        d: { b: 1, e: 1 },
        e: { f: 1 },
        f: { c: 1 },
        g: { b: 1 }
      };

      expect(() => { findPathWithCost(graph, 'a', 'z'); }).to.throw();
    });
  });

  describe('.single_source_shortest_paths()', () => {
    it('should find all paths from a node', () => {
      const graph = {
        a: { b: 10, c: 100, d: 1 },
        b: { c: 10 },
        d: { b: 1, e: 1 },
        e: { f: 1 },
        f: { c: 1 },
        g: { b: 1 }
      };

      // All paths from 'a'
      const [paths, costs] = dijkstra.singleSourceShortestPaths(graph, 'a');
      expect(paths).to.eql({
        d: 'a',
        b: 'd',
        e: 'd',
        f: 'e',
        c: 'f'
      });
      expect(costs).to.eql({
        a: 0,
        b: 2,
        c: 4,
        d: 1,
        e: 2,
        f: 3
      });
    });
  });
});
