import * as d3 from 'd3';

export interface EigenResponse {
  bridgeTitle: string;
  resonanceScore: number;
  mechanism: string;
  explanation: string;
  domainAConcepts: string[];
  domainBConcepts: string[];
  sharedConcepts: string[];
}

export interface FidelityResponse {
  fidelity_score: number;
  classification: "CHEAP" | "MIMICRY" | "SIGNAL";
  critique: string;
}

export interface NodeData extends d3.SimulationNodeDatum {
  id: string;
  group: 'A' | 'B' | 'Bridge';
  radius: number;
}

export interface LinkData extends d3.SimulationLinkDatum<NodeData> {
  source: string | NodeData;
  target: string | NodeData;
  value: number;
}

export type HistoryItem = {
  id: string;
  domainA: string;
  domainB: string;
  result: EigenResponse;
  timestamp: number;
};