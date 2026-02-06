import { useState, useCallback, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  ClipboardCheck, Dna, RotateCcw, Trash2, Plus, Replace, Copy, Check,
  CheckCircle, XCircle, AlertTriangle, ArrowRight, ChevronRight, ChevronDown,
  FileText, GraduationCap, Info, Lightbulb
} from "lucide-react";
import { dnaToRna, translateToProtein, getCodons, codonTable } from "@/lib/codon-table";
import { useToast } from "@/hooks/use-toast";

// ── Types ───────────────────────────────────────────────────────────────

interface MutationChallenge {
  id: string;
  title: string;
  type: "silent" | "missense" | "nonsense" | "deletion" | "insertion";
  difficulty: "Standard" | "Challenging";
  originalDna: string;
  instruction: string;
  validate: (dna: string, original: string) => { success: boolean; message: string };
}

interface FRQQuestion {
  id: string;
  number: number;
  topic: string;
  difficulty: "AP" | "IB" | "AP/IB";
  points: number;
  question: string;
  parts: { label: string; prompt: string; points: number }[];
  rubricGuidance: string;
}

// ── Challenge Definitions ───────────────────────────────────────────────

const CHALLENGES: MutationChallenge[] = [
  {
    id: "c-silent",
    title: "Create a Silent Mutation",
    type: "silent",
    difficulty: "Standard",
    originalDna: "ATGGCTTACGGAAAGCTG",
    instruction:
      "Modify the DNA sequence so that one nucleotide changes but the amino acid sequence remains identical to the original. Use a substitution — do NOT insert or delete nucleotides.",
    validate: (dna, original) => {
      if (dna.length !== original.length) {
        return { success: false, message: "The sequence length changed. A silent mutation should only substitute a nucleotide, not add or remove one." };
      }
      if (dna === original) {
        return { success: false, message: "You haven't made any changes yet. Substitute one nucleotide." };
      }
      const origRna = dnaToRna(original);
      const newRna = dnaToRna(dna);
      const origAA = translateToProtein(origRna);
      const newAA = translateToProtein(newRna);
      if (origAA.join(",") === newAA.join(",")) {
        return { success: true, message: "Correct! The nucleotide changed but the amino acid sequence is identical — this is a silent mutation. The degeneracy of the genetic code allows multiple codons to code for the same amino acid." };
      }
      return { success: false, message: "The amino acid sequence changed. For a silent mutation, the protein must remain identical. Try changing the 3rd position of a codon — that position is most likely to be silent due to wobble base pairing." };
    },
  },
  {
    id: "c-missense",
    title: "Create a Missense Mutation",
    type: "missense",
    difficulty: "Standard",
    originalDna: "ATGGCTTACGGAAAGCTG",
    instruction:
      "Modify the DNA sequence so that exactly one amino acid changes to a different amino acid, but the protein is NOT truncated (no premature STOP codon). Use a substitution only.",
    validate: (dna, original) => {
      if (dna.length !== original.length) {
        return { success: false, message: "The sequence length changed. A missense mutation should only substitute a nucleotide." };
      }
      if (dna === original) {
        return { success: false, message: "You haven't made any changes yet." };
      }
      const origAA = translateToProtein(dnaToRna(original));
      const newAA = translateToProtein(dnaToRna(dna));
      if (newAA.includes("STOP") && !origAA.includes("STOP")) {
        return { success: false, message: "You created a STOP codon — that's a nonsense mutation, not missense. Try a different substitution that changes an amino acid without creating a STOP." };
      }
      let changedCount = 0;
      for (let i = 0; i < Math.max(origAA.length, newAA.length); i++) {
        if (origAA[i] !== newAA[i]) changedCount++;
      }
      if (changedCount === 0) {
        return { success: false, message: "The amino acid sequence didn't change. This is a silent mutation. Try changing the 1st or 2nd position of a codon for a higher chance of changing the amino acid." };
      }
      if (changedCount === 1 && newAA.length === origAA.length) {
        return { success: true, message: "Correct! One amino acid changed — this is a missense mutation. The severity depends on how chemically different the new amino acid is and whether it's in a critical region of the protein." };
      }
      return { success: false, message: "Multiple amino acids changed. A standard missense mutation changes only one. Make sure you're only substituting a single nucleotide." };
    },
  },
  {
    id: "c-nonsense",
    title: "Create a Nonsense Mutation",
    type: "nonsense",
    difficulty: "Standard",
    originalDna: "ATGGCTTACGGAAAGCTG",
    instruction:
      "Modify the DNA sequence so that one of the codons becomes a STOP codon (UAA, UAG, or UGA in mRNA), causing translation to terminate early. Use a substitution only — do not change the start codon (ATG).",
    validate: (dna, original) => {
      if (dna.length !== original.length) {
        return { success: false, message: "The sequence length changed. Use only substitution for a nonsense mutation." };
      }
      if (dna === original) {
        return { success: false, message: "You haven't made any changes yet." };
      }
      if (!dna.startsWith("ATG")) {
        return { success: false, message: "Don't change the start codon (ATG). Modify a downstream codon to create a STOP." };
      }
      const origAA = translateToProtein(dnaToRna(original));
      const newAA = translateToProtein(dnaToRna(dna));
      if (newAA.includes("STOP") && newAA.length < origAA.length) {
        return { success: true, message: `Correct! You created a premature STOP codon. The protein is now truncated to ${newAA.length - 1} amino acid(s) instead of ${origAA.length}. This is a nonsense mutation — the protein is almost certainly non-functional because it's incomplete.` };
      }
      return { success: false, message: "No premature STOP codon was created. The STOP codons in mRNA are UAA, UAG, and UGA. In DNA template, that means you need TTA, CTA, or TCA at a codon position. Try changing one nucleotide in a non-start codon." };
    },
  },
  {
    id: "c-deletion",
    title: "Create a Frameshift Deletion",
    type: "deletion",
    difficulty: "Standard",
    originalDna: "ATGGCTTACGGAAAGCTG",
    instruction:
      "Delete exactly ONE nucleotide from the sequence (not from the start codon ATG) to cause a frameshift mutation. The reading frame should shift, changing all downstream amino acids.",
    validate: (dna, original) => {
      if (dna.length >= original.length) {
        return { success: false, message: "You need to delete a nucleotide — the sequence should be shorter." };
      }
      if (dna.length < original.length - 1) {
        return { success: false, message: "Delete only ONE nucleotide for this challenge." };
      }
      if (!dna.startsWith("ATG")) {
        return { success: false, message: "Don't delete from the start codon (ATG). Delete from a downstream position." };
      }
      const isShifted = (original.length - dna.length) % 3 !== 0;
      if (isShifted) {
        return { success: true, message: "Correct! Deleting one nucleotide shifted the reading frame. Every codon downstream of the deletion is now read differently, producing a completely different (and likely non-functional) protein. This is why frameshift mutations are considered more severe than point mutations." };
      }
      return { success: false, message: "The reading frame wasn't shifted. This can happen if you deleted a number of nucleotides divisible by 3." };
    },
  },
  {
    id: "c-insertion",
    title: "Create a Frameshift Insertion",
    type: "insertion",
    difficulty: "Standard",
    originalDna: "ATGGCTTACGGAAAGCTG",
    instruction:
      "Insert exactly ONE nucleotide anywhere after the start codon (ATG) to cause a frameshift mutation. The reading frame should shift downstream of your insertion.",
    validate: (dna, original) => {
      if (dna.length <= original.length) {
        return { success: false, message: "You need to insert a nucleotide — the sequence should be longer." };
      }
      if (dna.length > original.length + 1) {
        return { success: false, message: "Insert only ONE nucleotide for this challenge." };
      }
      if (!dna.startsWith("ATG")) {
        return { success: false, message: "The start codon (ATG) should be preserved. Insert after position 3." };
      }
      const isShifted = (original.length - dna.length) % 3 !== 0;
      if (isShifted) {
        return { success: true, message: "Correct! Inserting one nucleotide shifted the reading frame. All codons downstream of the insertion are now misread. This is a frameshift insertion — the effect is just as catastrophic as a frameshift deletion." };
      }
      return { success: false, message: "The reading frame wasn't shifted. Make sure you're inserting exactly 1 nucleotide (not 3)." };
    },
  },
  {
    id: "c-sickle",
    title: "Recreate the Sickle Cell Mutation",
    type: "missense",
    difficulty: "Challenging",
    originalDna: "ATGGAGCTCACTGGA",
    instruction:
      "The Sickle Cell mutation is one of the most famous mutations in biology. In this sequence, the 2nd codon is GAG (mRNA: GAG → Glutamic Acid). Change ONE nucleotide in the 2nd codon so that the mRNA becomes GUG (→ Valine). This single amino acid change causes hemoglobin to aggregate and red blood cells to sickle.",
    validate: (dna, original) => {
      if (dna.length !== original.length) {
        return { success: false, message: "Use substitution only — don't change the length." };
      }
      if (dna === original) {
        return { success: false, message: "You haven't made any changes yet." };
      }
      // GAG → GTG in DNA (position 4-6, index 3-5)
      // Original: ATG GAG CTC ACT GGA
      // Target:   ATG GTG CTC ACT GGA
      const newAA = translateToProtein(dnaToRna(dna));
      const origAA = translateToProtein(dnaToRna(original));
      if (dna[3] === "G" && dna[4] === "T" && dna[5] === "G") {
        return { success: true, message: "Correct! You recreated the Sickle Cell mutation: GAG → GTG in DNA, which means GAG → GUG in mRNA, changing Glutamic Acid (hydrophilic, charged) to Valine (hydrophobic). This single amino acid change causes the hemoglobin protein to aggregate in low-oxygen conditions, distorting red blood cells into a sickle shape. Heterozygous carriers (HbA/HbS) have Sickle Cell Trait and are resistant to malaria — an example of heterozygote advantage and balancing selection." };
      }
      if (newAA[1] === "Val") {
        return { success: true, message: "You changed the amino acid to Valine, which is the correct Sickle Cell change! The classic mutation is A→T at the 2nd position of the GAG codon (making GTG → GUG in mRNA → Valine)." };
      }
      return { success: false, message: "Not quite. You need to change the 2nd codon from GAG to GTG in the DNA. That means changing the 'A' at position 5 (index 4) to a 'T'. The mRNA will then read GUG instead of GAG." };
    },
  },
];

