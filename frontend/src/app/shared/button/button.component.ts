import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() props?: any;
  className: string =
    ' bg-blue-500 text-white hover:bg-blue-600 border-solid border-2 border-blue-500';
}
