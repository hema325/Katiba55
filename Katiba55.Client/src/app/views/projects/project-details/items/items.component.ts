import { Component, inject, OnInit } from '@angular/core';
import { CardBodyComponent, CardComponent, CardHeaderComponent, SpinnerComponent, TooltipDirective } from '@coreui/angular';
import { ToasterService } from '../../../../services/toaster.service';
import { ItemsService } from '../../../../services/items.service';
import { Item } from '../../../../models/items/item';
import { finalize, first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DeleteConfirmationModalComponent } from '../../../../shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { CreateItemsModalComponent } from './create-items-modal/create-items-modal.component';
import { UpdateItemsModalComponent } from './update-items-modal/update-items-modal.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  imports: [
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    TooltipDirective,
    DeleteConfirmationModalComponent,
    CreateItemsModalComponent,
    UpdateItemsModalComponent,
    SpinnerComponent
  ]
})
export class ItemsComponent implements OnInit {

  private itemsService: ItemsService = inject(ItemsService);
  private toasterService: ToasterService = inject(ToasterService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  items: Item[] = [];
  projectId: number = 0;
  isLoading: boolean = false;
  deleteConfirmationModalVisible: boolean = false;
  deletedItem: Item | null = null;
  updatedItem: Item | null = null;
  createItemModalVisible: boolean = false;
  updateItemModalVisible: boolean = false;

  ngOnInit() {
    this.projectId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.loadItems();
  }

  loadItems() {
    this.isLoading = true;
    this.itemsService.getByProjectId(this.projectId)
      .pipe(finalize(() => this.isLoading = false), first())
      .subscribe(response => this.items = response.data);
  }

  fireDeleteConfirmationModal(item: Item) {
    this.deleteConfirmationModalVisible = true;
    this.deletedItem = item;
  }

  handleDeleteConfirmationModalChange(event: boolean) {
    if (event) {
      this.itemsService
        .delete(this.deletedItem!.id)
        .pipe(finalize(() => this.deletedItem = null), first())
        .subscribe(response => {
          if (response.success) {
            this.toasterService.showToast('نجاح', 'تم حذف البند بنجاح!', 'success');
            this.items = this.items.filter(o => o.id !== this.deletedItem!.id);
          }
        });
    }
    else {
      this.deletedItem = null
    }
  }

  create() {
    this.createItemModalVisible = true;
  }

  onItemCreated(item: Item) {
    this.items.push(item);
  }

  update(item: Item) {
    this.updatedItem = item;
    this.updateItemModalVisible = true;
  }

  onItemUpdated(item: Item) {
    const index = this.items.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.items[index] = item;
    }

    this.updatedItem = null;
  }
}
