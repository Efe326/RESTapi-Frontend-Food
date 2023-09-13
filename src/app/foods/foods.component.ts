import { Component, OnInit, ViewChild } from '@angular/core';
import { FoodService } from '../food.service';
import { Food } from '../models/ui-models/food.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.css']
})
export class FoodsComponent implements OnInit {
  foods: Food[] = [];
  displayedColumns: string[] = ['name', 'price', 'productImage','calories','preptime', '_id', 'edit'];
  dataSource: MatTableDataSource<Food> = new MatTableDataSource<Food>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString = ''

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getProducts().subscribe(
      (success) => {
        console.log('Data Received:', success);
        this.foods = success.products.map((product) => ({
          ...product,
          productImage: 'http://localhost:3000/' + product.productImage
        }));
        this.dataSource = new MatTableDataSource<Food>(this.foods);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort; 
      },
      (err) => {
        console.error('Error:', err);
      }
    );
  }
  filterFoods(){
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }
}
