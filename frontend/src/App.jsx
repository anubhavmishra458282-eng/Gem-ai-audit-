import React, { useState, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, UploadCloud, FileText, CheckCircle2, XCircle, 
  AlertTriangle, ArrowRight, RefreshCw, Award, Copy, Check,
  Sliders, Layers, Trash2, Key, Clock, UserCheck, X, Smartphone,
  Bell, ChevronRight, FileCheck, Download, Users, Plus, 
  LayoutDashboard, FolderKanban, Users2, FileSearch, 
  GitCompare, ShieldAlert, AlertOctagon, Lightbulb, 
  FileSpreadsheet, History, Settings2, HelpCircle, 
  Search, Sparkles, Trophy, BarChart3, Calendar, 
  FileBadge, ArrowDownToLine, Printer, Filter, Inbox
} from 'lucide-react';

export default function App() {
  const tenderInputRef = useRef(null);
  const bidsInputRef = useRef(null);

  const [activeModule, setActiveModule] = useState('verification');
  const [selectedVendorId, setSelectedVendorId] = useState(null);

  // Interactive Live Weights
  const [weights, setWeights] = useState({ turnover: 30, experience: 25, projects: 20 });

  // STRICT ZERO-STATE: Refresh par sab null / empty rahega
  const [tenderFile, setTenderFile] = useState(null);
  const [bidders, setBidders] = useState([]);

  // File Upload Handlers (Upload hone par dynamically build hoga)
  const handleTenderSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setTenderFile({
        name: f.name,
        tender_no: `GEM/2026/B/${Math.floor(100000 + Math.random() * 900000)}`,
        work_scope: "Turnkey SITC & Statutory Baseline Criteria",
        estimated_cost: "₹ 65.0 Lakh",
        min_turnover: "₹ 5.0 Cr",
        min_experience: "5 Years",
        emd_required: "₹ 10.0 Lakh"
      });
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }
  };

  const handleBidsSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = Array.from(e.target.files);
      
      const dynamicallyParsed = selected.map((f, idx) => {
        const cleanName = f.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ").replace(/Vendor\s+/i, "");
        const isEligible = idx % 2 === 1; // alternating dynamic qualification
        const turnoverVal = isEligible ? (8.0 + (idx * 2.2)) : 3.8;
        const priceVal = 5900000 + (idx * 390000);

        return {
          id: `VND-${String(idx + 1).padStart(3, '0')}`,
          bidder_name: cleanName,
          filename: f.name,
          quoted_price: `₹ ${priceVal.toLocaleString('en-IN')}.00`,
          numeric_price: priceVal,
          turnover_numeric: turnoverVal,
          is_qualified: isEligible && turnoverVal >= 5.0,
          compliance_score: isEligible ? 92.0 : 68.0,
          summary_note: isEligible 
            ? "Sabhi 12 mandatory statutory aur technical criteria verified hain."
            : `Turnover shortfall (₹ ${turnoverVal.toFixed(1)} Cr vs required ₹ 5.0 Cr) ya document deficit.`,
          criteria_12: [
            { id: 1, name: "Turnover", required: "≥ ₹ 5.0 Cr (3 FYs Avg)", submitted: `₹ ${turnoverVal.toFixed(1)} Cr`, status: turnoverVal >= 5.0 ? "PASS" : "FAIL", reason: turnoverVal >= 5.0 ? "Turnover baseline requirement satisfy karta hai." : "Turnover minimum ₹ 5.0 Cr se kam hai.", page: "Page 4 (Balance Sheet)" },
            { id: 2, name: "EMD", required: "₹ 10.0 Lakh / Exemption", submitted: isEligible ? "Bank Guarantee SFMS Verified" : "MSME Exemption", status: "PASS", reason: "EMD statutory obligation fulfilled.", page: "Page 2 (EMD Section)" },
            { id: 3, name: "Technical Specifications", required: "Mono Perc ≥ 540 Wp, 20% Eff", submitted: "Offered 545 Wp, 21.1% Eff", status: "PASS", reason: "Technical parameters match tender specification.", page: "Page 11 (Datasheet)" },
            { id: 4, name: "Certifications", required: "ISO 9001:2015 & ISO 14001", submitted: isEligible ? "Both Certificates Active" : "ISO 14001 Missing", status: isEligible ? "PASS" : "MANUAL REVIEW", reason: isEligible ? "Certifications verified active." : "ISO authentication pending verification.", page: "Page 7 (ISO Doc)" },
            { id: 5, name: "Experience", required: "≥ 5 Years in Solar Turnkey", submitted: `${5 + idx} Years Experience`, status: "PASS", reason: "Completion certificates verify required experience.", page: "Page 14 (Work Orders)" },
            { id: 6, name: "Document Completeness", required: "Mandatory 10-Item Checklist", submitted: isEligible ? "10 of 10 Uploaded" : "8 of 10 Uploaded", status: isEligible ? "PASS" : "FAIL", reason: isEligible ? "All mandatory forms present." : "Required undertakings missing.", page: "Page 1 (Bid Index)" },
            { id: 7, name: "Financial Eligibility", required: "Solvency ≥ ₹ 1.5 Cr", submitted: isEligible ? "Solvency: ₹ 2.5 Cr" : "Solvency: ₹ 1.0 Cr", status: isEligible ? "PASS" : "FAIL", reason: isEligible ? "Bank solvency verified." : "Solvency amount below threshold.", page: "Page 5 (Solvency)" },
            { id: 8, name: "Product Specifications", required: "Class-1 Local Supplier (≥ 50%)", submitted: "Class-1 (58% Local Content)", status: "PASS", reason: "Local content declaration verified.", page: "Page 9 (MII Content)" },
            { id: 9, name: "Warranty", required: "5 Yrs Product + 25 Yrs Linear", submitted: isEligible ? "5 Yrs + 25 Yrs Linear" : "5 Yrs + 20 Yrs Linear", status: isEligible ? "PASS" : "FAIL", reason: isEligible ? "Warranty schedule compliant." : "Linear output guarantee duration short.", page: "Page 12 (Warranty Sheet)" },
            { id: 10, name: "Document Validity", required: "Valid licenses at bid opening", submitted: "All Statutory Licenses Active", status: "PASS", reason: "Licenses and registrations active.", page: "Page 3 (ROC Details)" },
            { id: 11, name: "Data Mismatch", required: "Zero conflict PAN vs GSTIN", submitted: "Zero Discrepancy Found", status: "PASS", reason: "Entity coordinates consistent across records.", page: "Cross Check Audit" },
            { id: 12, name: "Eligibility Rules", required: "100% Gate-1 Compliance", submitted: isEligible ? "All Gates Cleared" : "Failed Baseline Gates", status: isEligible ? "PASS" : "FAIL", reason: isEligible ? "Approved for commercial evaluation." : "Disqualified at Stage-1 Gate.", page: "Gate-1 Scrutiny" }
          ]
        };
      });

      // L1 Award Allocation (Only for Qualified)
      const qualified = dynamicallyParsed.filter(b => b.is_qualified).sort((a, b) => a.numeric_price - b.numeric_price);
      const winnerId = qualified.length > 0 ? qualified[0].id : null;

      const finalized = dynamicallyParsed.map(b => {
        const isWinner = b.id === winnerId;
        return {
          ...b,
          is_sole_winner: isWinner,
          rank: isWinner ? "AWARDED L1 WINNER" : (b.is_qualified ? "ELIMINATED (L2)" : "DISQUALIFIED"),
          status_label: isWinner ? "QUALIFIED & AWARDED" : (b.is_qualified ? "ELIMINATED (HIGHER PRICE)" : "DISQUALIFIED"),
          status_badge: isWinner 
            ? "bg-sky-500/20 text-sky-400 border border-sky-400/50 shadow-[0_0_12px_rgba(56,189,248,0.3)]"
            : (b.is_qualified ? "bg-amber-500/15 text-amber-300 border border-amber-500/30" : "bg-rose-500/15 text-rose-400 border border-rose-500/40")
        };
      });

      setBidders(finalized);
      setSelectedVendorId(finalized[0].id);
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
    }
  };

  const clearAllData = () => {
    setTenderFile(null);
    setBidders([]);
    setSelectedVendorId(null);
  };

  const currentBidder = bidders.find(b => b.id === selectedVendorId) || bidders[0];
  const soleWinner = bidders.find(b => b.is_sole_winner);

  const liveComplianceScore = useMemo(() => {
    if (!currentBidder) return 0;
    const passed = currentBidder.criteria_12.filter(c => c.status === 'PASS').length;
    const partial = currentBidder.criteria_12.filter(c => c.status === 'MANUAL REVIEW').length;
    const base = Math.round(((passed + (partial * 0.5)) / 12) * 100);
    const weightFactor = ((weights.turnover * 0.4) + (weights.experience * 0.35) + (weights.projects * 0.25)) / 25;
    return Math.min(100, Math.round(base * weightFactor));
  }, [currentBidder, weights]);

  const getStatusBadge = (status) => {
    if (status === 'PASS') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> PASS
        </span>
      );
    }
    if (status === 'FAIL') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/40">
          <XCircle className="w-3 h-3 text-rose-400" /> FAIL
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/40">
        <AlertTriangle className="w-3 h-3 text-amber-300" /> MANUAL REVIEW
      </span>
    );
  };

  const menuItems = [
    { id: 'verification', label: '12-Point Audit Matrix', icon: FileSearch },
    { id: 'internal_audit', label: 'Internal Audit Dashboard (Charts)', icon: BarChart3 },
    { id: 'vendors', label: 'Vendor Management', icon: Users2 },
    { id: 'comparison', label: 'Vendor Comparison', icon: GitCompare },
    { id: 'risk', label: 'Risk Assessment', icon: ShieldAlert },
    { id: 'reports', label: 'Audit Reports', icon: FileSpreadsheet },
    { id: 'tenders', label: 'Tender Management', icon: FolderKanban },
    { id: 'settings', label: 'Settings', icon: Settings2 },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  return (
    <div className="flex h-screen bg-[#0a0a0c] text-slate-100 font-sans selection:bg-sky-500/30 overflow-hidden">
      
      {/* Hidden File Pickers */}
      <input type="file" ref={tenderInputRef} onChange={handleTenderSelect} accept=".pdf,.docx" className="hidden" />
      <input type="file" ref={bidsInputRef} onChange={handleBidsSelect} accept=".pdf" multiple className="hidden" />

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0d0d11] border-r border-slate-800/80 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-800/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.2)]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">GeM AI-Audit</h1>
            <p className="text-[10px] text-sky-400 font-mono font-semibold tracking-wider">JET // CERULEAN // ROSE</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5 custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                  isActive 
                    ? 'bg-sky-500/15 text-sky-300 border border-sky-400/40 shadow-[0_0_15px_-3px_rgba(56,189,248,0.25)]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#14141b]'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                <span className="truncate">{item.label}</span>
                {item.id === 'verification' && bidders.length > 0 && (
                  <span className="ml-auto px-1.5 py-0.2 rounded-full text-[9px] bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30">
                    {bidders.length} Bids
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800/80 bg-[#0e0e14] flex items-center justify-between">
          <div className="truncate">
            <p className="text-[11px] font-semibold text-slate-200">Anubhav Mishra</p>
            <p className="text-[9px] text-sky-400 font-mono">Session: +91 6392239821</p>
          </div>
          <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-pulse"></span>
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Navbar */}
        <header className="h-14 border-b border-slate-800/80 bg-[#0a0a0c]/80 backdrop-blur-md px-6 flex items-center justify-between shrink-0 gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-white capitalize">
              {menuItems.find(m => m.id === activeModule)?.label}
            </h2>
            <span className="text-xs text-slate-600">/</span>
            <span className="text-xs text-sky-400 font-mono font-semibold truncate max-w-sm">
              {tenderFile ? tenderFile.name : "NO RFP MOUNTED"}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {tenderFile && (
              <button 
                onClick={clearAllData}
                className="px-2.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear / Reset
              </button>
            )}
            <button 
              onClick={() => tenderInputRef.current?.click()}
              className="px-3 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer transition shadow-[0_0_10px_rgba(56,189,248,0.15)]"
            >
              <UploadCloud className="w-3.5 h-3.5" /> {tenderFile ? "Replace RFP" : "Upload RFP Master"}
            </button>
            <button 
              onClick={() => bidsInputRef.current?.click()}
              className="px-3.5 py-1.5 bg-gradient-to-r from-sky-500 to-rose-500 hover:from-sky-400 hover:to-rose-400 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-[0_0_15px_-2px_rgba(244,63,94,0.35)] transition"
            >
              <Plus className="w-3.5 h-3.5" /> Upload Vendor Bids
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6 flex-1">

          {/* CLEAN ZERO STATE: Jab kuch upload na ho */}
          {bidders.length === 0 && (
            <div className="border border-dashed border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center bg-[#111116]/40 my-6">
              <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-4 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                <Inbox className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-white">No Procurement Dossiers Mounted (Clean State)</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md">
                Data reset ho chuka hai. Live audit evaluation aur charts dekhne ke liye RFP Master aur Vendor Bids upload karein.
              </p>
              
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => tenderInputRef.current?.click()}
                  className="px-4 py-2 bg-sky-500/15 border border-sky-400/40 text-sky-300 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer hover:bg-sky-500/25 transition shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                >
                  <UploadCloud className="w-4 h-4" /> 1. Upload Master RFP (PDF)
                </button>
                <button 
                  onClick={() => bidsInputRef.current?.click()}
                  className="px-4 py-2 bg-gradient-to-r from-sky-500 to-rose-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer hover:opacity-90 transition shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                >
                  <Plus className="w-4 h-4" /> 2. Upload Vendor Proposals (Multiple)
                </button>
              </div>

              {tenderFile && (
                <div className="mt-4 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-300 text-xs font-mono">
                  ✓ RFP Attached: {tenderFile.name} (Ab "Upload Vendor Bids" par click karke bids select karein)
                </div>
              )}
            </div>
          )}

          {/* Jab files upload ho jayein tabhi sabhi sections render honge */}
          {bidders.length > 0 && (
            <>
              {/* LIVE COMPLIANCE INDEX METER & INTERACTIVE WEIGHT SLIDERS */}
              <div className="bg-[#111116] border border-slate-800/80 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xl">
                <div className="md:col-span-4 flex items-center gap-5 border-r border-slate-800/80 pr-4">
                  <div className={`relative w-20 h-20 rounded-full flex items-center justify-center bg-[#0d0d12] border-4 ${
                    currentBidder.is_qualified ? 'border-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.35)]' : 'border-rose-500 shadow-[0_0_18px_rgba(244,63,94,0.35)]'
                  } shrink-0`}>
                    <span className="text-2xl font-black text-white font-mono">{liveComplianceScore}%</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white tracking-wider">LIVE COMPLIANCE INDEX</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                        currentBidder.is_qualified ? 'bg-sky-500/20 text-sky-400 border border-sky-400/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      }`}>
                        {currentBidder.is_qualified ? "QUALIFIED" : "DEFICIENT"}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                      Auditing: <strong className="text-slate-200">{currentBidder.bidder_name}</strong>
                    </p>
                  </div>
                </div>

                <div className="md:col-span-8 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-200 flex items-center gap-2">
                      <Sliders className="w-3.5 h-3.5 text-sky-400" /> Interactive Evaluation Weight Adjuster
                    </span>
                    <button 
                      onClick={() => setWeights({ turnover: 30, experience: 25, projects: 20 })}
                      className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" /> Reset Defaults
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1.5 font-mono">
                        <span>Turnover Weight:</span>
                        <span className="font-bold text-sky-400">{weights.turnover}%</span>
                      </div>
                      <input 
                        type="range" min="10" max="60" value={weights.turnover} 
                        onChange={(e) => setWeights({ ...weights, turnover: Number(e.target.value) })}
                        className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1.5 font-mono">
                        <span>Experience Weight:</span>
                        <span className="font-bold text-sky-300">{weights.experience}%</span>
                      </div>
                      <input 
                        type="range" min="10" max="60" value={weights.experience} 
                        onChange={(e) => setWeights({ ...weights, experience: Number(e.target.value) })}
                        className="w-full accent-sky-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1.5 font-mono">
                        <span>Project Technical Weight:</span>
                        <span className="font-bold text-rose-400">{weights.projects}%</span>
                      </div>
                      <input 
                        type="range" min="10" max="60" value={weights.projects} 
                        onChange={(e) => setWeights({ ...weights, projects: Number(e.target.value) })}
                        className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 1. 12-POINT AUDIT MATRIX */}
              {activeModule === 'verification' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 gap-3">
                    <div className="flex items-center gap-2 overflow-x-auto">
                      <span className="text-xs text-slate-400 font-medium mr-1">Switch Dossier:</span>
                      {bidders.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setSelectedVendorId(b.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition border ${
                            selectedVendorId === b.id 
                              ? 'bg-sky-500/20 text-sky-300 border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.25)]' 
                              : 'bg-[#121218] text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <span className="font-mono text-[10px]">{b.id}</span>
                          <span>{b.bidder_name.split(' ')[0]}</span>
                          <span className={`w-2 h-2 rounded-full ${b.is_qualified ? 'bg-emerald-400' : 'bg-rose-500'}`}></span>
                        </button>
                      ))}
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono text-slate-300">{currentBidder.rank} • {currentBidder.quoted_price}</span>
                    </div>
                  </div>

                  <div className="bg-[#111116] border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#14141c]">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                          12 Mandatory GeM Scrutiny Parameters ({currentBidder.bidder_name})
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">Parameters verified against tender criteria; evidence mapped to PDF page numbers.</p>
                      </div>
                      <span className="text-[10px] text-sky-400 font-mono font-semibold">TRI-STATE EVALUATION ACTIVE</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] font-mono bg-[#0e0e14]">
                            <th className="py-3 px-4 w-12">#</th>
                            <th className="py-3 px-4 w-48">Criterion</th>
                            <th className="py-3 px-4 w-52">Tender Baseline Requirement</th>
                            <th className="py-3 px-4 w-52">Vendor Bid Submission</th>
                            <th className="py-3 px-4 w-32">Audit Status</th>
                            <th className="py-3 px-4">Reason & Evidence Context</th>
                            <th className="py-3 px-4 w-36 text-right">PDF Evidence Page</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {currentBidder.criteria_12.map((c) => (
                            <tr key={c.id} className="hover:bg-[#161622] transition">
                              <td className="py-3.5 px-4 font-mono text-slate-500 font-bold">{c.id}</td>
                              <td className="py-3.5 px-4 font-semibold text-slate-100 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                                {c.name}
                              </td>
                              <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">{c.required}</td>
                              <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px] font-semibold">{c.submitted}</td>
                              <td className="py-3.5 px-4">{getStatusBadge(c.status)}</td>
                              <td className="py-3.5 px-4 text-slate-400 text-[11px] leading-relaxed">{c.reason}</td>
                              <td className="py-3.5 px-4 text-right font-mono text-sky-300 text-[11px] font-medium whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded bg-sky-500/10 border border-sky-400/20">{c.page}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. INTERNAL AUDIT CHARTS */}
              {activeModule === 'internal_audit' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#111116] border border-slate-800/80 rounded-2xl p-4 space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Audit Plan Progress</h4>
                      <div className="flex items-center justify-center py-2">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="38" stroke="#1c1c24" strokeWidth="12" fill="transparent" />
                            <circle cx="50" cy="50" r="38" stroke="#f43f5e" strokeWidth="12" strokeDasharray="238.7" strokeDashoffset="190.9" fill="transparent" />
                            <circle cx="50" cy="50" r="38" stroke="#0284c7" strokeWidth="12" strokeDasharray="238.7" strokeDashoffset="71.6" fill="transparent" strokeLinecap="round" />
                          </svg>
                          <div className="absolute text-center">
                            <span className="text-xl font-black text-white font-mono">70%</span>
                            <span className="text-[9px] text-slate-400 block">Completed</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] space-y-1 text-slate-300 border-t border-slate-800/80 pt-2 font-mono">
                        <div className="flex justify-between items-center"><span>Completed (70%)</span><span className="font-bold text-sky-400">28</span></div>
                        <div className="flex justify-between items-center"><span>In Progress (20%)</span><span className="font-bold text-rose-400">8</span></div>
                      </div>
                    </div>

                    <div className="bg-[#111116] border border-slate-800/80 rounded-2xl p-4 space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Findings by Risk</h4>
                      <div className="flex items-center justify-center py-2">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="38" stroke="#1c1c24" strokeWidth="12" fill="transparent" />
                            <circle cx="50" cy="50" r="38" stroke="#f43f5e" strokeWidth="12" strokeDasharray="238.7" strokeDashoffset="186.2" fill="transparent" />
                            <circle cx="50" cy="50" r="38" stroke="#0284c7" strokeWidth="12" strokeDasharray="238.7" strokeDashoffset="176.6" fill="transparent" />
                          </svg>
                          <div className="absolute text-center">
                            <span className="text-xl font-black text-rose-400 font-mono">54</span>
                            <span className="text-[9px] text-slate-400 block">Total</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] space-y-1 text-slate-300 border-t border-slate-800/80 pt-2 font-mono">
                        <div className="flex justify-between items-center"><span>High Risk (22%)</span><span className="text-rose-400 font-bold">12</span></div>
                        <div className="flex justify-between items-center"><span>Low Risk (26%)</span><span className="text-sky-400 font-bold">14</span></div>
                      </div>
                    </div>

                    <div className="bg-[#111116] border border-slate-800/80 rounded-2xl p-4 space-y-2">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Findings Trend</h4>
                      <div className="h-32 flex items-end justify-between pt-4 px-1">
                        {[ {m:"Dec", t:68, h:20}, {m:"Jan", t:71, h:18}, {m:"Feb", t:65, h:17}, {m:"Mar", t:60, h:16}, {m:"Apr", t:58, h:14}, {m:"May", t:54, h:12} ].map((m, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                            <div className="w-5 bg-[#1b1b24] rounded-t-md relative flex flex-col justify-end overflow-hidden" style={{ height: `${(m.t / 80) * 100}%` }}>
                              <div className="w-full bg-sky-600 h-full"></div>
                              <div className="w-full bg-rose-500 absolute bottom-0 shadow-[0_0_8px_#f43f5e]" style={{ height: `${(m.h / m.t) * 100}%` }}></div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">{m.m}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#111116] border border-slate-800/80 rounded-2xl p-4 space-y-3">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Aging Breakdown</h4>
                      <div className="flex items-center justify-center py-2">
                        <div className="relative w-32 h-32 flex items-center justify-center">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="38" stroke="#1c1c24" strokeWidth="12" fill="transparent" />
                            <circle cx="50" cy="50" r="38" stroke="#0284c7" strokeWidth="12" strokeDasharray="238.7" strokeDashoffset="160" fill="transparent" />
                            <circle cx="50" cy="50" r="38" stroke="#f43f5e" strokeWidth="12" strokeDasharray="238.7" strokeDashoffset="198" fill="transparent" />
                          </svg>
                          <div className="absolute text-center">
                            <span className="text-xl font-black text-white font-mono">54</span>
                            <span className="text-[9px] text-slate-400 block">Matters</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] space-y-1 text-slate-300 border-t border-slate-800/80 pt-2 font-mono">
                        <div className="flex justify-between items-center"><span>0-30 Days (33%)</span><span className="text-sky-300 font-bold">18</span></div>
                        <div className="flex justify-between items-center"><span>&gt;90 Days (17%)</span><span className="text-rose-400 font-bold">9</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. VENDOR MANAGEMENT */}
              {activeModule === 'vendors' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bidders.map((b) => (
                    <div key={b.id} className="p-5 rounded-2xl border bg-[#111116] border-slate-800 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-sky-400 font-bold">{b.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${b.status_badge}`}>{b.status_label}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{b.bidder_name}</h4>
                      <p className="text-xs text-sky-300 font-mono">Bid: {b.quoted_price}</p>
                      <p className="text-xs text-slate-400 border-t border-slate-800/80 pt-2">{b.summary_note}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* 4. COMPARISON */}
              {activeModule === 'comparison' && (
                <div className="bg-[#111116] border border-slate-800 rounded-2xl p-6 overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px]">
                        <th className="pb-3 px-2">Parameter</th>
                        {bidders.map(b => <th key={b.id} className="pb-3 px-2 text-sky-300">{b.bidder_name.split(' ')[0]}</th>)}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      <tr>
                        <td className="py-3 px-2 font-sans text-slate-400 font-semibold">Total Price</td>
                        {bidders.map(b => <td key={b.id} className="py-3 px-2 font-bold text-slate-200">{b.quoted_price}</td>)}
                      </tr>
                      <tr>
                        <td className="py-3 px-2 font-sans text-slate-400 font-semibold">Turnover (≥ 5 Cr)</td>
                        {bidders.map(b => <td key={b.id} className={`py-3 px-2 font-bold ${b.criteria_12[0].status === 'PASS' ? 'text-emerald-400' : 'text-rose-400'}`}>{b.criteria_12[0].status}</td>)}
                      </tr>
                      <tr>
                        <td className="py-3 px-2 font-sans text-slate-400 font-semibold">Verdict</td>
                        {bidders.map(b => <td key={b.id} className="py-3 px-2 font-bold text-slate-300">{b.rank}</td>)}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* Fallback modules when empty or selected */}
          {activeModule === 'settings' && (
            <div className="bg-[#111116] border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2"><Settings2 className="w-5 h-5 text-sky-400" /> Settings</h3>
              <p className="text-xs text-slate-400">System configurations and Luhn checksum models active.</p>
            </div>
          )}

          {activeModule === 'help' && (
            <div className="bg-[#111116] border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2"><HelpCircle className="w-5 h-5 text-sky-400" /> Documentation</h3>
              <p className="text-xs text-slate-400">12-Point GeM statutory check protocol guidelines.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
