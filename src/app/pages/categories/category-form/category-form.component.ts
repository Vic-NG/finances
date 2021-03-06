import { Component, OnInit, AfterContentChecked} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

import * as toastr from 'toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction: string;
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submtingitForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm(){
    this.submtingitForm = true;

    if(this.currentAction == "new")
      this.createCategory();
    else 
      this.updateCategory()
  }

  //metodos privados

  private setCurrentAction(){
    if(this.route.snapshot.url[0].path == "new")
      this.currentAction = "new"
    else 
      this.currentAction = "edit"
  }

  private buildCategoryForm(){
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    })
  }

  private loadCategory() {
    if(this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id")))
      )
      .subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category);
        },
        (error) => console.log('Erro no servidor', error)
      )
    }
  }

  private setPageTitle() {
    if(this.currentAction == "new") 
      this.pageTitle = "Cadastro de nova categoria"
    else {
      const categoryName = this.category.name || "";
      this.pageTitle = "Editando categoria: " + categoryName;
    } 
  }

  private createCategory(){
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.create(category).subscribe(
      category => this.actionForSucess(category),
      error => this.actionsErrors(error)
    )
  }

  private updateCategory(){
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category).subscribe(
      category => this.actionForSucess(category),
      error => this.actionsErrors(error)
    )
  }

  private actionForSucess(category: Category) {
    toastr.success("Solicita????o processada com sucesso!");

    this.router.navigateByUrl("categories", {skipLocationChange: true}).then(
      () => this.router.navigate(["categories", category.id, "edit"])
    )
  }

  private actionsErrors(error: any){
    toastr.error("Ocorreu um erro ao processar sua solicita????o!");

    this.submtingitForm = false;

    if(error.status === 422)
      this.serverErrorMessages = JSON.parse(error._body).erorrs;
    else
      this.serverErrorMessages = ["Falha na comunica????o com o servidor. Por favor, teste mais tarde."]
  }
}
