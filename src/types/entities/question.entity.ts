export interface Question {
  id: string;
  text: string;
  isMultipleChoice: boolean;
  options: Option[];
}

export interface Option {
  id: string;
  text: string;
}
