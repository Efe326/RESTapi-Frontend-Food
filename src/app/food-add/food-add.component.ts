import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from 'src/app/food.service';

@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.css']
})
export class FoodAddComponent {
  foodForm: FormGroup;
  file!: File  // Store the selected file here

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private foodService: FoodService,
    private fb: FormBuilder
  ) {
    this.foodForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required]],
      calories: ['', [Validators.required]],
      // productImage: [ '', [Validators.required, ]],
      preptime: ['', [Validators.required]],
      file: new FormControl(''), 
    });
  }

  onAdd() {
    if (this.foodForm.valid && this.file) {
      const formData = new FormData();
      const formValue = this.foodForm.value;
      formData.append('name', formValue.name);
      formData.append('price', formValue.price);
      formData.append('calories', formValue.calories);
      formData.append('preptime', formValue.preptime);
      formData.append('productImage', this.file); 

      this.foodService.addproduct(formData).subscribe(
        (success) => {
          this.snackbar.open('Yemek Başarıyla eklendi!', undefined, {
            duration: 4000
          });
          setTimeout(() => {
            this.router.navigateByUrl(`products/${success._id}`);
          }, 2000);
        },
        (error) => {
          
          this.snackbar.open('Hata!', undefined, {
            duration: 4000
          });
        }
      );
    }
  }

  // onFileSelected(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     this.selectedFile = inputElement.files[0];
  //   } else {
  //     this.selectedFile = null;
  //   }
  // }
   onFileSelected(event: any) {
        this.file = event.target.files[0];
      } 
}
