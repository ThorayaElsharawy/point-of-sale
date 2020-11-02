import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this._route.snapshot.paramMap.get('id');
    let name = this._route.snapshot.paramMap.get('name');
    console.log(id)
    console.log(name)


    // this._route.paramMap.subscribe(params => {
    //   console.log(params.get('id'))
    // })
  }

}
