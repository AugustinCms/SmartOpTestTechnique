import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';
  readonly APIUrl = 'http://localhost:3000/api/surgeons';

  surgeons: any = [];
  searchControl = new FormControl('');

  constructor(private http: HttpClient) {}

  refreshSurgeonList() {
    this.http.get<any>(this.APIUrl).subscribe(data => {
      this.surgeons = data;
    });
  }

  ngOnInit() {
    this.refreshSurgeonList();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
      )
      .subscribe(searchValue => {
        console.log("changed")
        this.filterSurgeons(searchValue ?? '');
      });
  }

  filterSurgeons(searchValue: string) {
    if (searchValue.trim() !== '') {
      console.log("searching")
      this.http
        .get<any>(`${this.APIUrl}?search=${searchValue}`)
        .subscribe(data => {
          this.surgeons = data;
        });
    } else {
      this.refreshSurgeonList();
    }
  }
}
