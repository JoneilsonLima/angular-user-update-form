import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons-container',
  templateUrl: './buttons-container.component.html',
  styleUrl: './buttons-container.component.scss'
})
export class ButtonsContainerComponent {
  @Input({ required: true }) isInEditMode: boolean = false;

  @Output('onEditButton') onEditButtonEmitted = new EventEmitter<void>();
  @Output('onCancelButton') onCancelButtonEmitted = new EventEmitter<void>();

  onEditButton(): void {
    this.onEditButtonEmitted.emit();
  }

  onCancelButton(): void {
    this.onCancelButtonEmitted.emit();
  }
}
