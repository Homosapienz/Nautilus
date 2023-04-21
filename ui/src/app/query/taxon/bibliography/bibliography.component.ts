import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { Observable, debounceTime, map, timer } from 'rxjs';
import { BibliographicSearch, BibliographicSource } from 'src/app/Models/TaxonFilter';

@Component({
  selector: 'app-bibliography',
  templateUrl: './bibliography.component.html',
  styleUrls: ['./bibliography.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BibliographyComponent implements OnInit {


  public search: BibliographicSearch = new BibliographicSearch();
  @Input() sources!: BibliographicSource[];
  @Input() resetTrigger!: Observable<boolean>

  @Output() searchChange = new  EventEmitter<BibliographicSearch>();
  @Output() selectionChange = new EventEmitter<BibliographicSource | null>();
  
  @ViewChild('selSources') selSources!: MatSelectionList

  private selectedOption!: BibliographicSource | null

  searchCode = new FormControl('');
  searchAuthor = new FormControl('');
  searchYear = new FormControl('');
  searchQuote = new FormControl('');
  searchSubject = new FormControl('');

  protected phCode: string = 'Code';
  protected phAuthor: string = 'Author';
  protected phYear: string = 'Year';
  protected phQuote: string = 'Quote';
  protected phSubject: string = 'Subject';

  ngOnInit(): void {
    this.resetTrigger.subscribe(trigger => {
      if(trigger)
        this.clear();
    });
  }

  searchCode$ = this.searchCode.valueChanges
    .pipe(
      debounceTime(500),
      map(code => this.search.Code = code!),
      //filter(d => this.search.hasValue)
    ).subscribe(val => this.searchChange.emit(this.search));

  searchAuthor$ = this.searchAuthor.valueChanges
    .pipe(
      debounceTime(500),
      map(author => this.search.Author = author!),
      //filter(d => this.search.hasValue)
    ).subscribe(val => this.searchChange.emit(this.search));

  searchYear$ = this.searchYear.valueChanges
    .pipe(
      debounceTime(500),
      map(year => this.search.Year = year!),
      //filter(d => this.search.hasValue)
    ).subscribe(val => this.searchChange.emit(this.search));

  searchQuote$ = this.searchQuote.valueChanges
    .pipe(
      debounceTime(500),
      map(quote => this.search.Quote = quote!),
      //filter(d => this.search.hasValue)
      ).subscribe(val => this.searchChange.emit(this.search));

  searchSubject$ = this.searchSubject.valueChanges
    .pipe(
      debounceTime(500),
      map(subject => this.search.Subject = subject!),
      //filter(d => this.search.hasValue)
    ).subscribe(val => this.searchChange.emit(this.search));

  sourceSelected(biblio: BibliographicSource) {
    if(biblio === this.selectedOption) {
      this.selectedOption = null;
      this.selectionChange.emit(null);
      this.removeSelection(biblio);
    }
    else {
      this.selectedOption = biblio;
      this.selectionChange.emit(biblio);
    }

    //console.log(this.selSources.selectedOptions);
  }

  removeSelection(opt: BibliographicSource) {
    let option = this.selSources.options.find(o => o.value == opt)

    timer(300).subscribe(() => {
      if(option) {
        option.selected = false;
      }
    });
  }

  private clear(){
    this.clearCode();
    this.clearAuthor();
    this.clearQuote();
    this.clearYear();
    this.clearSubject();
  }

  clearCode() {
    this.searchCode.setValue('');
  }

  clearAuthor(){
    this.searchAuthor.setValue('');
  }

  clearYear() {
    this.searchYear.setValue('');
  }

  clearQuote() {
    this.searchQuote.setValue('');
  }

  clearSubject() {
    this.searchSubject.setValue('');
  }
}
