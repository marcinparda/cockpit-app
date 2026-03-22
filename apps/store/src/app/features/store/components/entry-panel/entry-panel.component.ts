import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { ConfirmationService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { MonacoEditorComponent } from '../monaco-editor/monaco-editor.component';
import { StoreEnvelope, StoreWriteRequest } from '../../models/store.models';
import { StoreApiService } from '../../services/store-api.service';

export type PanelMode = 'view' | 'create';

@Component({
  selector: 'app-entry-panel',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    TagModule,
    ToggleButtonModule,
    InputTextModule,
    ChipsModule,
    ConfirmDialogModule,
    MessageModule,
    SelectModule,
    DatePipe,
    MonacoEditorComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './entry-panel.component.html',
  styleUrls: ['./entry-panel.component.css'],
})
export class EntryPanelComponent implements OnChanges {
  @ViewChild(MonacoEditorComponent) monacoEditor?: MonacoEditorComponent;

  @Input() visible = false;
  @Input() mode: PanelMode = 'view';
  @Input() envelope: StoreEnvelope | null = null;
  @Input() currentPrefix = '';
  @Input() currentCategory = '';

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<StoreEnvelope>();
  @Output() deleted = new EventEmitter<string>();

  typeOptions = ['object', 'string', 'number', 'boolean', 'array', 'cv_section'];

  editMode = false;
  resolveMode = false;
  saving = false;
  deleting = false;
  error: string | null = null;

  jsonValue = '';
  editType = '';
  editTags: string[] = [];

  newPrefix = '';
  newCategory = '';
  newKey = '';
  newType = '';
  newTags: string[] = [];
  newJson = '{}';

  showDeleteConfirm = false;

  constructor(
    private storeApi: StoreApiService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['envelope'] && this.envelope) {
      this.jsonValue = JSON.stringify(this.envelope.data, null, 2);
      this.editType = this.envelope.meta.type;
      this.editTags = [...this.envelope.meta.tags];
      this.editMode = false;
      this.resolveMode = false;
      this.error = null;
    }
    if (changes['mode'] && this.mode === 'create') {
      this.newPrefix = this.currentPrefix;
      this.newCategory = this.currentCategory;
      this.newKey = '';
      this.newType = 'object';
      this.newTags = [];
      this.newJson = '{}';
      this.error = null;
    }
  }

  onClose(): void {
    this.visible = false;
    this.editMode = false;
    this.visibleChange.emit(false);
  }

  onToggleResolve(): void {
    if (!this.envelope) return;
    const parts = this.envelope.meta.key.split(':');
    const prefix = this.currentPrefix;
    const category = parts[1];
    const key = parts[2];

    if (this.resolveMode) {
      this.storeApi.resolveKey(prefix, category, key).subscribe({
        next: (env) => {
          this.jsonValue = JSON.stringify(env.data, null, 2);
        },
        error: () => {
          this.error = 'Failed to resolve key.';
        },
      });
    } else {
      this.jsonValue = JSON.stringify(this.envelope.data, null, 2);
    }
  }

  onEdit(): void {
    this.editMode = true;
  }

  onSave(): void {
    if (!this.envelope || !this.monacoEditor) return;
    this.saving = true;
    this.error = null;

    const parts = this.envelope.meta.key.split(':');
    const prefix = parts[0];
    const category = parts[1];
    const key = parts[2];

    let parsedData: unknown;
    try {
      parsedData = JSON.parse(this.monacoEditor.getValue());
    } catch {
      this.error = 'Invalid JSON — please fix before saving.';
      this.saving = false;
      return;
    }

    const body: StoreWriteRequest = {
      type: this.editType,
      tags: this.editTags,
      data: parsedData,
    };

    this.storeApi.putKey(prefix, category, key, body).subscribe({
      next: (env) => {
        this.saving = false;
        this.editMode = false;
        this.envelope = env;
        this.jsonValue = JSON.stringify(env.data, null, 2);
        this.saved.emit(env);
      },
      error: (err) => {
        this.saving = false;
        this.error = err?.error?.detail ?? 'Failed to save.';
      },
    });
  }

  onDelete(): void {
    this.confirmationService.confirm({
      message: `Delete key "${this.envelope?.meta.key}"? This cannot be undone.`,
      header: 'Confirm Delete',
      icon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => this.executeDelete(),
    });
  }

  onCreate(): void {
    if (!this.monacoEditor) return;
    this.saving = true;
    this.error = null;

    let parsedData: unknown;
    try {
      parsedData = JSON.parse(this.monacoEditor.getValue());
    } catch {
      this.error = 'Invalid JSON — please fix before creating.';
      this.saving = false;
      return;
    }

    const body: StoreWriteRequest = {
      type: this.newType,
      tags: this.newTags,
      data: parsedData,
    };

    this.storeApi
      .putKey(this.newPrefix, this.newCategory, this.newKey, body)
      .subscribe({
        next: (env) => {
          this.saving = false;
          this.saved.emit(env);
          this.onClose();
        },
        error: (err) => {
          this.saving = false;
          this.error = err?.error?.detail ?? 'Failed to create entry.';
        },
      });
  }

  private executeDelete(): void {
    if (!this.envelope) return;
    this.deleting = true;
    const parts = this.envelope.meta.key.split(':');
    this.storeApi.deleteKey(parts[0], parts[1], parts[2]).subscribe({
      next: () => {
        this.deleting = false;
        this.deleted.emit(this.envelope!.meta.key);
        this.onClose();
      },
      error: (err) => {
        this.deleting = false;
        this.error = err?.error?.detail ?? 'Failed to delete.';
      },
    });
  }
}
