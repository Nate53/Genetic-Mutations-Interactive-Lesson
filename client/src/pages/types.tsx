import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitBranch, Replace, Plus, Minus, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function Types() {
  const [selectedSubstitution, setSelectedSubstitution] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-md bg-chart-2">
            <GitBranch className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Types of Mutations</h1>
            <p className="text-muted-foreground">Point mutations and frameshifts</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="point" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="point" data-testid="tab-point">
            <Replace className="h-4 w-4 mr-2" />
            Point Mutations
          </TabsTrigger>
          <TabsTrigger value="frameshift" data-testid="tab-frameshift">
            <AlertCircle className="h-4 w-4 mr-2" />
            Frameshift
          </TabsTrigger>
        </TabsList>

        <TabsContent value="point" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Replace className="h-5 w-5 text-chart-2" />
                Point Mutations (Substitutions)
              </CardTitle>
              <CardDescription>A single nucleotide is replaced by another</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Point mutations change only one nucleotide. While this seems minor, 
                the effect depends entirely on <span className="font-semibold text-foreground">where</span> the 
                mutation occurs and <span className="font-semibold text-foreground">what</span> it changes.
              </p>

              <div className="grid gap-4">
                <div 
                  className={`p-4 rounded-md border cursor-pointer transition-all ${
                    selectedSubstitution === 'silent' 
                      ? 'bg-chart-1/10 border-chart-1' 
                      : 'bg-card hover-elevate'
                  }`}
                  onClick={() => setSelectedSubstitution(selectedSubstitution === 'silent' ? null : 'silent')}
                  data-testid="card-silent-mutation"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="h-5 w-5 text-chart-1" />
                    <h3 className="font-semibold">Silent Mutation</h3>
                    <Badge variant="outline" className="ml-auto">No Effect</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    The codon changes, but codes for the <span className="font-medium text-foreground">same amino acid</span>.
                  </p>
                  {selectedSubstitution === 'silent' && (
                    <div className="mt-4 p-4 bg-card rounded-md border space-y-3">
                      <p className="text-sm font-medium">Example:</p>
                      <div className="font-mono text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Normal:</span>
                          <span className="px-2 py-1 bg-muted rounded">GGU</span>
                          <span>→ Glycine</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Mutant:</span>
                          <span className="px-2 py-1 bg-chart-1/20 rounded">GGC</span>
                          <span>→ Glycine</span>
                          <Badge variant="secondary" className="text-xs">Same!</Badge>
                        </div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded text-sm">
                        <p className="font-medium mb-1">Why does this happen?</p>
                        <p className="text-muted-foreground">
                          Due to the <span className="font-medium text-foreground">degeneracy of the genetic code</span> (Wobble Hypothesis), 
                          multiple codons can code for the same amino acid. The 3rd position often doesn't matter.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div 
                  className={`p-4 rounded-md border cursor-pointer transition-all ${
                    selectedSubstitution === 'missense' 
                      ? 'bg-chart-3/10 border-chart-3' 
                      : 'bg-card hover-elevate'
                  }`}
                  onClick={() => setSelectedSubstitution(selectedSubstitution === 'missense' ? null : 'missense')}
                  data-testid="card-missense-mutation"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="h-5 w-5 text-chart-3" />
                    <h3 className="font-semibold">Missense Mutation</h3>
                    <Badge variant="outline" className="ml-auto">Variable Effect</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    The codon changes to code for a <span className="font-medium text-foreground">different amino acid</span>.
                  </p>
                  {selectedSubstitution === 'missense' && (
                    <div className="mt-4 p-4 bg-card rounded-md border space-y-3">
                      <p className="text-sm font-medium">Example (Sickle Cell Anemia):</p>
                      <div className="font-mono text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Normal:</span>
                          <span className="px-2 py-1 bg-muted rounded">GAG</span>
                          <span>→ Glutamic Acid</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Mutant:</span>
                          <span className="px-2 py-1 bg-chart-3/20 rounded">GUG</span>
                          <span>→ Valine</span>
                          <Badge variant="destructive" className="text-xs">Different!</Badge>
                        </div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded text-sm">
                        <p className="font-medium mb-1">Effects can range from:</p>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• <span className="font-medium text-foreground">Benign:</span> Similar amino acid, minimal effect on protein</li>
                          <li>• <span className="font-medium text-foreground">Harmful:</span> Different amino acid disrupts protein function</li>
                          <li>• <span className="font-medium text-foreground">Beneficial:</span> Rare, but can improve protein function</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                <div 
                  className={`p-4 rounded-md border cursor-pointer transition-all ${
                    selectedSubstitution === 'nonsense' 
                      ? 'bg-destructive/10 border-destructive' 
                      : 'bg-card hover-elevate'
                  }`}
                  onClick={() => setSelectedSubstitution(selectedSubstitution === 'nonsense' ? null : 'nonsense')}
                  data-testid="card-nonsense-mutation"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <XCircle className="h-5 w-5 text-destructive" />
                    <h3 className="font-semibold">Nonsense Mutation</h3>
                    <Badge variant="destructive" className="ml-auto">Usually Severe</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    The codon changes to a <span className="font-medium text-foreground">STOP codon</span>, 
                    truncating the protein.
                  </p>
                  {selectedSubstitution === 'nonsense' && (
                    <div className="mt-4 p-4 bg-card rounded-md border space-y-3">
                      <p className="text-sm font-medium">Example:</p>
                      <div className="font-mono text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Normal:</span>
                          <span className="px-2 py-1 bg-muted rounded">CAG</span>
                          <span>→ Glutamine</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Mutant:</span>
                          <span className="px-2 py-1 bg-destructive/20 rounded">UAG</span>
                          <span>→ STOP</span>
                          <Badge variant="destructive" className="text-xs">Truncated!</Badge>
                        </div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded text-sm">
                        <p className="font-medium mb-1">Why is this severe?</p>
                        <p className="text-muted-foreground">
                          Translation stops early, producing a shortened, usually non-functional protein. 
                          The earlier the STOP codon, the more of the protein is lost.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frameshift" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                Frameshift Mutations
              </CardTitle>
              <CardDescription>Insertions or deletions that shift the reading frame</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-md">
                <p className="font-medium text-destructive mb-2">Catastrophic Effect</p>
                <p className="text-sm text-muted-foreground">
                  When nucleotides are inserted or deleted in numbers not divisible by 3, 
                  the entire reading frame shifts. <span className="font-semibold text-foreground">Every codon 
                  downstream</span> is misread!
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Understanding the Reading Frame</h3>
                <p className="text-sm text-muted-foreground">
                  DNA is read in groups of 3 nucleotides (codons). The "reading frame" 
                  determines which groups of 3 are read together.
                </p>
                
                <div className="p-4 bg-muted/50 rounded-md space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Original Sequence:</p>
                    <div className="font-mono text-lg flex flex-wrap gap-1">
                      <span className="px-2 py-1 bg-chart-1/20 rounded border border-chart-1/30">AUG</span>
                      <span className="px-2 py-1 bg-chart-2/20 rounded border border-chart-2/30">GCU</span>
                      <span className="px-2 py-1 bg-chart-3/20 rounded border border-chart-3/30">UAC</span>
                      <span className="px-2 py-1 bg-chart-4/20 rounded border border-chart-4/30">GGA</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Met - Ala - Tyr - Gly</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-md border bg-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Minus className="h-5 w-5 text-destructive" />
                    <h3 className="font-semibold">Deletion</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Remove one nucleotide and watch the frame shift:
                  </p>
                  <div className="p-3 bg-muted/50 rounded space-y-2">
                    <p className="text-xs text-muted-foreground">Delete the 'G' from position 4:</p>
                    <div className="font-mono text-sm">
                      <span className="text-muted-foreground line-through">AUG GCU UAC GGA</span>
                    </div>
                    <div className="font-mono text-sm flex flex-wrap gap-1">
                      <span className="px-1 bg-chart-1/20 rounded">AUG</span>
                      <span className="px-1 bg-destructive/20 rounded">CUU</span>
                      <span className="px-1 bg-destructive/20 rounded">ACG</span>
                      <span className="px-1 bg-destructive/20 rounded">GA...</span>
                    </div>
                    <p className="text-xs text-destructive">Met - Leu - Thr - ???</p>
                    <p className="text-xs text-muted-foreground">Completely different protein!</p>
                  </div>
                </div>

                <div className="p-4 rounded-md border bg-card">
                  <div className="flex items-center gap-2 mb-3">
                    <Plus className="h-5 w-5 text-chart-3" />
                    <h3 className="font-semibold">Insertion</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Insert one nucleotide and watch the frame shift:
                  </p>
                  <div className="p-3 bg-muted/50 rounded space-y-2">
                    <p className="text-xs text-muted-foreground">Insert 'C' after position 3:</p>
                    <div className="font-mono text-sm">
                      <span className="text-muted-foreground line-through">AUG GCU UAC GGA</span>
                    </div>
                    <div className="font-mono text-sm flex flex-wrap gap-1">
                      <span className="px-1 bg-chart-1/20 rounded">AUG</span>
                      <span className="px-1 bg-chart-3/20 rounded border border-chart-3">C</span>
                      <span className="px-1 bg-destructive/20 rounded">GCU</span>
                      <span className="px-1 bg-destructive/20 rounded">UAC</span>
                      <span className="px-1 bg-destructive/20 rounded">GGA</span>
                    </div>
                    <p className="text-xs text-destructive">Met - Arg - Leu - Arg</p>
                    <p className="text-xs text-muted-foreground">Completely different protein!</p>
                  </div>
                </div>
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">The Exception: Multiples of 3</h4>
                  <p className="text-sm text-muted-foreground">
                    If the insertion or deletion is a multiple of 3 nucleotides, the reading 
                    frame is preserved. The protein will have extra or missing amino acids, 
                    but downstream codons are read correctly.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3">Summary: Impact Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">Type</th>
                  <th className="text-left py-2 pr-4">Change</th>
                  <th className="text-left py-2">Typical Severity</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium text-foreground">Silent</td>
                  <td className="py-2 pr-4">Same amino acid</td>
                  <td className="py-2"><Badge variant="outline">None</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium text-foreground">Missense</td>
                  <td className="py-2 pr-4">Different amino acid</td>
                  <td className="py-2"><Badge variant="secondary">Variable</Badge></td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 font-medium text-foreground">Nonsense</td>
                  <td className="py-2 pr-4">Premature STOP</td>
                  <td className="py-2"><Badge variant="destructive">Usually Severe</Badge></td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-foreground">Frameshift</td>
                  <td className="py-2 pr-4">All downstream codons</td>
                  <td className="py-2"><Badge variant="destructive">Catastrophic</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
