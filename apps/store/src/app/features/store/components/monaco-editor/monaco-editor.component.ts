import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

declare const monaco: typeof import('monaco-editor');
type MonacoEditor = import('monaco-editor').editor.IStandaloneCodeEditor;

@Component({
  selector: 'app-monaco-editor',
  standalone: true,
  template: `<div #editorContainer class="editor-container"></div>`,
  styles: [
    `
      .editor-container {
        width: 100%;
        height: 100%;
        min-height: 200px;
      }
    `,
  ],
})
export class MonacoEditorComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('editorContainer', { static: true }) editorContainer!: ElementRef;
  @Input() value = '';
  @Input() readOnly = true;
  @Output() valueChange = new EventEmitter<string>();

  private editor: MonacoEditor | null = null;
  private monacoLoaded = false;

  ngOnInit(): void {
    this.loadMonaco();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.editor) return;

    if (changes['value'] && !changes['value'].firstChange) {
      const current = this.editor.getValue();
      if (current !== changes['value'].currentValue) {
        this.editor.setValue(changes['value'].currentValue ?? '');
      }
    }

    if (changes['readOnly'] && !changes['readOnly'].firstChange) {
      this.editor.updateOptions({ readOnly: changes['readOnly'].currentValue });
    }
  }

  ngOnDestroy(): void {
    this.editor?.dispose();
  }

  getValue(): string {
    return this.editor?.getValue() ?? '';
  }

  private loadMonaco(): void {
    if (typeof monaco !== 'undefined') {
      this.initEditor();
      return;
    }

    (window as Window & { require?: (deps: string[], cb: () => void) => void }).require?.(
      ['vs/editor/editor.main'],
      () => {
        this.monacoLoaded = true;
        this.initEditor();
      },
    );
  }

  private initEditor(): void {
    this.editor = monaco.editor.create(this.editorContainer.nativeElement, {
      value: this.value,
      language: 'json',
      theme: 'vs-dark',
      readOnly: this.readOnly,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      fontSize: 13,
      lineNumbers: 'on',
      wordWrap: 'on',
    });

    this.editor.onDidChangeModelContent(() => {
      this.valueChange.emit(this.editor!.getValue());
    });
  }
}
