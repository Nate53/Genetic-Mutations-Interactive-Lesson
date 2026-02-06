import { useState, useCallback, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  GraduationCap, ArrowRight, ArrowLeft, RotateCcw, Trash2, Plus, Replace,
  CheckCircle, XCircle, AlertTriangle, Info, ChevronRight, Lightbulb, BookOpen
} from "lucide-react";
import { dnaToRna, translateToProtein, getCodons, codonTable } from "@/lib/codon-table";
import { Link } from "wouter";

// ── Lesson definitions ──────────────────────────────────────────────────

interface LessonStep {
  instruction: string;
  hint: string;
  validate: (dna: string, original: string, actions: ActionRecord[]) => boolean;
  explanation: string;
}

interface ActionRecord {
  type: "delete" | "insert" | "substitute";
  position: number;
  nucleotide?: string;
  original?: string;
}

interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  icon: "silent" | "missense" | "nonsense" | "insertion" | "deletion";
  color: string;
  originalDna: string;
  overview: string;
  conceptReview: string;
  steps: LessonStep[];
  successMessage: string;
}

const LESSONS: Lesson[] = [
  {
    id: "silent",
    title: "Silent Mutation",
    subtitle: "Change the DNA without changing the protein",
    icon: "silent",
    color: "chart-1",
    originalDna: "ATGGCTTACGGAAAGCTG",
    overview:
      "A silent mutation changes a nucleotide in the DNA, which changes the mRNA codon, but the new codon still codes for the SAME amino acid. This happens because of the degeneracy (redundancy) of the genetic code — multiple codons can code for the same amino acid.",
    conceptReview:
      "The Wobble Hypothesis explains why the 3rd position of a codon is often flexible. For example, GGU, GGC, GGA, and GGG all code for Glycine. A change at the 3rd position of such a codon is \"silent\" — it doesn't change the protein.",
    steps: [
      {
        instruction:
          "Look at the DNA sequence below: ATG GCT TAC GGA AAG CTG. The 4th codon (positions 10-12) is GGA, which transcribes to mRNA codon GGA → Glycine. Your task: change the last nucleotide of this codon from 'A' to 'G'. Click the 'A' at position 12, then click 'Substitute', then click 'G'. After transcription, mRNA will change from GGA → GGG. Both codons code for Glycine — the protein stays the same!",
        hint: "Count from left: A(1) T(2) G(3) G(4) C(5) T(6) T(7) A(8) C(9) G(10) G(11) A(12). Select position 12, use Substitute, then choose G. The codon GGG also codes for Glycine (Gly), so the protein doesn't change.",
        validate: (dna, original, _actions) => {
          return dna.length === original.length && dna[11] === "G" && dna !== original;
        },
        explanation:
          "The mRNA codon changed from GGA → GGG, but both code for Glycine. The protein is identical — this is a silent mutation! This happens because of the degeneracy of the genetic code (Wobble Hypothesis). The 3rd position of a codon is the most flexible, which is why changes there are most likely to be silent.",
      },
    ],
    successMessage:
      "Excellent! You just created a silent mutation. The DNA changed (A → G), the mRNA codon changed (GGA → GGG), but the amino acid stayed the same (Glycine). On an exam, remember: silent mutations demonstrate the degeneracy/redundancy of the genetic code.",
  },
  {
    id: "missense",
    title: "Missense Mutation",
    subtitle: "Change one amino acid in the protein",
    icon: "missense",
    color: "chart-3",
    originalDna: "ATGGCTTACGGAAAGCTG",
    overview:
      "A missense mutation changes a single nucleotide, which changes the mRNA codon so that it codes for a DIFFERENT amino acid. The classic example is Sickle Cell Anemia, where a single nucleotide change (A → T) in the beta-globin gene changes Glutamic Acid to Valine.",
    conceptReview:
      "Unlike silent mutations where the new codon still codes for the same amino acid, in a missense mutation the new codon codes for a different amino acid. The severity depends on how chemically different the new amino acid is from the original.",
    steps: [
      {
        instruction:
          "The 2nd codon (positions 4-6) is GCT, which transcribes to mRNA codon GCU → Alanine. Your goal: change the first nucleotide of this codon from 'G' to 'T' to create a missense mutation. Click the 'G' at position 4, then click 'Substitute', then click 'T'. This changes the DNA codon from GCT to TCT. The mRNA changes from GCU to UCU, and Alanine (Ala) will change to Serine (Ser).",
        hint: "Count from left: A(1) T(2) G(3) G(4) C(5) T(6). Position 4 is the first 'G' after ATG. Select it, click Substitute, then click T. The codon TCT transcribes to UCU, which codes for Serine instead of Alanine.",
        validate: (dna, original, _actions) => {
          return dna.length === original.length && dna[3] === "T" && dna !== original;
        },
        explanation:
          "The mRNA codon changed from GCU → UCU. Alanine (nonpolar) changed to Serine (polar) — a missense mutation. This kind of change CAN alter protein folding because the chemical properties of the amino acid changed. In Sickle Cell, Glutamic Acid (charged) → Valine (nonpolar) causes hemoglobin to aggregate.",
      },
    ],
    successMessage:
      "You created a missense mutation! One nucleotide change (G → T) led to one amino acid change (Ala → Ser). On AP/IB exams, explain that the severity of a missense mutation depends on: (1) where in the protein it occurs, (2) how chemically different the new amino acid is, and (3) whether it's in a critical functional region.",
  },
  {
    id: "nonsense",
    title: "Nonsense Mutation",
    subtitle: "Create a premature STOP codon",
    icon: "nonsense",
    color: "destructive",
    originalDna: "ATGGCTTACGGAAAGCTG",
    overview:
      "A nonsense mutation changes a codon into one of the three STOP codons (UAA, UAG, UGA). This causes translation to end prematurely, producing a truncated (shortened) protein that is usually non-functional. The earlier the STOP codon, the more severe the effect.",
    conceptReview:
      "The three STOP codons are UAA, UAG, and UGA. They don't code for any amino acid — instead they signal the ribosome to release the polypeptide. A nonsense mutation is almost always harmful because it creates an incomplete protein.",
    steps: [
      {
        instruction:
          "The 3rd codon (positions 7-9) is TAC, which transcribes to mRNA codon UAC → Tyrosine. To create a nonsense mutation, you need to change this codon to a STOP codon. Change the 'C' at position 9 to a 'G': click the 'C' at position 9, then click 'Substitute', then click 'G'. This changes DNA from TAC to TAG, and mRNA from UAC to UAG — a STOP codon! Watch the amino acid chain truncate.",
        hint: "Count: A(1) T(2) G(3) G(4) C(5) T(6) T(7) A(8) C(9). Position 9 is the 'C' at the end of TAC. Select it, click Substitute, then click G. TAG in DNA becomes UAG in mRNA = STOP codon.",
        validate: (dna, original, _actions) => {
          return dna.length === original.length && dna[8] === "G";
        },
        explanation:
          "The mRNA codon changed from UAC (Tyrosine) to UAG (STOP). Translation now stops at the 3rd codon position! The protein is truncated — only Met-Ala are produced instead of the full 6-amino-acid chain. This is why nonsense mutations are usually severe.",
      },
    ],
    successMessage:
      "You created a nonsense mutation! One nucleotide change (C → G) turned a Tyrosine codon into a STOP codon, truncating the protein after only 2 amino acids. For exams, remember: (1) nonsense mutations always create STOP codons, (2) the protein is truncated, (3) earlier STOP codons = more severe effect, (4) this can trigger nonsense-mediated mRNA decay (NMD) in eukaryotes.",
  },
  {
    id: "deletion",
    title: "Frameshift: Deletion",
    subtitle: "Delete a nucleotide and shift the reading frame",
    icon: "deletion",
    color: "destructive",
    originalDna: "ATGGCTTACGGAAAGCTG",
    overview:
      "A deletion removes one or more nucleotides from the DNA sequence. If the number of nucleotides deleted is NOT a multiple of 3, the reading frame shifts — meaning every codon downstream of the deletion is misread. This is catastrophic because the entire protein from that point on is wrong.",
    conceptReview:
      "DNA is read in groups of 3 (codons). Remove one nucleotide and all the groupings shift: THE CAT ATE → [delete H] → TEC ATA TE? — every \"word\" after the deletion becomes nonsense. This is a frameshift mutation.",
    steps: [
      {
        instruction:
          "Let's delete a single nucleotide to cause a frameshift. Click on the 'C' at position 5 (the second nucleotide of the 2nd codon, GCT) to select it, then click the 'Delete Selected' button. Watch what happens: the sequence gets shorter by 1 nucleotide, and the reading frame shifts. Every codon from position 4 onward will be completely different!",
        hint: "Count: A(1) T(2) G(3) G(4) C(5) T(6). Position 5 is the 'C'. Select it and click 'Delete Selected'. The sequence will go from 18 to 17 nucleotides — not divisible by 3, so the frame shifts.",
        validate: (dna, original, _actions) => {
          return dna.length === original.length - 1 && dna.startsWith("ATG");
        },
        explanation:
          "You deleted one nucleotide. The sequence is now 17 nucleotides (not divisible by 3) — the reading frame has shifted! Look at the amino acid chain: every amino acid from position 2 onward is different. The original protein was Met-Ala-Tyr-Gly-Lys-Leu, but now the downstream amino acids are completely changed. This is why frameshift mutations are considered catastrophic.",
      },
    ],
    successMessage:
      "You created a frameshift deletion! Removing just ONE nucleotide shifted the entire reading frame, changing every downstream codon. For AP/IB exams: (1) frameshifts are more severe than point mutations, (2) they affect ALL downstream amino acids, (3) they usually result in a non-functional protein, (4) the exception is when the deletion is a multiple of 3 (preserves reading frame).",
  },
  {
    id: "insertion",
    title: "Frameshift: Insertion",
    subtitle: "Insert a nucleotide and shift the reading frame",
    icon: "insertion",
    color: "chart-3",
    originalDna: "ATGGCTTACGGAAAGCTG",
    overview:
      "An insertion adds one or more nucleotides into the DNA sequence. Like deletions, if the number of inserted nucleotides is NOT a multiple of 3, the reading frame shifts. All downstream codons are misread, producing a completely different (and usually non-functional) protein.",
    conceptReview:
      "Insertions are the mirror of deletions. Adding one nucleotide pushes everything downstream by one position: THE CAT ATE → THE CCA TAT E? — inserting a 'C' shifts all downstream groupings. Same catastrophic effect as a deletion.",
    steps: [
      {
        instruction:
          "Let's insert a single nucleotide to cause a frameshift. Click on the 'G' at position 3 (the last nucleotide of the start codon ATG) to select it, then click 'Insert After', then click 'C' to insert a Cytosine after position 3. This adds a nucleotide between the 1st and 2nd codons, pushing everything downstream by one position. The start codon ATG is preserved, but every codon after it shifts!",
        hint: "Count: A(1) T(2) G(3). Position 3 is the 'G' at the end of ATG. Select it, click 'Insert After', then click 'C'. The sequence grows from 18 to 19 nucleotides — not divisible by 3, so the frame shifts.",
        validate: (dna, original, _actions) => {
          return dna.length === original.length + 1 && dna.startsWith("ATG");
        },
        explanation:
          "You inserted one nucleotide ('C') after the start codon. The sequence is now 19 nucleotides — not divisible by 3, so the reading frame shifted! The start codon ATG is intact (Met is still the first amino acid), but every codon after it is now reading different groups of 3. The protein downstream is completely altered.",
      },
    ],
    successMessage:
      "You created a frameshift insertion! Adding just ONE nucleotide shifted the entire reading frame from that point on. Key exam points: (1) insertions and deletions both cause frameshifts when not multiples of 3, (2) the start codon can be preserved while downstream codons are scrambled, (3) insertions often introduce premature STOP codons by chance, creating a truncated AND wrong protein.",
  },
];