// ── FRQ Questions ───────────────────────────────────────────────────────

const FRQ_QUESTIONS: FRQQuestion[] = [
  {
    id: "frq-1",
    number: 1,
    topic: "Mutation Types & Protein Function",
    difficulty: "AP/IB",
    points: 10,
    question:
      "A researcher sequences a gene encoding a critical enzyme (200 amino acids long) and discovers three different mutant alleles in a population. Mutant A has a single nucleotide substitution at codon 150. Mutant B has a single nucleotide substitution at codon 5. Mutant C has a single nucleotide deletion at codon 10.",
    parts: [
      {
        label: "a",
        prompt:
          "Mutant A produces an enzyme with a different amino acid at position 150 but the enzyme functions normally. Identify the type of mutation and explain why the enzyme function is preserved. (2 pts)",
        points: 2,
      },
      {
        label: "b",
        prompt:
          "Mutant B has a substitution that changes codon 5 from CAG (Glutamine) to UAG. Identify the type of mutation and predict the effect on the enzyme. Explain your reasoning. (3 pts)",
        points: 3,
      },
      {
        label: "c",
        prompt:
          "Explain why the single nucleotide deletion in Mutant C (at codon 10) is likely to be MORE damaging than the substitution in Mutant A (at codon 150), even though Mutant A's change is further from the start of the protein. (3 pts)",
        points: 3,
      },
      {
        label: "d",
        prompt:
          "A fourth mutant (Mutant D) has THREE nucleotides deleted at codon 100, removing exactly one codon. Compare the likely effect of this mutation to Mutant C's single deletion. Which is likely more damaging, and why? (2 pts)",
        points: 2,
      },
    ],
    rubricGuidance:
      "Strong answers will: (a) identify missense mutation and discuss how amino acid properties may be similar or the position may not be in the active site; (b) identify nonsense mutation, explain premature termination, and note only 4 amino acids would be produced (4/200 = 2% of enzyme); (c) explain frameshift concept — deletion at codon 10 shifts the reading frame for the remaining 190 codons while substitution at 150 only affects one amino acid; (d) explain that deletion of 3 nucleotides preserves the reading frame (in-frame deletion) so only one amino acid is lost, making it less severe than a frameshift.",
  },
  {
    id: "frq-2",
    number: 2,
    topic: "Mutation, Natural Selection & Evolution",
    difficulty: "AP/IB",
    points: 10,
    question:
      "The sickle cell allele (HbS) results from a single nucleotide substitution (A → T) in the beta-globin gene, changing codon 6 from GAG (Glutamic Acid) to GTG (Valine). In sub-Saharan Africa, approximately 20-25% of the population carries at least one copy of the HbS allele, while in Northern Europe, the frequency is less than 0.1%.",
    parts: [
      {
        label: "a",
        prompt:
          "Identify the type of mutation that causes sickle cell anemia. Explain at the molecular level why changing from glutamic acid to valine alters the structure and function of the hemoglobin protein. (3 pts)",
        points: 3,
      },
      {
        label: "b",
        prompt:
          "Explain why the HbS allele is maintained at such a high frequency in sub-Saharan Africa despite causing a severe disease in homozygous individuals (HbS/HbS). Include the concept of heterozygote advantage in your response. (3 pts)",
        points: 3,
      },
      {
        label: "c",
        prompt:
          "A student claims: 'Malaria caused the sickle cell mutation to occur in African populations.' Evaluate this claim. In your response, distinguish between the origin of mutations and the role of natural selection. (2 pts)",
        points: 2,
      },
      {
        label: "d",
        prompt:
          "Predict what would happen to the frequency of the HbS allele in a sub-Saharan African population if malaria were completely eradicated. Justify your prediction using principles of natural selection. (2 pts)",
        points: 2,
      },
    ],
    rubricGuidance:
      "Strong answers will: (a) identify missense mutation, explain that glutamic acid is hydrophilic/charged while valine is hydrophobic, causing hemoglobin to aggregate in deoxygenated conditions; (b) explain heterozygote advantage — HbA/HbS carriers are resistant to malaria while having mild sickling symptoms, conferring a survival advantage in malaria-endemic regions (balancing selection); (c) correctly state that mutations are random and NOT caused by environmental pressures — malaria selected FOR a pre-existing mutation, it did not cause it; (d) predict frequency would decrease because without malaria, heterozygotes no longer have a selective advantage, and homozygous HbS/HbS individuals have reduced fitness — the allele would be under negative selection.",
  },
  {
    id: "frq-3",
    number: 3,
    topic: "Genetic Code Degeneracy & Silent Mutations",
    difficulty: "AP/IB",
    points: 8,
    question:
      "The genetic code has 64 possible codons but only 20 amino acids (plus 3 stop codons). Scientists studying a bacterial gene found that while 15% of nucleotide positions in the gene had mutations compared to the ancestral sequence, only 3% of amino acid positions were different.",
    parts: [
      {
        label: "a",
        prompt:
          "Explain how it is possible that 15% of nucleotide positions changed but only 3% of amino acid positions are different. Reference the concept of degeneracy (redundancy) of the genetic code and the wobble hypothesis in your answer. (3 pts)",
        points: 3,
      },
      {
        label: "b",
        prompt:
          "Predict which position within a codon (1st, 2nd, or 3rd) is most likely to show mutations between species. Justify your prediction based on the selective pressures acting on each position. (3 pts)",
        points: 3,
      },
      {
        label: "c",
        prompt:
          "Explain why silent mutations are valuable to evolutionary biologists even though they don't change the protein. Include the concept of the 'molecular clock' in your answer. (2 pts)",
        points: 2,
      },
    ],
    rubricGuidance:
      "Strong answers will: (a) explain that multiple codons code for the same amino acid (degeneracy), especially at the 3rd/wobble position, so many nucleotide changes are 'silent' and don't change the amino acid; (b) predict the 3rd position because changes there are most likely to be silent (wobble position), meaning natural selection doesn't remove them — they accumulate over time; (c) explain that silent mutations are selectively neutral and accumulate at a roughly constant rate, making them useful as a 'molecular clock' to estimate divergence times between species.",
  },
  {
    id: "frq-4",
    number: 4,
    topic: "Antibiotic Resistance & Mutation",
    difficulty: "AP/IB",
    points: 10,
    question:
      "A hospital reports a growing number of infections caused by methicillin-resistant Staphylococcus aureus (MRSA). A student argues that the overuse of antibiotics 'caused the bacteria to mutate and become resistant.'",
    parts: [
      {
        label: "a",
        prompt:
          "Evaluate the student's claim. Explain the actual mechanism by which antibiotic resistance arises and spreads in a bacterial population. Be sure to address the role of random mutation versus natural selection. (3 pts)",
        points: 3,
      },
      {
        label: "b",
        prompt:
          "Explain why bacterial populations can evolve antibiotic resistance rapidly (within years), while most evolutionary changes in multicellular organisms take thousands or millions of years. Include at least TWO specific reasons related to bacterial biology. (3 pts)",
        points: 3,
      },
      {
        label: "c",
        prompt:
          "A researcher isolates a strain of bacteria with a mutation that changes the shape of the protein targeted by the antibiotic. Identify the type of mutation most likely responsible and explain how this specific change confers resistance. (2 pts)",
        points: 2,
      },
      {
        label: "d",
        prompt:
          "Propose TWO strategies hospitals could use to slow the evolution of antibiotic resistance. For each strategy, explain how it works in terms of natural selection. (2 pts)",
        points: 2,
      },
    ],
    rubricGuidance:
      "Strong answers will: (a) correct the misconception — antibiotics don't cause mutations, mutations occur randomly; antibiotics create a selective pressure that kills non-resistant bacteria, allowing resistant mutants to survive and reproduce (natural selection); (b) cite short generation time (~20-30 min), large population sizes (billions of cells = more mutations), horizontal gene transfer (plasmids, conjugation), and haploid genome (mutations immediately expressed); (c) identify missense mutation that alters protein shape so antibiotic can't bind, but protein still functions; (d) suggest strategies like completing full antibiotic courses (kills all bacteria, no survivors to evolve), using narrow-spectrum antibiotics (reduces selection pressure on non-target species), or antibiotic cycling/combination therapy.",
  },
];

