import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit {

  @Input() displayDetail: boolean;
  @Input() hitCount: number;

  @Output() valueChanges: EventEmitter<string> =
     new EventEmitter<string>();

  private _listFilter: string;
  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value;
    this.valueChanges.emit(value);
  }


  @ViewChild('filterElement') filterElementRef: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.filterElementRef.nativeElement.focus();
  }

  ngOnInit(): void {
  }

}
