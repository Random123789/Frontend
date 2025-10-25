import { useState, useRef } from 'react';
import { FileText, Upload, LogOut, CheckCircle2, Clock3, Sparkles, FileCheck, User as UserIcon } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import type { User, Contract } from '../App';
import { ScaleIcon } from './ScaleIcon';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

type DashboardProps = {
  user: User;
  contracts: Contract[];
  onLogout: () => void;
  onUpdateProfile: (name: string, email: string) => void;
  onUploadContract: (file: File) => void;
  onAnalyzeContract: (contractId: string) => void;
  onViewAnalysis: (contract: Contract) => void;
};

export function Dashboard({
  user,
  contracts,
  onLogout,
  onUpdateProfile,
  onUploadContract,
  onAnalyzeContract,
  onViewAnalysis,
}: DashboardProps) {
  const [dragActive, setDragActive] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      onUploadContract(file);
      toast.success('Contract uploaded successfully! Click "Analyze Contract" to start analysis.');
    } else {
      toast.error('Please upload a PDF file');
    }
  };

  const completedContracts = contracts.filter(c => c.status === 'completed' && c.analyzed);

  const handleSaveProfile = () => {
    if (!editName.trim() || !editEmail.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    if (!editEmail.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    onUpdateProfile(editName.trim(), editEmail.trim());
    setProfileDialogOpen(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-teal-600 to-teal-700 rounded-xl flex items-center justify-center shadow-md shadow-teal-200">
              <ScaleIcon size={22} className="text-amber-100" />
            </div>
            <span className="text-xl text-stone-800 tracking-tight">LegaLens</span>
          </div>
          <div className="flex items-center gap-4">
            <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
              <DialogTrigger asChild>
                <button 
                  className="text-right hover:bg-stone-100 rounded-lg px-3 py-2 transition-colors"
                  onClick={() => {
                    setEditName(user.name);
                    setEditEmail(user.email);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-sm text-stone-900">{user.name}</div>
                      <div className="text-xs text-stone-500">{user.email}</div>
                    </div>
                    <UserIcon className="h-4 w-4 text-stone-400" />
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Update your name and email address
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setProfileDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Upload Section */}
        <div className="mb-12">
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
              dragActive
                ? 'border-teal-500 bg-teal-50/50 shadow-lg'
                : 'border-stone-300 bg-white shadow-sm'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="h-16 w-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-200">
              <Upload className="h-8 w-8 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-xl mb-2 text-stone-900">Upload Your Contract</h3>
            <p className="text-stone-600 mb-6 leading-relaxed">
              Drag and drop your PDF contract here, or click to browse
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-teal-600 hover:bg-teal-700"
            >
              Choose File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf"
              onChange={handleChange}
            />
            <p className="text-xs text-stone-500 mt-4">
              Get a free AI-powered summary • PDF files only
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-stone-600">Total Contracts</span>
              <div className="h-11 w-11 bg-gradient-to-br from-teal-500 to-teal-700 rounded-xl flex items-center justify-center shadow-md shadow-teal-200/50">
                <FileText className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="text-3xl text-stone-900">{contracts.length}</div>
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className="text-stone-600">Analyses Completed</span>
              <div className="h-11 w-11 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md shadow-amber-200/50">
                <FileCheck className="h-5 w-5 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="text-3xl text-stone-900">{completedContracts.length}</div>
          </div>
        </div>

        {/* Contracts List */}
        <div>
          <h2 className="text-2xl mb-4 text-stone-900">Your Contracts</h2>
          
          {/* Info Banner */}
          <div className="bg-gradient-to-r from-teal-50 to-amber-50/50 border border-teal-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 bg-teal-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="h-4 w-4 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-sm font-medium text-stone-900 mb-1">Upgrade for Full Access</h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Pay a <span className="font-medium text-teal-700">one-time fee of $0.99</span> per contract to unlock both detailed Review and Comparison features. 
                  Only upgraded (paid) contracts can be compared with each other.
                </p>
              </div>
            </div>
          </div>

          {contracts.length === 0 ? (
            <div className="bg-white border border-dashed border-stone-300 rounded-2xl p-12 text-center">
              <div className="h-16 w-16 bg-stone-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-stone-400" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl mb-2 text-stone-900">No contracts yet</h3>
              <p className="text-stone-600">
                Upload your first contract to get started
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contracts.map(contract => (
                <div
                  key={contract.id}
                  className="bg-white border border-stone-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center shadow-md ${
                      contract.status === 'uploaded'
                        ? 'bg-gradient-to-br from-stone-400 to-stone-500 shadow-stone-200/50'
                        : 'bg-gradient-to-br from-teal-500 to-teal-700 shadow-teal-200/50'
                    }`}>
                      <FileText className="h-5 w-5 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col gap-1.5 items-end">
                      <div
                        className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                          contract.status === 'completed'
                            ? 'bg-teal-50 text-teal-700 border border-teal-200'
                            : contract.status === 'processing'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : contract.status === 'uploaded'
                            ? 'bg-stone-50 text-stone-700 border border-stone-200'
                            : 'bg-red-50 text-red-700 border border-red-200'
                        }`}
                      >
                        {contract.status === 'completed' && (
                          <div className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />
                            <span>Ready</span>
                          </div>
                        )}
                        {contract.status === 'processing' && (
                          <div className="flex items-center gap-1">
                            <Clock3 className="h-3 w-3" strokeWidth={2.5} />
                            <span>Analyzing</span>
                          </div>
                        )}
                        {contract.status === 'uploaded' && (
                          <div className="flex items-center gap-1">
                            <Upload className="h-3 w-3" strokeWidth={2.5} />
                            <span>Uploaded</span>
                          </div>
                        )}
                        {contract.status === 'failed' && <span>Failed</span>}
                      </div>
                      {contract.status === 'completed' && (
                        <div className="flex flex-col gap-1 items-end">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                            contract.hasReview
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-teal-50 text-teal-700 border border-teal-200'
                          }`}>
                            {contract.hasReview ? 'Paid' : 'Free'}
                          </span>
                          <div className="flex gap-1">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                              contract.summary
                                ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                : 'bg-stone-100 text-stone-500 border border-stone-200'
                            }`}>
                              Summary {contract.summary ? '✓' : ''}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                              contract.hasReview
                                ? 'bg-teal-50 text-teal-700 border border-teal-200'
                                : 'bg-stone-100 text-stone-500 border border-stone-200'
                            }`}>
                              Review {contract.hasReview ? '✓' : ''}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="mb-2 text-stone-900 truncate">{contract.name}</h3>
                  <p className="text-xs text-stone-500 mb-4">
                    Uploaded {new Date(contract.uploadDate).toLocaleDateString()}
                  </p>

                  {contract.status === 'completed' && contract.summary && (
                    <div className="mb-4 p-3 bg-stone-50 rounded-xl">
                      <p className="text-xs text-stone-600 mb-1">Job Title</p>
                      <p className="text-sm text-stone-900">{contract.summary.jobTitle}</p>
                    </div>
                  )}

                  <Button
                    className={`w-full ${
                      contract.status === 'uploaded'
                        ? 'bg-amber-600 hover:bg-amber-700'
                        : 'bg-teal-600 hover:bg-teal-700'
                    }`}
                    disabled={contract.status === 'processing' || contract.status === 'failed'}
                    onClick={() => {
                      if (contract.status === 'uploaded') {
                        onAnalyzeContract(contract.id);
                        toast.success('Starting analysis...');
                      } else if (contract.status === 'completed') {
                        onViewAnalysis(contract);
                      }
                    }}
                  >
                    {contract.status === 'uploaded' && (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Analyze Contract
                      </>
                    )}
                    {contract.status === 'processing' && 'Analyzing...'}
                    {contract.status === 'completed' && (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        View Analysis
                      </>
                    )}
                    {contract.status === 'failed' && 'Failed'}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
