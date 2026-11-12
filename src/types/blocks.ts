export interface Block {
  id: string;
  type: 'heading' | 'paragraph' | 'image' | 'chart' | 'diagram' | 'icon' | 'pricing' | 'timeline' | 'faq' | 'question' | 'button' | 'divider' | 'two-column';
  properties: Record<string, unknown>;
}

export interface Section {
  id: string;
  name: string;
  blocks: Block[];
  tone?: string;
}
