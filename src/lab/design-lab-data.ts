export interface TypographySpecimen {
  id: string;
  label: string;
  displayFamily: string;
  bodyFamily: string;
  packageNames: string[];
  displayWeight: string;
  bodyWeight: string;
  labelWeight: string;
  character: string;
  useCase: string;
  risk: string;
}

export const typographySpecimens: readonly TypographySpecimen[] = [
  {
    id: "newsreader-instrument",
    label: "Newsreader + Instrument Sans",
    displayFamily: '"Newsreader Variable", Georgia, serif',
    bodyFamily: '"Instrument Sans Variable", sans-serif',
    packageNames: ["@fontsource-variable/newsreader", "@fontsource-variable/instrument-sans"],
    displayWeight: "500",
    bodyWeight: "400",
    labelWeight: "650",
    character: "Serena, editorial y cercana",
    useCase: "Hospitalidad tranquila, gastronomía narrativa y servicios con una voz humana.",
    risk: "Ya forma parte del sistema; no debe convertirse en la respuesta para toda marca refinada.",
  },
  {
    id: "cormorant-instrument",
    label: "Cormorant Garamond + Instrument Sans",
    displayFamily: '"Cormorant Garamond Variable", Georgia, serif',
    bodyFamily: '"Instrument Sans Variable", sans-serif',
    packageNames: ["@fontsource-variable/cormorant-garamond", "@fontsource-variable/instrument-sans"],
    displayWeight: "520",
    bodyWeight: "400",
    labelWeight: "620",
    character: "Delicada, contrastada y ceremonial",
    useCase: "Marcas con fotografía fuerte y titulares cortos de carácter refinado.",
    risk: "Los trazos finos pierden presencia en tamaños pequeños o sobre fotografía.",
  },
  {
    id: "source-manrope",
    label: "Source Serif 4 + Manrope",
    displayFamily: '"Source Serif 4 Variable", Georgia, serif',
    bodyFamily: '"Manrope Variable", sans-serif',
    packageNames: ["@fontsource-variable/source-serif-4", "@fontsource-variable/manrope"],
    displayWeight: "600",
    bodyWeight: "430",
    labelWeight: "650",
    character: "Sobria, precisa y contemporánea",
    useCase: "Hotelería, servicios profesionales y espacios que necesitan autoridad sin frialdad.",
    risk: "Una composición demasiado simétrica puede volverla institucional.",
  },
  {
    id: "archivo-single",
    label: "Archivo como superfamilia",
    displayFamily: '"Archivo Variable", sans-serif',
    bodyFamily: '"Archivo Variable", sans-serif',
    packageNames: ["@fontsource-variable/archivo"],
    displayWeight: "700",
    bodyWeight: "430",
    labelWeight: "680",
    character: "Directa, compacta y segura",
    useCase: "Comercios de comunicación frontal, servicios técnicos y páginas con precios visibles.",
    risk: "Necesita escala y composición fuertes para no sentirse corporativa o genérica.",
  },
  {
    id: "manrope-single",
    label: "Manrope como superfamilia",
    displayFamily: '"Manrope Variable", sans-serif',
    bodyFamily: '"Manrope Variable", sans-serif',
    packageNames: ["@fontsource-variable/manrope"],
    displayWeight: "720",
    bodyWeight: "430",
    labelWeight: "680",
    character: "Geométrica, limpia y contenida",
    useCase: "Hospitalidad moderna, clínicas cuidadas y marcas donde la imagen aporta la emoción.",
    risk: "No tiene itálica; la personalidad debe venir de peso, escala y espacio.",
  },
  {
    id: "fraunces-instrument",
    label: "Fraunces + Instrument Sans",
    displayFamily: '"Fraunces Variable", Georgia, serif',
    bodyFamily: '"Instrument Sans Variable", sans-serif',
    packageNames: ["@fontsource-variable/fraunces", "@fontsource-variable/instrument-sans"],
    displayWeight: "600",
    bodyWeight: "400",
    labelWeight: "650",
    character: "Cálida, expresiva y táctil",
    useCase: "Comparación experimental para marcas artesanales o gastronómicas con voz muy definida.",
    risk: "Es una elección muy usada en diseño asistido. Sólo debe sobrevivir si la marca la justifica.",
  },
] as const;

export interface PaletteCandidate {
  id: string;
  label: string;
  attributes: string;
  colors: {
    canvas: string;
    surface: string;
    surfaceStrong: string;
    ink: string;
    muted: string;
    line: string;
    accent: string;
    accentStrong: string;
    accentSoft: string;
    signal: string;
    onAccent: string;
    onSignal: string;
    inverseSurface: string;
    onInverse: string;
    onInverseMuted: string;
    inverseLine: string;
    mediaScrim: string;
    onMedia: string;
    focus: string;
  };
}

