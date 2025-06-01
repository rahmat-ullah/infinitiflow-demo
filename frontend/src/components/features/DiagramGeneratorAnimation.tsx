import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, GitBranch, Share2, Code, Edit3, Plus, Sparkles, CheckCircle, Copy, Zap } from 'lucide-react';

const DiagramGeneratorAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'analyzing' | 'selecting' | 'editing' | 'generated'>('analyzing');
  const [selectedDiagramType, setSelectedDiagramType] = useState<string>('flowchart');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showMermaid, setShowMermaid] = useState(false);
  const [diagramData, setDiagramData] = useState({
    nodes: [
      { id: 'A', label: 'Content Analysis', type: 'start' },
      { id: 'B', label: 'AI Processing', type: 'process' },
      { id: 'C', label: 'Quality Check', type: 'decision' },
      { id: 'D', label: 'Output Generated', type: 'end' }
    ],
    connections: [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
      { from: 'C', to: 'D' }
    ]
  });

  const diagramTypes = [
    { 
      id: 'flowchart', 
      label: 'Flowchart', 
      icon: GitBranch, 
      color: 'bg-blue-500',
      description: 'Process flows'
    },
    { 
      id: 'sequence', 
      label: 'Sequence', 
      icon: Share2, 
      color: 'bg-green-500',
      description: 'Interactions'
    },
    { 
      id: 'mindmap', 
      label: 'Mind Map', 
      icon: BarChart3, 
      color: 'bg-purple-500',
      description: 'Concepts'
    },
    { 
      id: 'gantt', 
      label: 'Gantt', 
      icon: Zap, 
      color: 'bg-orange-500',
      description: 'Timeline'
    }
  ];

  const sourceText = "Our content creation process starts with analyzing user input, then AI processes the content, performs quality checks, and finally generates the output.";

  const mermaidOutput = `flowchart TD
    A[Content Analysis] --> B[AI Processing]
    B --> C{Quality Check}
    C --> D[Output Generated]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#fff3e0
    style D fill:#e8f5e8`;

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('selecting'), 2500);
    const timer2 = setTimeout(() => setCurrentStep('editing'), 5000);
    const timer3 = setTimeout(() => setCurrentStep('generated'), 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleDiagramTypeSelect = (type: string) => {
    setSelectedDiagramType(type);
  };

  const handleNodeClick = (nodeId: string) => {
    if (currentStep === 'editing' || currentStep === 'generated') {
      setSelectedNode(selectedNode === nodeId ? null : nodeId);
    }
  };

  const updateNodeLabel = (nodeId: string, newLabel: string) => {
    setDiagramData(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => 
        node.id === nodeId ? { ...node, label: newLabel } : node
      )
    }));
  };

  const getNodeStyle = (nodeType: string) => {
    switch (nodeType) {
      case 'start': return 'bg-green-100 border-green-300 text-green-800';
      case 'process': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'decision': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'end': return 'bg-red-100 border-red-300 text-red-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getNodeShape = (nodeType: string) => {
    switch (nodeType) {
      case 'start': return 'rounded-full';
      case 'process': return 'rounded-lg';
      case 'decision': return 'rounded-lg transform rotate-45';
      case 'end': return 'rounded-full';
      default: return 'rounded-lg';
    }
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-indigo-900 dark:via-accent-800 dark:to-cyan-800 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-400 to-blue-400 dark:from-indigo-700 dark:to-accent-700 transform -rotate-12 scale-150"></div>
      </div>

      {/* Source Content Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-40 h-32 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 dark:border-secondary-700/50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-100 dark:border-secondary-700">
          <div className="flex items-center gap-2 mb-1">
            <Edit3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Source Content</span>
          </div>
        </div>

        <div className="p-3">
          <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4">
            {sourceText}
          </div>
          
          {/* Detected Elements */}
          {currentStep !== 'analyzing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 space-y-1"
            >
              {['Process', 'Steps', 'Flow'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.2 }}
                  className="inline-block bg-indigo-100 dark:bg-indigo-700/30 text-indigo-700 dark:text-indigo-300 text-xs px-1 py-0.5 rounded mr-1"
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* AI Analysis Phase */}
      <AnimatePresence>
        {currentStep === 'analyzing' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/50 dark:border-secondary-700/50"
          >
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.5, repeat: Infinity }
                }}
              >
                <Sparkles className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Analyzing Structure...</div>
              <div className="space-y-2 w-32">
                {['Entities', 'Relationships', 'Flow'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.5, duration: 0.8 }}
                    className="bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"
                  >
                    <div className="bg-gradient-to-r from-indigo-400 to-blue-500 dark:from-indigo-600 dark:to-accent-700 h-1.5 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Diagram Type Selection */}
      <AnimatePresence>
        {currentStep === 'selecting' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-44 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50 dark:border-secondary-700/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Diagram Types</span>
            </div>

            <div className="space-y-2">
              {diagramTypes.map((type, i) => {
                const Icon = type.icon;
                const isSelected = selectedDiagramType === type.id;
                const darkColor = type.color.replace('-500', '-600');
                
                return (
                  <motion.button
                    key={type.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => handleDiagramTypeSelect(type.id)}
                    className={`w-full p-2 rounded-lg text-left transition-all duration-200 ${
                      isSelected
                        ? `${type.color} dark:${darkColor} text-white shadow-lg scale-105`
                        : 'bg-gray-50 dark:bg-secondary-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-600'
                    }`}
                    whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className={`w-3 h-3 ${isSelected ? 'text-white' : type.color.replace('bg-','text-').replace('-500','-600')} dark:${isSelected ? 'text-white' : type.color.replace('bg-','text-').replace('-500','-400')}`} />
                      <span className="text-xs font-medium">{type.label}</span>
                    </div>
                    <div className={`text-xs opacity-75 ${isSelected ? 'dark:text-white/80' : 'dark:text-gray-400'}`}>{type.description}</div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Diagram Editor */}
      <AnimatePresence>
        {(currentStep === 'editing' || currentStep === 'generated') && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 dark:border-secondary-700/50 overflow-hidden"
          >
            {/* Editor Controls */}
            <div className="p-3 border-b border-gray-100 dark:border-secondary-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Diagram Editor</span>
                </div>
                {currentStep === 'generated' && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setShowMermaid(!showMermaid)}
                    className="bg-indigo-500 dark:bg-indigo-600 text-white text-xs px-2 py-1 rounded-lg hover:bg-indigo-600 dark:hover:bg-indigo-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Code className="w-3 h-3 mr-1" />
                    {showMermaid ? 'Diagram' : 'Mermaid'}
                  </motion.button>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <span>Selected: {selectedDiagramType}</span>
                {selectedNode && (
                  <span className="text-indigo-600 dark:text-indigo-400">• Editing: {selectedNode}</span>
                )}
              </div>
            </div>

            {/* Diagram Content */}
            <div className="p-3 max-h-32 overflow-auto">
              <AnimatePresence mode="wait">
                {!showMermaid ? (
                  <motion.div
                    key="diagram"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative"
                  >
                    {/* Interactive Diagram */}
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      {diagramData.nodes.map((node, index) => (
                        <motion.div
                          key={node.id}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.2 }}
                          className="relative"
                        >
                          <motion.button
                            className={`px-3 py-2 border-2 text-xs font-medium cursor-pointer transition-all duration-200 ${
                              getNodeStyle(node.type) // This function needs dark mode awareness for its output classes
                            } ${getNodeShape(node.type)} ${
                              selectedNode === node.id ? 'ring-2 ring-indigo-400 dark:ring-indigo-500' : ''
                            }`}
                            onClick={() => handleNodeClick(node.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {node.label}
                          </motion.button>
                          
                          {/* Connection Arrow */}
                          {index < diagramData.nodes.length - 1 && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.2 + 0.3 }}
                              className="absolute top-1/2 -right-6 transform -translate-y-1/2 text-indigo-400 dark:text-indigo-500"
                            >
                              →
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </div>

                    {/* Node Properties Panel */}
                    {selectedNode && currentStep === 'editing' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-2 mt-2"
                      >
                        <div className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                          Edit Node: {selectedNode}
                        </div>
                        <input
                          type="text"
                          value={diagramData.nodes.find(n => n.id === selectedNode)?.label || ''}
                          onChange={(e) => updateNodeLabel(selectedNode, e.target.value)}
                          className="w-full text-xs px-2 py-1 border border-indigo-200 dark:border-indigo-700 rounded dark:bg-secondary-700 dark:text-gray-100"
                          placeholder="Node label..."
                        />
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="mermaid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-gray-900 dark:bg-black rounded-lg p-3" // Already dark, ensure contrast
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-300 dark:text-gray-400">Mermaid Code</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </motion.button>
                    </div>
                    <pre className="text-xs text-cyan-400 font-mono leading-relaxed overflow-x-auto">
                      {mermaidOutput}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generation Complete Indicator */}
      {currentStep === 'generated' && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-4 right-4 bg-green-500 dark:bg-success-600 text-white p-2 rounded-full shadow-lg"
        >
          <CheckCircle className="w-4 h-4" />
        </motion.div>
      )}

      {/* Floating Diagram Particles */}
      {currentStep === 'generated' && (
        <>
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-sm"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [0, -30, -60],
                x: [0, Math.random() * 20 - 10],
              }}
              transition={{
                duration: 3.5,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 5,
              }}
              style={{
                left: `${25 + i * 10}%`,
                top: `75%`,
              }}
            >
              {['📊', '🔀', '🎯', '⚡', '🔗', '💡'][i]}
            </motion.div>
          ))}
        </>
      )}

      {/* Connection Lines */}
      <motion.svg
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ 
          pathLength: currentStep === 'editing' || currentStep === 'generated' ? 1 : 0, 
          opacity: currentStep === 'editing' || currentStep === 'generated' ? 0.3 : 0 
        }}
        transition={{ duration: 1.5 }}
        className="absolute top-24 left-44 w-16 h-12"
        viewBox="0 0 64 48"
      >
        <motion.path
          d="M 0 24 Q 32 12 64 24"
          stroke="url(#diagramGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
        <defs>
          <linearGradient id="diagramGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default DiagramGeneratorAnimation; 