import { Component } from '@angular/core';
import { KeyListComponent } from '../../components/key-list/key-list.component';
import { EntryPanelComponent, PanelMode } from '../../components/entry-panel/entry-panel.component';
import { StoreApiService } from '../../services/store-api.service';
import { StoreEnvelope } from '../../models/store.models';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-store-browser-page',
  standalone: true,
  imports: [KeyListComponent, EntryPanelComponent, ToastModule],
  providers: [MessageService],
  templateUrl: './store-browser-page.component.html',
  styleUrls: ['./store-browser-page.component.css'],
})
export class StoreBrowserPageComponent {
  currentPrefix = '';
  currentCategory = '';

  selectedKey: string | null = null;
  deletedKey: string | null = null;
  createdKey: string | null = null;

  panelVisible = false;
  panelMode: PanelMode = 'view';
  currentEnvelope: StoreEnvelope | null = null;

  constructor(
    private storeApi: StoreApiService,
    private messageService: MessageService,
  ) {}

  onKeySelected(fullKey: string): void {
    this.selectedKey = fullKey;
    const parts = fullKey.split(':');
    this.currentPrefix = parts[0];
    this.currentCategory = parts[1];
    const key = parts[2];

    this.storeApi.getKey(this.currentPrefix, this.currentCategory, key).subscribe({
      next: (envelope) => {
        this.currentEnvelope = envelope;
        this.panelMode = 'view';
        this.panelVisible = true;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err?.error?.detail ?? 'Failed to load entry.',
        });
      },
    });
  }

  onCreateNew(ctx: { prefix: string; category: string } | null): void {
    this.currentPrefix = ctx?.prefix ?? this.currentPrefix;
    this.currentCategory = ctx?.category ?? this.currentCategory;
    this.currentEnvelope = null;
    this.panelMode = 'create';
    this.panelVisible = true;
  }

  onSaved(envelope: StoreEnvelope): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Saved',
      detail: `Key "${envelope.meta.key}" saved (v${envelope.meta.version}).`,
    });

    if (this.panelMode === 'create') {
      this.createdKey = envelope.meta.key;
      this.selectedKey = envelope.meta.key;
      const parts = envelope.meta.key.split(':');
      this.currentPrefix = parts[0];
      this.currentCategory = parts[1];
      this.currentEnvelope = envelope;
      this.panelMode = 'view';
    }
  }

  onDeleted(key: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Deleted',
      detail: `Key "${key}" deleted.`,
    });
    this.deletedKey = key;
    this.selectedKey = null;
  }
}
