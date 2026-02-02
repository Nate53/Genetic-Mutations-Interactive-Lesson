import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, TrendingDown, Minus, Volume2 } from "lucide-react";

export default function Outcomes() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-md bg-chart-3">
            <Target className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Biological Outcomes</h1>
            <p className="text-muted-foreground">How mutations affect fitness and selection</p>
          </div>
        </div>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3">Understanding Fitness</h3>
          <p className="text-muted-foreground">
            In biology, <span className="font-semibold text-foreground">"fitness"</span> refers 
            to an organism's ability to survive and reproduce in its environment. Mutations can 
            increase, decrease, or have no effect on fitness.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card className="border-chart-1/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-chart-1/10">
                <TrendingUp className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Beneficial Mutations
                  <Badge className="bg-chart-1">Positive Selection</Badge>
                </CardTitle>
                <CardDescription>Increase fitness and reproductive success</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Beneficial mutations provide a survival or reproductive advantage in a given environment. 
              Natural Selection <span className="font-semibold text-foreground">favors</span> these 
              alleles, causing them to increase in frequency over generations.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-md bg-chart-1/5 border border-chart-1/20">
                <h4 className="font-medium mb-2">Characteristics</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Improves protein function or regulation</li>
                  <li>Provides resistance to disease or predation</li>
                  <li>Increases efficiency of resource use</li>
                  <li>Enhances reproductive success</li>
                </ul>
              </div>
              <div className="p-4 rounded-md bg-card border">
                <h4 className="font-medium mb-2">Selection Process</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Carriers survive and reproduce more</li>
                  <li>Allele frequency increases each generation</li>
                  <li>May eventually become fixed in population</li>
                  <li>Becomes an "adaptation"</li>
                </ul>
              </div>
            </div>

            <div className="bg-card p-4 rounded-md border">
              <p className="text-sm font-medium mb-2">Example: Antibiotic Resistance</p>
              <p className="text-sm text-muted-foreground">
                A mutation in a bacterial gene that prevents an antibiotic from binding to its 
                target protein. In the presence of antibiotics, bacteria with this mutation 
                survive while others die - a clear fitness advantage.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-destructive/10">
                <TrendingDown className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Deleterious Mutations
                  <Badge variant="destructive">Negative Selection</Badge>
                </CardTitle>
                <CardDescription>Decrease fitness and survival</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Deleterious (harmful) mutations reduce survival or reproductive success. Natural 
              Selection acts <span className="font-semibold text-foreground">against</span> these 
              alleles, removing them from the population over time.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-md bg-destructive/5 border border-destructive/20">
                <h4 className="font-medium mb-2">Characteristics</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Disrupts protein function</li>
                  <li>Causes disease or dysfunction</li>
                  <li>Reduces ability to obtain resources</li>
                  <li>Decreases survival or reproduction</li>
                </ul>
              </div>
              <div className="p-4 rounded-md bg-card border">
                <h4 className="font-medium mb-2">Selection Process</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Carriers have lower fitness</li>
                  <li>Allele frequency decreases</li>
                  <li>May be purged from population</li>
                  <li>Called "purifying selection"</li>
                </ul>
              </div>
            </div>

            <div className="bg-card p-4 rounded-md border">
              <p className="text-sm font-medium mb-2">Example: Cystic Fibrosis</p>
              <p className="text-sm text-muted-foreground">
                A deletion mutation in the CFTR gene causes thick mucus buildup in lungs 
                and digestive system. Without modern medicine, individuals with two copies 
                had severely reduced lifespan and fertility.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-muted-foreground/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-muted">
                <Minus className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Neutral Mutations
                  <Badge variant="secondary">No Selection</Badge>
                </CardTitle>
                <CardDescription>No effect on fitness</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Neutral mutations have no effect on an organism's survival or reproduction. 
              Natural Selection is "blind" to these changes - their frequency changes only 
              through random genetic drift.
            </p>
            
            <div className="p-4 rounded-md bg-muted/50">
              <h4 className="font-medium mb-3">Where Neutral Mutations Occur</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 rounded-md bg-card border">
                  <p className="font-medium text-sm mb-1">Non-coding Regions</p>
                  <p className="text-xs text-muted-foreground">
                    Introns, intergenic DNA, and pseudogenes don't produce functional proteins, 
                    so changes here usually have no phenotypic effect.
                  </p>
                </div>
                <div className="p-3 rounded-md bg-card border">
                  <p className="font-medium text-sm mb-1">Non-regulatory Regions</p>
                  <p className="text-xs text-muted-foreground">
                    Areas that don't affect gene expression or regulation can mutate 
                    without consequence.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-4 rounded-md border">
              <p className="text-sm font-medium mb-2">Importance in Evolution</p>
              <p className="text-sm text-muted-foreground">
                Neutral mutations accumulate at a steady rate, making them useful as a 
                "molecular clock" to estimate when species diverged. They represent the 
                majority of genetic variation between individuals.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-chart-1/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-chart-1/10">
                <Volume2 className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Silent Mutations
                  <Badge variant="outline">In Coding Regions</Badge>
                </CardTitle>
                <CardDescription>Changes in codons that don't alter the amino acid</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Silent mutations occur within genes but don't change the amino acid sequence 
              due to the <span className="font-semibold text-foreground">degeneracy of the genetic code</span>.
            </p>
            
            <div className="p-4 rounded-md bg-chart-1/5 border border-chart-1/20">
              <h4 className="font-medium mb-3">The Wobble Hypothesis</h4>
              <p className="text-sm text-muted-foreground mb-3">
                The third position of many codons can "wobble" - different nucleotides 
                in this position still code for the same amino acid.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="p-2 rounded bg-card border text-center">
                  <p className="font-mono text-sm">GGU</p>
                  <p className="text-xs text-muted-foreground">Glycine</p>
                </div>
                <div className="p-2 rounded bg-card border text-center">
                  <p className="font-mono text-sm">GGC</p>
                  <p className="text-xs text-muted-foreground">Glycine</p>
                </div>
                <div className="p-2 rounded bg-card border text-center">
                  <p className="font-mono text-sm">GGA</p>
                  <p className="text-xs text-muted-foreground">Glycine</p>
                </div>
                <div className="p-2 rounded bg-card border text-center">
                  <p className="font-mono text-sm">GGG</p>
                  <p className="text-xs text-muted-foreground">Glycine</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                All four codons produce Glycine - the third base doesn't matter!
              </p>
            </div>

            <div className="bg-card p-4 rounded-md border">
              <p className="text-sm font-medium mb-2">Why Silent ≠ Always Neutral</p>
              <p className="text-sm text-muted-foreground">
                Recent research shows some "silent" mutations can affect mRNA stability, 
                splicing, or translation speed. However, for most AP/IB purposes, 
                silent mutations are considered to have no phenotypic effect.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3">Context Matters!</h3>
          <p className="text-sm text-muted-foreground mb-4">
            The same mutation can have different effects in different environments:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 rounded-md bg-card border">
              <p className="font-medium text-sm">Sickle Cell Allele</p>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>• <span className="text-destructive">Harmful</span> in non-malarial regions (causes anemia)</li>
                <li>• <span className="text-chart-1">Beneficial</span> in malarial regions (provides resistance)</li>
              </ul>
            </div>
            <div className="p-3 rounded-md bg-card border">
              <p className="font-medium text-sm">Antibiotic Resistance</p>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>• <span className="text-muted-foreground">Neutral or slightly costly</span> without antibiotics</li>
                <li>• <span className="text-chart-1">Hugely beneficial</span> when antibiotics are present</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
