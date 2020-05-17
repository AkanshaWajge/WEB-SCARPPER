export interface Extractor {
  id: string;
  url: string;
  title: string;
  codeSnippet?: string;
  inputSchema?: string;
  outputSchema?: string;
}