// ── Helper Components ───────────────────────────────────────────────────

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

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ title: "Copied to clipboard", description: label || "Your answer has been copied." });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      toast({ title: "Copied to clipboard", description: label || "Your answer has been copied." });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1.5">
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : "Copy Answer"}
    </Button>
  );
}

// ── Challenge Player ────────────────────────────────────────────────────

function ChallengePlayer({
  challenge,
  onComplete,
}: {
  challenge: MutationChallenge;
  onComplete: () => void;
}) {
  const [dnaSequence, setDnaSequence] = useState(challenge.originalDna);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showInsert, setShowInsert] = useState(false);
  const [showSubstitute, setShowSubstitute] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const rnaSequence = dnaToRna(dnaSequence);
  const codons = getCodons(rnaSequence);
  const aminoAcids = translateToProtein(rnaSequence);
  const originalRna = dnaToRna(challenge.originalDna);
  const originalAminoAcids = translateToProtein(originalRna);
  const isFrameShifted = (challenge.originalDna.length - dnaSequence.length) % 3 !== 0;

  const handleNucleotideClick = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
    setShowInsert(false);
    setShowSubstitute(false);
  };

  const deleteNucleotide = useCallback(() => {
    if (selectedIndex === null || dnaSequence.length <= 3) return;
    setHistory([...history, dnaSequence]);
    setDnaSequence(dnaSequence.slice(0, selectedIndex) + dnaSequence.slice(selectedIndex + 1));
    setSelectedIndex(null);
    setResult(null);
  }, [selectedIndex, dnaSequence, history]);

  const insertNucleotide = useCallback((nucleotide: string) => {
    if (selectedIndex === null) return;
    setHistory([...history, dnaSequence]);
    setDnaSequence(dnaSequence.slice(0, selectedIndex + 1) + nucleotide + dnaSequence.slice(selectedIndex + 1));
    setSelectedIndex(null);
    setShowInsert(false);
    setResult(null);
  }, [selectedIndex, dnaSequence, history]);

  const substituteNucleotide = useCallback((nucleotide: string) => {
    if (selectedIndex === null) return;
    setHistory([...history, dnaSequence]);
    setDnaSequence(dnaSequence.slice(0, selectedIndex) + nucleotide + dnaSequence.slice(selectedIndex + 1));
    setSelectedIndex(null);
    setShowSubstitute(false);
    setResult(null);
  }, [selectedIndex, dnaSequence, history]);

  const undo = () => {
    if (history.length === 0) return;
    setDnaSequence(history[history.length - 1]);
    setHistory(history.slice(0, -1));
    setSelectedIndex(null);
    setResult(null);
  };

  const reset = () => {
    setDnaSequence(challenge.originalDna);
    setSelectedIndex(null);
    setShowInsert(false);
    setShowSubstitute(false);
    setHistory([]);
    setResult(null);
  };

  const checkAnswer = () => {
    const res = challenge.validate(dnaSequence, challenge.originalDna);
    setResult(res);
    if (res.success) onComplete();
  };

  return (
    <div className="space-y-4">
      {/* Instruction */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">{challenge.instruction}</p>
        </CardContent>
      </Card>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 items-center">
        <Button variant="outline" size="sm" onClick={undo} disabled={history.length === 0}>
          <RotateCcw className="h-4 w-4 mr-1" /> Undo
        </Button>
        <Button variant="outline" size="sm" onClick={reset}>
          <RotateCcw className="h-4 w-4 mr-1" /> Reset
        </Button>
        <Button variant="destructive" size="sm" onClick={deleteNucleotide} disabled={selectedIndex === null || dnaSequence.length <= 3}>
          <Trash2 className="h-4 w-4 mr-1" /> Delete
        </Button>
        <Button size="sm" variant="secondary" onClick={() => { setShowSubstitute(!showSubstitute); setShowInsert(false); }} disabled={selectedIndex === null}>
          <Replace className="h-4 w-4 mr-1" /> Substitute
        </Button>
        <Button size="sm" onClick={() => { setShowInsert(!showInsert); setShowSubstitute(false); }} disabled={selectedIndex === null}>
          <Plus className="h-4 w-4 mr-1" /> Insert After
        </Button>
        {showSubstitute && selectedIndex !== null && (
          <div className="flex gap-1">
            {["A", "T", "G", "C"].filter(n => n !== dnaSequence[selectedIndex]).map(n => (
              <Button key={n} size="sm" className={NucleotideColor(n)} onClick={() => substituteNucleotide(n)}>{n}</Button>
            ))}
          </div>
        )}
        {showInsert && selectedIndex !== null && (
          <div className="flex gap-1">
            {["A", "T", "G", "C"].map(n => (
              <Button key={n} size="sm" className={NucleotideColor(n)} onClick={() => insertNucleotide(n)}>{n}</Button>
            ))}
          </div>
        )}
      </div>

      {/* DNA */}
      <div className="flex flex-wrap gap-1">
        {dnaSequence.split("").map((nuc, i) => (
          <button
            key={i}
            onClick={() => handleNucleotideClick(i)}
            className={`w-9 h-9 rounded-md font-mono font-bold text-base transition-all ${NucleotideColor(nuc)} ${selectedIndex === i ? "ring-2 ring-foreground ring-offset-2 scale-110" : "hover:scale-105"}`}
          >
            {nuc}
          </button>
        ))}
      </div>

      {/* Status badges */}
      <div className="flex flex-wrap gap-2 items-center text-xs">
        <span className="text-muted-foreground">Pos: {selectedIndex !== null ? selectedIndex + 1 : "—"}</span>
        <span className="text-muted-foreground">Length: {dnaSequence.length}</span>
        {isFrameShifted && <Badge variant="destructive" className="gap-1 text-xs"><AlertTriangle className="h-3 w-3" />Frame Shifted</Badge>}
        {dnaSequence !== challenge.originalDna && !isFrameShifted && <Badge variant="secondary" className="text-xs">Modified</Badge>}
      </div>

      {/* mRNA & amino acids (compact) */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="p-3 rounded-md bg-muted/30 border">
          <p className="text-xs font-medium mb-1.5">mRNA Codons:</p>
          <div className="flex flex-wrap gap-1">
            {codons.map((c, i) => (
              <span key={i} className={`px-1.5 py-0.5 rounded border font-mono text-xs ${CodonColor(i)}`}>{c}</span>
            ))}
          </div>
        </div>
        <div className="p-3 rounded-md bg-muted/30 border">
          <p className="text-xs font-medium mb-1.5">Amino Acids:</p>
          <div className="flex flex-wrap gap-1">
            {aminoAcids.map((aa, i) => {
              const changed = aa !== originalAminoAcids[i];
              return (
                <Badge key={i} variant={aa === "STOP" || changed ? "destructive" : "secondary"} className="font-mono text-xs">{aa}</Badge>
              );
            })}
          </div>
        </div>
      </div>

      {/* Original for comparison */}
      <div className="p-3 rounded-md bg-muted/30 border">
        <p className="text-xs font-medium mb-1.5">Original Amino Acids:</p>
        <div className="flex flex-wrap gap-1">
          {originalAminoAcids.map((aa, i) => (
            <Badge key={i} variant="secondary" className="font-mono text-xs">{aa}</Badge>
          ))}
        </div>
      </div>

      {/* Check button */}
      <Button onClick={checkAnswer} disabled={dnaSequence === challenge.originalDna} className="w-full">
        <CheckCircle className="h-4 w-4 mr-2" />
        Check My Mutation
      </Button>

      {/* Result */}
      {result && (
        <Card className={result.success ? "border-green-500/30 bg-green-500/5" : "border-destructive/30 bg-destructive/5"}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
              )}
              <p className="text-sm">{result.message}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// ── FRQ Component ───────────────────────────────────────────────────────

function FRQCard({ question }: { question: FRQQuestion }) {
  const [answers, setAnswers] = useState<Record<string, string>>(
    Object.fromEntries(question.parts.map((p) => [p.label, ""]))
  );
  const [showRubric, setShowRubric] = useState(false);

  const fullAnswerText = () => {
    let text = `Question ${question.number}: ${question.topic}\n`;
    text += `${question.question}\n\n`;
    question.parts.forEach((part) => {
      text += `(${part.label}) ${part.prompt}\n`;
      text += `Answer: ${answers[part.label] || "(not answered)"}\n\n`;
    });
    return text.trim();
  };

  const totalAnswered = Object.values(answers).filter((a) => a.trim().length > 0).length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">Question {question.number}</CardTitle>
            <Badge variant="outline">{question.difficulty}</Badge>
            <Badge variant="secondary">{question.points} pts</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {totalAnswered}/{question.parts.length} parts answered
            </span>
            <CopyButton text={fullAnswerText()} label={`Question ${question.number} answers copied`} />
          </div>
        </div>
        <CardDescription>{question.topic}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="p-4 rounded-md bg-muted/50 border">
          <p className="text-sm leading-relaxed">{question.question}</p>
        </div>

        {question.parts.map((part) => (
          <div key={part.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                ({part.label}) <span className="font-normal text-muted-foreground">({part.points} pt{part.points !== 1 ? "s" : ""})</span>
              </label>
              {answers[part.label].trim().length > 0 && (
                <CopyButton
                  text={`(${part.label}) ${part.prompt}\nAnswer: ${answers[part.label]}`}
                  label={`Part (${part.label}) copied`}
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{part.prompt}</p>
            <Textarea
              value={answers[part.label]}
              onChange={(e) => setAnswers({ ...answers, [part.label]: e.target.value })}
              placeholder="Type your answer here..."
              className="min-h-[100px] text-sm"
            />
          </div>
        ))}

        {/* Copy all & rubric guidance */}
        <div className="flex items-center justify-between pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowRubric(!showRubric)}
            className="gap-1 text-muted-foreground"
          >
            <Lightbulb className="h-4 w-4" />
            {showRubric ? "Hide" : "Show"} Rubric Guidance
            {showRubric ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </Button>
          <CopyButton text={fullAnswerText()} label="All answers copied" />
        </div>

        {showRubric && (
          <Card className="bg-accent/5 border-accent/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium mb-1">Rubric Guidance (for self-assessment):</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{question.rubricGuidance}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

// ── Main Page Component ─────────────────────────────────────────────────

export default function Assessment() {
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [activeChallengeIndex, setActiveChallengeIndex] = useState<number | null>(null);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-md bg-primary">
            <ClipboardCheck className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Assessment</h1>
            <p className="text-muted-foreground">
              Mutation challenges & free-response questions
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="challenges" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="challenges">
            <Dna className="h-4 w-4 mr-2" />
            Mutation Challenges
          </TabsTrigger>
          <TabsTrigger value="frq">
            <FileText className="h-4 w-4 mr-2" />
            Free Response (FRQ)
          </TabsTrigger>
        </TabsList>

        {/* ── Challenges Tab ── */}
        <TabsContent value="challenges" className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium mb-1">How challenges work:</p>
                  <p className="text-sm text-muted-foreground">
                    You are given a DNA sequence and a goal. Create the specified mutation on your own — no hints or step-by-step guidance.
                    Click "Check My Mutation" when you think you've done it correctly. You'll get specific feedback if your answer is wrong.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress */}
          <div className="flex items-center gap-4">
            <Progress value={(completedChallenges.size / CHALLENGES.length) * 100} className="flex-1 h-3" />
            <span className="text-sm text-muted-foreground whitespace-nowrap">
              {completedChallenges.size} / {CHALLENGES.length} completed
            </span>
          </div>

          {activeChallengeIndex !== null ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold">{CHALLENGES[activeChallengeIndex].title}</h2>
                  <Badge variant={CHALLENGES[activeChallengeIndex].difficulty === "Challenging" ? "destructive" : "secondary"}>
                    {CHALLENGES[activeChallengeIndex].difficulty}
                  </Badge>
                </div>
                <Button variant="outline" size="sm" onClick={() => setActiveChallengeIndex(null)}>
                  All Challenges
                </Button>
              </div>
              <ChallengePlayer
                key={CHALLENGES[activeChallengeIndex].id}
                challenge={CHALLENGES[activeChallengeIndex]}
                onComplete={() => {
                  setCompletedChallenges((prev) => new Set(prev).add(CHALLENGES[activeChallengeIndex!].id));
                }}
              />
            </div>
          ) : (
            <div className="grid gap-3">
              {CHALLENGES.map((challenge, index) => {
                const isCompleted = completedChallenges.has(challenge.id);
                return (
                  <Card
                    key={challenge.id}
                    className={`cursor-pointer transition-all hover-elevate ${isCompleted ? "border-green-500/30 bg-green-500/5" : ""}`}
                    onClick={() => setActiveChallengeIndex(index)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-muted">
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h3 className="font-semibold text-sm">{challenge.title}</h3>
                            <Badge variant={challenge.difficulty === "Challenging" ? "destructive" : "outline"} className="text-xs">
                              {challenge.difficulty}
                            </Badge>
                            {isCompleted && <Badge className="bg-green-500 text-white text-xs">Complete</Badge>}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">{challenge.instruction}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* ── FRQ Tab ── */}
        <TabsContent value="frq" className="space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Free Response Questions (AP/IB Level):</p>
                  <p className="text-sm text-muted-foreground">
                    Answer each part thoroughly. These questions require you to explain biological concepts,
                    make predictions, and evaluate claims — just like on the AP or IB exam. Use the <strong>Copy Answer</strong> button
                    to copy your responses and paste them into a Google Doc or Word document for your teacher to review.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            {FRQ_QUESTIONS.map((q) => (
              <FRQCard key={q.id} question={q} />
            ))}
          </div>

          {/* Copy ALL answers */}
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Export All Answers</p>
                  <p className="text-xs text-muted-foreground">
                    Copy all FRQ answers at once to paste into a document for submission
                  </p>
                </div>
                <CopyButton
                  text="Note: Use the individual Copy Answer buttons on each question to copy your typed responses."
                  label="Use individual copy buttons for each question"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Codon reference */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Dna className="h-4 w-4" />
            Codon Reference Table
          </CardTitle>
          <CardDescription>Use this to look up codons during challenges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-1.5 text-xs">
            {Object.entries(codonTable).map(([codon, data]) => (
              <div key={codon} className="p-1.5 rounded bg-muted/50 text-center">
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
