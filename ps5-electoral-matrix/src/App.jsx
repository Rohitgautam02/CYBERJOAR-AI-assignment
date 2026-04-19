/**
 * CyberJoar Electoral Intelligence Matrix
 * Main Application Shell (PS5 Standard)
 */

import React, { useState } from 'react';
import Header from './components/Header';
import HelpPanel from './components/HelpPanel';
import ConstituencySelector from './components/ConstituencySelector';
import CandidatePanel from './components/CandidatePanel';
import WeightConfigPanel from './components/WeightConfigPanel';
import ComparisonMatrix from './components/ComparisonMatrix';
import RadarComparison from './components/RadarComparison';
import PoWBarChart from './components/PoWBarChart';
import TurnoutSimulator from './components/TurnoutSimulator';
import StrategicGapsCard from './components/StrategicGapsCard';
import SentimentFeed from './components/SentimentFeed';
import WinnerProjection from './components/WinnerProjection';
import ExportPanel from './components/ExportPanel';

import { useElectionEngine } from './hooks/useElectionEngine';
import { constituencies } from './data/constituencies';

function App() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  const {
    constituency,
    candidates,
    weights,
    turnout,
    powResults,
    strategicGaps,
    winScenarios,
    sentimentItems,
    totalWeightValid,
    setConstituency,
    updateCandidateScore,
    updateWeight,
    resetWeights,
    setTurnout,
    addCandidate,
    removeCandidate,
    exportState,
    getShareableURL
  } = useElectionEngine();

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      <Header onHelpToggle={() => setIsHelpOpen(!isHelpOpen)} />
      <HelpPanel isOpen={isHelpOpen} />

      <main className="max-w-[1440px] mx-auto px-6 pt-20">
        
        {/* ROW 1: Constituency Selection */}
        <section className="mb-8">
           <ConstituencySelector 
             constituencies={constituencies} 
             selected={constituency}
             onSelect={setConstituency}
           />
        </section>

        {/* SECTION: Intelligence Configuration */}
        <section className="mb-12">
           <CandidatePanel 
             candidates={candidates}
             onScoreChange={updateCandidateScore}
             onAddCandidate={addCandidate}
             onRemoveCandidate={removeCandidate}
           />
           
           <WeightConfigPanel 
             weights={weights}
             onWeightChange={updateWeight}
             onReset={resetWeights}
             constituency={constituency}
             isValid={totalWeightValid}
           />
        </section>

        {/* SECTION: Deep Analytic Matrix */}
        <section className="mb-12">
           <div className="flex items-center gap-3 mb-6">
             <div className="h-4 w-1 bg-navy" />
             <h2 className="text-[20px] font-bold text-navy uppercase tracking-tight">Multi-Dimensional Comparison Matrix</h2>
           </div>
           <ComparisonMatrix 
             candidates={candidates}
             weights={weights}
             powResults={powResults}
             constituency={constituency}
           />
        </section>

        {/* SECTION: Visual Projections Grid */}
        <section className="mb-12">
           <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              
              {/* Left Column: Hero Projection */}
              <div className="xl:col-span-1">
                 <WinnerProjection 
                   powResults={powResults}
                   candidates={candidates}
                   constituency={constituency}
                   turnout={turnout}
                 />
              </div>

              {/* Middle Column: Radar Footprint */}
              <div className="xl:col-span-1">
                 <RadarComparison candidates={candidates} />
              </div>

              {/* Right Column: Probability Index */}
              <div className="xl:col-span-1">
                 <PoWBarChart powResults={powResults} />
              </div>

           </div>
        </section>

        {/* SECTION: Scenario & Pulse Modelling */}
        <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-stretch">
               
               {/* Left: Turnout Simulator (Dark) */}
               <div className="lg:col-span-5 flex">
                  <TurnoutSimulator 
                    turnout={turnout}
                    winScenarios={winScenarios}
                    onTurnoutChange={setTurnout}
                  />
               </div>

               {/* Right: Gaps & Sentiment */}
               <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                     <StrategicGapsCard strategicGaps={strategicGaps} />
                     <SentimentFeed items={sentimentItems} candidates={candidates} />
                  </div>
                  
                  {/* Operations */}
                  <div className="flex-shrink-0">
                     <ExportPanel 
                       onExportJSON={exportState}
                       onGetURL={getShareableURL}
                     />
                  </div>
               </div>

            </div>
        </section>

        {/* FOOTER METRIC */}
        <footer className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
           <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] font-bold text-navy uppercase">System Status: Nominal</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald" />
              <span className="font-mono text-[10px] font-bold text-navy uppercase">Encryption: RC4-BETA</span>
           </div>
           <p className="font-sans text-[11px] text-steel">
             © 2026 CYBERJOAR STRATEGIC GROUP. CLASSIFIED ELECTORAL INTELLIGENCE ASSET.
           </p>
           <div className="font-mono text-[10px] font-bold text-navy">
             v1.0.4-TACTICAL
           </div>
        </footer>

      </main>
    </div>
  );
}

export default App;
