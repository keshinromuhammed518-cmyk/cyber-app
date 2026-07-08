import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ShieldAlert, ShieldCheck, Search, Loader2, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { analyzeEmail, AnalysisResult } from "@/lib/email-logic";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const EmailAnalyzer = () => {
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) {
      toast.error("Please provide email content or headers to analyze.");
      return;
    }

    setIsAnalyzing(true);
    setResult(null);
    
    try {
      const report = await analyzeEmail(input);
      setResult(report);
      toast.success("Analysis complete.");
    } catch (error) {
      toast.error("Failed to analyze email. System error.");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-widest">
          <Shield className="w-3 h-3" />
          Neural Analysis Engine v4.0
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
          Ghost Phish Detector
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Scrutinize suspicious communications. Our engine analyzes headers, metadata, and linguistic patterns to expose fraudulent intent.
        </p>
      </motion.div>

      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl shadow-2xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Search className="w-5 h-5 text-cyan-400" />
            Ingestion Terminal
          </CardTitle>
          <CardDescription className="text-slate-500">
            Paste the full email headers or body content for deep-packet scrutiny.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="PASTE EMAIL CONTENT OR HEADERS HERE..."
            className="min-h-[200px] bg-slate-950/50 border-slate-800 text-cyan-50 font-mono text-sm focus:ring-cyan-500/50 resize-none transition-all duration-300"
          />
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            className="w-full h-12 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all duration-300 group"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                SCRUTINIZING DATA PACKETS...
              </>
            ) : (
              <>
                INITIATE ANALYSIS
                <Shield className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">Security Report</CardTitle>
                      <CardDescription className="text-slate-500">Detailed breakdown of identified risk vectors.</CardDescription>
                    </div>
                    <Badge className={`
                      px-4 py-1.5 text-sm font-bold uppercase tracking-wider
                      ${result.status === 'Authentic' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 
                        result.status === 'Suspicious' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 
                        'bg-rose-500/20 text-rose-400 border-rose-500/30'}
                    `}>
                      {result.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-4">
                    {result.status === 'Authentic' ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 mt-1 shrink-0" />
                    ) : (
                      <AlertTriangle className={`w-6 h-6 mt-1 shrink-0 ${result.status === 'Critical' ? 'text-rose-500' : 'text-amber-500'}`} />
                    )}
                    <div>
                      <h4 className="font-semibold text-white">Executive Summary</h4>
                      <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                        {result.summary}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest">Risk Analysis Nodes</h4>
                    <div className="grid gap-3">
                      {result.flags.map((flag, idx) => (
                        <div key={idx} className={`flex items-center justify-between p-3 rounded border transition-colors ${flag.detected ? 'bg-slate-800/30 border-slate-700' : 'opacity-40 grayscale border-transparent'}`}>
                          <div className="flex items-center gap-3">
                            {flag.detected ? <AlertTriangle className="w-4 h-4 text-amber-500" /> : <ShieldCheck className="w-4 h-4 text-emerald-500" />}
                            <div>
                              <p className={`text-sm font-medium ${flag.detected ? 'text-white' : 'text-slate-500'}`}>{flag.label}</p>
                              {flag.detected && <p className="text-[10px] text-slate-400 uppercase">{flag.severity} Severity Threat</p>}
                            </div>
                          </div>
                          {flag.detected && (
                            <div className="group relative">
                              <Info className="w-4 h-4 text-slate-500 cursor-help" />
                              <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-900 border border-slate-700 rounded text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                                {flag.description}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-xl flex flex-col justify-center items-center p-8 text-center space-y-6">
                <div className="relative">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-slate-800"
                    />
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="377"
                      initial={{ strokeDashoffset: 377 }}
                      animate={{ strokeDashoffset: 377 - (377 * result.score) / 100 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={`${result.score > 75 ? 'text-emerald-500' : result.score > 40 ? 'text-amber-500' : 'text-rose-500'}`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-white">{result.score}%</span>
                    <span className="text-[10px] text-slate-500 uppercase font-mono tracking-tighter">Confidence</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    {result.score > 75 ? "Safe Passage" : result.score > 40 ? "Warning Alert" : "Threat Detected"}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed px-2">
                    Our heuristics engine has computed a safety rating based on protocol alignment and content scrutiny.
                  </p>
                </div>
                
                <div className="w-full pt-4">
                  <Progress value={result.score} className="h-1 bg-slate-800" />
                </div>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};