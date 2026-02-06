import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Puzzle, RotateCcw, Trash2, Plus, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { dnaToRna, translateToProtein, getCodons, codonTable } from "@/lib/codon-table";

const ORIGINAL_DNA = "ATGGCTTACGGAAAGCTG";

export default function ReadingFramePuzzle() {
  const [dnaSequence, setDnaSequence] = useState(ORIGINAL_DNA);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showInsert, setShowInsert] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const rnaSequence = dnaToRna(dnaSequence);
  const codons = getCodons(rnaSequence);
  const aminoAcids = translateToProtein(rnaSequence);

  const originalRna = dnaToRna(ORIGINAL_DNA);
  const originalAminoAcids = translateToProtein(originalRna);

  const isFrameShifted = (ORIGINAL_DNA.length - dnaSequence.length) % 3 !== 0;
  const deletionCount = ORIGINAL_DNA.length - dnaSequence.length;
  const insertionCount = Math.max(0, dnaSequence.length - ORIGINAL_DNA.length);

  const handleNucleotideClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
    setShowInsert(false);
  };

  const deleteNucleotide = useCallback(() => {
    if (selectedIndex === null || dnaSequence.length <= 3) return;
    setHistory([...history, dnaSequence]);
    const newSequence = dnaSequence.slice(0, selectedIndex) + dnaSequence.slice(selectedIndex + 1);
    setDnaSequence(newSequence);
    setSelectedIndex(null);
  }, [selectedIndex, dnaSequence, history]);

  const insertNucleotide = useCallback((nucleotide: string) => {
    if (selectedIndex === null) return;
    setHistory([...history, dnaSequence]);
    const newSequence = dnaSequence.slice(0, selectedIndex + 1) + nucleotide + dnaSequence.slice(selectedIndex + 1);
    setDnaSequence(newSequence);
    setSelectedIndex(null);
    setShowInsert(false);
  }, [selectedIndex, dnaSequence, history]);

  const reset = () => {
    setDnaSequence(ORIGINAL_DNA);
    setSelectedIndex(null);
    setShowInsert(false);
    setHistory([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setDnaSequence(previousState);
    setHistory(history.slice(0, -1));
    setSelectedIndex(null);
  };

  const getNucleotideColor = (nucleotide: string) => {
    switch (nucleotide) {
      case "A": return "bg-chart-1 text-white";
      case "T": return "bg-chart-2 text-white";
      case "G": return "bg-chart-3 text-white";
      case "C": return "bg-chart-4 text-white";
      case "U": return "bg-chart-2 text-white";
      default: return "bg-muted";
    }
  };

  const getCodonColor = (index: number) => {
    const colors = [
      "bg-chart-1/20 border-chart-1/30",
      "bg-chart-2/20 border-chart-2/30",
      "bg-chart-3/20 border-chart-3/30",
      "bg-chart-4/20 border-chart-4/30",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-md bg-accent">
            <Puzzle className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Reading Frame Puzzle</h1>
            <p className="text-muted-foreground">Explore how mutations affect protein synthesis</p>
          </div>
        </div>
      </div>

      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium mb-1">How to use this puzzle:</p>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>1. Click on any nucleotide in the DNA sequence to select it</li>
                <li>2. Use the Delete button to remove it, or Insert to add a nucleotide after it</li>
                <li>3. Watch how the reading frame and amino acid sequence change</li>
                <li>4. Compare to the original protein to see the effect of your mutations</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2 items-center">
        <Button 
          variant="outline" 
          onClick={reset} 
          data-testid="button-reset"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
        <Button 
          variant="outline" 
          onClick={undo} 
          disabled={history.length === 0}
          data-testid="button-undo"
        >
          Undo
        </Button>
        <Button 
          variant="destructive" 
          onClick={deleteNucleotide} 
          disabled={selectedIndex === null || dnaSequence.length <= 3}
          data-testid="button-delete"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Selected
        </Button>
        <Button 
          onClick={() => setShowInsert(!showInsert)} 
          disabled={selectedIndex === null}
          data-testid="button-insert"
        >
          <Plus className="h-4 w-4 mr-2" />
          Insert After
        </Button>
        {showInsert && selectedIndex !== null && (
          <div className="flex gap-1">
            {["A", "T", "G", "C"].map((n) => (
              <Button 
                key={n} 
                size="sm" 
                className={getNucleotideColor(n)}
                onClick={() => insertNucleotide(n)}
                data-testid={`button-insert-${n}`}
              >
                {n}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {isFrameShifted ? (
          <Badge variant="destructive" className="gap-1">
            <AlertTriangle className="h-3 w-3" />
            Frame Shifted!
          </Badge>
        ) : (
          <Badge className="gap-1 bg-chart-1">
            <CheckCircle className="h-3 w-3" />
            Frame Intact
          </Badge>
        )}
        {deletionCount > 0 && (
          <Badge variant="secondary">{deletionCount} deletion{deletionCount !== 1 ? 's' : ''}</Badge>
        )}
        {insertionCount > 0 && (
          <Badge variant="secondary">{insertionCount} insertion{insertionCount !== 1 ? 's' : ''}</Badge>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">DNA Sequence (Coding Strand)</CardTitle>
          <CardDescription>Click a nucleotide to select it, then delete or insert</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {dnaSequence.split("").map((nucleotide, index) => (
              <button
                key={index}
                onClick={() => handleNucleotideClick(index)}
                className={`
                  w-10 h-10 rounded-md font-mono font-bold text-lg transition-all
                  ${getNucleotideColor(nucleotide)}
                  ${selectedIndex === index ? "ring-2 ring-foreground ring-offset-2 scale-110" : "hover:scale-105"}
                `}
                data-testid={`nucleotide-${index}`}
              >
                {nucleotide}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Position: {selectedIndex !== null ? selectedIndex + 1 : "None selected"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">mRNA Sequence & Codons</CardTitle>
          <CardDescription>Transcribed from DNA (T → U), grouped into codons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {codons.map((codon, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-md border font-mono text-lg ${getCodonColor(index)}`}
              >
                {codon.split("").map((n, i) => (
                  <span key={i} className="font-bold">{n}</span>
                ))}
              </div>
            ))}
            {rnaSequence.length % 3 !== 0 && (
              <div className="px-3 py-2 rounded-md border border-destructive/30 bg-destructive/10 font-mono text-lg">
                {rnaSequence.slice(codons.length * 3).split("").map((n, i) => (
                  <span key={i} className="font-bold text-destructive">{n}</span>
                ))}
                <span className="text-xs text-destructive ml-1">(incomplete)</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Amino Acid Sequence</CardTitle>
          <CardDescription>Translated from mRNA codons</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {aminoAcids.map((aa, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-md border font-mono ${
                  aa === "STOP" 
                    ? "bg-destructive/20 border-destructive/30 text-destructive" 
                    : getCodonColor(index)
                }`}
              >
                {aa}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">Comparison with Original</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-md bg-card border">
              <p className="text-sm font-medium mb-2">Original Protein:</p>
              <div className="flex flex-wrap gap-1">
                {originalAminoAcids.map((aa, index) => (
                  <Badge key={index} variant="secondary" className="font-mono">
                    {aa}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-md bg-card border">
              <p className="text-sm font-medium mb-2">Mutated Protein:</p>
              <div className="flex flex-wrap gap-1">
                {aminoAcids.map((aa, index) => {
                  const isChanged = aa !== originalAminoAcids[index];
                  return (
                    <Badge 
                      key={index} 
                      variant={isChanged ? "destructive" : "secondary"}
                      className="font-mono"
                    >
                      {aa}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-md bg-card border">
            <p className="text-sm font-medium mb-2">Analysis:</p>
            {dnaSequence === ORIGINAL_DNA ? (
              <p className="text-sm text-muted-foreground">
                No mutations. The sequence matches the original.
              </p>
            ) : isFrameShifted ? (
              <div className="text-sm text-destructive space-y-1">
                <p className="font-medium">Frameshift Mutation Detected!</p>
                <p className="text-muted-foreground">
                  The number of nucleotides inserted or deleted is not a multiple of 3. 
                  This shifts the reading frame and causes all downstream codons to be misread, 
                  producing a completely different (and usually non-functional) protein.
                </p>
              </div>
            ) : (
              <div className="text-sm text-chart-1 space-y-1">
                <p className="font-medium">In-frame Mutation</p>
                <p className="text-muted-foreground">
                  The reading frame is preserved. Changes are limited to specific amino acids 
                  rather than affecting the entire downstream sequence.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Codon Reference Table</CardTitle>
          <CardDescription>Common codons and their amino acids</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 text-xs">
            {Object.entries(codonTable).slice(0, 16).map(([codon, data]) => (
              <div key={codon} className="p-2 rounded bg-muted/50 text-center">
                <p className="font-mono font-bold">{codon}</p>
                <p className="text-muted-foreground">{data.abbreviation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
