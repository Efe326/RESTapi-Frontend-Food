import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/food.service';
import { Food } from 'src/app/models/ui-models/food.model';

@Component({
  selector: 'app-view-food',
  templateUrl: './view-food.component.html',
  styleUrls: ['./view-food.component.css']
})
export class ViewFoodComponent implements OnInit {
  foodId: string | null | undefined;
  food: Food = {
    _id: '',
    calories: '',
    name: '',
    preptime: '',
    price: '',
    productImage: ''
  };

  constructor(
    private readonly FoodService: FoodService,
    private readonly route: ActivatedRoute,
    private router : Router,
    private snackbar: MatSnackBar,
  ) {}


  isNewProduct = false;
  header ="";
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      debugger;
      this.foodId = params.get('_id');

      if(this.foodId =="add"){
        this.isNewProduct = true;
        this.header ="Yemek Ekle";
      }
      else
      {
        this.isNewProduct = false;
        this.header ="Yemek Düzenle";
      }
      this.FoodService.getProduct(this.foodId).subscribe(
        (success) => {
            if (success.product) {
           
            this.food = success.product;
            

           
          }
        },
        (error) => {
        
        }
      );
    });
  }
  onUpdate()
  {
    
    this.FoodService.updateProduct(this.food._id, this.food)
    .subscribe(
      (success) => {
        this.snackbar.open('Yemek Başarıyla Güncellendi!', undefined, {
          duration: 4000
        })
        this.router.navigateByUrl('products');
        
      },
      (error)=> {
        this.snackbar.open('Hata!', undefined, {
          duration: 4000
        })

      }
    )
  }
  onDelete(){
    this.FoodService.deleteProduct(this.food._id).subscribe(
      (success) => {
        this.snackbar.open('Yemek Silindi!', undefined, {
          duration: 4000
        })
        
        setTimeout(() => {
          this.router.navigateByUrl('/');
        },2000)
      },
      (error) =>{
        this.snackbar.open('Hata! :(', undefined, {
          duration: 4000
        })
      }
    )
  }
}


