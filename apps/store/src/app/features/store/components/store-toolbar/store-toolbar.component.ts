import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { StoreApiService } from '../../services/store-api.service';

@Component({
  selector: 'app-store-toolbar',
  standalone: true,
  imports: [FormsModule, ButtonModule, SelectModule],
  templateUrl: './store-toolbar.component.html',
  styleUrls: ['./store-toolbar.component.css'],
})
export class StoreToolbarComponent implements OnInit {
  @Output() browse = new EventEmitter<{ prefix: string; category: string }>();
  @Output() create = new EventEmitter<void>();

  prefixes: string[] = [];
  categories: string[] = [];

  selectedPrefix: string | null = null;
  selectedCategory: string | null = null;

  loadingPrefixes = false;
  loadingCategories = false;

  constructor(private storeApi: StoreApiService) {}

  ngOnInit(): void {
    this.loadPrefixes();
  }

  onPrefixChange(prefix: string | null): void {
    this.selectedCategory = null;
    this.categories = [];
    if (!prefix) return;

    this.loadingCategories = true;
    this.storeApi.listCategories(prefix).subscribe({
      next: (cats) => {
        this.categories = cats;
        this.loadingCategories = false;
      },
      error: () => {
        this.loadingCategories = false;
      },
    });
  }

  onCategoryChange(category: string | null): void {
    if (!category || !this.selectedPrefix) return;
    this.browse.emit({ prefix: this.selectedPrefix, category });
  }

  onNew(): void {
    this.create.emit();
  }

  private loadPrefixes(): void {
    this.loadingPrefixes = true;
    this.storeApi.listPrefixes().subscribe({
      next: (prefixes) => {
        this.prefixes = prefixes;
        this.loadingPrefixes = false;
      },
      error: () => {
        this.loadingPrefixes = false;
      },
    });
  }
}
