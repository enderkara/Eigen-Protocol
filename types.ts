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

export interface CognitiveResponse {
  match_strength: number;
  shared_trait: string;
  icebreaker: string;
  analysis: string;
}

export interface PolymathResponse {
  user_a_archetype: string;
  user_b_archetype: string;
  shared_archetype: string;
  match_score: number;
  insight: string;
  icebreaker: string;
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