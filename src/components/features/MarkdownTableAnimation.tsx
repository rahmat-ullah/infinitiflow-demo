import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, Plus, Minus, Edit3, Code, CheckCircle, Grid, Sparkles, Copy } from 'lucide-react';

const MarkdownTableAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'analyzing' | 'detected' | 'editing' | 'generated'>('analyzing');
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [tableData, setTableData] = useState([
    ['Feature', 'Status', 'Priority'],
    ['AI Content', 'Active', 'High'],
    ['Templates', 'Beta', 'Medium'],
    ['SEO Tools', 'Planning', 'Low']
  ]);
  const [showMarkdown, setShowMarkdown] = useState(false);
  const [editingCell, setEditingCell] = useState<{row: number, col: number} | null>(null);
  const [cellValue, setCellValue] = useState('');

  const sourceText = "Our platform offers several key features: AI Content Generation which is currently Active with High priority, Smart Templates in Beta status with Medium priority, and SEO Optimization Tools in Planning phase with Low priority.";

  const markdownOutput = `| ${tableData[0].join(' | ')} |
|${tableData[0].map(() => '---').join('|')}|
${tableData.slice(1).map(row => `| ${row.join(' | ')} |`).join('\n')}`;

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep('detected'), 2500);
    const timer2 = setTimeout(() => setCurrentStep('editing'), 4500);
    const timer3 = setTimeout(() => setCurrentStep('generated'), 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (currentStep === 'editing' || currentStep === 'generated') {
      setEditingCell({row, col});
      setCellValue(tableData[row][col]);
    }
  };

  const handleCellEdit = (value: string) => {
    if (editingCell) {
      const newData = [...tableData];
      newData[editingCell.row][editingCell.col] = value;
      setTableData(newData);
      setEditingCell(null);
      setCellValue('');
    }
  };

  const addRow = () => {
    const newRow = new Array(tableData[0].length).fill('New Data');
    setTableData([...tableData, newRow]);
  };

  const removeRow = () => {
    if (tableData.length > 2) {
      setTableData(tableData.slice(0, -1));
    }
  };

  const addColumn = () => {
    const newData = tableData.map((row, index) => [...row, index === 0 ? 'New Column' : 'Data']);
    setTableData(newData);
  };

  const removeColumn = () => {
    if (tableData[0].length > 2) {
      const newData = tableData.map(row => row.slice(0, -1));
      setTableData(newData);
    }
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 dark:from-gray-800 dark:via-slate-800 dark:to-zinc-800 rounded-lg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-400 to-slate-400 dark:from-gray-700 dark:to-slate-700 transform rotate-12 scale-150"></div>
      </div>

      {/* Source Text Panel */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-4 left-4 w-44 h-32 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 dark:border-secondary-700/50 overflow-hidden"
      >
        <div className="p-3 border-b border-gray-100 dark:border-secondary-700">
          <div className="flex items-center gap-2 mb-1">
            <Edit3 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Source Text</span>
          </div>
        </div>

        <div className="p-3">
          <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-4">
            {sourceText}
          </div>
          
          {/* Detected Data Highlights */}
          {currentStep !== 'analyzing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 space-y-1"
            >
              {['Features', 'Status', 'Priority'].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.2 }}
                  className="inline-block bg-blue-100 dark:bg-accent-700/30 text-blue-700 dark:text-accent-300 text-xs px-1 py-0.5 rounded mr-1"
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
                <Sparkles className="w-8 h-8 text-gray-600 dark:text-gray-400" />
              </motion.div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Detecting Table Structure...</div>
              <div className="space-y-2 w-32">
                {['Columns', 'Rows', 'Headers'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: i * 0.5, duration: 0.8 }}
                    className="bg-gray-200 dark:bg-gray-700 rounded-full h-1.5"
                  >
                    <div className="bg-gradient-to-r from-gray-400 to-slate-500 dark:from-gray-600 dark:to-slate-700 h-1.5 rounded-full"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table Detection Results */}
      <AnimatePresence>
        {currentStep === 'detected' && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-4 right-4 w-48 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-lg shadow-xl p-3 border border-white/50 dark:border-secondary-700/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <Grid className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Table Detected</span>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Columns:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">3</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Rows:</span>
                <span className="font-medium text-gray-800 dark:text-gray-200">4</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600 dark:text-gray-400">Headers:</span>
                <span className="font-medium text-green-600 dark:text-success-400">✓ Detected</span>
              </div>
            </div>

            {/* Mini Table Preview */}
            <div className="bg-gray-50 dark:bg-secondary-700 rounded-lg p-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Preview:</div>
              <div className="space-y-1">
                {tableData.slice(0, 2).map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className={`flex gap-1 ${i === 0 ? 'font-medium dark:text-gray-100' : 'dark:text-gray-300'}`}
                  >
                    {row.map((cell, j) => (
                      <div key={j} className={`flex-1 text-xs truncate ${i === 0 ? 'dark:text-gray-100' : 'dark:text-gray-300'} bg-white dark:bg-secondary-600 px-1 py-0.5 rounded`}>
                        {cell}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Table Editor */}
      <AnimatePresence>
        {(currentStep === 'editing' || currentStep === 'generated') && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-secondary-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/50 dark:border-secondary-700/50 overflow-hidden"
          >
            {/* Table Controls */}
            <div className="p-3 border-b border-gray-100 dark:border-secondary-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Interactive Table Editor</span>
                </div>
                {currentStep === 'generated' && (
                  <div className="flex items-center gap-1">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => setShowMarkdown(!showMarkdown)}
                      className="bg-blue-500 dark:bg-accent-600 text-white text-xs px-2 py-1 rounded-lg hover:bg-blue-600 dark:hover:bg-accent-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Code className="w-3 h-3 mr-1" />
                      {showMarkdown ? 'Table' : 'Markdown'}
                    </motion.button>
                  </div>
                )}
              </div>
              
              {currentStep === 'editing' && (
                <div className="flex gap-1">
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={addRow}
                    className="bg-green-500 dark:bg-success-600 text-white text-xs px-2 py-1 rounded-lg hover:bg-green-600 dark:hover:bg-success-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Row
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={removeRow}
                    className="bg-red-500 dark:bg-error-600 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-600 dark:hover:bg-error-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Minus className="w-3 h-3 mr-1" />
                    Row
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={addColumn}
                    className="bg-blue-500 dark:bg-accent-600 text-white text-xs px-2 py-1 rounded-lg hover:bg-blue-600 dark:hover:bg-accent-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Col
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={removeColumn}
                    className="bg-orange-500 dark:bg-warning-600 text-white text-xs px-2 py-1 rounded-lg hover:bg-orange-600 dark:hover:bg-warning-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Minus className="w-3 h-3 mr-1" />
                    Col
                  </motion.button>
                </div>
              )}
            </div>

            {/* Table Content */}
            <div className="p-3 max-h-32 overflow-auto">
              <AnimatePresence mode="wait">
                {!showMarkdown ? (
                  <motion.div
                    key="table"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-1"
                  >
                    {tableData.map((row, rowIndex) => (
                      <motion.div
                        key={rowIndex}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: rowIndex * 0.1 }}
                        className="flex gap-1"
                      >
                        {row.map((cell, colIndex) => (
                          <motion.div
                            key={`${rowIndex}-${colIndex}`}
                            className={`flex-1 relative ${
                              rowIndex === 0 
                                ? 'bg-gray-100 dark:bg-secondary-600 font-medium' 
                                : 'bg-gray-50 dark:bg-secondary-700 hover:bg-gray-100 dark:hover:bg-secondary-600/80'
                            } border border-gray-200 dark:border-secondary-600 rounded cursor-pointer transition-all duration-200`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                            whileHover={{ scale: currentStep === 'editing' ? 1.02 : 1 }}
                            whileTap={{ scale: currentStep === 'editing' ? 0.98 : 1 }}
                          >
                            {editingCell?.row === rowIndex && editingCell?.col === colIndex ? (
                              <input
                                type="text"
                                value={cellValue}
                                onChange={(e) => setCellValue(e.target.value)}
                                onBlur={() => handleCellEdit(cellValue)}
                                onKeyPress={(e) => e.key === 'Enter' && handleCellEdit(cellValue)}
                                className="w-full text-xs px-2 py-1 bg-white dark:bg-secondary-500 dark:text-gray-100 border-none outline-none rounded"
                                autoFocus
                              />
                            ) : (
                              <div className={`text-xs px-2 py-1 truncate ${rowIndex === 0 ? 'dark:text-gray-100' : 'dark:text-gray-300'}`}>
                                {cell}
                              </div>
                            )}
                            {selectedCell?.row === rowIndex && selectedCell?.col === colIndex && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 border-2 border-blue-400 dark:border-accent-500 rounded pointer-events-none"
                              />
                            )}
                          </motion.div>
                        ))}
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="markdown"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-gray-900 dark:bg-black rounded-lg p-3"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-300 dark:text-gray-400">Markdown Output</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </motion.button>
                    </div>
                    <pre className="text-xs text-green-400 dark:text-success-400 font-mono leading-relaxed overflow-x-auto">
                      {markdownOutput}
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

      {/* Floating Table Particles */}
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
              {['📊', '📋', '📝', '🔧', '⚡', '✨'][i]}
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
        className="absolute top-24 left-48 w-16 h-12"
        viewBox="0 0 64 48"
      >
        <motion.path
          d="M 0 24 Q 32 12 64 24"
          stroke="url(#tableGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4,4"
        />
        <defs>
          <linearGradient id="tableGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B7280" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
};

export default MarkdownTableAnimation; 