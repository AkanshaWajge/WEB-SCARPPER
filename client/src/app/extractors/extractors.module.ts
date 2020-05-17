export interface Extractor {
  id: string;
  url: string;
  title: string;
  codeSnippet?: string;
  inputSchema?: string;
  outputSchema?: string;
  responseData?: [];
  runInputsData?: [{
    id: string;
    time: string;
    status: string;
    responseData: any[];
  }];
  time?: string;
  status?: string;
}
