import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, RefreshCw, AlertTriangle, Radiation, FlaskConical, Sun, Flame } from "lucide-react";

export default function Mechanisms() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-md bg-chart-1">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Mechanisms of Mutation</h1>
            <p className="text-muted-foreground">How and why mutations occur</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="spontaneous" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="spontaneous" data-testid="tab-spontaneous">
            <RefreshCw className="h-4 w-4 mr-2" />
            Spontaneous
          </TabsTrigger>
          <TabsTrigger value="induced" data-testid="tab-induced">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Induced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="spontaneous" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-chart-1" />
                Spontaneous Mutations
              </CardTitle>
              <CardDescription>Mutations that occur naturally during normal cellular processes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Spontaneous mutations arise from internal cellular processes without external influence. 
                They are an inherent part of DNA replication and cellular metabolism.
              </p>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">DNA Replication Errors</h3>
                <div className="bg-muted/50 p-4 rounded-md space-y-3">
                  <p className="text-sm text-muted-foreground">
                    DNA polymerase, the enzyme responsible for copying DNA, occasionally makes mistakes 
                    despite its proofreading ability.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-md bg-card border">
                      <p className="font-medium text-sm">Error Rate</p>
                      <p className="text-2xl font-bold text-chart-1">~1 in 10<sup>9</sup></p>
                      <p className="text-xs text-muted-foreground">per base pair after proofreading</p>
                    </div>
                    <div className="p-3 rounded-md bg-card border">
                      <p className="font-medium text-sm">Human Genome</p>
                      <p className="text-2xl font-bold text-chart-2">~3 billion</p>
                      <p className="text-xs text-muted-foreground">base pairs to copy</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This means approximately <span className="font-semibold text-foreground">1-3 new mutations</span> occur 
                    each time a human cell divides, even under perfect conditions.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Types of Replication Errors</h3>
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 p-3 rounded-md bg-card border">
                    <Badge variant="outline">Misincorporation</Badge>
                    <p className="text-sm text-muted-foreground">
                      Wrong nucleotide is inserted (e.g., A pairs with C instead of T)
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-md bg-card border">
                    <Badge variant="outline">Slippage</Badge>
                    <p className="text-sm text-muted-foreground">
                      DNA polymerase "slips" on repetitive sequences, causing insertions or deletions
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-md bg-card border">
                    <Badge variant="outline">Tautomerism</Badge>
                    <p className="text-sm text-muted-foreground">
                      Bases temporarily shift to rare forms that pair incorrectly
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Spontaneous Chemical Changes</h3>
                <div className="grid gap-3">
                  <div className="p-3 rounded-md bg-card border">
                    <p className="font-medium">Depurination</p>
                    <p className="text-sm text-muted-foreground">
                      The bond between a purine base (A or G) and deoxyribose sugar breaks, 
                      leaving an "apurinic site." If not repaired before replication, 
                      any base may be inserted opposite the gap.
                    </p>
                  </div>
                  <div className="p-3 rounded-md bg-card border">
                    <p className="font-medium">Deamination</p>
                    <p className="text-sm text-muted-foreground">
                      Cytosine loses an amino group and becomes uracil. Since uracil pairs 
                      with adenine instead of guanine, this causes C→T transitions.
                    </p>
                  </div>
                  <div className="p-3 rounded-md bg-card border">
                    <p className="font-medium">Oxidative Damage</p>
                    <p className="text-sm text-muted-foreground">
                      Reactive oxygen species (ROS) from normal metabolism can oxidize bases, 
                      particularly converting guanine to 8-oxoguanine, which pairs with adenine.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="induced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-chart-3" />
                Induced Mutations
              </CardTitle>
              <CardDescription>Mutations caused by external agents called mutagens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Induced mutations are caused by external factors called <span className="font-semibold text-foreground">mutagens</span>. 
                These agents significantly increase mutation rates above background levels.
              </p>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Radiation className="h-5 w-5 text-chart-5" />
                  Physical Mutagens
                </h3>
                <div className="grid gap-3">
                  <div className="p-4 rounded-md bg-chart-5/10 border border-chart-5/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="h-4 w-4 text-chart-3" />
                      <p className="font-medium">Ultraviolet (UV) Radiation</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      UV light causes adjacent thymine bases to form covalent bonds, 
                      creating <span className="font-medium text-foreground">thymine dimers</span>.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Sunlight</Badge>
                      <Badge variant="secondary">Tanning beds</Badge>
                      <Badge variant="secondary">Causes skin cancer</Badge>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-md bg-chart-5/10 border border-chart-5/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Radiation className="h-4 w-4 text-destructive" />
                      <p className="font-medium">Ionizing Radiation</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      X-rays and gamma rays are energetic enough to break DNA strands directly 
                      or generate reactive oxygen species that damage DNA.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">X-rays</Badge>
                      <Badge variant="secondary">Gamma rays</Badge>
                      <Badge variant="secondary">Nuclear radiation</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-chart-4" />
                  Chemical Mutagens
                </h3>
                <div className="grid gap-3">
                  <div className="p-4 rounded-md bg-card border">
                    <p className="font-medium mb-1">Base Analogs</p>
                    <p className="text-sm text-muted-foreground">
                      Chemicals that resemble normal bases and get incorporated during replication, 
                      but pair incorrectly. Example: 5-bromouracil mimics thymine but pairs with guanine.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-md bg-card border">
                    <p className="font-medium mb-1">Alkylating Agents</p>
                    <p className="text-sm text-muted-foreground">
                      Add alkyl groups (like methyl or ethyl) to bases, altering their pairing properties. 
                      Example: Mustard gas, many chemotherapy drugs.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-md bg-card border">
                    <p className="font-medium mb-1">Intercalating Agents</p>
                    <p className="text-sm text-muted-foreground">
                      Flat molecules that slip between base pairs, distorting the DNA helix and 
                      causing insertions or deletions during replication. Example: Ethidium bromide, acridine dyes.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-md bg-card border">
                    <p className="font-medium mb-1">Deaminating Agents</p>
                    <p className="text-sm text-muted-foreground">
                      Remove amino groups from bases, changing their identity. 
                      Example: Nitrous acid converts cytosine to uracil.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Flame className="h-5 w-5 text-chart-3" />
                  Common Environmental Mutagens
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-md bg-muted/50 text-center">
                    <p className="font-medium text-sm">Tobacco Smoke</p>
                    <p className="text-xs text-muted-foreground">Contains 70+ carcinogens</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted/50 text-center">
                    <p className="font-medium text-sm">Benzene</p>
                    <p className="text-xs text-muted-foreground">Industrial solvent</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted/50 text-center">
                    <p className="font-medium text-sm">Asbestos</p>
                    <p className="text-xs text-muted-foreground">Building material</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted/50 text-center">
                    <p className="font-medium text-sm">Aflatoxin</p>
                    <p className="text-xs text-muted-foreground">Mold on grains</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted/50 text-center">
                    <p className="font-medium text-sm">Formaldehyde</p>
                    <p className="text-xs text-muted-foreground">Preservatives</p>
                  </div>
                  <div className="p-3 rounded-md bg-muted/50 text-center">
                    <p className="font-medium text-sm">Radon Gas</p>
                    <p className="text-xs text-muted-foreground">Natural radioactive</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3">Key Takeaway</h3>
          <p className="text-sm text-muted-foreground">
            Whether spontaneous or induced, mutations provide the genetic variation that 
            is essential for evolution. Understanding how mutations occur helps explain 
            why some environments (like those with high UV exposure) lead to higher cancer 
            rates and why DNA repair mechanisms are so critical for life.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
