import { Component,  EventEmitter,  Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Icon } from 'src/app/Models/TaxonFilter';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  @Input() icons!: Icon[];
  @Input() resetTrigger!: Observable<boolean>
  @Output() selectionchange = new EventEmitter<Icon[]>()

  iconsSelected = new Set<Icon>();

  ngOnInit(): void {
    this.resetTrigger.subscribe(trigger => {
      if(trigger)
        this.iconsSelected.clear();
    });
  }

  onIconClick(ev: PointerEvent, icon: Icon) {
    this.toggleSelected(ev, icon);
    this.selectionchange.emit(
      Array.from(this.iconsSelected.values()));
  }

  toggleSelected(ev: PointerEvent, icon: Icon){
    if(this.iconsSelected.has(icon)){
      (ev.target as HTMLImageElement).classList.remove('selected');
      this.iconsSelected.delete(icon);
    } else {
      (ev.target as HTMLImageElement).classList.add('selected');
      this.iconsSelected.add(icon);
    }
      
  }
}