export const paletteCandidates: readonly PaletteCandidate[] = [
  { id: "porcelain-rose", label: "Porcelain Rose", attributes: "refined / soft", colors: { canvas: "#F8F3F1", surface: "#FFFAF8", surfaceStrong: "#E9D7DA", ink: "#2D2226", muted: "#74666B", line: "#D9C8CC", accent: "#8A3F59", accentStrong: "#6E2F45", accentSoft: "#EED5DC", signal: "#B7A06A", onAccent: "#FFFAF8", onSignal: "#2D2226", inverseSurface: "#2D2226", onInverse: "#FFFAF8", onInverseMuted: "#D9CBD0", inverseLine: "#6C5A60", mediaScrim: "#1B1215", onMedia: "#FFFAF8", focus: "#8A3F59" } },
  { id: "sage-ritual", label: "Sage Ritual", attributes: "soft / sober", colors: { canvas: "#173328", surface: "#214235", surfaceStrong: "#2E5143", ink: "#F1F5EE", muted: "#BDC9C0", line: "#496559", accent: "#F0B38E", accentStrong: "#FFD0B4", accentSoft: "#4A4C39", signal: "#B9D66B", onAccent: "#1D251F", onSignal: "#1D251F", inverseSurface: "#0F211A", onInverse: "#F1F5EE", onInverseMuted: "#BDC9C0", inverseLine: "#496559", mediaScrim: "#08120E", onMedia: "#FFF9F4", focus: "#F0B38E" } },
  { id: "mineral-coast", label: "Mineral Coast", attributes: "editorial / sober", colors: { canvas: "#F2EFE7", surface: "#FBF9F4", surfaceStrong: "#D9E1E4", ink: "#182633", muted: "#586973", line: "#CBD4D6", accent: "#245B73", accentStrong: "#184254", accentSoft: "#D4E5EC", signal: "#A77D3D", onAccent: "#FFFFFF", onSignal: "#101820", inverseSurface: "#182633", onInverse: "#FFFFFF", onInverseMuted: "#CBD4D6", inverseLine: "#586973", mediaScrim: "#101A22", onMedia: "#FFFFFF", focus: "#245B73" } },
  { id: "cellar-clay", label: "Cellar Clay", attributes: "editorial / refined", colors: { canvas: "#8B3529", surface: "#9A4032", surfaceStrong: "#AC5140", ink: "#FFF4EC", muted: "#F0C9BB", line: "#BD6654", accent: "#F6D1A8", accentStrong: "#FFE0BD", accentSoft: "#733226", signal: "#AFC49B", onAccent: "#3A1E17", onSignal: "#3A1E17", inverseSurface: "#3A1E17", onInverse: "#FFF4EC", onInverseMuted: "#F0C9BB", inverseLine: "#8D4A3C", mediaScrim: "#1A0B08", onMedia: "#FFF9F4", focus: "#F6D1A8" } },
  { id: "night-brass", label: "Night Brass", attributes: "sober / refined", colors: { canvas: "#141719", surface: "#1E2225", surfaceStrong: "#292F33", ink: "#F4EFE4", muted: "#B9B2A7", line: "#42484B", accent: "#D0A35A", accentStrong: "#E4BA73", accentSoft: "#3A3021", signal: "#7B8F86", onAccent: "#19130A", onSignal: "#141719", inverseSurface: "#080A0B", onInverse: "#F4EFE4", onInverseMuted: "#B9B2A7", inverseLine: "#42484B", mediaScrim: "#070809", onMedia: "#FFF9F0", focus: "#EBC77F" } },
  { id: "cobalt-acid", label: "Cobalt Acid", attributes: "modern / energetic", colors: { canvas: "#F3F4EF", surface: "#FFFFFB", surfaceStrong: "#DCE0EA", ink: "#171B22", muted: "#626873", line: "#CDD1DA", accent: "#244DE8", accentStrong: "#1736B6", accentSoft: "#DCE3FF", signal: "#C7F04B", onAccent: "#FFFFFF", onSignal: "#171B22", inverseSurface: "#171B22", onInverse: "#FFFFFF", onInverseMuted: "#CDD1DA", inverseLine: "#626873", mediaScrim: "#0E1220", onMedia: "#FFFFFF", focus: "#244DE8" } },
  { id: "graphite-citrus", label: "Graphite Citrus", attributes: "direct / energetic", colors: { canvas: "#1B1D1B", surface: "#262925", surfaceStrong: "#30342F", ink: "#F5F2E8", muted: "#C1C5B9", line: "#484C45", accent: "#D7602D", accentStrong: "#F27A45", accentSoft: "#3E3028", signal: "#D4DC45", onAccent: "#161814", onSignal: "#161814", inverseSurface: "#0E100E", onInverse: "#F5F2E8", onInverseMuted: "#C1C5B9", inverseLine: "#484C45", mediaScrim: "#0C0E0C", onMedia: "#FFFAF2", focus: "#E47A4B" } },
  { id: "oxford-ink", label: "Oxford Ink", attributes: "direct / sober", colors: { canvas: "#16243B", surface: "#1E304E", surfaceStrong: "#294064", ink: "#F6F1E7", muted: "#BEC8D7", line: "#435673", accent: "#D2A85B", accentStrong: "#E7C171", accentSoft: "#373B40", signal: "#85C2C7", onAccent: "#1C2633", onSignal: "#1C2633", inverseSurface: "#091322", onInverse: "#F6F1E7", onInverseMuted: "#BEC8D7", inverseLine: "#435673", mediaScrim: "#091322", onMedia: "#FFF9EF", focus: "#E3BD72" } },
] as const;

export const serializePalette = (palette: PaletteCandidate): string =>
  Object.entries(palette.colors)
    .map(([role, value]) => `--lab-${role.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}:${value}`)
    .join(";");