// ── Sub-components ──────────────────────────────────────────────────────

function NucleotideColor(nuc: string): string {
  switch (nuc) {
    case "A": return "bg-chart-1 text-white";
    case "T": return "bg-chart-2 text-white";
    case "G": return "bg-chart-3 text-white";
    case "C": return "bg-chart-4 text-white";
    case "U": return "bg-chart-2 text-white";
    default: return "bg-muted";
  }
}

function CodonColor(index: number): string {
  const colors = [
    "bg-chart-1/20 border-chart-1/30",
    "bg-chart-2/20 border-chart-2/30",
    "bg-chart-3/20 border-chart-3/30",
    "bg-chart-4/20 border-chart-4/30",
  ];
  return colors[index % colors.length];
}

// ── Lesson Player ───────────────────────────────────────────────────────

function LessonPlayer({
  lesson,
  onComplete,
  onBack,
}: {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [dnaSequence, setDnaSequence] = useState(lesson.originalDna);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showInsert, setShowInsert] = useState(false);
  const [showSubstitute, setShowSubstitute] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [stepCompleted, setStepCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [actions, setActions] = useState<ActionRecord[]>([]);

  const rnaSequence = dnaToRna(dnaSequence);
  const codons = getCodons(rnaSequence);
  const aminoAcids = translateToProtein(rnaSequence);
  const originalRna = dnaToRna(lesson.originalDna);
  const originalAminoAcids = translateToProtein(originalRna);

  const isFrameShifted = (lesson.originalDna.length - dnaSequence.length) % 3 !== 0;
  const step = lesson.steps[currentStep];
  const progress = lessonComplete ? 100 : stepCompleted ? 75 : ((currentStep) / lesson.steps.length) * 50;

  const handleNucleotideClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
    setShowInsert(false);
    setShowSubstitute(false);
  };

  const deleteNucleotide = useCallback(() => {
    if (selectedIndex === null || dnaSequence.length <= 3) return;
    setHistory([...history, dnaSequence]);
    const newDna = dnaSequence.slice(0, selectedIndex) + dnaSequence.slice(selectedIndex + 1);
    setActions([...actions, { type: "delete", position: selectedIndex, original: dnaSequence[selectedIndex] }]);
    setDnaSequence(newDna);
    setSelectedIndex(null);

    // Check validation
    if (step.validate(newDna, lesson.originalDna, actions)) {
      setStepCompleted(true);
    }
  }, [selectedIndex, dnaSequence, history, step, lesson.originalDna, actions]);

  const insertNucleotide = useCallback(
    (nucleotide: string) => {
      if (selectedIndex === null) return;
      setHistory([...history, dnaSequence]);
      const newDna =
        dnaSequence.slice(0, selectedIndex + 1) + nucleotide + dnaSequence.slice(selectedIndex + 1);
      setActions([...actions, { type: "insert", position: selectedIndex, nucleotide }]);
      setDnaSequence(newDna);
      setSelectedIndex(null);
      setShowInsert(false);

      if (step.validate(newDna, lesson.originalDna, actions)) {
        setStepCompleted(true);
      }
    },
    [selectedIndex, dnaSequence, history, step, lesson.originalDna, actions]
  );

  const substituteNucleotide = useCallback(
    (nucleotide: string) => {
      if (selectedIndex === null) return;
      setHistory([...history, dnaSequence]);
      const newDna =
        dnaSequence.slice(0, selectedIndex) + nucleotide + dnaSequence.slice(selectedIndex + 1);
      setActions([
        ...actions,
        { type: "substitute", position: selectedIndex, nucleotide, original: dnaSequence[selectedIndex] },
      ]);
      setDnaSequence(newDna);
      setSelectedIndex(null);
      setShowSubstitute(false);

      if (step.validate(newDna, lesson.originalDna, actions)) {
        setStepCompleted(true);
      }
    },
    [selectedIndex, dnaSequence, history, step, lesson.originalDna, actions]
  );

  const undo = () => {
    if (history.length === 0) return;
    setDnaSequence(history[history.length - 1]);
    setHistory(history.slice(0, -1));
    setSelectedIndex(null);
    setStepCompleted(false);
    setShowExplanation(false);
  };

  const resetStep = () => {
    setDnaSequence(lesson.originalDna);
    setSelectedIndex(null);
    setShowInsert(false);
    setShowSubstitute(false);
    setHistory([]);
    setStepCompleted(false);
    setShowExplanation(false);
    setActions([]);
    setCurrentStep(0);
    setLessonComplete(false);
  };

  const advanceStep = () => {
    if (currentStep < lesson.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setStepCompleted(false);
      setShowExplanation(false);
      setSelectedIndex(null);
      setShowInsert(false);
      setShowSubstitute(false);
    } else {
      setLessonComplete(true);
    }
  };

  if (lessonComplete) {
    return (
      <div className="space-y-6">
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <h2 className="text-2xl font-bold">Lesson Complete!</h2>
            </div>
            <p className="text-muted-foreground">{lesson.successMessage}</p>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-md bg-card border">
                <p className="text-sm font-medium mb-2">Original Protein:</p>
                <div className="flex flex-wrap gap-1">
                  {originalAminoAcids.map((aa, i) => (
                    <Badge key={i} variant="secondary" className="font-mono">{aa}</Badge>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-md bg-card border">
                <p className="text-sm font-medium mb-2">Your Mutated Protein:</p>
                <div className="flex flex-wrap gap-1">
                  {aminoAcids.map((aa, i) => {
                    const changed = aa !== originalAminoAcids[i];
                    return (
                      <Badge key={i} variant={changed ? "destructive" : "secondary"} className="font-mono">
                        {aa}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-3">
          <Button variant="outline" onClick={resetStep}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Lessons
          </Button>
          <Button onClick={onComplete}>
            Next Lesson
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Step {currentStep + 1} of {lesson.steps.length}
          </span>
          <span className="text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Instruction Card */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-primary/20 mt-0.5">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-2">
              <p className="font-medium">Instructions:</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.instruction}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hint */}
      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium text-sm mb-1">Hint:</p>
              <p className="text-sm text-muted-foreground">{step.hint}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* DNA Toolbar */}
      <div className="flex flex-wrap gap-2 items-center">
        <Button variant="outline" size="sm" onClick={undo} disabled={history.length === 0}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Undo
        </Button>
        <Button variant="outline" size="sm" onClick={resetStep}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={deleteNucleotide}
          disabled={selectedIndex === null || dnaSequence.length <= 3}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete Selected
        </Button>
        <Button
          size="sm"
          onClick={() => { setShowSubstitute(!showSubstitute); setShowInsert(false); }}
          disabled={selectedIndex === null}
          variant="secondary"
        >
          <Replace className="h-4 w-4 mr-1" />
          Substitute
        </Button>
        <Button
          size="sm"
          onClick={() => { setShowInsert(!showInsert); setShowSubstitute(false); }}
          disabled={selectedIndex === null}
        >
          <Plus className="h-4 w-4 mr-1" />
          Insert After
        </Button>
        {showSubstitute && selectedIndex !== null && (
          <div className="flex gap-1 items-center">
            <span className="text-xs text-muted-foreground mr-1">Replace with:</span>
            {["A", "T", "G", "C"]
              .filter((n) => n !== dnaSequence[selectedIndex])
              .map((n) => (
                <Button
                  key={n}
                  size="sm"
                  className={NucleotideColor(n)}
                  onClick={() => substituteNucleotide(n)}
                >
                  {n}
                </Button>
              ))}
          </div>
        )}
        {showInsert && selectedIndex !== null && (
          <div className="flex gap-1 items-center">
            <span className="text-xs text-muted-foreground mr-1">Insert:</span>
            {["A", "T", "G", "C"].map((n) => (
              <Button
                key={n}
                size="sm"
                className={NucleotideColor(n)}
                onClick={() => insertNucleotide(n)}
              >
                {n}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* DNA Sequence */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">DNA Sequence (Coding Strand)</CardTitle>
          <CardDescription>Click a nucleotide to select it</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {dnaSequence.split("").map((nucleotide, index) => (
              <button
                key={index}
                onClick={() => handleNucleotideClick(index)}
                className={`
                  w-10 h-10 rounded-md font-mono font-bold text-lg transition-all
                  ${NucleotideColor(nucleotide)}
                  ${selectedIndex === index ? "ring-2 ring-foreground ring-offset-2 scale-110" : "hover:scale-105"}
                `}
              >
                {nucleotide}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span>Position: {selectedIndex !== null ? selectedIndex + 1 : "None"}</span>
            <span>Length: {dnaSequence.length} nt</span>
            {isFrameShifted && (
              <Badge variant="destructive" className="gap-1 text-xs">
                <AlertTriangle className="h-3 w-3" />
                Frame Shifted
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* mRNA & Amino Acids */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">mRNA Codons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {codons.map((codon, i) => (
                <div key={i} className={`px-2 py-1 rounded border font-mono text-sm ${CodonColor(i)}`}>
                  {codon}
                </div>
              ))}
              {rnaSequence.length % 3 !== 0 && (
                <div className="px-2 py-1 rounded border border-destructive/30 bg-destructive/10 font-mono text-sm text-destructive">
                  {rnaSequence.slice(codons.length * 3)}
                  <span className="text-xs ml-1">(incomplete)</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Amino Acids</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {aminoAcids.map((aa, i) => {
                const changed = aa !== originalAminoAcids[i];
                return (
                  <Badge
                    key={i}
                    variant={aa === "STOP" ? "destructive" : changed ? "destructive" : "secondary"}
                    className="font-mono"
                  >
                    {aa}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Step completion feedback */}
      {stepCompleted && !showExplanation && (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-medium">Correct! Well done.</span>
              </div>
              <Button size="sm" onClick={() => setShowExplanation(true)}>
                See Explanation <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {showExplanation && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium mb-1">Explanation:</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.explanation}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <Button onClick={advanceStep}>
                {currentStep < lesson.steps.length - 1 ? "Next Step" : "Complete Lesson"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex gap-3 pt-2">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          All Lessons
        </Button>
      </div>
    </div>
  );
}

// ── Lesson Select Screen ────────────────────────────────────────────────

function LessonIcon({ type }: { type: string }) {
  switch (type) {
    case "silent": return <CheckCircle className="h-5 w-5 text-chart-1" />;
    case "missense": return <AlertTriangle className="h-5 w-5 text-chart-3" />;
    case "nonsense": return <XCircle className="h-5 w-5 text-destructive" />;
    case "deletion": return <Trash2 className="h-5 w-5 text-destructive" />;
    case "insertion": return <Plus className="h-5 w-5 text-chart-3" />;
    default: return <Info className="h-5 w-5" />;
  }
}

// ── Main Page Component ─────────────────────────────────────────────────

export default function Lessons() {
  const [activeLesson, setActiveLesson] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const handleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => new Set(prev).add(lessonId));
    // Advance to next lesson
    if (activeLesson !== null && activeLesson < LESSONS.length - 1) {
      setActiveLesson(activeLesson + 1);
    } else {
      setActiveLesson(null);
    }
  };

  if (activeLesson !== null) {
    const lesson = LESSONS[activeLesson];
    return (
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-md bg-accent">
            <GraduationCap className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            <p className="text-muted-foreground text-sm">{lesson.subtitle}</p>
          </div>
        </div>

        {/* Concept review */}
        <Card className="bg-muted/50">
          <CardContent className="p-5 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Concept Review
            </h3>
            <p className="text-sm text-muted-foreground">{lesson.overview}</p>
            <p className="text-sm text-muted-foreground">{lesson.conceptReview}</p>
          </CardContent>
        </Card>

        <LessonPlayer
          key={lesson.id}
          lesson={lesson}
          onComplete={() => handleLessonComplete(lesson.id)}
          onBack={() => setActiveLesson(null)}
        />
      </div>
    );
  }

  // Lesson select screen
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-md bg-accent">
            <GraduationCap className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Guided Lessons</h1>
            <p className="text-muted-foreground">
              Learn to create each type of mutation step-by-step
            </p>
          </div>
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium mb-1">How these lessons work:</p>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>1. Each lesson teaches you one mutation type with a concept review</li>
                <li>2. You follow step-by-step instructions to physically create the mutation</li>
                <li>3. The app validates your work and explains the result</li>
                <li>4. After completing all lessons, move to the Assessment to test yourself</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress summary */}
      <div className="flex items-center gap-4">
        <Progress value={(completedLessons.size / LESSONS.length) * 100} className="flex-1 h-3" />
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {completedLessons.size} / {LESSONS.length} completed
        </span>
      </div>

      {/* Lesson cards */}
      <div className="grid gap-4">
        {LESSONS.map((lesson, index) => {
          const isCompleted = completedLessons.has(lesson.id);
          return (
            <Card
              key={lesson.id}
              className={`cursor-pointer transition-all hover-elevate ${
                isCompleted ? "border-green-500/30 bg-green-500/5" : ""
              }`}
              onClick={() => setActiveLesson(index)}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-lg font-bold">
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <span className="text-muted-foreground">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <LessonIcon type={lesson.icon} />
                      <h3 className="font-semibold">{lesson.title}</h3>
                      {isCompleted && <Badge className="bg-green-500 text-white text-xs">Complete</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{lesson.subtitle}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Link to assessment */}
      {completedLessons.size > 0 && (
        <Card className="bg-accent/5 border-accent/20">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Ready to test yourself?</h3>
                <p className="text-sm text-muted-foreground">
                  {completedLessons.size === LESSONS.length
                    ? "You've completed all lessons! Head to the assessment."
                    : "You can start the assessment after completing some lessons, but finishing all is recommended."}
                </p>
              </div>
              <Link href="/assessment">
                <Button>
                  Go to Assessment
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
