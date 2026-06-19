export type SectionType =
  | 'badges'
  | 'about'
  | 'features'
  | 'techstack'
  | 'installation'
  | 'usage'
  | 'folderstructure'
  | 'apireference'
  | 'screenshots'
  | 'contributing'
  | 'license'
  | 'contact';

export interface Section {
  id: string;
  type: SectionType;
  enabled: boolean;
  content: Record<string, any>;
}
