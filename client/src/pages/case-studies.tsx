import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Heart, Bug, Milk, ChevronRight } from "lucide-react";

export default function CaseStudies() {
  const [activeCase, setActiveCase] = useState("sickle");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-md bg-chart-4">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Case Studies</h1>
            <p className="text-muted-foreground">Real-world examples of mutations in action</p>
          </div>
        </div>
      </div>

      <Tabs value={activeCase} onValueChange={setActiveCase} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sickle" data-testid="tab-sickle-cell">
            <Heart className="h-4 w-4 mr-2" />
            Sickle Cell
          </TabsTrigger>
          <TabsTrigger value="antibiotic" data-testid="tab-antibiotic">
            <Bug className="h-4 w-4 mr-2" />
            Antibiotic Resistance
          </TabsTrigger>
          <TabsTrigger value="lactose" data-testid="tab-lactose">
            <Milk className="h-4 w-4 mr-2" />
            Lactose Tolerance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sickle" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-destructive/10">
                  <Heart className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <CardTitle>Sickle Cell Anemia</CardTitle>
                  <CardDescription>A classic example of missense mutation and balancing selection</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-md bg-muted/50">
                  <h4 className="font-medium mb-2">The Mutation</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span>Point mutation in the β-globin gene</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span>A → T substitution in codon 6</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-primary" />
                      <span>GAG → GUG (Glutamic Acid → Valine)</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-md bg-destructive/5 border border-destructive/20">
                  <h4 className="font-medium mb-2">The Effect</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-destructive" />
                      <span>Valine is hydrophobic, disrupts hemoglobin</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-destructive" />
                      <span>Hemoglobin molecules stick together</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="h-4 w-4 mt-0.5 text-destructive" />
                      <span>Red blood cells become sickle-shaped</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-md bg-card border">
                <h4 className="font-medium mb-3">Genotype Comparison</h4>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="p-3 rounded-md bg-chart-1/10 border border-chart-1/20 text-center">
                    <Badge className="mb-2 bg-chart-1">HbA/HbA</Badge>
                    <p className="text-sm font-medium">Normal</p>
                    <p className="text-xs text-muted-foreground">No sickle cells, susceptible to malaria</p>
                  </div>
                  <div className="p-3 rounded-md bg-accent/10 border border-accent/20 text-center">
                    <Badge className="mb-2">HbA/HbS</Badge>
                    <p className="text-sm font-medium">Carrier (Trait)</p>
                    <p className="text-xs text-muted-foreground">Mild sickling, resistant to malaria</p>
                  </div>
                  <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-center">
                    <Badge variant="destructive" className="mb-2">HbS/HbS</Badge>
                    <p className="text-sm font-medium">Sickle Cell Disease</p>
                    <p className="text-xs text-muted-foreground">Severe anemia, pain crises</p>
                  </div>
                </div>
              </div>

              <Card className="bg-gradient-to-br from-chart-1/5 to-accent/5 border-primary/20">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Heterozygote Advantage</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    In regions with malaria, carriers (HbA/HbS) have the highest fitness:
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Better survival than HbA/HbA (who die from malaria)</li>
                    <li>• Better survival than HbS/HbS (who die from anemia)</li>
                    <li>• This is why the allele persists despite being harmful when homozygous</li>
                  </ul>
                </CardContent>
              </Card>

              <div className="bg-muted/50 p-4 rounded-md">
                <p className="text-sm font-medium mb-2">Key Exam Points:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Classic example of a <span className="font-medium text-foreground">missense mutation</span></li>
                  <li>• Demonstrates <span className="font-medium text-foreground">balancing selection</span></li>
                  <li>• Shows how environment determines whether a mutation is beneficial or harmful</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="antibiotic" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-chart-3/10">
                  <Bug className="h-5 w-5 text-chart-3" />
                </div>
                <div>
                  <CardTitle>Antibiotic Resistance</CardTitle>
                  <CardDescription>Evolution in action - natural selection under drug pressure</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-chart-3/5 border border-chart-3/20 p-4 rounded-md">
                <h4 className="font-medium mb-2">The Misconception</h4>
                <p className="text-sm text-muted-foreground">
                  <span className="line-through">Bacteria "develop" resistance when exposed to antibiotics.</span>
                </p>
                <p className="text-sm font-medium mt-2">The Reality:</p>
                <p className="text-sm text-muted-foreground">
                  Resistance mutations already exist in the population <span className="font-medium text-foreground">before</span> antibiotic 
                  exposure. The antibiotic simply selects for pre-existing resistant variants.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">How Resistance Evolves</h4>
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 p-3 rounded-md bg-card border">
                    <Badge>1</Badge>
                    <div>
                      <p className="font-medium text-sm">Random Mutation Occurs</p>
                      <p className="text-xs text-muted-foreground">
                        A bacterium randomly acquires a mutation that happens to interfere 
                        with an antibiotic's mechanism (e.g., altered target protein, efflux pump)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-md bg-card border">
                    <Badge>2</Badge>
                    <div>
                      <p className="font-medium text-sm">Antibiotic Selection Pressure</p>
                      <p className="text-xs text-muted-foreground">
                        When antibiotics are applied, susceptible bacteria die. The resistant 
                        mutant survives and reproduces.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-md bg-card border">
                    <Badge>3</Badge>
                    <div>
                      <p className="font-medium text-sm">Rapid Reproduction</p>
                      <p className="text-xs text-muted-foreground">
                        Bacteria divide every 20-30 minutes. Within hours, the resistant 
                        strain dominates the population.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-md bg-chart-1/10 border border-chart-1/20">
                    <Badge className="bg-chart-1">4</Badge>
                    <div>
                      <p className="font-medium text-sm text-chart-1">Population is Now Resistant</p>
                      <p className="text-xs text-muted-foreground">
                        The antibiotic is no longer effective against this bacterial population.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-md bg-card border">
                <h4 className="font-medium mb-3">Types of Resistance Mutations</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="p-3 rounded-md bg-muted/50">
                    <p className="font-medium text-sm">Target Modification</p>
                    <p className="text-xs text-muted-foreground">
                      Mutation changes the protein the antibiotic targets, 
                      so it can no longer bind effectively
                    </p>
                  </div>
                  <div className="p-3 rounded-md bg-muted/50">
                    <p className="font-medium text-sm">Efflux Pumps</p>
                    <p className="text-xs text-muted-foreground">
                      Mutations enhance pumps that actively remove 
                      antibiotics from the cell
                    </p>
                  </div>
                  <div className="p-3 rounded-md bg-muted/50">
                    <p className="font-medium text-sm">Enzyme Production</p>
                    <p className="text-xs text-muted-foreground">
                      Bacteria produce enzymes that break down 
                      the antibiotic (e.g., β-lactamases)
                    </p>
                  </div>
                  <div className="p-3 rounded-md bg-muted/50">
                    <p className="font-medium text-sm">Reduced Uptake</p>
                    <p className="text-xs text-muted-foreground">
                      Changes in cell membrane reduce how much 
                      antibiotic enters the cell
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-md">
                <p className="text-sm font-medium mb-2">Key Exam Points:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Perfect example of <span className="font-medium text-foreground">positive selection</span></li>
                  <li>• Demonstrates that mutations are <span className="font-medium text-foreground">random</span>, not directed</li>
                  <li>• Shows evolution happening on observable timescales</li>
                  <li>• Important public health implications</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lactose" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-chart-4/10">
                  <Milk className="h-5 w-5 text-chart-4" />
                </div>
                <div>
                  <CardTitle>Lactose Tolerance</CardTitle>
                  <CardDescription>A beneficial mutation that spread through human populations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-md bg-muted/50">
                  <h4 className="font-medium mb-2">The Default State</h4>
                  <p className="text-sm text-muted-foreground">
                    Most mammals, including most humans, become <span className="font-medium text-foreground">lactose 
                    intolerant</span> after weaning. The gene for lactase (the enzyme that 
                    digests milk sugar) is "turned off" in childhood.
                  </p>
                </div>
                <div className="p-4 rounded-md bg-chart-1/10 border border-chart-1/20">
                  <h4 className="font-medium mb-2">The Mutation</h4>
                  <p className="text-sm text-muted-foreground">
                    A point mutation in the <span className="font-medium text-foreground">regulatory region</span> upstream 
                    of the lactase gene keeps it "on" throughout life. This is called 
                    <span className="font-medium text-foreground"> lactase persistence</span>.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-md bg-card border">
                <h4 className="font-medium mb-3">The Selective Advantage</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  About 8,000-10,000 years ago, humans began domesticating cattle. 
                  For populations that relied on milk as a food source:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 text-chart-1" />
                    <span>Lactase persistence provided additional calories and nutrition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 text-chart-1" />
                    <span>Milk provided clean water source (safer than local water)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 text-chart-1" />
                    <span>Calcium and vitamin D from milk improved bone health</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 mt-0.5 text-chart-1" />
                    <span>Those with the mutation had higher survival and more offspring</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-md bg-accent/5 border border-accent/20">
                <h4 className="font-medium mb-3">Geographic Distribution</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Lactase persistence evolved independently in different populations:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-md bg-card border text-center">
                    <p className="font-medium text-sm">Northern Europe</p>
                    <p className="text-xs text-muted-foreground">~90% lactose tolerant</p>
                  </div>
                  <div className="p-3 rounded-md bg-card border text-center">
                    <p className="font-medium text-sm">East Africa</p>
                    <p className="text-xs text-muted-foreground">~50% lactose tolerant</p>
                  </div>
                  <div className="p-3 rounded-md bg-card border text-center">
                    <p className="font-medium text-sm">East Asia</p>
                    <p className="text-xs text-muted-foreground">~5% lactose tolerant</p>
                  </div>
                  <div className="p-3 rounded-md bg-card border text-center">
                    <p className="font-medium text-sm">West Africa</p>
                    <p className="text-xs text-muted-foreground">~20% lactose tolerant</p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-md">
                <p className="text-sm font-medium mb-2">Key Exam Points:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Example of <span className="font-medium text-foreground">positive selection</span> in recent human evolution</li>
                  <li>• Demonstrates <span className="font-medium text-foreground">convergent evolution</span> (evolved independently multiple times)</li>
                  <li>• Shows how <span className="font-medium text-foreground">cultural changes</span> (domestication) can create new selection pressures</li>
                  <li>• Mutation is in a <span className="font-medium text-foreground">regulatory region</span>, not the gene itself</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
