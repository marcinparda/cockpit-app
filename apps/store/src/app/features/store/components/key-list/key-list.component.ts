import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { StoreApiService } from '../../services/store-api.service';

interface CategoryNode {
  name: string;
  keys: string[];
  expanded: boolean;
  loading: boolean;
}

interface PrefixNode {
  name: string;
  categories: CategoryNode[];
  expanded: boolean;
  loading: boolean;
  addingCategory: boolean;
  newCategoryInput: string;
}

@Component({
  selector: 'app-key-list',
  standalone: true,
  imports: [NgClass, FormsModule, ButtonModule, SkeletonModule, MessageModule, InputTextModule],
  templateUrl: './key-list.component.html',
  styleUrls: ['./key-list.component.css'],
})
export class KeyListComponent implements OnInit, OnChanges {
  @Input() selectedKey: string | null = null;
  @Input() deletedKey: string | null = null;
  @Input() createdKey: string | null = null;

  @Output() keySelected = new EventEmitter<string>();
  @Output() create = new EventEmitter<{ prefix: string; category: string } | null>();

  prefixNodes: PrefixNode[] = [];
  loadingPrefixes = false;
  error: string | null = null;

  addingPrefix = false;
  newPrefixInput = '';

  constructor(private storeApi: StoreApiService) {}

  ngOnInit(): void {
    this.loadPrefixes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deletedKey'] && this.deletedKey) {
      this.removeKeyFromTree(this.deletedKey);
    }
    if (changes['createdKey'] && this.createdKey) {
      this.addKeyToTree(this.createdKey);
    }
  }

  togglePrefix(node: PrefixNode): void {
    if (node.addingCategory) return;
    if (!node.expanded && node.categories.length === 0) {
      node.loading = true;
      this.storeApi.listCategories(node.name).subscribe({
        next: (cats) => {
          node.categories = cats.map((c) => ({
            name: c,
            keys: [],
            expanded: false,
            loading: false,
          }));
          node.loading = false;
          node.expanded = true;
        },
        error: () => {
          node.loading = false;
        },
      });
    } else {
      node.expanded = !node.expanded;
    }
  }

  toggleCategory(prefix: string, cat: CategoryNode): void {
    if (!cat.expanded && cat.keys.length === 0) {
      cat.loading = true;
      this.storeApi.listKeys(prefix, cat.name).subscribe({
        next: (keys) => {
          cat.keys = keys;
          cat.loading = false;
          cat.expanded = true;
        },
        error: () => {
          cat.loading = false;
        },
      });
    } else {
      cat.expanded = !cat.expanded;
    }
  }

  selectKey(fullKey: string): void {
    this.keySelected.emit(fullKey);
  }

  createInCategory(prefix: string, category: string, event: MouseEvent): void {
    event.stopPropagation();
    this.create.emit({ prefix, category });
  }

  getKeyLabel(fullKey: string): string {
    return fullKey.split(':').pop() ?? fullKey;
  }

  startAddPrefix(event: MouseEvent): void {
    event.stopPropagation();
    this.addingPrefix = true;
    this.newPrefixInput = '';
  }

  confirmAddPrefix(): void {
    const name = this.newPrefixInput.trim();
    if (!name) return;
    if (!this.prefixNodes.find((p) => p.name === name)) {
      this.prefixNodes.push({
        name,
        categories: [],
        expanded: false,
        loading: false,
        addingCategory: false,
        newCategoryInput: '',
      });
    }
    this.addingPrefix = false;
    this.newPrefixInput = '';
  }

  cancelAddPrefix(): void {
    this.addingPrefix = false;
    this.newPrefixInput = '';
  }

  startAddCategory(prefix: PrefixNode, event: MouseEvent): void {
    event.stopPropagation();
    prefix.addingCategory = true;
    prefix.newCategoryInput = '';
  }

  confirmAddCategory(prefix: PrefixNode): void {
    const name = prefix.newCategoryInput.trim();
    if (!name) return;
    if (!prefix.categories.find((c) => c.name === name)) {
      prefix.categories.push({
        name,
        keys: [],
        expanded: false,
        loading: false,
      });
    }
    prefix.addingCategory = false;
    prefix.newCategoryInput = '';
  }

  cancelAddCategory(prefix: PrefixNode): void {
    prefix.addingCategory = false;
    prefix.newCategoryInput = '';
  }

  private loadPrefixes(): void {
    this.loadingPrefixes = true;
    this.storeApi.listPrefixes().subscribe({
      next: (prefixes) => {
        this.prefixNodes = prefixes.map((p) => ({
          name: p,
          categories: [],
          expanded: false,
          loading: false,
          addingCategory: false,
          newCategoryInput: '',
        }));
        this.loadingPrefixes = false;
      },
      error: () => {
        this.error = 'Failed to load prefixes.';
        this.loadingPrefixes = false;
      },
    });
  }

  private removeKeyFromTree(key: string): void {
    for (const prefix of this.prefixNodes) {
      for (const cat of prefix.categories) {
        const idx = cat.keys.indexOf(key);
        if (idx !== -1) {
          cat.keys.splice(idx, 1);
          return;
        }
      }
    }
  }

  private addKeyToTree(key: string): void {
    const parts = key.split(':');
    if (parts.length < 3) return;
    const [prefixName, catName] = parts;

    const prefixNode = this.prefixNodes.find((p) => p.name === prefixName);
    if (!prefixNode) return;

    const catNode = prefixNode.categories.find((c) => c.name === catName);
    if (catNode && catNode.expanded && !catNode.keys.includes(key)) {
      catNode.keys.push(key);
    }
  }
}
