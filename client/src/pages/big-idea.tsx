import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Dna, Target, Users, ArrowDown, ArrowRight, Shuffle, Filter } from "lucide-react";

export default function BigIdea() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-md bg-primary">
            <Lightbulb className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">The Big Idea</h1>
            <p className="text-muted-foreground">Understanding the relationship between mutation and evolution</p>
          </div>
        </div>
      </div>

      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dna className="h-5 w-5 text-primary" />
            The Raw Material
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            Mutations are the <span className="font-bold text-primary">only source of brand-new alleles</span> in a population.
          </p>
          <p className="text-muted-foreground">
            Without mutation, there would be no genetic variation. No new traits could ever arise. 
            Evolution would grind to a halt because Natural Selection would have nothing new to "select" from.
          </p>
          <div className="bg-card p-4 rounded-md border">
            <p className="text-sm font-medium mb-2">Key Insight:</p>
            <p className="text-sm text-muted-foreground">
              Think of mutations as the "raw material" or "fuel" for evolution. 
              They introduce novel genetic variants that didn't exist before in the gene pool.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <ArrowDown className="h-8 w-8 text-muted-foreground" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Shuffle className="h-5 w-5 text-chart-2" />
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <Filter className="h-5 w-5 text-chart-1" />
            </div>
            The Selection Process
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-md bg-chart-2/10 border border-chart-2/20">
              <div className="flex items-center gap-2 mb-2">
                <Shuffle className="h-5 w-5 text-chart-2" />
                <h3 className="font-semibold">Mutations are Random</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Mutations occur spontaneously and without direction. They don't happen "because" 
                an organism needs them. A bacterium doesn't "decide" to mutate to become antibiotic-resistant.
              </p>
            </div>
            <div className="p-4 rounded-md bg-chart-1/10 border border-chart-1/20">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="h-5 w-5 text-chart-1" />
                <h3 className="font-semibold">Natural Selection is Not</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Natural Selection is a non-random process. It consistently favors alleles that 
                increase survival and reproduction in a given environment, filtering out less fit variants.
              </p>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-md">
            <p className="text-sm">
              <span className="font-medium">The Process:</span> Mutations generate random variation 
              → Natural Selection filters this variation based on fitness → Beneficial alleles 
              increase in frequency → The population adapts over generations.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <ArrowDown className="h-8 w-8 text-muted-foreground" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-chart-3" />
            From Mutation to Adaptation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            A mutation only becomes an <span className="font-semibold text-foreground">adaptation</span> if 
            it is "vetted" by the environment and increases in frequency within a population over generations.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">1</Badge>
              <div>
                <p className="font-medium">Mutation Occurs</p>
                <p className="text-sm text-muted-foreground">A random change in DNA creates a new allele</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">2</Badge>
              <div>
                <p className="font-medium">Environmental Testing</p>
                <p className="text-sm text-muted-foreground">The organism with the mutation faces selection pressures</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">3</Badge>
              <div>
                <p className="font-medium">Differential Reproduction</p>
                <p className="text-sm text-muted-foreground">If beneficial, the organism survives and reproduces more</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge className="mt-0.5">4</Badge>
              <div>
                <p className="font-medium">Allele Frequency Increase</p>
                <p className="text-sm text-muted-foreground">The new allele spreads through the population</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="default" className="mt-0.5 bg-chart-1">5</Badge>
              <div>
                <p className="font-medium text-chart-1">Adaptation Achieved</p>
                <p className="text-sm text-muted-foreground">The mutation is now a fixed adaptation in the population</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            The Critical Distinction
          </CardTitle>
          <CardDescription>This is a common misconception on AP/IB exams</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-md bg-card border">
              <p className="text-sm text-muted-foreground mb-2">An individual...</p>
              <p className="font-semibold text-lg">Has a mutation</p>
              <p className="text-sm text-muted-foreground mt-2">
                The mutation occurs in a single organism's DNA
              </p>
            </div>
            <div className="p-4 rounded-md bg-accent/10 border border-accent/20">
              <p className="text-sm text-muted-foreground mb-2">A population...</p>
              <p className="font-semibold text-lg text-accent">Evolves</p>
              <p className="text-sm text-muted-foreground mt-2">
                Evolution is a change in allele frequencies across a population over time
              </p>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-md">
            <p className="text-sm font-medium mb-2">Remember for the Exam:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>Individuals do NOT evolve - they either survive and reproduce or they don't</li>
              <li>Evolution is measured across populations and generations</li>
              <li>A beneficial mutation in one individual means nothing if it's not passed on</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
