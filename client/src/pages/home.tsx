import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dna, Zap, GitBranch, Target, Lightbulb, BookOpen, Puzzle, ArrowRight, GraduationCap, ClipboardCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4 py-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-primary/10">
            <Dna className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          Genetic Mutations
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The Engine of Variation
        </p>
        <div className="flex gap-2 justify-center">
          <Badge variant="outline" className="text-sm">AP Biology</Badge>
          <Badge variant="outline" className="text-sm">IB Biology</Badge>
        </div>
      </div>

      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-primary">
              <Lightbulb className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle>The Big Idea</CardTitle>
              <CardDescription>Understanding the relationship between mutation and evolution</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Mutations are the <span className="font-semibold text-foreground">only source of brand-new alleles</span> in a population. 
            They provide the raw genetic material upon which Natural Selection acts.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Mutations are random</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span>Natural Selection is not</span>
            </div>
          </div>
          <Link href="/big-idea">
            <Button className="mt-2" data-testid="button-explore-big-idea">
              Explore the Big Idea
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          Core Modules
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/mechanisms">
            <Card className="h-full hover-elevate cursor-pointer group">
              <CardHeader>
                <div className="p-2 rounded-md bg-chart-1/10 w-fit mb-2">
                  <Zap className="h-5 w-5 text-chart-1" />
                </div>
                <CardTitle className="text-lg">Mechanisms</CardTitle>
                <CardDescription>How and why mutations occur</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Spontaneous vs. Induced</li>
                  <li>Replication Errors</li>
                  <li>Mutagens</li>
                </ul>
                <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/types">
            <Card className="h-full hover-elevate cursor-pointer group">
              <CardHeader>
                <div className="p-2 rounded-md bg-chart-2/10 w-fit mb-2">
                  <GitBranch className="h-5 w-5 text-chart-2" />
                </div>
                <CardTitle className="text-lg">Types & Reading Frame</CardTitle>
                <CardDescription>Understanding mutation categories</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Point Mutations (Substitutions)</li>
                  <li>Frameshift Mutations</li>
                  <li>Insertions & Deletions</li>
                </ul>
                <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/outcomes">
            <Card className="h-full hover-elevate cursor-pointer group">
              <CardHeader>
                <div className="p-2 rounded-md bg-chart-3/10 w-fit mb-2">
                  <Target className="h-5 w-5 text-chart-3" />
                </div>
                <CardTitle className="text-lg">Biological Outcomes</CardTitle>
                <CardDescription>Impact on fitness and selection</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>Beneficial & Positive Selection</li>
                  <li>Deleterious & Negative Selection</li>
                  <li>Neutral & Silent Mutations</li>
                </ul>
                <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Puzzle className="h-6 w-6 text-accent" />
          Interactive Learning
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/case-studies">
            <Card className="h-full hover-elevate cursor-pointer group">
              <CardHeader>
                <div className="p-2 rounded-md bg-chart-4/10 w-fit mb-2">
                  <BookOpen className="h-5 w-5 text-chart-4" />
                </div>
                <CardTitle className="text-lg">Case Studies</CardTitle>
                <CardDescription>Real-world examples of mutations in action</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Sickle Cell Anemia</Badge>
                  <Badge variant="secondary">Antibiotic Resistance</Badge>
                  <Badge variant="secondary">Lactose Tolerance</Badge>
                </div>
                <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Explore Cases <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/puzzle">
            <Card className="h-full hover-elevate cursor-pointer group border-accent/20">
              <CardHeader>
                <div className="p-2 rounded-md bg-accent/10 w-fit mb-2">
                  <Puzzle className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="text-lg">Reading Frame Puzzle</CardTitle>
                <CardDescription>Interactive mutation simulator</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Delete nucleotides and watch how frameshift mutations affect protein synthesis in real-time.
                </p>
                <div className="mt-4 flex items-center text-accent text-sm font-medium group-hover:gap-2 transition-all">
                  Try the Puzzle <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          Student Practice
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/lessons">
            <Card className="h-full hover-elevate cursor-pointer group border-primary/20">
              <CardHeader>
                <div className="p-2 rounded-md bg-primary/10 w-fit mb-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Guided Lessons</CardTitle>
                <CardDescription>Step-by-step instruction on creating mutations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Follow guided instructions to physically create each mutation type — silent, missense,
                  nonsense, deletion, and insertion — with real-time feedback and explanations.
                </p>
                <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Start Learning <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/assessment">
            <Card className="h-full hover-elevate cursor-pointer group border-accent/20">
              <CardHeader>
                <div className="p-2 rounded-md bg-accent/10 w-fit mb-2">
                  <ClipboardCheck className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="text-lg">Assessment</CardTitle>
                <CardDescription>Mutation challenges & AP/IB free-response questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="secondary">Mutation Challenges</Badge>
                  <Badge variant="secondary">FRQ Questions</Badge>
                  <Badge variant="secondary">Copy to Docs</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Test yourself with hands-on mutation challenges and AP/IB-level written questions.
                  Copy answers for teacher review.
                </p>
                <div className="mt-4 flex items-center text-accent text-sm font-medium group-hover:gap-2 transition-all">
                  Take Assessment <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-md bg-primary/10">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Key Distinction</h3>
              <p className="text-sm text-muted-foreground">
                Remember: An <span className="font-medium text-foreground">individual</span> has a mutation,
                but only a <span className="font-medium text-foreground">population</span> evolves.
                A mutation only becomes an adaptation if it is "vetted" by the environment and increases
                in frequency within a population over generations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
