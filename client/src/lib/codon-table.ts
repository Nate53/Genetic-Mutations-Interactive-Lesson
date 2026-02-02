export const codonTable: Record<string, { aminoAcid: string; abbreviation: string; code: string }> = {
  "UUU": { aminoAcid: "Phenylalanine", abbreviation: "Phe", code: "F" },
  "UUC": { aminoAcid: "Phenylalanine", abbreviation: "Phe", code: "F" },
  "UUA": { aminoAcid: "Leucine", abbreviation: "Leu", code: "L" },
  "UUG": { aminoAcid: "Leucine", abbreviation: "Leu", code: "L" },
  "CUU": { aminoAcid: "Leucine", abbreviation: "Leu", code: "L" },
  "CUC": { aminoAcid: "Leucine", abbreviation: "Leu", code: "L" },
  "CUA": { aminoAcid: "Leucine", abbreviation: "Leu", code: "L" },
  "CUG": { aminoAcid: "Leucine", abbreviation: "Leu", code: "L" },
  "AUU": { aminoAcid: "Isoleucine", abbreviation: "Ile", code: "I" },
  "AUC": { aminoAcid: "Isoleucine", abbreviation: "Ile", code: "I" },
  "AUA": { aminoAcid: "Isoleucine", abbreviation: "Ile", code: "I" },
  "AUG": { aminoAcid: "Methionine", abbreviation: "Met", code: "M" },
  "GUU": { aminoAcid: "Valine", abbreviation: "Val", code: "V" },
  "GUC": { aminoAcid: "Valine", abbreviation: "Val", code: "V" },
  "GUA": { aminoAcid: "Valine", abbreviation: "Val", code: "V" },
  "GUG": { aminoAcid: "Valine", abbreviation: "Val", code: "V" },
  "UCU": { aminoAcid: "Serine", abbreviation: "Ser", code: "S" },
  "UCC": { aminoAcid: "Serine", abbreviation: "Ser", code: "S" },
  "UCA": { aminoAcid: "Serine", abbreviation: "Ser", code: "S" },
  "UCG": { aminoAcid: "Serine", abbreviation: "Ser", code: "S" },
  "CCU": { aminoAcid: "Proline", abbreviation: "Pro", code: "P" },
  "CCC": { aminoAcid: "Proline", abbreviation: "Pro", code: "P" },
  "CCA": { aminoAcid: "Proline", abbreviation: "Pro", code: "P" },
  "CCG": { aminoAcid: "Proline", abbreviation: "Pro", code: "P" },
  "ACU": { aminoAcid: "Threonine", abbreviation: "Thr", code: "T" },
  "ACC": { aminoAcid: "Threonine", abbreviation: "Thr", code: "T" },
  "ACA": { aminoAcid: "Threonine", abbreviation: "Thr", code: "T" },
  "ACG": { aminoAcid: "Threonine", abbreviation: "Thr", code: "T" },
  "GCU": { aminoAcid: "Alanine", abbreviation: "Ala", code: "A" },
  "GCC": { aminoAcid: "Alanine", abbreviation: "Ala", code: "A" },
  "GCA": { aminoAcid: "Alanine", abbreviation: "Ala", code: "A" },
  "GCG": { aminoAcid: "Alanine", abbreviation: "Ala", code: "A" },
  "UAU": { aminoAcid: "Tyrosine", abbreviation: "Tyr", code: "Y" },
  "UAC": { aminoAcid: "Tyrosine", abbreviation: "Tyr", code: "Y" },
  "UAA": { aminoAcid: "STOP", abbreviation: "Stop", code: "*" },
  "UAG": { aminoAcid: "STOP", abbreviation: "Stop", code: "*" },
  "CAU": { aminoAcid: "Histidine", abbreviation: "His", code: "H" },
  "CAC": { aminoAcid: "Histidine", abbreviation: "His", code: "H" },
  "CAA": { aminoAcid: "Glutamine", abbreviation: "Gln", code: "Q" },
  "CAG": { aminoAcid: "Glutamine", abbreviation: "Gln", code: "Q" },
  "AAU": { aminoAcid: "Asparagine", abbreviation: "Asn", code: "N" },
  "AAC": { aminoAcid: "Asparagine", abbreviation: "Asn", code: "N" },
  "AAA": { aminoAcid: "Lysine", abbreviation: "Lys", code: "K" },
  "AAG": { aminoAcid: "Lysine", abbreviation: "Lys", code: "K" },
  "GAU": { aminoAcid: "Aspartic Acid", abbreviation: "Asp", code: "D" },
  "GAC": { aminoAcid: "Aspartic Acid", abbreviation: "Asp", code: "D" },
  "GAA": { aminoAcid: "Glutamic Acid", abbreviation: "Glu", code: "E" },
  "GAG": { aminoAcid: "Glutamic Acid", abbreviation: "Glu", code: "E" },
  "UGU": { aminoAcid: "Cysteine", abbreviation: "Cys", code: "C" },
  "UGC": { aminoAcid: "Cysteine", abbreviation: "Cys", code: "C" },
  "UGA": { aminoAcid: "STOP", abbreviation: "Stop", code: "*" },
  "UGG": { aminoAcid: "Tryptophan", abbreviation: "Trp", code: "W" },
  "CGU": { aminoAcid: "Arginine", abbreviation: "Arg", code: "R" },
  "CGC": { aminoAcid: "Arginine", abbreviation: "Arg", code: "R" },
  "CGA": { aminoAcid: "Arginine", abbreviation: "Arg", code: "R" },
  "CGG": { aminoAcid: "Arginine", abbreviation: "Arg", code: "R" },
  "AGU": { aminoAcid: "Serine", abbreviation: "Ser", code: "S" },
  "AGC": { aminoAcid: "Serine", abbreviation: "Ser", code: "S" },
  "AGA": { aminoAcid: "Arginine", abbreviation: "Arg", code: "R" },
  "AGG": { aminoAcid: "Arginine", abbreviation: "Arg", code: "R" },
  "GGU": { aminoAcid: "Glycine", abbreviation: "Gly", code: "G" },
  "GGC": { aminoAcid: "Glycine", abbreviation: "Gly", code: "G" },
  "GGA": { aminoAcid: "Glycine", abbreviation: "Gly", code: "G" },
  "GGG": { aminoAcid: "Glycine", abbreviation: "Gly", code: "G" },
};

export function dnaToRna(dna: string): string {
  return dna.toUpperCase().replace(/T/g, "U");
}

export function translateToProtein(rna: string): string[] {
  const aminoAcids: string[] = [];
  for (let i = 0; i < rna.length - 2; i += 3) {
    const codon = rna.substring(i, i + 3);
    const amino = codonTable[codon];
    if (amino) {
      if (amino.code === "*") {
        aminoAcids.push("STOP");
        break;
      }
      aminoAcids.push(amino.abbreviation);
    } else {
      aminoAcids.push("???");
    }
  }
  return aminoAcids;
}

export function getCodons(rna: string): string[] {
  const codons: string[] = [];
  for (let i = 0; i < rna.length - 2; i += 3) {
    codons.push(rna.substring(i, i + 3));
  }
  return codons;
}
